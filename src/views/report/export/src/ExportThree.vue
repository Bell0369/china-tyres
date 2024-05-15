<script setup>
import { ref } from "vue"
import { getOrderListApi } from "@/api/order"

defineOptions({
  name: "ExportThree"
})
const loading = ref(false)

const optionsData = ref([])
const remoteMethod = (query) => {
  loading.value = true
  getOrderListApi({
    page_size: 20,
    keyword: query
  })
    .then(({ data }) => {
      optionsData.value = data.data
    })
    .catch(() => {
      optionsData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const order_no = ref("")
const CreateInvoice = () => {
  console.log(order_no.value)
}
</script>

<template>
  <el-card shadow="never" class="search-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-select
          v-model="order_no"
          filterable
          remote
          remote-show-suffix
          :remote-method="remoteMethod"
          :loading="loading"
          style="width: 200px"
          placeholder="請選擇訂單號"
        >
          <el-option v-for="item in optionsData" :key="item.id" :label="item.order_no" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CreateInvoice">導出訂單流程數據</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CreateInvoice">導出訂單客戶報表</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped></style>
