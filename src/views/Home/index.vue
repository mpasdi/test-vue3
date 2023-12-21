<!--
 * @Author: lisongming
 * @Date: 2023-12-21 16:44:54
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="home">
    <div class="home-left"></div>
    <div class="home-right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .home {
    height: 100vh;
    background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;

    .home-left {
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    }

    .home-right {
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: linear-gradient(135deg, #001f3f, #0088a9, #00c9a7, #92d5c6, #ebf5ee);
    }
  }
</style>
