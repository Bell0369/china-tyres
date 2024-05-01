<script setup>
import { ref, reactive, onMounted, watch } from "vue"
import { Tickets } from "@element-plus/icons-vue"
import ClientProduct from "./ClientProduct.vue"
import { useRoute } from "vue-router"
import { Dialog } from "@/components/Dialog"
import { getUserListApi, updateClientListApi, viewClientShowApi } from "@/api/users"
import { useeDeliverTypeSelect, usePayMentSelect } from "@/hooks/useSelectOption"
import { ElMessage } from "element-plus"
import AddressList from "@/views/componrnts/address/AddressList.vue"
import PrepayMents from "@/views/componrnts/prepayments/PrepayMents.vue"

defineOptions({
  name: "ClientItem"
})

const route = useRoute()

const { eDeliverTypeOptions } = useeDeliverTypeSelect()

const { PayMentOptions } = usePayMentSelect()

// 員工列表
const loading2 = ref(false)
const userOptions = ref([])
const remoteMethod = (query) => {
  loading2.value = true
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
      loading2.value = false
    })
}

const dialogVisible = ref(false)

const loading = ref(false)
const ruleFormRef = ref()
const ruleForm = reactive({
  user_id: "",
  name: "",
  client_encod: "",
  credit: "",
  payment_terms: "",
  deliver_type: 1,
  commission_ratio: "",
  is_commission: 0,
  is_deliver_project: 1,
  is_check_deliver_project: 0,
  client_contact_id: null
})

const rules = reactive({
  name: [{ required: true, message: "請輸入客戶名稱", trigger: "blur" }],
  credit: [{ required: true, message: "請輸入信用額度", trigger: "blur" }],
  client_encod: [
    { required: true, message: "請輸入客戶編碼", trigger: "blur" },
    { pattern: /^[^\u4e00-\u9fa5]+$/, message: "不能含有漢字", trigger: "blur" }
  ],
  commission_ratio: [{ required: true, message: "請輸入傭金比例", trigger: "blur" }]
})

/**获取数据 */
onMounted(() => {
  getClientShow()
})

// 基本信息
const isProduct = ref(null)
const getClientShow = () => {
  loading.value = true
  viewClientShowApi({
    id: route.query.id
  }).then((data) => {
    const datas = data.data
    datas.name = datas.client_name
    delete datas.client_name
    datas.deliver_type = parseInt(datas.deliver_type)
    const obj = {
      username: datas.username,
      id: datas.user_id
    }
    userOptions.value.push(obj)
    Object.assign(ruleForm, datas)
    loading.value = false

    isProduct.value = datas.client_contact_id
  })
}

// 提交客戶基本信息
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      updateClientListApi(ruleForm).then(() => {
        ElMessage.success("操作成功")
        getClientShow()
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}

// 監聽
let isInit = false
const isSubmitForm = ref(true)
watch([ruleForm], () => {
  if (!isInit) {
    isInit = true
    return
  }
  isSubmitForm.value = false
})

const updataContact = (value) => {
  ruleForm.client_contact_id = value
}

const handleEditPayment = (value) => {
  ruleForm.advance_payment = value
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">客戶基本信息</el-text>
          <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="isSubmitForm">保存</el-button>
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
                :loading="loading2"
              >
                <el-option v-for="item in userOptions" :key="item.id" :label="item.username" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用額度" prop="credit">
              <el-input v-model="ruleForm.credit" type="number" />
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
              <el-input v-model="ruleForm.commission_ratio" type="number" />
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
          <el-col :span="6">
            <el-form-item label="預付款">
              <span class="color-red">{{ ruleForm.advance_payment }}</span>
              <Tickets class="w6 h6 m-l-2 color-blue cursor-pointer" @click="dialogVisible = true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 聯繫人信息 -->
    <address-list @updataContact="updataContact" :defaultId="ruleForm.client_contact_id" addressType="client" />

    <el-card shadow="never">
      <client-product :isProduct="isProduct" />
    </el-card>

    <Dialog v-model="dialogVisible" title="預付款">
      <prepay-ments isType="client" @handle-editPayment="handleEditPayment" :id="route.query.id" />
    </Dialog>
  </div>
</template>

<style scoped></style>
