<script setup>
import { reactive, ref, watch } from "vue"
import { getOrderListApi, updateQuantityApi } from "@/api/order"
import { ElMessage, ElMessageBox, ElButton } from "element-plus"
import { Search, CirclePlus, Refresh, EditPen } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useRouter } from "vue-router"
import { useBrandSelect } from "@/hooks/useSelectOption.js"
import { useFactorySelect } from "@/hooks/useFactorySelect"
import { useClientSelect } from "@/hooks/useClientSelect"

defineOptions({
  name: "OrderList"
})

const loading = ref(false)
// 分页
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// 品牌
const { brandOptions } = useBrandSelect()

//工厂
const { loadFactory, optionsFactory, loadFactoryData } = useFactorySelect()

// 客户
const { loadClient, optionsClient, loadClientData } = useClientSelect()

//#region 删
const handleDelete = (row) => {
  ElMessageBox.confirm(`確認刪除該訂單？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      console.log(row)
      // deleteClientListApi(row.id).then(() => {
      //   ElMessage.success("刪除成功")
      //   getTableData()
      // })
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

const monthrangeData = ref(["", ""])

const searchFormRef = ref()
const searchData = reactive({
  keyword: "",
  client_code: "",
  brand_code: "",
  factory_code: ""
})
const getTableData = () => {
  loading.value = true
  const page = {
    start_date: monthrangeData.value[0],
    end_date: monthrangeData.value[1],
    page: paginationData.currentPage,
    page_size: paginationData.pageSize
  }
  Object.assign(searchData, page)
  getOrderListApi(searchData)
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

// 重置
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  monthrangeData.value = ["", ""]
  handleSearch()
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

const router = useRouter()
// 改
const handleView = (row) => {
  router.push({
    path: "/order/orderitem",
    query: {
      id: row.id
    }
  })
}

// 增 / 改
// const dialogId = ref(0)
const handleUpdate = (row) => {
  ElMessageBox.prompt("", "修改櫃量", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    inputPattern: /^\d+(\.\d+)?$/,
    inputErrorMessage: "請輸入正確數量",
    inputValue: row.quantity
  })
    .then(({ value }) => {
      updateQuantityApi({
        id: row.id,
        quantity: value
      }).then(() => {
        ElMessage({
          type: "success",
          message: "操作成功"
        })
        handleSearch()
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消"
      })
    })
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="keyword" label="訂單">
          <el-input v-model="searchData.keyword" placeholder="請輸入訂單號，PI號" style="width: 300px" />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="monthrangeData"
            type="daterange"
            range-separator="-"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item prop="client_code" label="客戶編碼">
          <el-select
            v-model="searchData.client_code"
            filterable
            remote
            remote-show-suffix
            :remote-method="loadClientData"
            :loading="loadClient"
            style="width: 150px"
          >
            <el-option label="全部" value="" />
            <el-option v-for="item in optionsClient" :key="item.id" :label="item.client_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="brand_code" label="品牌">
          <el-select v-model="searchData.brand_code" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="factory_code" label="工廠">
          <el-select
            v-model="searchData.factory_code"
            filterable
            remote
            remote-show-suffix
            :remote-method="loadFactoryData"
            :loading="loadFactory"
            style="width: 150px"
          >
            <el-option label="全部" value="" />
            <el-option v-for="item in optionsFactory" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <router-link to="/order/orderupload">
          <el-button type="primary" :icon="CirclePlus">上傳訂單</el-button>
        </router-link>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" border>
          <el-table-column prop="order_no" label="訂單號" align="center" />
          <el-table-column prop="client_code" label="客戶編碼" align="center" />
          <el-table-column prop="quantity" label="櫃量(40'HQ)" align="center">
            <template #default="scope">
              {{ scope.row.quantity }}
              <EditPen @click="handleUpdate(scope.row)" class="w4 h4 cursor-pointer hover:c-blue" />
            </template>
          </el-table-column>
          <el-table-column prop="price" label="訂單金額" align="center" />
          <el-table-column prop="number" label="訂單數量" align="center" />
          <el-table-column prop="unproduced" label="未生產數量" align="center" />
          <el-table-column prop="pi_number" label="PI數量" align="center" />
          <el-table-column prop="pi_shipped_number" label="PI已發貨數量" align="center" />
          <el-table-column prop="pi_not_shipped_number" label="PI未發貨數量" align="center" />
          <el-table-column prop="created_at" label="创建时间" align="center" sortable />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope">
              <el-button type="success" text bg size="small" @click="handleView(scope.row)">查看</el-button>
              <el-button type="warning" text bg size="small" @click="handleView(scope.row)">下载</el-button>
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
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
