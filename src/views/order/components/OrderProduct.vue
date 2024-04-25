<script setup>
import { ref, reactive, onMounted } from "vue"
import { getOrderDetailProductApi } from "@/api/order"
import { useBrandSelect } from "@/hooks/useSelectOption.js"
import { useFactorySelect } from "@/hooks/useFactorySelect"

defineOptions({
  name: "OrderProduct"
})

const loading = ref(false)

const { orderId } = defineProps(["orderId"])

// 品牌
const { brandOptions } = useBrandSelect()

//工厂
const { loadFactory, optionsFactory, loadFactoryData } = useFactorySelect()

const monthrangeData = ref(["", ""])

const searchFormRef = ref()
const searchData = reactive({
  keyword: "",
  payment_terms: "",
  data: ""
})

// 获取数据
const tableData = ref([])
const getOrderDetailProduct = () => {
  loading.value = true
  getOrderDetailProductApi({
    id: orderId
  }).then(({ data }) => {
    loading.value = false
    tableData.value = data
  })
}

onMounted(() => {
  getOrderDetailProduct()
})

// 重置
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
</script>

<template>
  <div>
    <div class="toolbar-wrapper">
      <el-text tag="b" size="large">產品信息</el-text>
    </div>
    <div class="mb">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="產品名稱">
          <el-input v-model="searchData.keyword" placeholder="請輸入產品名稱" style="width: 200px" />
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
        <el-form-item prop="state" label="品牌">
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
    </div>
    <el-table v-loading="loading" :data="tableData" border row-key="pi_no">
      <el-table-column type="expand">
        <template #default="props">
          <div class="px">
            <el-table :data="props.row.list" border>
              <el-table-column type="index" label="序號" width="80px" />
              <el-table-column label="產品名稱" prop="product_name" />
              <el-table-column label="訂單數量" prop="order_number" />
              <el-table-column label="PI數量" prop="pi_number" />
              <el-table-column label="PI已發貨數量" prop="pi_shipped" />
              <el-table-column label="PI未發貨數量" prop="pi_not_shipped" />
              <el-table-column label="單價" prop="unit_price" />
              <el-table-column label="總價" prop="total_prices" />
              <el-table-column label="ETD時間" prop="name" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="編號" prop="pi_no" />
    </el-table>
  </div>
</template>

<style scoped></style>
