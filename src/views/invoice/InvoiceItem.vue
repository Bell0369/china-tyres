<script setup>
import { reactive, ref } from "vue"
import { Plus, Delete } from "@element-plus/icons-vue"
import ProductInvoice from "./components/ProductInvoice.vue"

const formRef = ref()
const dynamicValidateForm = reactive({
  order_domasins: {
    value1: "",
    value2: ""
  },
  domains: [
    {
      key: 1,
      value1: "",
      value2: ""
    }
  ]
})

const removeDomain = (item) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: ""
  })
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!")
      return false
    }
  })
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <div>
        <div class="m-b">
          <el-text tag="b" size="large">發貨計劃基本信息</el-text>
        </div>
        <el-descriptions :column="3" border>
          <el-descriptions-item label="訂單號">kooriookami</el-descriptions-item>
          <el-descriptions-item label="PI號">kooriookami</el-descriptions-item>
          <el-descriptions-item label="發貨計劃號">18100000000</el-descriptions-item>
          <el-descriptions-item label="發票總金額">Suzhou</el-descriptions-item>
          <el-descriptions-item label="客戶編碼">Suzhou</el-descriptions-item>
          <el-descriptions-item label="採購發票號">kooriookami</el-descriptions-item>
          <el-descriptions-item label="工廠名稱">18100000000</el-descriptions-item>
          <el-descriptions-item label="目的港">Suzhou</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="mt5">
        <div class="m-b">
          <div class="flex justify-between">
            <el-text tag="b" size="large">發票額外費用</el-text>
            <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
          </div>
        </div>
        <div>
          <el-form ref="formRef" :model="dynamicValidateForm">
            <el-row :gutter="20" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
              <el-col :span="6">
                <el-form-item
                  :label="'費用標題' + index"
                  :prop="'domains.' + index + '.value'"
                  :rules="{
                    required: true,
                    message: '請輸入費用標題',
                    trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.value1" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :label="'費用金額' + index"
                  :prop="'domains.' + index + '.value'"
                  :rules="{
                    required: true,
                    message: '請輸入費用金額',
                    trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.value2" type="number" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button @click.prevent="removeDomain(domain)" :icon="Delete">移除</el-button>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" plain @click="addDomain" :icon="Plus">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="mt5">
        <div class="m-b">
          <el-text tag="b" size="large">其它費用</el-text>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="費用標題">
                <el-input v-model="dynamicValidateForm.order_domasins.value1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="費用金額">
                <el-input v-model="dynamicValidateForm.order_domasins.value2" type="number" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <ProductInvoice />
    </el-card>
  </div>
</template>

<style scoped></style>
