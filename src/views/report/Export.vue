<script setup>
import { ExportOne, ExportTow, ExportThree } from "./export"

defineOptions({
  name: "Export"
})
</script>

<template>
  <div class="app-container">
    <export-one />
    <export-tow />
    <export-three />
  </div>
</template>

<style lang="scss" scoped></style>
