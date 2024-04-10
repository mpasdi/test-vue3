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

    <h2>symbol</h2>
    <div>symbol: {{ sbl }}</div>
    <div>symbol: {{ sbl2 }}</div>

    <h2>proxy reflect</h2>
    <div>origin obj : {{ originObj }}</div>
    <!-- <div>proxy obj : {{ proxyObj }}</div> -->

    <h2>事件委托</h2>
    <div class="event-entrust" @click="entrustEvent">
      <div v-for="item in 4" :key="item" class="entrust-item">委托项{{ item }}</div>
    </div>

    <h2>JSON.parse JSON.stringify 的参数</h2>
    <div>parse: {{ stringifyObj }}</div>
    <div>stringify: {{ parseStr }}</div>

    <h2>类和继承</h2>
    <div>friend: {{ friend }}</div>
    <div>girl friend: {{ girlFriend }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  import { Friend, GirlFriend } from '../tss/class'

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
  const custom_map = new Map()
  const custom_weakmap = new WeakMap()
  const custom_set = new Set()
  const custom_weakset = new WeakSet()

  function mapSetTest() {
    console.group('-----map --- start')
    let sym = Symbol()
    custom_map.set(1, 'lsm')
    custom_map.set(1, 'other')
    custom_map.set('3', 'other people3')
    custom_map.set('2', 'other people2')
    custom_map.set(0, 'other 0')
    custom_map.delete(0)
    custom_map.set(sym, 'symbol value')
    custom_map.set(Number(1), 'number 1')
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
    for (const item of custom_map) {
      console.log('lsm-----map item ', item)
    }
    console.log('lsm----- to array', [...custom_map], Array.from(custom_map))
    console.log('lsm----from entries', Object.fromEntries(custom_map))
    console.log('lsm----obj entries', Object.entries(Object.fromEntries(custom_map)))
    // custom_map.clear()
    // console.log('lsm---- clear', custom_map)
    console.groupEnd()

    console.group('lsm------weakmap----start')
    const objKey = {}
    const arrKey = []
    const mapKey = new Map()
    const funcKey = function () {}
    // custom_weakmap.set(1, 'first')
    // custom_weakmap.set(Number(1), 'second')
    custom_weakmap.set(sym, 'third')
    custom_weakmap.set(objKey, 'fourth')
    custom_weakmap.set(arrKey, 'fifth')
    custom_weakmap.set(funcKey, 'sixth')
    custom_weakmap.set(mapKey, 'seventh')
    custom_weakmap.delete(sym)

    // console.log('lsm----- to  array', Array.from(custom_weakmap))

    console.log('lsm----has get', custom_weakmap.has(objKey), custom_weakmap.get(objKey))
    console.log('lsm----weakmap current', custom_weakmap)
    console.groupEnd()

    console.group('lsm-----start ---- set ---')
    const obj_set = {}
    custom_set.add('eighth')
    custom_set.add(obj_set)
    custom_set.add(2)
    custom_set.add(1)
    custom_set.delete(2)
    custom_set.forEach((value, key) => {
      console.log('lsm----item value key', value, key)
    })
    for (const item of custom_set) {
      console.log('lsm-----set item ', item)
    }
    console.log('lsm set keys', custom_set.keys())
    console.log('lsm set values', custom_set.values())
    console.log('lsm---- to array', Array.from(custom_set))

    console.log('lsm---- obj_set', custom_set.has(obj_set))
    console.groupEnd()

    console.group('lsm-------start --------weak set')
    const weakset_obj = {}
    const weakset_arr = []
    const refVal = ref(1)
    custom_weakset.add(weakset_obj)
    custom_weakset.add(weakset_arr)
    custom_weakset.add(refVal)
    custom_weakset.delete(weakset_arr)
    console.log(
      'lsm-----weakset has',
      custom_weakset.has(weakset_obj),
      custom_weakset.has(weakset_arr),
      custom_weakset.has(refVal)
    )

    console.log('lsm-----weakset current', custom_weakset)

    console.groupEnd()
  }
  mapSetTest()
  setTimeout(() => {
    console.log('lsm------custom_map', custom_map)
    console.log('lsm------custom_weakmap', custom_weakmap)
    console.log('lsm------custom_set', custom_set)
    console.log('lsm------custom_weakset', custom_weakset)
  }, 2000)

  // symbol
  const sbl = Symbol()
  const sbl2 = Symbol('name')
  const sbl_obj = {
    [sbl]: 'one',
    [sbl2]: 'two',
    three: 'four'
  }
  sbl_obj[sbl] = 'five'
  console.group('lsm------symbol start')
  console.log('lsm------- common -key ', Object.keys(sbl_obj), Object.values(sbl_obj))
  console.log('lsm----sbl - key', Object.getOwnPropertySymbols(sbl_obj))
  console.log('lsm---- reflect own key', Reflect.ownKeys(sbl_obj))
  console.log('lsm-----sbl sbl2 ', sbl, sbl2)
  console.log('lsm------sbl_obj', sbl_obj)
  console.groupEnd()

  // proxy reflect
  console.group('lsm---- proxy reflect')
  const originObj = {
    name: 'lsm',
    age: 25
  }
  const proxyObj = new Proxy(originObj, {
    get(target, attr) {
      console.log('lsm---- proxy get track')
      return target[attr]
    },
    set(target, attr, value) {
      console.log('lsm---- proxy set trigger')
      Reflect.set(target, attr, value)
      return true
    },
    has(target, p) {
      return Reflect.has(target, p)
    },
    deleteProperty(target, p) {
      return Reflect.deleteProperty(target, p)
    },
    defineProperty(target, property, attributes) {
      return Reflect.defineProperty(target, property, attributes)
    },
    getPrototypeOf(target) {
      return Reflect.getPrototypeOf(target)
    },
    setPrototypeOf(target, v) {
      return Reflect.setPrototypeOf(target, v)
    },
    getOwnPropertyDescriptor(target, p) {
      return Reflect.getOwnPropertyDescriptor(target, p)
    },
    ownKeys(target) {
      return Reflect.ownKeys(target)
    },
    preventExtensions(target) {
      return Reflect.preventExtensions(target)
    },
    isExtensible(target) {
      return Reflect.isExtensible(target)
    }
    // 下面两个只有代理对象是函数时才有
    // construct(target, argArray, newTarget) {
    //   return Reflect.construct(target, argArray, newTarget)
    // }
    // apply(target, thisArg, argArray) {
    //   return Reflect.apply(target, thisArg, argArray)
    // },
  })
  proxyObj.name = 'other people'
  console.log('lsm-- origin obj', originObj, originObj.name)
  console.log('lsm-- proxy obj', proxyObj)
  const revokeProxyObj = Proxy.revocable(originObj, {
    get(target, attr) {
      return Reflect.get(target, attr)
    }
  })
  console.log('lsm------revokeProxyObj attr', revokeProxyObj.proxy.name)
  revokeProxyObj.revoke()
  try {
    console.log('lsm------revokeProxyObj after attr', revokeProxyObj.proxy.name)
  } catch (error) {
    console.log('lsm-----error', error)
  }

  console.groupEnd()

  // 事件委托
  console.group('事件委托')
  function entrustEvent(event) {
    console.log('lsm----event', event, event.target)
    event.target.innerText += ' 我被点击了'
  }

  // json.parse json.stringify
  const jsonObj = {
    name: 'lsm',
    age: 27,
    address: '黄鹤楼'
  }

  // const stringifyObj = JSON.stringify(jsonObj, (key, value) => {
  //   if (key === 'age' || key === 'name') {
  //     return undefined
  //   } else {
  //     return value
  //   }
  // })

  const stringifyObj = JSON.stringify(jsonObj, ['address', 'name'], 31)
  console.log('lsm----stringifyObj', stringifyObj)
  const parseStr = JSON.parse(stringifyObj, (key, value) => {
    if (key === 'name') {
      return value.toUpperCase()
    }
    return value
  })
  console.log('lsm----parseStr', parseStr)

  console.groupEnd()

  // 类和继承
  const girlFriend = new GirlFriend({ userName: 'alis', age: 25 })
  const friend = new Friend({ userName: 'lsm', age: 27, gender: '男' })
  girlFriend.merry(friend)
  console.log('lsm----girlFriend', girlFriend)
</script>

<style scoped lang="less">
  img {
    width: 300px;
  }

  .event-entrust {
    .entrust-item {
      height: 40px;
      background: orange;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
</style>
