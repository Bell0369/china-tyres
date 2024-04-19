<script setup>
import { ref, reactive } from "vue"
import { useFactoryCodeSelect } from "@/hooks/useSelectOption"
import { getUserListApi, updateFactoryApi } from "@/api/users"
import { ElMessage } from "element-plus"

defineOptions({
  name: "ForemanAdd"
})

// 工廠代碼
const factoryCodeOptions = useFactoryCodeSelect()

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

// 提交數據
const ruleFormRef = ref()
const ruleForm = reactive({
  name: "",
  factory_code_id: 1,
  factory_label_id: 1,
  user_ids: []
})

const rules = reactive({
  name: [{ required: true, message: "請輸入工廠名稱", trigger: "blur" }],
  factory_code_id: [{ required: true, message: "請選擇工廠代碼", trigger: "change" }],
  user_ids: [{ required: true, message: "請選擇客戶", trigger: "blur" }]
})

const emitEvents = defineEmits(["childEvent"])
const submitInfo = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm)
      updateFactoryApi(ruleForm).then(() => {
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
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="工廠名稱" prop="name">
            <el-input v-model="ruleForm.name" placeholder="請輸入工廠名稱" />
          </el-form-item>
        </el-col>
        <el-col :span="1" />
        <el-col :span="11">
          <el-form-item label="工廠代碼" prop="factory_code_id">
            <el-select v-model="ruleForm.factory_code_id">
              <el-option v-for="item in factoryCodeOptions" :label="item.name" :value="item.id" :key="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所屬員工" prop="user_ids">
            <el-select
              v-model="ruleForm.user_ids"
              filterable
              remote
              remote-show-suffix
              :remote-method="remoteMethod"
              :loading="loading"
              multiple
              placeholder="請選擇員工"
            >
              <el-option v-for="item in userOptions" :key="item.id" :label="item.username" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="text-right">
      <el-button type="primary" @click="submitInfo(ruleFormRef)">提交</el-button>
    </div>
  </div>
</template>

<style scoped></style>
