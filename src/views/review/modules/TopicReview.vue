<!--
 * @Author: lisongming
 * @Date: 2024-04-09 13:28:21
 * @LastEditors: lisongming
 * @Description: 面试题复习
-->
<template>
  <div>
    <h1>小功能点复习</h1>
    <h2>1. 数组的 合集 交集 ，差集</h2>
    <div>intersection:{{ [...new Set([...firstArr, ...secondArr])] }}</div>
    <div>union:{{ firstArr.filter((item) => secondArr.includes(item)) }}</div>
    <div>union:{{ [...new Set(firstArr)].filter((item) => new Set(secondArr).has(item)) }}</div>
    <div>different set:{{ firstArr.filter((item) => !secondArr.includes(item)) }}</div>
  </div>
</template>

<script setup lang="ts">
  // 1.数组的交集 合集，差集
  console.group('数组的交集 合集，差集')
  const firstArr = [1, 232, 42, 3, 64]
  const secondArr = [31, 53, 62, 41, 1, 232]
  console.groupEnd()
</script>

<style scoped lang="less"></style>
