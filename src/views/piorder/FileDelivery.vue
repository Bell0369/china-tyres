<script setup>
import { ref, reactive } from "vue"
import { useSelectOptions } from "@/hooks/usSelectOptions"
import { UploadFilled } from "@element-plus/icons-vue"
// import { useRouter } from "vue-router"
import PIItem from "./components/PIItem.vue"

defineOptions({
  name: "FileDelivery"
})
// const router = useRouter()

const { deliverTypeArr } = useSelectOptions()

const ruleFormRef = ref()
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
const radio1 = ref(0)
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
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <el-text tag="b" size="large">選擇文件</el-text>
      </div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="工廠名稱">
              <el-select v-model="ruleForm.deliver_type">
                <el-option v-for="(item, index) in deliverTypeArr" :label="item" :value="item" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="flex items-center">
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
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="m-b"><el-text tag="b" size="large">PI基本信息</el-text></div>
      <PIItem />
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">信息核對</el-text>
          <el-button type="primary" @click="connectUpdate">生成發貨計劃</el-button>
        </div>
      </div>
      <div class="mb">
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部" :value="0" />
          <el-radio-button label="正常" :value="1" />
          <el-radio-button label="異常" :value="2" />
        </el-radio-group>
      </div>
      <el-table ref="tableRef" :data="tableData">
        <el-table-column prop="name" label="序號" />
        <el-table-column prop="name" label="產品名稱" align="center" />
        <el-table-column prop="name" label="數量" align="center" />
        <el-table-column prop="name" label="PI未發貨數量" align="center" />
        <el-table-column prop="name" label="備註" align="center">
          <template #default="scope">
            <el-text type="danger">{{ scope.row.name }}</el-text>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>
