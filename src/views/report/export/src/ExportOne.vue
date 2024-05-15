<script setup>
import { ref } from "vue"

defineOptions({
  name: "ExportOne"
})

const monthrangeData = ref(["", ""])

const CreateInvoice = () => {
  console.log(monthrangeData.value)
}
</script>

<template>
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
</template>

<style scoped></style>
