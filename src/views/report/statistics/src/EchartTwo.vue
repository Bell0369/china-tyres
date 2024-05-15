<script setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage } from "element-plus"
import { useClientSelect } from "@/hooks/useClientSelect"
import BaseEchart from "./BaseEchart.vue"
import { Years, Months, Weeks } from "./json1"

defineOptions({
  name: "EchartTwo"
})

// 客户
const { loadClient, optionsClient, loadClientData } = useClientSelect()

// 數據
const selectOptions = [
  { id: 1, value: "訂單量" },
  { id: 2, value: "訂單金額" },
  { id: 3, value: "PI金額" },
  { id: 4, value: "裝貨數量" },
  { id: 5, value: "采購金額" },
  { id: 6, value: "銷售發票金額" },
  { id: 7, value: "收款金額" }
]

const loading = ref(false)

const echartOptions = reactive({
  tooltip: {},
  yAxis: {},
  xAxis: {
    type: "category",
    data: []
  },
  series: []
})

onMounted(() => {
  getEchart1(Years)
})

const getEchart1 = (Datas) => {
  loading.value = true
  setTimeout(() => {
    loading.value = false

    const orderNumbers = Datas.map((item) => item.order_number)
    const datas = Datas.map((item) => item.date)
    echartOptions.xAxis.data = datas
    echartOptions.series = [{ name: "訂單", type: "bar", data: orderNumbers }]
  }, 1500)
}

const searchData = reactive({
  client_code: "",
  factory_code: ""
})
// 查詢
const orderType = ref(1)
const handleSearch = () => {
  if (dateValue.value === "") {
    ElMessage.error("請選擇時間")
    return
  }
  switch (orderType.value) {
    case 1:
      getEchart1(Years)
      break
    case 2:
      getEchart1(Months)
      break
    case 3:
      getEchart1(Weeks)
      break
    default:
      break
  }
}

const currentYear = new Date().getFullYear()
const dateValue = ref(currentYear)
const dateTypes = reactive({
  type: ["", "year", "month", "week"],
  value_format: ["", "YYYY", "YYYY-MM", "YYYY-MM-DD"],
  format: ["", "YYYY", "YYYY-MM", "ww [周] YYYY-MM-DD"]
})
</script>

<template>
  <el-card shadow="never" class="mb5">
    <el-form :inline="true">
      <el-form-item>
        <el-radio-group v-model="orderType" fill="#29d" @change="dateValue = ''">
          <el-radio-button label="年" :value="1" />
          <el-radio-button label="月" :value="2" />
          <el-radio-button label="周" :value="3" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dateValue"
          :type="dateTypes.type[orderType]"
          :value-format="dateTypes.value_format[orderType]"
          :format="dateTypes.format[orderType]"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchData.client_code"
          filterable
          remote
          remote-show-suffix
          :remote-method="loadClientData"
          :loading="loadClient"
          placeholder="客戶"
          style="width: 200px"
        >
          <el-option v-for="item in optionsClient" :key="item.id" :label="item.client_code" :value="item.client_code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchData.factory_code" style="width: 200px">
          <el-option v-for="item in selectOptions" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
      </el-form-item>
    </el-form>
    <div v-loading="loading">
      <base-echart :chartOption="echartOptions" />
    </div>
  </el-card>
</template>

<style scoped></style>
