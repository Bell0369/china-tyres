<script setup>
import { ref, reactive } from "vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  name: "OrderProduct"
})

const { paginationData } = usePagination()

//#region 查
const searchFormRef = ref(null)
const searchData = reactive({
  keyword: "",
  payment_terms: "",
  data: ""
})
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
//#endregion

// 重置
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}

const tableData = [
  {
    date: "PI10000",
    family: [
      {
        name: "Jerry"
      },
      {
        name: "Tyke"
      }
    ]
  },
  {
    date: "PI10000",
    family: [
      {
        name: "Jerry"
      },
      {
        name: "Tyke"
      }
    ]
  }
]
</script>

<template>
  <div>
    <div class="toolbar-wrapper">
      <el-text tag="b" size="large">詳細信息</el-text>
    </div>
    <div>
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="產品名稱">
          <el-input v-model="searchData.keyword" placeholder="請輸入產品名稱" style="width: 300px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" border>
      <el-table-column type="expand">
        <template #default="props">
          <div class="px">
            <el-table :data="props.row.family" border>
              <el-table-column label="序號" prop="name" />
              <el-table-column label="產品名稱" prop="name" />
              <el-table-column label="數量" prop="name" />
              <el-table-column label="價格" prop="name" />
              <el-table-column label="金額" prop="name" />
              <el-table-column label="櫃號" prop="name" />
              <el-table-column label="鉛封號" prop="name" />
              <el-table-column label="采購發票號" prop="name" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="訂單號" prop="date" />
      <el-table-column label="PI號" prop="date" />
      <el-table-column label="發貨計劃號" prop="date" />
    </el-table>
  </div>
</template>

<style scoped></style>
