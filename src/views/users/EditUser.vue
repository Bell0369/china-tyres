<script setup>
import { reactive, ref, defineEmits } from "vue"
import { getUserItemApi, updateUserItemApi } from "@/api/users"
import { useSelectOptions } from "@/hooks/usSelectOptions"
import { ElMessage } from "element-plus"

defineOptions({
  name: "EditUser"
})

const { codeArr } = useSelectOptions()

const ruleFormRef = ref()
const ruleForm = reactive({
  username: "",
  account: "",
  password: "",
  area_code: "852",
  phone: null,
  email: "",
  sex: 0,
  status: 1,
  role_id: 1,
  remarks: ""
})

const rules = reactive({
  username: [{ required: true, message: "請輸入用戶名稱", trigger: "blur" }],
  account: [
    {
      required: true,
      message: "請輸入登錄賬號",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "請輸入密碼",
      trigger: "blur"
    }
  ],
  phone: [
    {
      required: true,
      message: "請輸入電話",
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      message: "請輸入郵箱",
      trigger: "blur"
    },
    {
      type: "email",
      message: "請輸入正確郵箱地址",
      trigger: ["blur", "change"]
    }
  ]
})

const defaultProps = {
  children: "children",
  label: "label"
}
const data = [
  {
    id: 1,
    label: "用戶管理"
  },
  {
    id: 2,
    label: "工廠管理",
    children: [
      {
        id: 5,
        label: "添加工廠"
      },
      {
        id: 6,
        label: "修改工廠"
      }
    ]
  },
  {
    id: 3,
    label: "訂單管理",
    children: [
      {
        id: 7,
        label: "查看訂單"
      },
      {
        id: 8,
        label: "上傳訂單"
      }
    ]
  }
]

const { rowId } = defineProps(["rowId"])
if (rowId > 0) {
  getUserItemApi({
    id: rowId
  }).then(({ data }) => {
    data.password = "******"
    Object.assign(ruleForm, data)
  })
}
const emitEvents = defineEmits(["childEvent"])
const submitForm = (formEl) => {
  console.log(ruleForm)
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      updateUserItemApi(ruleForm).then(() => {
        ElMessage.success("操作成功")
        emitEvents("childEvent")
        // dialogVisible.value = false
        // getTableData()
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>

<template>
  <el-form label-position="left" label-width="80px" ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <div class="overflow-hidden">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="用戶名稱" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="電話" prop="phone">
            <el-select v-model="ruleForm.area_code" style="width: 70px; margin-right: 5px">
              <el-option v-for="(item, index) in codeArr" :label="item" :value="item" :key="index" />
            </el-select>
            <el-input v-model="ruleForm.phone" style="width: calc(100% - 80px)" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登錄賬號" prop="account">
            <el-input v-model="ruleForm.account" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登錄密碼" prop="password">
            <el-input type="password" v-model="ruleForm.password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性別">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :value="0">保密</el-radio>
              <el-radio :value="1">男</el-radio>
              <el-radio :value="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部門">
            <el-select v-model="ruleForm.role_id">
              <el-option label="銷售部" :value="1" />
              <el-option label="財務部" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="賬號狀態">
            <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="權限分配" prop="resource">
            <el-tree :data="data" show-checkbox node-key="id" :props="defaultProps" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="備註">
            <el-input v-model="ruleForm.remarks" type="textarea" rows="4" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="text-right">
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </div>
  </el-form>
</template>
