<script setup>
import { ref, reactive, onMounted } from "vue"
import { Edit, Delete } from "@element-plus/icons-vue"
import { getFactoryContactApi, getClientContactApi } from "@/api/users"
import { Dialog } from "@/components/Dialog"
import UpdateAddress from "./UpdateAddress.vue"

const { userId, addressType } = defineProps(["userId", "addressType"])

const loading = ref(false)

// 联系人信息
const ContactList = ref([])
const getClientContact = () => {
  loading.value = true
  const api = addressType === "factory" ? getFactoryContactApi : getClientContactApi
  api({
    id: userId
  })
    .then(({ data }) => {
      ContactList.value = data
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getClientContact()
})

const dialogVisible = ref(false)
const addressData = reactive({})
const connectUpdate = (row) => {
  dialogVisible.value = true
  if (row) {
    Object.assign(addressData, row)
  } else {
    Object.keys(addressData).forEach((key) => {
      delete addressData[key]
    })
  }
}

// 編輯完成
const handleChildEvent = () => {
  dialogVisible.value = false
  getClientContact()
}
</script>

<template>
  <div class="" v-loading="loading">
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
            <!-- class="bg-amber!" @click="defaultAddress(item.id)" -->
            <el-card shadow="never">
              <el-text> {{ item.assemble }} </el-text>
            </el-card>
            <div class="m-l1">
              <Edit class="w6 h6 cursor-pointer" @click="connectUpdate(item)" />
              <br />
              <Delete class="w6 h6 cursor-pointer" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-empty v-else description="暫無聯繫人" />
    </el-card>

    <!-- 編輯聯繫人 -->
    <Dialog v-model="dialogVisible" title="聯繫人信息">
      <UpdateAddress :addressData="addressData" :idName="addressType" @childEvent="handleChildEvent" />
    </Dialog>
  </div>
</template>

<style scoped></style>
