<script setup>
import { reactive, ref } from "vue"

const loading = ref(false)

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom"
  }
]
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="pb5">
        <div class="m-b">
          <el-text tag="b" size="large">產品信息</el-text>
        </div>
        <el-descriptions :column="3" border>
          <el-descriptions-item label="產品名稱">kooriookami</el-descriptions-item>
          <el-descriptions-item label="產品代碼(ART)">kooriookami</el-descriptions-item>
          <el-descriptions-item label="品牌">18100000000</el-descriptions-item>
          <el-descriptions-item label="條碼EAN">Suzhou</el-descriptions-item>
          <el-descriptions-item label="40'HQ裝箱量">Suzhou</el-descriptions-item>
          <el-descriptions-item label="輪胎類型TYPE">kooriookami</el-descriptions-item>
          <el-descriptions-item label="海關條碼">18100000000</el-descriptions-item>
          <el-descriptions-item label="歐標等級">Suzhou</el-descriptions-item>
          <el-descriptions-item label="單重">Suzhou</el-descriptions-item>
          <el-descriptions-item label="是否歐標EU OR 空白">Suzhou</el-descriptions-item>
          <el-descriptions-item label="類型">Suzhou</el-descriptions-item>
          <el-descriptions-item label="花紋">Suzhou</el-descriptions-item>
          <el-descriptions-item label="寸口">Suzhou</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="mt5">
        <el-col :span="12">
          <el-text tag="b" size="large">銷售客戶</el-text>
          <el-table :data="tableData" border class="mt">
            <el-table-column prop="date" label="產品編碼" />
            <el-table-column prop="name" label="銷售價格" />
          </el-table>
        </el-col>
      </div>
      <div class="mt10">
        <el-col :span="12">
          <el-text tag="b" size="large">生產工廠</el-text>
          <el-table :data="tableData" border class="mt">
            <el-table-column prop="date" label="產品編碼" />
            <el-table-column prop="name" label="銷售價格" />
          </el-table>
        </el-col>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
