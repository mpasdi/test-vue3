<!--
 * @Author: lisongming
 * @Date: 2023-12-22 14:56:06
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="wrap">
    <div class="input">
      <a-input v-focus />
    </div>
    <div v-circle></div>
  </div>
</template>

<script setup lang="ts">
  // 自动获取焦点
  const vFocus = {
    mounted: (el) => {
      el.focus()
      el.placeholder = '请输入。。。'
    }
  }

  const vCircle = (el) => {
    el.style.cssText = `
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: skyBlue;
    `
  }
</script>

<style scoped lang="less">
  .wrap {
    .input {
      width: 200px;
    }
  }
</style>
