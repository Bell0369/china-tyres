<script setup>
import { reactive, ref, watch } from "vue"
import { getClientListApi, deleteClientListApi } from "@/api/users"
import { ElMessage, ElMessageBox, ElButton } from "element-plus"
import { Search, CirclePlus, Refresh, EditPen } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useRouter } from "vue-router"

defineOptions({
  name: "OrderList"
})

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 删
const handleDelete = (row) => {
  ElMessageBox.confirm(`正在刪除用戶 ${row.client_name}，確認刪除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteClientListApi(row.id).then(() => {
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
const searchFormRef = ref(null)
const searchData = reactive({
  keyword: "",
  payment_terms: "",
  data: ""
})
const getTableData = () => {
  loading.value = true
  getClientListApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    keyword: searchData.keyword || undefined,
    payment_terms: searchData.payment_terms || undefined,
    user_id: searchData.user_id || undefined
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

// 重置
const resetSearch = () => {
  searchFormRef.value?.resetFields()
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
    inputValue: row.user_id
  })
    .then(({ value }) => {
      ElMessage({
        type: "success",
        message: `is:${value}`
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Input canceled"
      })
    })
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="訂單">
          <el-input v-model="searchData.keyword" placeholder="請輸入訂單號，PI號" style="width: 300px" />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchData.data"
            type="monthrange"
            range-separator="-"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
          />
        </el-form-item>
        <el-form-item prop="state" label="客戶編碼">
          <el-select v-model="searchData.payment_terms" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option label="付款条件A" value="付款条件A" />
            <el-option label="付款条件B" value="付款条件B" />
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
        <el-table ref="tableRef" :data="tableData">
          <el-table-column prop="client_name" label="訂單號" align="center" />
          <el-table-column prop="username" label="客戶編碼" align="center" />
          <el-table-column prop="user_id" label="櫃量(40HQ)" align="center">
            <template #default="scope">
              {{ scope.row.user_id }}
              <EditPen @click="handleUpdate(scope.row)" class="w4 h4 cursor-pointer hover:c-blue" />
            </template>
          </el-table-column>
          <el-table-column prop="advance_payment" label="訂單金額" align="center" />
          <el-table-column prop="advance_payment" label="訂單數量" align="center" />
          <el-table-column prop="advance_payment" label="未生產數量" align="center" />
          <el-table-column prop="advance_payment" label="PI數量" align="center" />
          <el-table-column prop="advance_payment" label="PI已發貨數量" align="center" />
          <el-table-column prop="advance_payment" label="PI未發貨數量" align="center" />
          <el-table-column prop="created_at" label="创建时间" align="center" sortable />
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope">
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
              <el-button type="primary" text bg size="small" @click="handleView(scope.row)">查看</el-button>
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
