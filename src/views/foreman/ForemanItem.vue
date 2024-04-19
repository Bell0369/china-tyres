<script setup>
import { ref, reactive, onMounted } from "vue"
import { Tickets, Edit, Delete } from "@element-plus/icons-vue"
import ForemanProduct from "./ForemanProduct.vue"
import { useRoute } from "vue-router"
import { Dialog } from "@/components/Dialog"
import PrepayMents from "./components/PrepayMents.vue"
import { useFactoryCodeSelect } from "@/hooks/useSelectOption"
import { getUserListApi, updateFactoryApi, getFactoryBasicInfoApi, getFactoryContactApi } from "@/api/users"
import { ElMessage } from "element-plus"

defineOptions({
  name: "ForemanItem"
})

const route = useRoute()

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

const submitInfo = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateFactoryApi(ruleForm).then(() => {
        ElMessage.success("操作成功")
        getfactoryBasicInfo()
        ruleForm.user_ids = []
        userOptions.value = []
      })
    } else {
      console.log("error submit!", fields)
    }
  })
}

/**获取数据 */
onMounted(() => {
  getfactoryBasicInfo()
  getClientContact()
})
// 基本信息
const getfactoryBasicInfo = () => {
  loading.value = true
  getFactoryBasicInfoApi({
    id: route.query.id
  }).then(({ data }) => {
    data.users.forEach((item) => {
      ruleForm.user_ids.push(item.user_id)
      userOptions.value.push({
        id: item.user_id,
        username: item.username
      })
    })
    ruleForm.name = data.name
    ruleForm.factory_code_id = data.factory_code_id
    ruleForm.advance_payment = data.advance_payment
    ruleForm.id = data.id
    loading.value = false
  })
}
// 联系人信息
const ContactList = ref([])
const getClientContact = () => {
  getFactoryContactApi({
    id: route.query.id
  }).then(({ data }) => {
    ContactList.value = data
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
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
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
          <el-col :span="1" />
          <el-col :span="6">
            <el-form-item label="預付款">
              <span class="color-red">{{ ruleForm.advance_payment }}</span>
              <Tickets class="w6 h6 m-l-2 color-blue cursor-pointer" @click="dialogVisible = true" />
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
      <el-row :gutter="20" v-if="ContactList.length > 0">
        <el-col :span="8" v-for="item in ContactList" :key="item.id">
          <div class="flex items-center mb">
            <el-card shadow="never">
              <el-text> {{ item.assemble }} </el-text>
            </el-card>
            <div class="m-l1">
              <Edit class="w6 h6 cursor-pointer" @click="connectUpdate(item.id)" />
              <br />
              <Delete class="w6 h6 cursor-pointer" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-empty v-else description="暫無聯繫人" />
    </el-card>
    <!-- 產品代碼 -->
    <el-card shadow="never">
      <ForemanProduct :userId="route.query.id" />
    </el-card>

    <Dialog v-model="dialogVisible" title="預付款">
      <PrepayMents :rowId="dialogId" />
    </Dialog>
  </div>
</template>

<style scoped></style>
