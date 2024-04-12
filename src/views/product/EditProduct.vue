<script lang="ts" setup>
import { reactive, ref } from "vue"

defineOptions({
  name: "EditProduct"
})

const ruleFormRef = ref()
const ruleForm = reactive({
  username: "",
  account: "",
  role_id: "1"
})

const rules = reactive({
  username: [{ required: true, message: "請輸入用戶名稱", trigger: "blur" }]
})

const { rowId } = defineProps(["rowId"])
console.log(rowId)

// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log("submit!")
//     } else {
//       console.log("error submit!", fields)
//     }
//   })
// }
</script>

<template>
  <el-form ref="ruleFormRef" :hide-required-asterisk="true" :model="ruleForm" :rules="rules" label-position="top">
    <div class="overflow-hidden">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="產品名稱" prop="username">
            <el-input v-model="ruleForm.username" placeholder="請輸入產品名稱" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="產品代碼(ART)" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入產品代碼(ART)" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="條碼ENA" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入條碼ENA" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="品牌" prop="role_id">
            <el-select v-model="ruleForm.role_id">
              <el-option label="銷售部" value="1" />
              <el-option label="財務部" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="海關編碼" prop="username">
            <el-input v-model="ruleForm.username" placeholder="請輸入海關編碼" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="40'HQ裝箱量" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入裝箱量" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="輪胎類型TYPE" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入輪胎類型" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="海關條碼" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入海關條碼" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="歐標等級" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入歐標等級" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="單重" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入單重" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否歐標EUOR 空白" prop="account">
            <el-input v-model="ruleForm.account" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="類型" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入類型" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="花紋" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入花紋" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="寸口" prop="account">
            <el-input v-model="ruleForm.account" placeholder="請輸入寸口" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary"> 保存 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>
