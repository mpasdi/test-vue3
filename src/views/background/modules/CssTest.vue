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

    <h2>文字涂鸦</h2>
    <div class="font-griffiti">文字涂鸦测试</div>
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

  .font-griffiti {
    font-size: 20px;
    font-weight: 550;
    display: inline-block;
    background: linear-gradient(to right, skyblue, orange);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
