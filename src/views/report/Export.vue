<script setup>
import { reactive, ref } from "vue"
import { useClientSelect } from "@/hooks/useClientSelect"

defineOptions({
  name: "Export"
})

// 客户
const { loadClient, optionsClient, loadClientData } = useClientSelect()
const client_code = ref("")

const monthrangeData = ref(["", ""])
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form :inline="true">
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
        <el-form-item>
          <el-button type="primary" @click="CreateInvoice">導出發貨流水賬</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="CreateInvoice">導出實時銷售情況</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="search-wrapper">
      <el-form :inline="true">
        <el-form-item>
          <el-select
            v-model="client_code"
            filterable
            remote
            remote-show-suffix
            :remote-method="loadClientData"
            :loading="loadClient"
            style="width: 200px"
            placeholder="請選擇銷售發票號"
          >
            <el-option
              v-for="item in optionsClient"
              :key="item.id"
              :label="item.client_code"
              :value="item.client_code"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="CreateInvoice">導出銷售發票/裝箱單/SN</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="search-wrapper">
      <el-form :inline="true">
        <el-form-item>
          <el-select
            v-model="client_code"
            filterable
            remote
            remote-show-suffix
            :remote-method="loadClientData"
            :loading="loadClient"
            style="width: 200px"
            placeholder="請選擇訂單號"
          >
            <el-option
              v-for="item in optionsClient"
              :key="item.id"
              :label="item.client_code"
              :value="item.client_code"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="CreateInvoice">導出訂單流程數據</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="CreateInvoice">導出訂單客戶報表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
