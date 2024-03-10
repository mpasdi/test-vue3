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

    <h2>元素靠右 margin-left: auto</h2>
    <div class="margin-test">
      <span>😂🎇 (ง •_•)ง</span>
    </div>

    <h2>盒模型测试</h2>
    <div class="box-type"></div>
    <div class="box-type1"></div>
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

  .margin-test {
    background-color: olivedrab;
    display: flex;

    span {
      color: white;
      margin-left: auto;
    }
  }

  .base-box(@color) {
    width: 100px;
    height: 100px;
    color: @color;
    border: 10px solid @color;
    padding: 10px;
    margin: 10px;
  }
  .box-type {
    .base-box(red);
  }
  .box-type1 {
    .base-box(orange);
  }
</style>
