<script setup>
import { ref, inject, onMounted } from "vue"

const props = defineProps({
  chartOption: Object
})

const container = ref()

//引入
const echarts = inject("$echarts")

onMounted(() => {
  const myChart = echarts.init(container.value)
  // 绘制图表
  const option = props.chartOption
  myChart.setOption(option)

  window.onresize = function () {
    myChart.resize()
  }
})
</script>

<template>
  <div ref="container" style="width: 100%; height: 500px" />
</template>

<style scoped></style>
