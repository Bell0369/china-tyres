<script setup>
import { ref, reactive } from "vue"
import { useSelectOptions } from "@/hooks/usSelectOptions"
import { UploadFilled } from "@element-plus/icons-vue"
// import { useRouter } from "vue-router"
import PIItem from "../piorder/components/PIItem.vue"

defineOptions({
  name: "DeliveryItem"
})
// const router = useRouter()

const { deliverTypeArr } = useSelectOptions()

const ruleForm = reactive({
  user_id: null,
  name: "",
  client_encod: "",
  credit: "",
  payment_terms: "付款条件A",
  deliver_type: "CTD",
  commission_ratio: "",
  is_commission: 0,
  is_deliver_project: 1,
  is_check_deliver_project: 0
})

/** 核對 */
const tableData = [
  {
    name: "Tom"
  },
  {
    name: "Tom"
  },
  {
    name: "Tom"
  },
  {
    name: "Tom"
  }
]

const connectUpdate = () => {
  console.log("生成發貨計劃")
}

const checkedCities = ref(["Shanghai", "Beijing"])
const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"]

const tableData2 = [
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
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <el-text tag="b" size="large">基本信息</el-text>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="客戶編碼">
            <el-select v-model="ruleForm.deliver_type">
              <el-option v-for="(item, index) in deliverTypeArr" :label="item" :value="item" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="6">
          <el-form-item label="工廠名稱">
            <el-select v-model="ruleForm.deliver_type">
              <el-option v-for="(item, index) in deliverTypeArr" :label="item" :value="item" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="6">
          <el-button type="primary">查詢發貨計劃</el-button>
        </el-col>
        <el-col :span="24">
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <div class="my flex items-center">
        <div class="w-sm">
          <el-upload
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              點擊或將文件拖拽此處上傳
              <p class="c-bluegray">僅支持.xlsx格式</p>
            </div>
          </el-upload>
        </div>
        <div class="ml-10">
          <el-button type="success">確認上傳</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="9">
          <el-form-item label="集裝箱承運人名稱">
            <el-input v-model="ruleForm.name" placeholder="請輸入船運公司" />
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="6">
          <el-form-item label="發貨類型">
            <el-select v-model="ruleForm.deliver_type">
              <el-option v-for="(item, index) in deliverTypeArr" :label="item" :value="item" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="m-b"><el-text tag="b" size="large">PI基本信息</el-text></div>
      <PIItem />
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">信息核對</el-text>
          <el-button type="primary" @click="connectUpdate">確認提交</el-button>
        </div>
      </div>
      <div class="mb5">
        <el-tag effect="dark" type="danger" class="mr">采購發票號：10000</el-tag>
        <el-tag effect="dark" type="success" class="mr">采装箱柜量(40HQ)：10000</el-tag>
        <el-tag effect="dark" type="warning">采购成本：10000</el-tag>
      </div>
      <el-table :data="tableData2" border>
        <el-table-column type="expand">
          <template #default="props">
            <div class="px">
              <el-table :data="props.row.family">
                <el-table-column label="序號" prop="name" />
                <el-table-column label="產品名稱" prop="name" />
                <el-table-column label="裝貨數量" prop="name" />
                <el-table-column label="發貨計劃數量" prop="name" />
                <el-table-column label="櫃號" prop="name" />
                <el-table-column label="鉛封號" prop="name" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="發貨計劃號" prop="date" />
        <el-table-column label="計劃裝貨量" prop="date" />
        <el-table-column label="本次裝貨量" prop="date" />
      </el-table>
      <div class="mt5">
        <el-text tag="b" size="large">異常</el-text>
        <el-table ref="tableRef" :data="tableData" class="mt5">
          <el-table-column prop="name" label="序號" />
          <el-table-column prop="name" label="產品名稱" align="center" />
          <el-table-column prop="name" label="裝貨數量" align="center" />
          <el-table-column prop="name" label="櫃號" align="center" />
          <el-table-column prop="name" label="鉛封號" align="center" />
          <el-table-column prop="name" label="備註" align="center">
            <template #default="scope">
              <el-text type="danger">{{ scope.row.name }}</el-text>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
