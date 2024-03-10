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

    <h2>window.print</h2>
    <a-button @click="print">print</a-button>

    <h2>websocket</h2>
    <a-input v-model:value="sendWsData"></a-input>
    <a-button @click="sendData">发送消息</a-button>
    <a-input v-model:value="receiveWsData"></a-input>
    <div>test</div>

    // map set weakMap weakSet
    <h2>map set weakMap weakSet</h2>
    <div>custom_map : {{ custom_map }}</div>

    <div>custom_weakmap : {{ custom_weakmap }}</div>
    <div>custom_set : {{ custom_set }}</div>
    <div>custom_weakset : {{ custom_weakset }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted } from 'vue'

  // vue api
  onMounted(() => {
    getFetchImg()
  })
  onUnmounted(() => {
    webSocket.close()
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

  //   print
  function print() {
    window.print()
  }

  //   websocket
  const receiveWsData = ref<string>()
  const sendWsData = ref<string>()
  const webSocket = new WebSocket('ws://localhost:9883')
  function sendData() {
    webSocket.send(sendWsData.value as string)
  }

  webSocket.onopen = () => {
    console.log('WebSocket connection opened')
  }
  webSocket.onmessage = (message) => {
    receiveWsData.value = message.data as string
    console.log('lsm----ws data: ', message)
  }
  webSocket.onerror = () => {}
  webSocket.onclose = () => {}

  //   map set weakMap weakSet
  let sym = Symbol()
  const custom_map = new Map()
  custom_map.set(1, 'lsm')
  custom_map.set(1, 'other')
  custom_map.set('3', 'other people3')
  custom_map.set('2', 'other people2')
  custom_map.set(0, 'other 0')
  custom_map.delete(0)
  custom_map.set(sym, 'symbol value')
  for (let customMapElementKey in custom_map[Symbol.iterator]) {
    console.log('lsm--symbol', customMapElementKey)
  }
  console.log('lsm--- sym', custom_map.get(sym))
  console.log('lsm----entries', custom_map.entries())
  console.log(
    'lsm----custom_map',
    custom_map,
    custom_map.size,
    custom_map.has(1),
    custom_map.get(1)
  )
  // custom_map.forEach((item, key) => {
  //   console.log('lsm----map item', item, key)
  // })
  console.log('lsm----- to array', [...custom_map], Array.from(custom_map))
  console.log('lsm----from entries', Object.fromEntries(custom_map))
  console.log('lsm----obj entries', Object.entries(Object.fromEntries(custom_map)))

  const custom_weakmap = new WeakMap()
  const custom_set = new Set()
  const custom_weakset = new WeakSet()

  setTimeout(() => {
    console.log('lsm------custom_map', custom_map)
  }, 3000)
</script>

<style scoped lang="less">
  img {
    width: 300px;
  }
</style>
