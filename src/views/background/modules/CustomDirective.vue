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
    <div v-circle.isFull></div>
    <div v-circle:skyBlue.isFull></div>
    <div v-circle:red.isFull="50"></div>
    <div v-circle:purple="60"></div>
    <div v-circle="70"></div>
    <div v-circle:#ff9a9e.isFull="80"></div>
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

  const vCircle = (el, binding) => {
    el.style.cssText = `
      display: inline-block;
      width: ${binding.value || 10}px;
      height: ${binding.value || 10}px;
      border-radius: 50%;
      border: 1px solid ${binding.arg || 'black'};
      background-color: ${binding.modifiers.isFull ? binding.arg || 'black' : 'transparent'};
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
