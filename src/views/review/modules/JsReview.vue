<template>
  <div>
    <h1>js 复习</h1>

    <h2>filter(Boolean)</h2>
    <div>old arr: {{ arr }}</div>
    <div>filter arr: {{ filterArr }}</div>

    <h2>空数组 的some 和 every 方法</h2>
    <div>some: {{ [].some(() => {}) }}</div>
    <div>every: {{ [].every(() => {}) }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const arr = [1, '31', null, NaN, true, false, undefined, Infinity, 0]
  const filterArr = computed(() => {
    return arr.filter(Boolean)
  })
</script>

<style scoped lang="less"></style>
