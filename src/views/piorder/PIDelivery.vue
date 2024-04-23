<script setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Refresh, Search, EditPen } from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
import { getPiProductDetailApi, getPiBasicDetailApi } from "@/api/order"
import PIItem from "./components/PIItem.vue"

defineOptions({
  name: "PIDelivery"
})

const route = useRoute()

const loading = ref(false)

// 查-基本信息
const infoData = reactive({})
const getInfoData = () => {
  getPiBasicDetailApi({
    id: route.query.id
  }).then(({ data }) => {
    Object.assign(infoData, data)
  })
}

// 查-产品信息
const tableData = ref([])
const listTableData = ref([])
const getTableData = () => {
  loading.value = true
  getPiProductDetailApi({
    id: route.query.id
  }).then(({ data }) => {
    tableData.value = listTableData.value = data
    loading.value = false
  })
}

onMounted(() => {
  getInfoData()
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
    const productName = item.product_name.toLowerCase()
    return productName.includes(searchTerm)
  })
  // console.log(filteredData.map((item) => item.product_name))
}

// 重置
const resetSearch = () => {
  keyword.value = ""
  tableData.value = listTableData.value
}

// 審批
const connectUpdate = () => {
  ElMessageBox.prompt("發貨計劃需要審批才能進行，是否繼續？", "發貨計劃", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    inputPlaceholder: "請輸入備註",
    inputType: "textarea"
  })
    .then(({ value }) => {
      ElMessage({
        type: "success",
        message: `Delete completed ${value}`
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled"
      })
    })
}
</script>

<template>
  <div class="app-container">
    <PIItem :infoData="infoData" />

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">核對信息</el-text>
          <el-button type="primary" @click="connectUpdate">生成發貨計劃</el-button>
        </div>
      </div>
      <div class="mb">
        <div class="flex justify-between items-center">
          <div>
            <el-input v-model="keyword" placeholder="請輸入產品名稱" style="width: 300px" class="pr" />
            <el-button type="primary" :icon="Search" @click="searchTable">查詢</el-button>
            <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
          </div>
          <div class="line-height-5">
            <div><el-text>PI發貨數量：</el-text><el-text type="danger">100 </el-text></div>
            <div><el-text>計劃發貨數量：</el-text><el-text type="primary">100 </el-text></div>
          </div>
        </div>
      </div>
      <el-table ref="tableRef" :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序號" width="80" align="center" />
        <el-table-column prop="product_name" label="產品名稱" align="center" />
        <el-table-column prop="not_shipped_number" label="未發貨數" align="center" />
        <el-table-column prop="shipped_number" label="已發貨數" align="center">
          <template #default="scope">
            {{ scope.row.shipped_number }}
            <EditPen @click="handleUpdate(scope.row)" class="w4 h4 cursor-pointer hover:c-blue" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>
