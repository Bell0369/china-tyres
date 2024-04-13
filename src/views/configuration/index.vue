<script setup>
import { ref, reactive } from "vue"
import { deleteClientProductApi } from "@/api/users"
import { ElMessage, ElMessageBox } from "element-plus"

defineOptions({
  name: "Configuration"
})

const tableRef = ref()
const tableData = [
  {
    date: "YS",
    name: "1"
  },
  {
    date: "ZC",
    name: "2"
  }
]

const loading = ref(false)

//#region 删
const handleDelete = (row) => {
  ElMessageBox.confirm(`確認刪除產品${row.client_name}？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteClientProductApi(row.id).then(() => {
        ElMessage.success("刪除成功")
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消"
      })
    })
}
//#endregion

/** 新增，編輯 */
const dialogVisible = ref(false)
const formRef = ref(null)
const formData = reactive({
  id: undefined,
  username: "",
  password: ""
})
const handleCreateOrUpdate = () => {
  formRef.value?.validate((valid, fields) => {
    if (!valid) return console.error("表单校验不通过", fields)
    // loading.value = true
    // const api = formData.value.id === undefined ? createTableDataApi : updateTableDataApi
    // api(formData.value)
    //   .then(() => {
    //     ElMessage.success("操作成功")
    //     dialogVisible.value = false
    //     getTableData()
    //   })
    //   .finally(() => {
    //     loading.value = false
    //   })
  })
}

/** 彈框 */
const handleUpdate = (row) => {
  console.log(row)
  dialogVisible.value = true
}
</script>
<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="mb8">
      <div class="pb5">
        <div class="flex justify-between mb5">
          <el-text tag="b" size="large">工廠代碼</el-text>
          <div>
            <el-button type="primary" @click="handleUpdate(0)">新增工廠代碼</el-button>
          </div>
        </div>
        <el-table border ref="tableRef" :data="tableData">
          <el-table-column prop="date" label="名稱" />
          <el-table-column prop="name" label="代碼" />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card v-loading="loading" shadow="never" class="mb8">
      <div class="pb5">
        <div class="flex justify-between mb5">
          <el-text tag="b" size="large">品牌</el-text>
          <div>
            <el-button type="primary" @click="handleUpdate(0)">新增品牌</el-button>
          </div>
        </div>
        <el-table border ref="tableRef" :data="tableData">
          <el-table-column prop="date" label="名稱" />
          <el-table-column prop="name" label="簡寫" />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="pb5">
        <div class="flex justify-between mb5">
          <el-text tag="b" size="large">發貨方式</el-text>
          <div>
            <el-button type="primary" @click="handleUpdate(0)">新增發貨方式</el-button>
          </div>
        </div>
        <el-table border ref="tableRef" :data="tableData">
          <el-table-column prop="date" label="名稱" />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 新增/修改 -->
    <el-dialog v-model="dialogVisible" title="編輯" width="30%" destroy-on-close>
      <el-form ref="formRef" :model="formData">
        <el-form-item label="名稱">
          <el-input v-model="formData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="代碼">
          <el-input v-model="formData.password" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
