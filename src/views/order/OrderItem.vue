<script setup>
import OrderProduct from "./components/OrderProduct.vue"

const tableData = [
  {
    name: "Tom"
  },
  {
    name: "Tom"
  }
]
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <el-text tag="b" size="large">訂單基本信息</el-text>
      </div>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="訂單號">kooriookami</el-descriptions-item>
        <el-descriptions-item label="PI號">
          <el-link herf="#" type="primary" style="padding-right: 10px; display: inline-block">PI10000</el-link>
          <el-link herf="#" type="primary">PI20000</el-link>
        </el-descriptions-item>
        <el-descriptions-item label="PI未發貨數">Suzhou</el-descriptions-item>
        <el-descriptions-item label="商品描述">School</el-descriptions-item>
        <el-descriptions-item label="訂單總數量">100</el-descriptions-item>
        <el-descriptions-item label="未生產數量">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Terms of Pay ment">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Packing">Suzhou</el-descriptions-item>
        <el-descriptions-item label="訂單總金額">Suzhou</el-descriptions-item>
        <el-descriptions-item label="PI數量">Suzhou</el-descriptions-item>
        <el-descriptions-item label="起運港">Suzhou</el-descriptions-item>
        <el-descriptions-item label="目的港">Suzhou</el-descriptions-item>
        <el-descriptions-item label="預計櫃量(40HQ)">Suzhou</el-descriptions-item>
        <el-descriptions-item label="PI已發貨數量">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">Suzhou</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never" class="search-wrapper">
      <div class="toolbar-wrapper">
        <el-text tag="b" size="large">訂單實時信息</el-text>
      </div>
      <el-descriptions :column="2" border>
        <el-descriptions-item width="25%" label="訂單數量">100</el-descriptions-item>
        <el-descriptions-item width="25%" label="BO數量">100</el-descriptions-item>
        <el-descriptions-item :span="4" label="PI數量">
          <el-collapse>
            <el-collapse-item title="100">
              <el-table ref="tableRef" border :data="tableData">
                <el-table-column prop="name" label="編號" align="center" />
                <el-table-column prop="name" label="數量" align="center" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-descriptions-item>
        <el-descriptions-item :span="4" label="INV數量">
          <el-collapse>
            <el-collapse-item title="100">
              <el-table ref="tableRef" :data="tableData">
                <el-table-column prop="name" label="編號" align="center" />
                <el-table-column prop="name" label="數量" align="center" />
                <el-table-column prop="name" label="日期" align="center" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <OrderProduct />
    </el-card>
  </div>
</template>

<style scoped></style>
