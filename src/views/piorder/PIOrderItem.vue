<script setup>
import { ref } from "vue"
import PIItem from "./components/PIItem.vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { EditPen, Search } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"

defineOptions({
  name: "PIOrderItem"
})

const router = useRouter()

const tableData = [
  {
    name: "Tom"
  },
  {
    name: "Tom"
  },
  {
    name: "Tom"
  },
  {
    name: "Tom"
  }
]

// 增 / 改
// const dialogId = ref(0)
const handleUpdate = (row) => {
  ElMessageBox.prompt("", "修改櫃量", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    inputPattern: /^\d+(\.\d+)?$/,
    inputErrorMessage: "請輸入正確數量",
    inputValue: row.user_id
  })
    .then(({ value }) => {
      ElMessage({
        type: "success",
        message: `is:${value}`
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Input canceled"
      })
    })
}

const keyword = ref("")

/**完成PI */
const connectUpdate = () => {
  ElMessageBox.confirm("有未完成發貨計劃，確定完成PI？", "警告", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed"
      })
    })
    .catch(() => {})
}
/**生成發貨計劃 */
const createdDelivery = (type) => {
  if (type) {
    router.push({
      path: "/piorder/pidelivery",
      query: {
        id: 1
      }
    })
  } else {
    router.push({
      path: "/piorder/filedelivery",
      query: {
        id: 1
      }
    })
  }
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <div class="m-b">
        <div class="flex justify-between">
          <el-text tag="b" size="large">PI基本信息</el-text>
          <el-alert title="已完成" type="success" effect="dark" :closable="false" show-icon style="width: auto" />
        </div>
      </div>
      <PIItem />
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <div class="flex justify-between">
          <el-text tag="b" size="large">產品信息</el-text>
          <el-button type="primary" @click="connectUpdate">完成PI</el-button>
        </div>
      </div>
      <div class="mb">
        <div class="flex justify-between">
          <div>
            <el-input v-model="keyword" placeholder="請輸入產品名稱" style="width: 250px" class="pr" />
            <el-button type="primary" :icon="Search">查詢</el-button>
          </div>
          <div>
            <el-text>創建發貨計劃： </el-text>
            <el-button type="success" plain @click="createdDelivery(0)">上傳文件生成</el-button>
            <el-button type="success" plain @click="createdDelivery(1)">從PI生成</el-button>
          </div>
        </div>
      </div>
      <el-table ref="tableRef" :data="tableData">
        <el-table-column prop="name" label="序號" />
        <el-table-column prop="name" label="產品名稱" align="center" />
        <el-table-column prop="name" label="PI數量" align="center">
          <template #default="scope">
            {{ scope.row.name }}
            <EditPen @click="handleUpdate(scope.row)" class="w4 h4 cursor-pointer hover:c-blue" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="已發貨數" align="center" />
        <el-table-column prop="name" label="未發貨數" align="center" />
        <el-table-column prop="name" label="剩餘PI數" align="center" />
        <el-table-column prop="name" label="單價" align="center" />
        <el-table-column prop="name" label="金額" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>
