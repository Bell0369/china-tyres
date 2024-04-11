<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getUserListApi, deleteUserListApi } from "@/api/users"
import { type GetTableData } from "@/api/users/types"
import { type FormInstance, ElMessage, ElMessageBox, ElButton } from "element-plus"
import { Search, CirclePlus, Refresh } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { Dialog } from "@/components/Dialog"
import EditUser from "./EditUser.vue"

defineOptions({
  name: "UserList"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 删
const handleDelete = (row: GetTableData) => {
  ElMessageBox.confirm(`正在刪除用戶${row.username}，確認刪除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteUserListApi(row.id).then(() => {
        ElMessage.success("刪除成功")
        getTableData()
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

//#region 查
const tableData = ref<GetTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  username: "",
  state: "",
  department: ""
})
const getTableData = () => {
  loading.value = true
  getUserListApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    keyword: searchData.username || undefined,
    state: searchData.state || undefined
  })
    .then(({ data }) => {
      paginationData.total = data.total
      tableData.value = data.data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
//#endregion

// 重置
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

// 批量選中刪除
// const tableRef = ref()
// const toggleSelection = () => {
//   const rows = tableRef.value.getSelectionRows()
//   if (rows) {
//     rows.forEach((item: object) => {
//       console.log((item as any).username)
//     })
//   }
// }

// 修改狀態
const updatSatus = (row: GetTableData) => {
  console.log("修改状态", row.id)
}

// 增 / 改
const dialogVisible = ref(false)
const dialogTitle = ref("")
const dialogId = ref(0)
const handleUpdate = (row: number) => {
  console.log(row)
  dialogId.value = row
  dialogVisible.value = true
  if (row) {
    // 改
    dialogTitle.value = "編輯用戶"
  } else {
    // 增
    dialogTitle.value = "新增用戶"
  }
}
// 保存/編輯用戶
const SaveUser = () => {
  console.log("保存/編輯用戶")
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.username" placeholder="請輸入用戶名稱、登錄賬號、Email" style="width: 300px" />
        </el-form-item>
        <el-form-item prop="state" label="狀態">
          <el-select v-model="searchData.state" style="width: 100px">
            <el-option label="全部" value="" />
            <el-option label="已開啟" :value="1" />
            <el-option label="已關閉" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item prop="department" label="部门">
          <el-select v-model="searchData.department" style="width: 100px">
            <el-option label="全部" value="" />
            <el-option label="销售部" :value="1" />
            <el-option label="财务部" :value="2" />
            <el-option label="物流部" :value="3" />
            <el-option label="文件部" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查詢</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="handleUpdate(0)">新增用戶</el-button>
          <!-- <el-button type="danger" :icon="Delete" @click="toggleSelection()">批量刪除</el-button> -->
        </div>
      </div>
      <div class="table-wrapper">
        <el-table ref="tableRef" :data="tableData">
          <!-- <el-table-column type="selection" width="50" /> -->
          <el-table-column prop="username" label="用戶名稱" />
          <el-table-column prop="account" label="登錄號" />
          <el-table-column prop="sex" label="性別" />
          <el-table-column prop="phone" label="電話" />
          <el-table-column prop="email" label="Email" />
          <el-table-column prop="user_status" label="状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.user_status"
                :active-value="1"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                @change="updatSatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" align="center" sortable />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row.id)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <Dialog v-model="dialogVisible" :title="dialogTitle">
      <EditUser :rowId="dialogId" />
      <template #footer>
        <ElButton type="primary" @click="SaveUser"> 保存 </ElButton>
        <ElButton @click="dialogVisible = false">關閉</ElButton>
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped></style>
