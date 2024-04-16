<script setup>
import { ref, reactive } from "vue"
import { useSelectOptions } from "@/hooks/usSelectOptions"
import { Tickets, Edit, Delete } from "@element-plus/icons-vue"
import ClientProduct from "./ClientProduct.vue"
import { useRoute } from "vue-router"
import { Dialog } from "@/components/Dialog"
import PrepayMents from "./components/PrepayMents.vue"
import UpdateAddress from "./components/UpdateAddress.vue"
import { useeDeliverTypeSelect } from "@/hooks/useSelectOption.js"

defineOptions({
  name: "ClientItem"
})

const route = useRoute()

const { paymentTermsArr } = useSelectOptions()

const { eDeliverTypeOptions } = useeDeliverTypeSelect()

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

const dialogVisible = ref(false)

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
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">客戶基本信息</el-text>
          <el-button type="primary">保存</el-button>
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
              <el-select v-model="ruleForm.user_id">
                <el-option label="銷售部" value="1" />
                <el-option label="財務部" value="2" />
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
                <el-option v-for="(item, index) in paymentTermsArr" :label="item" :value="item" :key="index" />
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
          <el-col :span="6">
            <el-form-item label="預付款">
              <span class="color-red">10000.00</span>
              <Tickets class="w6 h6 m-l-2 color-blue cursor-pointer" @click="dialogVisible = true" />
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
    <el-card shadow="never" v-if="route.query.id">
      <ClientProduct :userId="route.query.id" />
    </el-card>

    <Dialog v-model="dialogVisible" title="預付款">
      <PrepayMents :rowId="dialogId" />
    </Dialog>

    <Dialog v-model="dialogVisible2" title="聯繫人信息">
      <UpdateAddress :rowId="dialogId" />
    </Dialog>
  </div>
</template>

<style scoped></style>
