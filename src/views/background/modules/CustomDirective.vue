<!--
 * @Author: lisongming
 * @Date: 2023-12-22 14:56:06
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="wrap">
    <h1>自定义指令测试</h1>

    <h1>v-focus 自动聚焦</h1>
    <div class="input">
      <a-input v-focus />
    </div>

    <!--    v-circle  画圆圈-->
    <h1>v-circle 画圆圈</h1>
    <div v-circle></div>
    <div v-circle.isFull></div>
    <div v-circle:skyBlue.isFull></div>
    <div v-circle:red.isFull="50"></div>
    <div v-circle:purple="60"></div>
    <div v-circle="70"></div>
    <div v-circle:#ff9a9e.isFull="80"></div>

    <h1>v-imageLazyLoad 图片懒加载</h1>
    <img
      v-for="item in imageList"
      :key="item"
      v-imageLazyLoad="item"
      alt="test"
      class="load-image"
    />
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

  //   测试图片懒加载
  const imageList = [
    'https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280',
    'https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg',
    'https://img0.baidu.com/it/u=3316636492,2799302396&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
  ]
</script>

<style scoped lang="less">
  .wrap {
    .input {
      width: 200px;
    }
  }

  .load-image {
    height: 500px;
    min-width: 200px;
    display: block;
  }
</style>
