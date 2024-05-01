<script setup>
import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import { useRoute, useRouter } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { getDeliveryPlanNoApi, uploadPackingListApi } from "@/api/order"
import { useOrderSelet } from "@/hooks/useOrderSelet"
import { useeDeliverTypeSelect, useFactoryCodeSelect } from "@/hooks/useSelectOption"
import { UploadXlsx } from "@/components/UploadXlsx"
import PIItem from "../piorder/components/PIItem.vue"

defineOptions({
  name: "DeliveryUoload"
})

const loading = ref(false)

//工厂代碼
const factoryCodeOptions = useFactoryCodeSelect()

// 發貨類型
const { eDeliverTypeOptions } = useeDeliverTypeSelect()

// 訂單
const { loadOrder, optionsOrder, loadOrderData } = useOrderSelet()

// tag
const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()

const ruleForm = reactive({
  file: "",
  order_no: "",
  factory_code: "1",
  delivery_plan_no: [],
  company_name: "",
  shipping_type: "CTD"
})

// 上传文件
const setUploadXlsx = (value) => {
  ruleForm.file = value
}

// 查詢發貨計劃
const cities = ref([])
const getDeliveryPlanNo = () => {
  ruleForm.delivery_plan_no = []
  if (ruleForm.order_no === "" || ruleForm.factory_code === "") {
    ElMessage.error("請選擇訂單")
    return
  }
  getDeliveryPlanNoApi({
    order_no: ruleForm.order_no,
    factory_code: ruleForm.factory_code
  }).then(({ data }) => {
    if (data.length === 0) {
      ElMessage.warning("無發貨計劃")
      cities.value = []
      return
    }
    cities.value = data
  })
}

const isSubmit = ref(true)
// 1:  比对文件 2: 提交上傳
const isorderInfo = ref(false)
const infoData = reactive({})
const orderCheck = ref([])
const listInfo = ref([])
const submitForm = (Type) => {
  if (ruleForm.file === "") {
    ElMessage.error("請上傳文件先")
    return
  }

  if (ruleForm.delivery_plan_no.length === 0) {
    ElMessage.error("未選擇發貨計劃號")
    return
  }

  if (ruleForm.company_name === "") {
    ElMessage.error("請輸入集裝箱承運人名稱")
    return
  }

  const formData = new FormData()
  for (const key in ruleForm) {
    if (Object.prototype.hasOwnProperty.call(ruleForm, key)) {
      const value = ruleForm[key]
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, value)
      }
    }
  }
  formData.append("type", Type)
  loading.value = true
  uploadPackingListApi(formData)
    .then(({ data }) => {
      if (Type === 1) {
        orderCheck.value = data.listErr
        listInfo.value = data.listInfo

        // 无异常，按钮亮起
        if (orderCheck.value.length === 0) {
          isSubmit.value = false
        } else {
          isSubmit.value = true
        }
        Object.assign(infoData, data.basicInfo)
        isorderInfo.value = true
      } else {
        tagsViewStore.delVisitedView(route)
        router.replace("/delivery/deliverylist")
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="app-container" v-loading="loading">
    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <el-text tag="b" size="large">基本信息</el-text>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="訂單號">
            <el-select
              v-model="ruleForm.order_no"
              filterable
              remote
              remote-show-suffix
              :remote-method="loadOrderData"
              :loading="loadOrder"
            >
              <el-option v-for="item in optionsOrder" :key="item.id" :label="item.order_no" :value="item.order_no" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="6">
          <el-form-item prop="factory_code" label="工廠代碼">
            <el-select v-model="ruleForm.factory_code">
              <el-option v-for="item in factoryCodeOptions" :key="item.id" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="6">
          <el-button type="primary" @click="getDeliveryPlanNo" plain>查詢發貨計劃</el-button>
        </el-col>
        <el-col :span="24">
          <el-checkbox-group v-model="ruleForm.delivery_plan_no">
            <el-checkbox
              v-for="city in cities"
              :key="city.id"
              :label="city.delivery_plan_no"
              :value="city.delivery_plan_no"
            >
              {{ city.delivery_plan_no }}
            </el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <div class="my flex items-center">
        <div class="w-sm">
          <UploadXlsx @setUploadXlsx="setUploadXlsx" />
        </div>
        <div class="ml-10">
          <el-button type="success" @click="submitForm(1)">確認上傳</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="9">
          <el-form-item label="集裝箱承運人名稱">
            <el-input v-model="ruleForm.company_name" placeholder="請輸入船運公司" />
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="6">
          <el-form-item label="發貨類型">
            <el-select v-model="ruleForm.shipping_type">
              <el-option v-for="item in eDeliverTypeOptions" :label="item.name" :value="item.id" :key="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <PIItem :infoData="infoData" v-show="isorderInfo" />

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">信息核對</el-text>
          <el-button type="primary" @click="submitForm(2)" :disabled="isSubmit">確認提交</el-button>
        </div>
      </div>
      <div class="mb5">
        <el-tag effect="dark" type="danger" class="mr">采購發票號：----</el-tag>
        <el-tag effect="dark" type="success" class="mr">采装箱柜量(40'HQ)：----</el-tag>
        <el-tag effect="dark" type="warning">采购成本：----</el-tag>
      </div>
      <el-table :data="listInfo" border>
        <el-table-column type="expand">
          <template #default="props">
            <div class="px">
              <el-table border :data="props.row.product">
                <el-table-column label="序號" type="index" width="80" />
                <el-table-column label="產品名稱" prop="product_name" />
                <el-table-column label="裝貨數量" prop="reality_number" />
                <el-table-column label="發貨計劃數量" prop="plan_number" />
                <el-table-column label="櫃號" prop="container_no" />
                <el-table-column label="鉛封號" prop="seal_no" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="發貨計劃號" prop="delivery_plan_no" />
        <el-table-column label="計劃裝貨量" prop="date" />
        <el-table-column label="本次裝貨量" prop="date" />
      </el-table>
      <div class="mt5" v-show="orderCheck.length !== 0">
        <el-text tag="b" size="large">異常</el-text>
        <el-table :data="orderCheck" class="mt5" height="400px">
          <el-table-column prop="serial_number" label="序號" />
          <el-table-column prop="product_name" label="產品名稱" align="center" />
          <el-table-column prop="number" label="裝貨數量" align="center" />
          <el-table-column prop="container_no" label="櫃號" align="center" />
          <el-table-column prop="seal_no" label="鉛封號" align="center" />
          <el-table-column prop="err_msg" label="備註" align="center">
            <template #default="scope">
              <el-text type="danger">{{ scope.row.err_msg }}</el-text>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
