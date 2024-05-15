<script setup>
import { ref } from "vue"
import { getInvListApi } from "@/api/order"

defineOptions({
  name: "ExportTow"
})
const loading = ref(false)

const optionsData = ref([])
const remoteMethod = (query) => {
  loading.value = true
  getInvListApi({
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

const inv_no = ref("")
const CreateInvoice = () => {
  console.log(inv_no.value)
}
</script>

<template>
  <el-card shadow="never" class="search-wrapper">
    <el-form :inline="true">
      <el-form-item>
        <el-select
          v-model="inv_no"
          filterable
          remote
          remote-show-suffix
          :remote-method="remoteMethod"
          :loading="loading"
          style="width: 200px"
          placeholder="請選擇銷售發票號"
        >
          <el-option v-for="item in optionsData" :key="item.id" :label="item.inv_no" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CreateInvoice">導出銷售發票/裝箱單/SN</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped></style>
