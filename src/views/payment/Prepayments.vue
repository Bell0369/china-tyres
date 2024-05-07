<script setup>
import { reactive, ref, watch } from "vue"
import { ElButton } from "element-plus"
import { Search, Refresh, Tickets } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useFactoryCodeSelect } from "@/hooks/useSelectOption"
import { useClientSelect } from "@/hooks/useClientSelect"
import { getClientAdvancePaymentApi, getFactoryAdvancePaymentApi } from "@/api/order"
import { Dialog } from "@/components/Dialog"
import PrepayMents from "@/views/componrnts/prepayments/PrepayMents.vue"

defineOptions({
  name: "Prepayments"
})

const loading = ref(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//工厂代碼
const factoryCodeOptions = useFactoryCodeSelect()

// 客户
const { loadClient, optionsClient, loadClientData } = useClientSelect()

// 修改查詢狀態
const orderType = ref(0)
const updataOrderType = () => {
  if (orderType.value) {
    searchData.client_id = undefined
  } else {
    searchData.factory_id = undefined
  }
  handleSearch()
}

// 預付款列表
const dialogVisible = ref(false)
const prepayId = ref(null)
const prepayType = ref("client")
const showPrepay = (id) => {
  prepayType.value = orderType.value ? "factory" : "client"
  dialogVisible.value = true
  prepayId.value = id
}

//#region 查
const tableData = ref([])

const monthrangeData = ref(["", ""])

const searchFormRef = ref(null)
const searchData = reactive({
  client_id: "" || undefined,
  factory_id: "" || undefined
})
const getTableData = () => {
  loading.value = true
  const page = {
    start_date: monthrangeData.value[0] || undefined,
    end_date: monthrangeData.value[1] || undefined,
    page: paginationData.currentPage,
    page_size: paginationData.pageSize
  }
  Object.assign(searchData, page)
  const api = orderType.value ? getFactoryAdvancePaymentApi : getClientAdvancePaymentApi
  api(searchData)
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
  monthrangeData.value = ["", ""]
  handleSearch()
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

// watch(dialogVisible, (value) => {
//   value ? "" : getTableData()
// })
const handleListPayment = () => {
  getTableData()
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item>
          <el-date-picker
            v-model="monthrangeData"
            type="daterange"
            range-separator="-"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item prop="client_id" label="客戶名稱" v-show="orderType === 0">
          <el-select
            v-model="searchData.client_id"
            filterable
            remote
            remote-show-suffix
            :remote-method="loadClientData"
            :loading="loadClient"
            style="width: 150px"
          >
            <el-option label="全部" value="" />
            <el-option v-for="item in optionsClient" :key="item.id" :label="item.client_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="factory_id" label="工廠名稱" v-show="orderType === 1">
          <el-select v-model="searchData.factory_id" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option v-for="item in factoryCodeOptions" :key="item.id" :label="item.name" :value="item.id" />
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
          <el-radio-group v-model="orderType" fill="#29d" @change="updataOrderType">
            <el-radio-button label="客戶預付款" :value="0" />
            <el-radio-button label="工廠預付款" :value="1" />
          </el-radio-group>
        </div>
      </div>
      <div class="table-wrapper">
        <div v-show="orderType === 0">
          <el-table :data="tableData" border>
            <el-table-column type="index" label="序號" align="center" width="80" />
            <el-table-column prop="name" label="客戶名稱" align="center" />
            <el-table-column prop="credit" label="信用額度" align="center" />
            <el-table-column prop="advance_payment" label="預付金額餘額" align="center" />
            <el-table-column label="預付金額記錄" align="center">
              <template #default="scope">
                <Tickets
                  v-permission="['clientAdvancePayment']"
                  class="w6 h6 m-l-2 color-blue cursor-pointer"
                  @click="showPrepay(scope.row.client_id)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="orderType === 1">
          <el-table :data="tableData" border>
            <el-table-column type="index" label="序號" align="center" width="80" />
            <el-table-column prop="name" label="工廠名稱" align="center" />
            <el-table-column prop="advance_payment" label="預付金額餘額" align="center" />
            <el-table-column label="預付金額記錄" align="center">
              <template #default="scope">
                <Tickets
                  v-permission="['clientAdvancePayment']"
                  class="w6 h6 m-l-2 color-blue cursor-pointer"
                  @click="showPrepay(scope.row.factory_id)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      <prepay-ments :isType="prepayType" :id="prepayId" @handle-listPayment="handleListPayment" />
    </Dialog>
  </div>
</template>

<style lang="scss" scoped></style>
