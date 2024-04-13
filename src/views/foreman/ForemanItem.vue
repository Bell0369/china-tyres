<script setup>
import { ref, reactive } from "vue"
import { useSelectOptions } from "@/hooks/usSelectOptions"
import { Tickets, Edit, Delete } from "@element-plus/icons-vue"
import ForemanProduct from "./ForemanProduct.vue"
import { useRoute } from "vue-router"
import { Dialog } from "@/components/Dialog"
import PrepayMents from "./components/PrepayMents.vue"

defineOptions({
  name: "ForemanItem"
})

const route = useRoute()

const { deliverTypeArr } = useSelectOptions()

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

/** 多選員工 */
const value1 = ref(["1", "5"])
const options = [
  {
    value: "1",
    label: "Option1"
  },
  {
    value: "2",
    label: "Option2"
  },
  {
    value: "3",
    label: "Option3"
  },
  {
    value: "4",
    label: "Option4"
  },
  {
    value: "5",
    label: "Option5"
  }
]

const submitInfo = () => {
  console.log(value1.value)
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">工廠基本信息</el-text>
          <el-button type="primary" @click="submitInfo">保存</el-button>
        </div>
      </div>
      <el-form ref="ruleFormRef" :hide-required-asterisk="true" :model="ruleForm" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="工廠名稱" prop="name">
              <el-input v-model="ruleForm.name" placeholder="請輸入工廠名稱" />
            </el-form-item>
          </el-col>
          <el-col :span="1" />
          <el-col :span="7">
            <el-form-item label="工廠FACTORY">
              <el-select v-model="ruleForm.deliver_type">
                <el-option v-for="(item, index) in deliverTypeArr" :label="item" :value="item" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1" />
          <el-col :span="6">
            <el-form-item label="預付款">
              <span class="color-red">10000.00</span>
              <Tickets class="w6 h6 m-l-2 color-blue cursor-pointer" @click="dialogVisible = true" />
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="所屬員工">
              <el-select v-model="value1" multiple placeholder="請選擇員工">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
    <el-card shadow="never">
      <ForemanProduct :userId="route.query.id" />
    </el-card>

    <Dialog v-model="dialogVisible" title="預付款">
      <PrepayMents :rowId="dialogId" />
    </Dialog>
  </div>
</template>

<style scoped></style>
