<!--
 * @Author: lisongming
 * @Date: 2023-12-27 10:10:33
 * @LastEditors: lisongming
 * @Description: 组件测试
-->
<template>
  <div>
    <h1>组件测试，主要测试第三方组件</h1>

    <h2>1. input 标签中的type=image 测试</h2>
    <input type="image" src="" />
    <input
      type="image"
      src="http://122.152.220.184:9000/bucket-1/image/js_1702216443238.webp"
      class="input-image"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .input-image {
    width: 200px;
  }
</style>
