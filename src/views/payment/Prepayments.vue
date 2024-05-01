<script setup>
import { reactive, ref, watch } from "vue"
import { ElButton } from "element-plus"
import { Search, Refresh, Tickets } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { getClientListApi } from "@/api/users"
import { Dialog } from "@/components/Dialog"
import PrepayMents from "@/views/componrnts/prepayments/PrepayMents.vue"

defineOptions({
  name: "Prepayments"
})

const loading = ref(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 查
const tableData = ref([])
const searchFormRef = ref(null)
const searchData = reactive({
  keyword: "",
  payment_terms: "",
  data: ""
})
const getTableData = () => {
  loading.value = true
  getClientListApi({
    page: paginationData.currentPage,
    page_size: paginationData.pageSize,
    keyword: searchData.keyword || undefined,
    payment_terms: searchData.payment_terms || undefined,
    user_id: searchData.user_id || undefined
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

const types = ref(0)
const updateTypes = () => {
  prepayType.value = types.value ? "factory" : "client"
}

// 預付款
const dialogVisible = ref(false)
const prepayId = ref(null)
const prepayType = ref("client")
const showPrepay = (id) => {
  dialogVisible.value = true
  prepayId.value = id
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item>
          <el-date-picker
            v-model="searchData.data"
            type="monthrange"
            range-separator="-"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
          />
        </el-form-item>
        <el-form-item prop="state" label="客戶名稱">
          <el-select v-model="searchData.payment_terms" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option label="付款条件A" value="付款条件A" />
            <el-option label="付款条件B" value="付款条件B" />
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
          <el-radio-group v-model="types" @change="updateTypes" fill="#29d">
            <el-radio-button label="客戶預付款" :value="0" />
            <el-radio-button label="工廠預付款" :value="1" />
          </el-radio-group>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" border>
          <el-table-column type="index" label="序號" align="center" width="80" />
          <el-table-column prop="client_name" label="名稱" align="center" />
          <el-table-column prop="username" label="信用額度(客戶)" align="center" />
          <el-table-column prop="advance_payment" label="預付金額餘額" align="center" />
          <el-table-column prop="advance_payment" label="預付金額記錄" align="center">
            <template #default="scope">
              <Tickets class="w6 h6 m-l-2 color-blue cursor-pointer" @click="showPrepay(scope.row.id)" />
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间" align="center" sortable />
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

    <Dialog v-model="dialogVisible" title="預付款">
      <prepay-ments :isType="prepayType" @handle-editPayment="handleEditPayment" :id="prepayId" />
    </Dialog>
  </div>
</template>

<style lang="scss" scoped></style>
