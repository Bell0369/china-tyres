<script setup>
import { reactive, ref, watch } from "vue"
import { getDeliveryPlanListApi, deletePiListApi } from "@/api/order"
import { ElButton } from "element-plus"
import { Search, CirclePlus, Refresh } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import { usePagination } from "@/hooks/usePagination"
import { useBrandSelect } from "@/hooks/useSelectOption"
import { useFactorySelect } from "@/hooks/useFactorySelect"
import { useClientSelect } from "@/hooks/useClientSelect"
import { useDeleteList } from "@/hooks/useDeleteList"

defineOptions({
  name: "DeliveryList"
})

const router = useRouter()

const loading = ref(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// 品牌
const { brandOptions } = useBrandSelect()

//工厂
const { loadFactory, optionsFactory, loadFactoryData } = useFactorySelect()

// 客户
const { loadClient, optionsClient, loadClientData } = useClientSelect()

// 删除
const { handleDelete, isDeleted } = useDeleteList({
  api: deletePiListApi,
  text: "發貨計劃"
})

// 成功
watch([isDeleted], () => {
  getTableData()
})

//#region 查
const tableData = ref([])

const monthrangeData = ref(["", ""])

const searchFormRef = ref(null)
const searchData = reactive({
  is_check: undefined,
  is_shipped: 0,
  keyword: "",
  client_code: "",
  factory_code: "",
  brand_code: ""
})
const getTableData = () => {
  loading.value = true
  const page = {
    start_date: monthrangeData.value[0],
    end_date: monthrangeData.value[1],
    page: paginationData.currentPage,
    page_size: paginationData.pageSize
  }
  Object.assign(searchData, page)
  getDeliveryPlanListApi(searchData)
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

// 改
const handleView = (row) => {
  router.push({
    path: "/delivery/deliveryitem",
    query: {
      id: row.id
    }
  })
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="keyword" label="訂單">
          <el-input v-model="searchData.keyword" placeholder="請輸入PI號，發貨計劃號" style="width: 300px" />
        </el-form-item>
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
        <el-form-item prop="client_code" label="客戶編碼">
          <el-select
            v-model="searchData.client_code"
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
        <el-form-item prop="brand_code" label="品牌">
          <el-select v-model="searchData.brand_code" style="width: 150px">
            <el-option label="全部" value="" />
            <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="factory_code" label="工廠">
          <el-select
            v-model="searchData.factory_code"
            filterable
            remote
            remote-show-suffix
            :remote-method="loadFactoryData"
            :loading="loadFactory"
            style="width: 150px"
          >
            <el-option label="全部" value="" />
            <el-option v-for="item in optionsFactory" :key="item.id" :label="item.name" :value="item.id" />
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
        <div class="flex justify-between">
          <div>
            <router-link to="/delivery/deliveryupload">
              <el-button type="primary" :icon="CirclePlus">上傳裝箱單</el-button>
            </router-link>
            <el-button class="ml" type="primary">銷售發票生成</el-button>
          </div>
          <div>
            <el-text size="large">未發貨PI總數量：</el-text>
            <el-text size="large" type="danger">----</el-text>
          </div>
        </div>
      </div>
      <div class="mb5">
        <el-radio-group v-model="searchData.is_shipped">
          <el-radio-button label="未發貨" :value="0" />
          <el-radio-button label="已發貨" :value="1" />
          <el-radio-button label="待審批" :value="2" />
        </el-radio-group>
      </div>
      <div class="table-wrapper">
        <el-table ref="tableRef" border :data="tableData">
          <el-table-column prop="delivery_plan_no" label="發貨計劃號" align="center" />
          <el-table-column prop="pi_no" label="PI號" align="center" />
          <el-table-column prop="client_code" label="客戶編碼" align="center" />
          <el-table-column prop="number" label="計劃發貨數" align="center" />
          <el-table-column prop="shipped" label="已發貨數" align="center" />
          <el-table-column prop="not_shipped" label="未發貨數" align="center" />
          <el-table-column prop="procurement_invoice_no" label="採購發票號" align="center" />
          <el-table-column prop="created_at" label="创建时间" align="center" sortable />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="success" text bg size="small" @click="handleView(scope.row)">查看</el-button>
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
  </div>
</template>

<style lang="scss" scoped></style>
