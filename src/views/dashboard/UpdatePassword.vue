<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the age"))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"))
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"))
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField("checkPass", () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: "",
  checkPass: "",
  age: ""
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  age: [{ validator: checkAge, trigger: "blur" }]
})

const submitForm = (formEl: FormInstance | undefined) => {
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="app-container">
    <el-card class="mb5">
      <div class="pb5">
        <div class="mb5">
          <el-text tag="b" size="large">修改密碼</el-text>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto">
          <el-form-item label="舊密碼" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密碼" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="確認密碼" prop="age">
            <el-input v-model.number="ruleForm.age" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
