<script setup>
import { ref, watch } from "vue"
import { getClientProductApi, deleteClientProductApi } from "@/api/users"
import { usePagination } from "@/hooks/usePagination"
import { Search } from "@element-plus/icons-vue"

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
</script>

<template>
  <div v-loading="loading">
    <div class="m-b">
      <div class="flex justify-between">
        <el-text tag="b" size="large">產品信息</el-text>
        <div>
          <el-input v-model="keywords" placeholder="請輸入產品名稱" style="width: 280px; margin-right: 10px" />
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
        </div>
        <div>
          <el-button type="primary">批量調整價格</el-button>
          <el-button type="primary">新增產品</el-button>
        </div>
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
  </div>
</template>

<style scoped></style>
