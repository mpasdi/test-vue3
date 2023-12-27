<!--
 * @Author: lisongming
 * @Date: 2023-12-27 16:54:52
 * @LastEditors: lisongming
 * @Description: vue3测试
-->
<template>
  <div>
    <h1>vue3测试</h1>

    <h2>track trigger 测试</h2>
    <a-button @click="num++">增加</a-button>
    数字： {{ num }}
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, onRenderTracked, onRenderTriggered } from 'vue'

  const num: Ref<number> = ref(0)
  //onRenderTracked 和 onRenderTriggered 只能在开发环境中使用
  onRenderTracked((event) => {
    console.log('event track', event)
    // debugger
  })
  onRenderTriggered((event) => {
    console.log('event trigger', event)
    // debugger
  })
</script>

<style scoped lang="less"></style>
