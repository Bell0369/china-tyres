<script setup>
import { ref, watch, reactive } from "vue"
import { getClientProductApi, deleteClientProductApi } from "@/api/users"
import { usePagination } from "@/hooks/usePagination"
import { Search } from "@element-plus/icons-vue"
import { ElMessageBox, ElMessage } from "element-plus"
import { Dialog } from "@/components/Dialog"

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const props = defineProps(["userId"])

//#region 删
const handleDelete = (row) => {
  ElMessageBox.confirm(`確認刪除產品${row.client_name}？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteClientProductApi(row.id).then(() => {
        ElMessage.success("刪除成功")
        getTableData()
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消"
      })
    })
}
//#endregion

//#region 查
const tableData = ref([])
const keywords = ref(null)
const getTableData = () => {
  loading.value = true
  getClientProductApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    keyword: keywords.value || undefined,
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

// 增 / 改
const dialogVisible = ref(false)
const dialogTitle = ref("")
const dialogId = ref(0)
const handleUpdate = (row) => {
  console.log(row)
  dialogId.value = row
  dialogVisible.value = true
  if (row) {
    // 改
    dialogTitle.value = "編輯用戶"
  } else {
    // 增
    dialogTitle.value = "新增用戶"
  }
}

const productFormRef = ref(null)
const productData = reactive({
  product_id: 1,
  price: "",
  brand_name: ""
})

/** 調整價格 */
const dialogVisible2 = ref(false)
const radio1 = ref(0)
</script>

<template>
  <div v-loading="loading">
    <div class="m-b">
      <div class="flex justify-between">
        <el-text tag="b" size="large">產品信息</el-text>
        <div>
          <el-button type="primary" @click="dialogVisible2 = true">批量調整價格</el-button>
          <el-button type="primary" @click="handleUpdate(0)">新增產品</el-button>
        </div>
      </div>
      <div>
        <el-input v-model="keywords" placeholder="請輸入產品名稱" style="width: 280px; margin-right: 10px" />
        <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
      </div>
    </div>
    <div class="m-b">
      <el-table ref="tableRef" :data="tableData">
        <el-table-column prop="name" label="產品名稱" align="center" />
        <el-table-column prop="price" label="價格" align="center" />
        <el-table-column prop="brand_name" label="品牌" align="center" />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
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
    <Dialog v-model="dialogVisible" title="產品調整">
      <el-form ref="productFormRef" :model="productData" label-position="left" label-width="100px">
        <el-form-item label="產品名稱">
          <el-select v-model="productData.product_id">
            <el-option label="付款条件A" value="1" />
            <el-option label="付款条件B" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productData.price" label="價格">
          <el-input v-model="productData.price" placeholder="請輸入價格" type="number" />
        </el-form-item>
        <el-form-item label="品牌">
          <el-text class="mx-1" size="large">Large</el-text>
        </el-form-item>
      </el-form>
      <template #footer>
        <ElButton type="primary"> 保存 </ElButton>
        <ElButton @click="dialogVisible = false">關閉</ElButton>
      </template>
    </Dialog>
    <!-- 調整價格 -->
    <Dialog v-model="dialogVisible2" title="批量調整價格">
      <div>
        <div class="m-b5 text-center">
          <el-text>輸入金額後會將該客戶或該工廠下的產品價格都進行調整，調整金額和百分比可以輸入負數</el-text>
        </div>
        <div class="m-b5">
          <el-radio-group v-model="radio1">
            <el-radio-button label="按金額調整" :value="0" />
            <el-radio-button label="按百分比調整" :value="1" />
          </el-radio-group>
        </div>
        <div v-show="radio1 === 0">
          <el-input v-model="productData.price" placeholder="請輸入金額" type="number" />
        </div>
        <div v-show="radio1 === 1">
          <el-input v-model="productData.price" placeholder="請輸入百分比" type="number" />
        </div>
        <div class="m-t5 line-height-6">
          <div class="mx-1 m-b2">
            <el-text type="danger">註：<br />調整後金額=調整前金額+調整金額</el-text>
          </div>
          <div class="mx-1">
            <el-text type="danger"
              >如：<br />調整前100 調整金額20 調整後120<br />調整前100 調整金額百分比2% 調整後102
            </el-text>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton type="primary"> 保存 </ElButton>
        <ElButton @click="dialogVisible2 = false">關閉</ElButton>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
