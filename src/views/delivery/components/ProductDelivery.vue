<script setup>
import { ref, watch } from "vue"
import { getClientProductApi } from "@/api/users"
import { usePagination } from "@/hooks/usePagination"
import { Search } from "@element-plus/icons-vue"

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const props = defineProps(["userId"])

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
      <div>
        <el-text tag="b" size="large">產品信息</el-text>
      </div>
      <div class="m-t2">
        <el-input v-model="keywords" placeholder="請輸入產品名稱" style="width: 300px; margin-right: 10px" />
        <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
      </div>
    </div>
    <div class="m-b">
      <el-table ref="tableRef" :data="tableData">
        <el-table-column prop="name" label="序号" align="center" />
        <el-table-column prop="name" label="產品名稱" align="center" />
        <el-table-column prop="name" label="实际装货数" align="center" />
        <el-table-column prop="price" label="计划装货数" align="center" />
        <el-table-column prop="name" label="柜号" align="center" />
        <el-table-column prop="name" label="铅封号" align="center" />
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
