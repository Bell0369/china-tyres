<script setup>
import { ref, watch, reactive } from "vue"
import { Search, Refresh } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"
import { getClientProductApi, viewProductShowApi, updateClientProductApi, updateAllClientProductApi } from "@/api/users"
import { getProductListApi } from "@/api/product"
import { usePagination } from "@/hooks/usePagination"
import { useDeleteList } from "@/hooks/useDeleteList"
import updatePrice from "@/views/componrnts/updatePrice/updatePrice.vue"

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const props = defineProps(["userId"])

// 删除
const { handleDelete, isDeleted } = useDeleteList({
  api: getClientProductApi,
  text: "產品"
})

// 删除-成功
watch([isDeleted], () => {
  getTableData()
})

//#region 查
const tableData = ref([])
const keyword = ref("")
const getTableData = () => {
  loading.value = true
  getClientProductApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    keyword: keyword.value || undefined,
    id: props.userId
  })
    .then(({ data }) => {
      paginationData.total = data.total
      tableData.value = data.data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

// 重置
const resetSearch = () => {
  keyword.value = ""
  handleSearch()
}

// 增 / 改
const dialogVisible = ref(false)
const handleUpdate = (row) => {
  dialogVisible.value = true
  if (row) {
    getProductShow(row)
  } else {
    Object.keys(productForm).forEach((key) => {
      productForm[key] = undefined
    })
    productForm.id = 0
  }
}

// 產品信息明細 - 默認
const productFormRef = ref(null)
const productForm = reactive({
  product_id: 1,
  price: "",
  brand_name: ""
})
const getProductShow = (pid) => {
  viewProductShowApi({
    id: pid
  }).then(({ data }) => {
    Object.assign(productForm, data)
    const obj = {
      name: data.name,
      id: data.product_id
    }
    productOptions.value.push(obj)
  })
}

// 產品名稱
const loading2 = ref(false)
const productOptions = ref([])
const remoteMethod = (query) => {
  loading2.value = true
  getProductListApi({
    name: query || undefined,
    page_size: 20
  })
    .then(({ data }) => {
      const list = data.data
      productOptions.value = list
    })
    .catch(() => {
      productOptions.value = []
    })
    .finally(() => {
      loading2.value = false
    })
}

// 切換產品
const changeProduct = (e) => {
  const proNum = productOptions.value.findIndex((item) => {
    return item.id == e
  })
  productForm.brand_name = productOptions.value[proNum].brand
}

// 關閉調整產品彈框 - 清空option數據
const handleClose = () => {
  productOptions.value = []
}

// 提交產品更改
const submitProductForm = () => {
  productForm.client_id = props.userId
  updateClientProductApi(productForm).then(() => {
    ElMessage.success("操作成功")
    dialogVisible.value = false
    getTableData()
  })
}

/** 調整價格 */
const dialogVisible2 = ref(false)

const childRef = ref(null)
const submitProductSum = () => {
  const childData = childRef.value.childData
  if (childData.price === "" && childData.per === "") {
    ElMessage.error("請輸入金額/百分比")
    return
  }
  childData.client_id = props.userId
  updateAllClientProductApi(childData).then(() => {
    ElMessage.success("操作成功")
    dialogVisible2.value = false
    getTableData()
  })
}
</script>

<template>
  <div v-loading="loading">
    <div class="m-b">
      <div class="flex justify-between">
        <el-text tag="b">產品信息</el-text>
        <div>
          <el-button type="primary" @click="dialogVisible2 = true">批量調整價格</el-button>
          <el-button type="primary" @click="handleUpdate(0)">新增產品</el-button>
        </div>
      </div>
      <div class="mt2">
        <el-input v-model="keyword" placeholder="請輸入產品名稱" style="width: 280px; margin-right: 10px" />
        <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
        <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="m-b">
      <el-table ref="tableRef" :data="tableData">
        <el-table-column prop="name" label="產品名稱" align="center" />
        <el-table-column prop="price" label="價格" align="center" />
        <el-table-column prop="brand_name" label="品牌" align="center" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row.id)">修改</el-button>
            <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager-wrapper">
      <el-pagination
        background
        :layout="paginationData.layout"
        :page-sizes="paginationData.pageSizes"
        :total="paginationData.total"
        :page-size="paginationData.pageSize"
        :currentPage="paginationData.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 產品調整 -->
    <el-dialog v-model="dialogVisible" title="產品調整" @close="handleClose">
      <el-form ref="productFormRef" :model="productForm" label-position="left" label-width="100px">
        <el-form-item label="產品名稱">
          <el-select
            v-model="productForm.product_id"
            filterable
            remote
            remote-show-suffix
            :remote-method="remoteMethod"
            :loading="loading2"
            @change="changeProduct($event)"
          >
            <el-option v-for="item in productOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="price" label="價格">
          <el-input v-model="productForm.price" placeholder="請輸入價格" type="number" />
        </el-form-item>
        <el-form-item label="品牌">
          <el-text class="mx-1" size="large">{{ productForm.brand_name }}</el-text>
        </el-form-item>
      </el-form>
      <template #footer>
        <ElButton type="primary" @click="submitProductForm"> 保存 </ElButton>
        <ElButton @click="dialogVisible = false">關閉</ElButton>
      </template>
    </el-dialog>
    <!-- 調整價格 -->
    <el-dialog v-model="dialogVisible2" title="批量調整價格">
      <update-price ref="childRef" />
      <template #footer>
        <ElButton type="primary" @click="submitProductSum"> 保存 </ElButton>
        <ElButton @click="dialogVisible2 = false">關閉</ElButton>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
