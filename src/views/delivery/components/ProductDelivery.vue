<script setup>
import { ref, onMounted } from "vue"
import { getDeliveryPlanProductApi } from "@/api/order"
import { Search } from "@element-plus/icons-vue"

const loading = ref(false)

const props = defineProps(["userId"])

//#region 查
const tableData = ref([])
const listTableData = ref([])
const getTableData = () => {
  loading.value = true
  getDeliveryPlanProductApi({
    id: props.userId
  })
    .then(({ data }) => {
      tableData.value = listTableData.value = data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getTableData()
})

// 查询产品信息
const keyword = ref("")
const searchTable = () => {
  const searchTerm = keyword.value.trim().toLowerCase()
  if (searchTerm === "") {
    tableData.value = listTableData.value
    return tableData.value
  }

  tableData.value = listTableData.value.filter((item) => {
    const productName = item.brand_code.toLowerCase()
    return productName.includes(searchTerm)
  })
}

// 重置
const resetSearch = () => {
  keyword.value = ""
  tableData.value = listTableData.value
}
</script>

<template>
  <div v-loading="loading">
    <div class="m-b">
      <div>
        <el-text tag="b" size="large">產品信息</el-text>
      </div>
      <div class="m-t2">
        <el-input v-model="keyword" placeholder="請輸入產品名稱" style="width: 300px" class="pr" />
        <el-button type="primary" :icon="Search" @click="searchTable">查詢</el-button>
        <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="m-b">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" align="center" width="80" />
        <el-table-column prop="product_name" label="產品名稱" align="center" />
        <el-table-column prop="reality_number" label="实际装货数" align="center" />
        <el-table-column prop="plan_number" label="计划装货数" align="center" />
        <el-table-column prop="container_no" label="柜号" align="center" />
        <el-table-column prop="seal_no" label="铅封号" align="center" />
      </el-table>
    </div>
  </div>
</template>

<style scoped></style>
