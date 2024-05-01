<script setup>
import { ref, reactive } from "vue"
import { getUserListApi, updateClientListApi } from "@/api/users"
import { useeDeliverTypeSelect, usePayMentSelect } from "@/hooks/useSelectOption.js"
import { ElMessage } from "element-plus"

defineOptions({
  name: "ClientItem"
})

const { eDeliverTypeOptions } = useeDeliverTypeSelect()
const { PayMentOptions } = usePayMentSelect()
// 員工列表
const loading = ref(false)
const userOptions = ref([])
const remoteMethod = (query) => {
  loading.value = true
  getUserListApi({
    keyword: query || undefined
  })
    .then(({ data }) => {
      const list = data.data
      userOptions.value = list
    })
    .catch(() => {
      userOptions.value = []
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
}

const ruleFormRef = ref()
const ruleForm = reactive({
  user_id: null,
  name: "",
  client_encod: "",
  credit: "",
  payment_terms: "付款条件A",
  deliver_type: 1,
  commission_ratio: "",
  is_commission: 0,
  is_deliver_project: 1,
  is_check_deliver_project: 0
})

const rules = reactive({
  name: [{ required: true, message: "請輸入客戶名稱", trigger: "blur" }],
  credit: [{ required: true, message: "請輸入信用額度", trigger: "blur" }],
  client_encod: [{ required: true, message: "請輸入客戶編碼", trigger: "blur" }],
  commission_ratio: [{ required: true, message: "請輸入傭金比例", trigger: "blur" }],
  user_id: [{ required: true, message: "請選所屬員工", trigger: "blur" }]
})

const emitEvents = defineEmits(["childEvent"])

// 提交客戶基本信息
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      updateClientListApi(ruleForm).then(() => {
        ElMessage.success("操作成功")
        emitEvents("childEvent")
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>

<template>
  <div class="overflow-hidden">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客戶名稱" prop="name">
            <el-input v-model="ruleForm.name" placeholder="請輸入客戶名稱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所屬員工" prop="user_id">
            <el-select
              v-model="ruleForm.user_id"
              filterable
              remote
              remote-show-suffix
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option v-for="item in userOptions" :key="item.id" :label="item.username" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信用額度" prop="credit">
            <el-input v-model="ruleForm.credit" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款條件">
            <el-select v-model="ruleForm.payment_terms">
              <el-option v-for="(item, index) in PayMentOptions" :label="item" :value="item" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客戶編碼" prop="client_encod">
            <el-input v-model="ruleForm.client_encod" placeholder="請輸入客戶名稱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="發貨類型">
            <el-select v-model="ruleForm.deliver_type">
              <el-option v-for="item in eDeliverTypeOptions" :label="item.name" :value="item.id" :key="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="佣金比例" prop="commission_ratio">
            <el-input v-model="ruleForm.commission_ratio" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有佣金">
            <el-radio-group v-model="ruleForm.is_commission">
              <el-radio :value="0">否</el-radio>
              <el-radio :value="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否能創建發貨計劃">
            <el-radio-group v-model="ruleForm.is_deliver_project">
              <el-radio :value="0">否</el-radio>
              <el-radio :value="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否需要審批發貨計劃">
            <el-radio-group v-model="ruleForm.is_check_deliver_project">
              <el-radio :value="0">否</el-radio>
              <el-radio :value="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="text-right">
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </div>
  </div>
</template>

<style scoped></style>
