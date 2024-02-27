<template>
  <div>
    <h1>js 复习</h1>

    <h2>filter(Boolean)</h2>
    <div>old arr: {{ arr }}</div>
    <div>filter arr: {{ filterArr }}</div>

    <h2>空数组 的some 和 every 方法</h2>
    <div>some: {{ [].some(() => {}) }}</div>
    <div>every: {{ [].every(() => {}) }}</div>

    <h2>fetch</h2>
    <img :src="fetchImg" alt="test" />

    <!-- reduce  -->
    <h2>reduce</h2>
    <div>reduce before: {{ reduceArr }}</div>
    <div>reduce after: {{ reduceAfterArr }}</div>

    <h2>页面跳转 window.open,location.href</h2>
    <a-button @click="jumpOpen">open</a-button>
    <a-button @click="jumpHref">jump</a-button>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'

  // vue api
  onMounted(() => {
    getFetchImg()
  })

  const arr = [1, '31', null, NaN, true, false, undefined, Infinity, 0]
  const filterArr = computed(() => {
    return arr.filter(Boolean)
  })

  // fetch
  const fetchImg = ref()
  async function getFetchImg() {
    const response = await fetch(
      'https://img0.baidu.com/it/u=3838093562,4126749835&fm=253&fmt=auto&app=138&f=JPEG?w=1144&h=500',
      { method: 'get', headers: {} }
    )
    if (response.ok) {
      const resBlob = await response.blob()
      fetchImg.value = URL.createObjectURL(resBlob)
    }
  }

  // reduce 数组拍平
  const reduceArr = ref([121, 21, [[323], 54], 43, [31, [31, [32, 84]], 62, [[1], [6, 52]]]])
  const reduceAfterArr = computed(() => {
    function loopFlat(arr) {
      return arr.reduce((pre: any[], item) => {
        Array.isArray(item) ? pre.push(...loopFlat(item)) : pre.push(item)
        return pre
      }, [])
    }
    return loopFlat(reduceArr.value)
  })

  // open jumpHref
  function jumpOpen() {
    window.open('https://www.baidu.com', '', 'width=500,height=500,titlebar=no,menubar=no')
  }
  function jumpHref() {
    location.href = 'https://www.baidu.com'
  }
</script>

<style scoped lang="less">
  img {
    width: 300px;
  }
</style>
