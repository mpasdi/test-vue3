<!--
 * @Author: lisongming
 * @Date: 2023-12-27 10:09:39
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>css 样式测试</h1>
    <h2>nth-type-of & nth-child 测试</h2>
    <div class="nth">
      <span v-for="item in 4" :key="item">{{ item }}</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  .nth {
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: gray;
      margin-right: 10px;
      color: white;
    }

    span:nth-child(2) {
      background-color: rebeccapurple;
    }

    span:nth-of-type(3) {
      background-color: palevioletred;
    }
  }
</style>
