<script setup>
import { ref, reactive, onMounted } from "vue"
import { useClientSelect } from "@/hooks/useClientSelect"
import BaseEChart from "./components/BaseEChart.vue"

defineOptions({
  name: "Statistics"
})

const loading = ref(false)

const echartOptions = reactive({
  tooltip: {},
  xAxis: {
    type: "category",
    data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"]
  },
  yAxis: {},
  series: [
    {
      name: "2011",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: "2012",
      type: "bar",
      data: [15, 10, 26, 20, 30, 35]
    }
  ]
})

const amountRankOption = reactive({
  grid: {},
  xAxis: {
    axisTick: {
      // show: false // 隐藏 x 坐标轴刻度
    },
    data: ["思明", "湖里", "集美", "同安", "海沧", "翔安"]
  },
  yAxis: {
    axisLabel: {
      show: false // 隐藏 y 坐标轴刻度标签
    },
    splitLine: {
      show: false // 隐藏平行于 x 轴的分隔线
    }
  },
  series: [
    {
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
})

// 客户
const { loadClient, optionsClient, loadClientData } = useClientSelect()

const value1 = ref("")
const value2 = ref("")
const value3 = ref("")
const orderType = ref(0)

const searchData = reactive({
  client_code: "",
  factory_code: ""
})
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="mb5">
      <div class="mb5">
        <el-text tag="b" size="large">銷售總體概況</el-text>
      </div>
      <el-row>
        <el-col :span="4">
          <el-radio-group v-model="orderType" fill="#29d" @change="updataOrderType">
            <el-radio-button label="年" :value="0" />
            <el-radio-button label="月" :value="1" />
            <el-radio-button label="周" :value="2" />
          </el-radio-group>
        </el-col>
        <el-col :span="5">
          <div v-show="orderType === 0">
            <el-date-picker v-model="value1" type="year" />
          </div>
          <div v-show="orderType === 1">
            <el-date-picker v-model="value2" type="month" />
          </div>
          <div v-show="orderType === 2">
            <el-date-picker v-model="value3" type="week" format="[Week] ww" />
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
        </el-col>
      </el-row>
      <div>
        <base-eChart :chartOption="echartOptions" />
      </div>
    </el-card>

    <el-card v-loading="loading" shadow="never">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-radio-group v-model="orderType" fill="#29d" @change="updataOrderType">
            <el-radio-button label="年" :value="0" />
            <el-radio-button label="月" :value="1" />
            <el-radio-button label="周" :value="2" />
          </el-radio-group>
        </el-col>
        <el-col :span="5">
          <div v-show="orderType === 0">
            <el-date-picker v-model="value1" type="year" />
          </div>
          <div v-show="orderType === 1">
            <el-date-picker v-model="value2" type="month" />
          </div>
          <div v-show="orderType === 2">
            <el-date-picker v-model="value3" type="week" format="[Week] ww" />
          </div>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select
              v-model="searchData.client_code"
              filterable
              remote
              remote-show-suffix
              :remote-method="loadClientData"
              :loading="loadClient"
              placeholder="客戶"
            >
              <el-option
                v-for="item in optionsClient"
                :key="item.id"
                :label="item.client_code"
                :value="item.client_code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="searchData.factory_code">
              <el-option label="PI金額" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
        </el-col>
      </el-row>
      <div>
        <base-eChart :chartOption="amountRankOption" />
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
