<script setup>
import { ref, reactive } from "vue"
import { Edit, Delete } from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
import { Dialog } from "@/components/Dialog"
import UpdateAddress from "./components/UpdateAddress.vue"
import { getUserListApi, updateClientProductApi } from "@/api/users"
import { useeDeliverTypeSelect, usePayMentSelect } from "@/hooks/useSelectOption.js"
import { ElMessage } from "element-plus"

defineOptions({
  name: "ClientItem"
})

const route = useRoute()

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
      console.log(list)
      userOptions.value = list
    })
    .catch(() => {
      userOptions.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

// 地址
const dialogVisible2 = ref(false)
const dialogId = route.query.id
const connectUpdate = (row) => {
  console.log(row)
  dialogVisible2.value = true
  if (row) {
    // dialogTitle.value = "預付款"
  } else {
    // dialogTitle.value = "聯繫人信息"
  }
}

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

const rules = reactive({
  name: [{ required: true, message: "請輸入客戶名稱", trigger: "blur" }],
  credit: [{ required: true, message: "請輸入信用額度", trigger: "blur" }],
  client_encod: [{ required: true, message: "請輸入客戶編碼", trigger: "blur" }],
  commission_ratio: [{ required: true, message: "請輸入傭金比例", trigger: "blur" }]
})

// 提交客戶基本信息
const submitForm = (formEl) => {
  console.log(ruleForm)
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      updateClientProductApi(ruleForm).then(() => {
        ElMessage.success("操作成功")
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">客戶基本信息</el-text>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        </div>
      </div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="客戶名稱" prop="name">
              <el-input v-model="ruleForm.name" placeholder="請輸入客戶名稱" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所屬員工">
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
          <el-col :span="6">
            <el-form-item label="信用額度" prop="credit">
              <el-input v-model="ruleForm.credit" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款條件">
              <el-select v-model="ruleForm.payment_terms">
                <el-option v-for="(item, index) in PayMentOptions" :label="item" :value="item" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客戶編碼" prop="client_encod">
              <el-input v-model="ruleForm.client_encod" placeholder="請輸入客戶名稱" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="發貨類型">
              <el-select v-model="ruleForm.deliver_type">
                <el-option v-for="item in eDeliverTypeOptions" :label="item.name" :value="item.id" :key="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="佣金比例" prop="commission_ratio">
              <el-input v-model="ruleForm.commission_ratio" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否有佣金">
              <el-radio-group v-model="ruleForm.is_commission">
                <el-radio :value="0">否</el-radio>
                <el-radio :value="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否能創建發貨計劃">
              <el-radio-group v-model="ruleForm.is_deliver_project">
                <el-radio :value="0">否</el-radio>
                <el-radio :value="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否需要審批發貨計劃">
              <el-radio-group v-model="ruleForm.is_check_deliver_project">
                <el-radio :value="0">否</el-radio>
                <el-radio :value="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">聯繫人信息</el-text>
          <el-button type="primary" @click="connectUpdate(0, 0)">添加</el-button>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="flex items-center">
            <el-card shadow="never">
              <el-text> 小唐唐，+ 86-13800138000，123456@qq.com，中华人民共和国广东省深圳市龙华明治街道112号 </el-text>
            </el-card>
            <div class="m-l">
              <Edit class="w6 h6 cursor-pointer" @click="connectUpdate(0)" />
              <br />
              <Delete class="w6 h6 cursor-pointer" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <Dialog v-model="dialogVisible2" title="聯繫人信息">
      <UpdateAddress :rowId="dialogId" />
    </Dialog>
  </div>
</template>

<style scoped></style>
