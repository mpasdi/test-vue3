<!--
 * @Author: lisongming
 * @Date: 2024-03-01 13:56:41
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    我是测试组件
    <a-tag color="blue">{{ proVal }}</a-tag>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, useAttrs, inject } from 'vue'

  // vue api
  const attr = useAttrs()
  onMounted(() => {
    console.log('lsm----attr', attr)
    console.log('lsm----sub numVal', proVal.value)
    // proVal.value = 10 // 不会生效
  })
  const proVal = inject('numVal', 10)

  // data
  const compIndex = ref(1)

  function compFunc() {
    console.log('lsm --- compIndex', compIndex.value + '10')
  }

  defineExpose({
    compIndex,
    compFunc
  })
</script>

<style scoped lang="less"></style>
