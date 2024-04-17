<script setup>
import { reactive, ref } from "vue"
import { addClientAdvancePaymentApi } from "@/api/users"
import { ElMessage } from "element-plus"

const props = defineProps(["rowId"])

const prepayFormRef = ref()
const prepayForm = reactive({
  client_id: props.rowId,
  price: null,
  invoice: ""
})

const rules = reactive({
  price: [{ required: true, message: "請輸入金额", trigger: "blur" }],
  invoice: [{ required: true, message: "請輸入流水單號", trigger: "blur" }]
})

// 添加记录
const submitForm = (formEl) => {
  console.log(prepayForm)
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      addClientAdvancePaymentApi(prepayForm).then(() => {
        ElMessage.success("操作成功")
        prepayFormRef.value?.resetFields()
        // getClientShow()
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}

const radio1 = ref(0)
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
]
</script>

<template>
  <div>
    <el-form ref="prepayFormRef" :model="prepayForm" :rules="rules">
      <el-row>
        <el-col :span="11">
          <el-form-item prop="price" label="添加金額">
            <el-input v-model="prepayForm.price" placeholder="請輸入金額" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="11">
          <el-form-item prop="invoice" label="銀行水單">
            <el-input v-model="prepayForm.invoice" placeholder="請輸入流水單號" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <div class="m-b2">
        <p><el-text>預付款記錄</el-text></p>
        <div class="m-b2">
          <el-radio-group v-model="radio1">
            <el-radio-button label="添加記錄" :value="0" />
            <el-radio-button label="扣除記錄" :value="1" />
          </el-radio-group>
        </div>
        <div v-show="radio1 === 0">
          <el-table :data="tableData">
            <el-table-column prop="date" label="添加金額" />
            <el-table-column prop="name" label="銀行水單" />
            <el-table-column prop="address" label="添加時間" />
          </el-table>
        </div>
        <div v-show="radio1 === 1">
          <el-table :data="tableData">
            <el-table-column prop="date" label="銷售發票號" />
            <el-table-column prop="name" label="扣除金額  " />
            <el-table-column prop="address" label="扣除時間" />
          </el-table>
        </div>
        <div class="flex justify-between m-t5 items-center">
          <div>
            <el-text>當前預付款: </el-text>
            <el-text type="danger" size="large">100000</el-text>
          </div>
          <div>
            <ElButton type="primary" @click="submitForm(prepayFormRef)"> 保存 </ElButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
