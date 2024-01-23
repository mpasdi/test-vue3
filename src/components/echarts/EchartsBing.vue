<!--
 * @Author: lisongming
 * @Date: 2024-01-19 09:50:18
 * @LastEditors: lisongming
 * @Description: 饼图
-->
<template>
  <div>
    <div ref="mapEcharts" class="map-echarts"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, unref } from 'vue'
  import * as echarts from 'echarts'

  // vue api
  onMounted(() => {
    init()
  })

  // echarts
  const mapEcharts = ref()
  const echartInit: any = ref()
  function init() {
    echartInit.value = echarts.init(unref(mapEcharts))
    const option = {}
    echartInit.value.setOption(option)
  }
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1400px;
    height: 700px;
  }
</style>
