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
    <div ref="numRef">数字： {{ num }}</div>

    <!-- watch -->
    <h2>watch</h2>
    <div ref="watchRef">{{ watchVal }}</div>

    <!-- defineExpose  -->
    <h2>子组件， defineExpose</h2>
    <SubComponentOne ref="subCompRef" :textVal="1314" />

    <!-- toRaw, toRef -->
    <h2>toRaw, toRef</h2>
    <div>
      <a-button @click="generalVal++">自增</a-button>
      generalVal : {{ generalVal }}
    </div>
    <div>
      <a-button @click="toRefVal++">自增</a-button>
      toRefVal: {{ toRefVal }}
    </div>
    <div>
      <a-button @click="toRawVal++">自增</a-button>
      toRawVal: {{ toRawVal }}
    </div>
    <div>
      <a-button @click="unrefVa++">自增</a-button>
      unrefVa: {{ unrefVa }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    Ref,
    onRenderTracked,
    onRenderTriggered,
    watchEffect,
    watchPostEffect,
    watch,
    onUnmounted,
    onMounted,
    toRef,
    toRaw,
    unref,
    provide,
    readonly
  } from 'vue'
  import SubComponentOne from '@/components/subComponentsTest/SubComponentOne.vue'

  onMounted(() => {
    subCompRef.value.compFunc()
  })
  onUnmounted(() => {
    stopWatcher()
  })

  const numRef = ref()
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

  // watch
  const watchRef = ref()
  const watchVal = ref(0)
  const stopWatcher = watch(
    num,
    (val) => {
      watchVal.value = val + 1
      console.log('lsm----', numRef.value)
      console.log('lsm----', numRef.value?.innerText)
    },
    {
      flush: 'pre'
    }
  )
  watchEffect(
    () => {
      watchVal.value = num.value + 1
      console.log('lsm---- watchEffect', numRef.value)
      console.log('lsm----watchEffect', numRef.value?.innerText)
    },
    {
      flush: 'post'
    }
  )

  watchPostEffect(() => {
    watchVal.value = num.value + 1
    console.log('lsm---- watchPostEffect', numRef.value)
    console.log('lsm----watchPostEffect', numRef.value?.innerText)
  })

  // defineExpose  // provide
  const subCompRef = ref()
  provide('numVal', readonly(num))

  // toRaw toRef
  const generalVal = 1
  const refVal = ref(1)
  const toRefVal = toRef(generalVal)
  const toRawVal = toRaw(refVal)
  const unrefVa = unref(toRefVal)
  console.log('lsm---ref val', toRefVal, toRawVal)
</script>

<style scoped lang="less"></style>
