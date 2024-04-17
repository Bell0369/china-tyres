<script setup>
import { ref, reactive } from "vue"
import { useFactoryCodeSelect } from "@/hooks/useSelectOption"
import { Edit, Delete } from "@element-plus/icons-vue"
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
  user_ids: ""
})

const rules = reactive({
  name: [{ required: true, message: "請輸入工廠名稱", trigger: "blur" }],
  factory_code_id: [{ required: true, message: "請選擇工廠代碼", trigger: "change" }],
  user_ids: [{ required: true, message: "請選擇客戶", trigger: "blur" }]
})

const submitInfo = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm)
      updateFactoryApi(ruleForm).then(() => {
        ElMessage.success("操作成功")
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}

// const loading = ref<boolean>(false)
const dialogVisible = ref(false)
const dialogTitle = ref("")
const dialogId = ref(0)
const connectUpdate = (row) => {
  console.log(row)
  dialogId.value = row
  dialogVisible.value = true
  if (row) {
    // 改
    dialogTitle.value = "編輯聯繫人"
  } else {
    // 增
    dialogTitle.value = "新增聯繫人"
  }
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">工廠基本信息</el-text>
          <el-button type="primary" @click="submitInfo(ruleFormRef)">保存</el-button>
        </div>
      </div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="工廠名稱" prop="name">
              <el-input v-model="ruleForm.name" placeholder="請輸入工廠名稱" />
            </el-form-item>
          </el-col>
          <el-col :span="1" />
          <el-col :span="7">
            <el-form-item label="工廠代碼" prop="factory_code_id">
              <el-select v-model="ruleForm.factory_code_id">
                <el-option v-for="item in factoryCodeOptions" :label="item.name" :value="item.id" :key="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15">
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
              <!-- <el-select v-model="ruleForm.user_ids" multiple placeholder="請選擇員工">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">聯繫人信息</el-text>
          <el-button type="primary" @click="connectUpdate(0)">添加</el-button>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="flex items-center">
            <el-card shadow="never">
              <el-text> 小唐唐，+ 86-13800138000，123456@qq.com，中华人民共和国广东省深圳市龙华明治街道112号 </el-text>
            </el-card>
            <div class="m-l">
              <Edit class="w7 h7 cursor-pointer" @click="connectUpdate(1)" />
              <br />
              <Delete class="w7 h7 cursor-pointer" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped></style>
