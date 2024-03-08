<!--
 * @Author: lisongming
 * @Date: 2024-03-08 09:42:49
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>css 复习</h1>
    <h2>flex 布局</h2>
    <div class="css-flex">
      <div class="css-flex_item" v-for="item in 4" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .css-flex {
    display: flex;
    background-color: orangered;
    justify-content: space-evenly; // 容器： 水平方向： center，end, start, flex-end, flex-start, right, left space-around, space-between, space-evenly ;
    font-size: 20px;
    height: 200px;
    // align-items: flex-start; // 容器： 垂直方向：center, start end flex-start flex-end stretch
    align-content: space-evenly; // flex-end flex-start center space-between space-around space-evenly
    flex-direction: row-reverse; // 容器：设置主轴 row row-reverse column column-reverse
    flex-wrap: wrap-reverse; //nowrap wrap wrap-reverse

    &_item {
      width: 30%;
      // height: 40px;
      border: 2px solid wheat;
      flex: 0 0 30%;
      // align-self: flex-start;
      order: 1;
    }
    &_item:nth-child(4) {
      order: 0;
    }
  }
</style>
