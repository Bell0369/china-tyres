<script setup>
import { ref, onMounted, reactive } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { EditPen, Search, Refresh } from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
import PIItem from "./components/PIItem.vue"
import { getPiProductDetailApi, getPiBasicDetailApi } from "@/api/order"
import { useTagsViewStore } from "@/store/modules/tags-view"

defineOptions({
  name: "PIOrderItem"
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

// 增 / 改
const handleUpdate = (row) => {
  ElMessageBox.prompt("", "修改PI数量", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    inputPattern: /^\d+(\.\d+)?$/,
    inputErrorMessage: "請輸入正確數量",
    inputValue: row.number
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
        message: "已取消"
      })
    })
}

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

/**完成PI */
const connectUpdate = () => {
  ElMessageBox.confirm("有未完成發貨計劃，確定完成PI？", "警告", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "已完成"
      })
    })
    .catch(() => {})
}

const tagsViewStore = useTagsViewStore()
const closeTab = () => {
  tagsViewStore.delVisitedView(route)
}
</script>

<template>
  <div class="app-container">
    <PIItem :infoData="infoData" :isStatus="1" @data-change="getInfoData" />

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">產品信息</el-text>
          <el-button type="primary" @click="connectUpdate">完成PI</el-button>
        </div>
      </div>
      <div class="mb">
        <div class="flex justify-between">
          <div>
            <el-input v-model="keyword" placeholder="請輸入產品名稱" style="width: 300px" class="pr" />
            <el-button type="primary" :icon="Search" @click="searchTable">查詢</el-button>
            <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
          </div>
          <div>
            <el-text>創建發貨計劃： </el-text>
            <el-button
              type="success"
              plain
              tag="router-link"
              @click="closeTab"
              :to="`/piorder/filedelivery?id=${route.query.id}`"
              >上傳文件生成</el-button
            >
            <el-button
              type="success"
              plain
              tag="router-link"
              @click="closeTab"
              :to="`/piorder/pidelivery?id=${route.query.id}`"
              >從PI生成</el-button
            >
          </div>
        </div>
      </div>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column type="index" label="序號" width="80px" align="center" />
        <el-table-column prop="product_name" label="產品名稱" align="center" />
        <el-table-column prop="number" label="PI數量" align="center">
          <template #default="scope">
            {{ scope.row.number }}
            <EditPen @click="handleUpdate(scope.row)" class="w4 h4 cursor-pointer hover:c-blue" />
          </template>
        </el-table-column>
        <el-table-column prop="shipped_number" label="已發貨數" align="center" />
        <el-table-column prop="not_shipped_number" label="未發貨數" align="center" />
        <el-table-column prop="last_undone_number" label="剩餘PI數" align="center" />
        <el-table-column prop="unit_price" label="單價" align="center" />
        <el-table-column prop="total_prices" label="金額" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>
