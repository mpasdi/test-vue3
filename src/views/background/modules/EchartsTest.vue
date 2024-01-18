<!--
 * @Author: lisongming
 * @Date: 2024-01-16 13:15:45
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>echarts 测试</h1>
    <a-tabs v-model:activeKey="activeKey" tab-position="left">
      <a-tab-pane :key="1" tab="map测试"><EchartsMap /></a-tab-pane>
      <a-tab-pane :key="2" tab="map2测试"><EchartsMap2 /></a-tab-pane>
      <a-tab-pane :key="3" tab="map3测试"><EchartsMap3 /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import EchartsMap from '@/components/echarts/EchartsMap.vue'
  import EchartsMap2 from '@/components/echarts/EchartsMap2.vue'
  import EchartsMap3 from '@/components/echarts/EchartsMap3.vue'

  //
  const activeKey = ref(1)
</script>

<style scoped lang="less"></style>
