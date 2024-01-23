<!--
 * @Author: lisongming
 * @Date: 2024-01-16 13:15:45
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>echarts 测试</h1>
    <a-tabs v-model:activeKey="activeKey" tab-position="left" destroyInactiveTabPane>
      <a-tab-pane :key="1" tab="map测试"><EchartsMap /></a-tab-pane>
      <a-tab-pane :key="2" tab="map2测试"><EchartsMap2 /></a-tab-pane>
      <a-tab-pane :key="3" tab="map3测试"><EchartsMap3 /></a-tab-pane>
      <a-tab-pane :key="4" tab="雷达图测试"><EchartRadar /></a-tab-pane>
      <a-tab-pane :key="5" tab="柱状图"><EchartsBar /></a-tab-pane>
      <a-tab-pane :key="6" tab="折线图"><EchartsLine /></a-tab-pane>
      <a-tab-pane :key="7" tab="饼图"><EchartsBing /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import EchartsMap from '@/components/echarts/EchartsMap.vue'
  import EchartsMap2 from '@/components/echarts/EchartsMap2.vue'
  import EchartsMap3 from '@/components/echarts/EchartsMap3.vue'
  import EchartRadar from '@/components/echarts/EchartRadar.vue'
  import EchartsBar from '@/components/echarts/EchartsBar.vue'
  import EchartsLine from '@/components/echarts/EchartsLine.vue'
  import EchartsBing from '@/components/echarts/EchartsBing.vue'

  //
  const activeKey = ref(1)
</script>

<style scoped lang="less"></style>
