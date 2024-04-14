<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <div>
        <div class="m-b">
          <div class="flex justify-between">
            <el-text tag="b" size="large">發貨計劃基本信息</el-text>
            <el-alert title="已發貨" type="success" effect="dark" :closable="false" show-icon style="width: auto" />
          </div>
        </div>
        <el-descriptions :column="3" border>
          <el-descriptions-item label="訂單號">kooriookami</el-descriptions-item>
          <el-descriptions-item label="PI號">kooriookami</el-descriptions-item>
          <el-descriptions-item label="發貨計劃號">18100000000</el-descriptions-item>
          <el-descriptions-item label="關聯發貨計劃">Suzhou</el-descriptions-item>
          <el-descriptions-item label="客戶編碼">Suzhou</el-descriptions-item>
          <el-descriptions-item label="採購發票號">kooriookami</el-descriptions-item>
          <el-descriptions-item label="工廠名稱">18100000000</el-descriptions-item>
          <el-descriptions-item label="目的港">Suzhou</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="mt5">
        <div class="m-b">
          <el-text tag="b" size="large">PI數量</el-text>
        </div>
        <el-descriptions :column="3" border>
          <el-descriptions-item label="數量">Suzhou</el-descriptions-item>
          <el-descriptions-item label="已發貨數">kooriookami</el-descriptions-item>
          <el-descriptions-item label="未發貨數">18100000000</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="mt5">
        <div class="m-b">
          <el-text tag="b" size="large">發貨計劃數量</el-text>
        </div>
        <el-descriptions :column="3" border>
          <el-descriptions-item label="數量">Suzhou</el-descriptions-item>
          <el-descriptions-item label="已發貨數">kooriookami</el-descriptions-item>
          <el-descriptions-item label="未發貨數">18100000000</el-descriptions-item>
          <el-descriptions-item label="最終發貨數">18100000000</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="mt5">
        <div class="m-b">
          <el-text tag="b" size="large">審批</el-text>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
