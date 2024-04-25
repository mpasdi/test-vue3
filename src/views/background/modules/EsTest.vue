<!--
 * @Author: lisongming
 * @Date: 2024-03-13 15:30:20
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>es7~es_latest测试</h1>

    <h2>es7 测试</h2>
    <div>1.指数运算符 **： {{ 2 ** 3 }}</div>
    <div>2. async await</div>
    <div>
      3. Object.values()： {{ Object.values(es7_obj) }} | {{ Object.values(es7_arr) }} |
      {{ Object.values(es7_map) }} | {{ Object.values(es7_set) }}
    </div>
    <div>4. Object.entries(): {{ Object.entries(es7_obj) }} | {{ Object.entries(es7_arr) }}</div>
    <div>
      5. flat:{{ flat_arr.flat(-1) }}
      <br />
      | {{ flat_arr.flat(0) }}
      <br />
      | {{ flat_arr.flat(2) }}
      <br />
      | {{ flat_arr.flat() }}
      <br />
      |
      {{ flat_arr.flat(Infinity) }}
    </div>
    <div>6. flatMap: {{ flat_arr.flatMap((item) => item) }}</div>
    <div>
      7. Object.getOwnPropertyDescriptors: {{ Object.getOwnPropertyDescriptors(es7_obj) }} |
      <br />
      {{ Object.getOwnPropertyDescriptors(es7_map) }}
    </div>

    <h2>es8 测试</h2>
    <div>async await : {{ asyncFun().then((res) => res) }}</div>
    <div>padStart padEnd: {{ padStr.padStart(15, '-*~') }} : {{ padStr.padEnd(10, '!!') }}</div>
    <div>SharedArrayBuffer Atomics 只能在web workers或者 Service Workers中使用</div>

    <h2>es9 测试</h2>
    <div>
      spread/rest: {{ { ...es9Obj } }} -- {{ es9Obj[es9Sbl] }} ： {{ weather }} --- {{ restObj }}
    </div>
    <div>iterator/asyncIterator</div>
    <div>Promise.prototype.finally</div>

    <h2>es 10 测试</h2>
    <div>
      trimStart/trimEnd : {{ trimStr }} --- {{ trimStr.trimStart() }} ---{{ trimStr.trimEnd() }}
    </div>
    <div>
      fromEntries(map/arr) : {{ transArr }} ------- {{ Object.fromEntries(transArr as any) }} -----
      {{ Object.fromEntries(transMap) }}
    </div>
    <div>try {} catch {}</div>
    <div>Symbol.description</div>

    <h2>es 11 (2020)</h2>
    <div>??/?. : {{ unVal }} ---- {{ unValue ?? '--' }}</div>
    <div>
      import ::
      <img :src="dynamicImportImg" alt="dy" srcset="" />
    </div>
    <div>
      BigInt ::
      <!--      {{ generalNum === bigNum }} -&#45;&#45; {{ generalNum == bigNum }}-->
      --- {{ generalNum > bigNum }} - -- {{ generalNum < bigNum }} --{{
        BigInt(generalNum) + bigNum
      }}
    </div>
    <div>Promise.allSettled</div>
    <div>globalThis</div>

    <h2>es 12 2021</h2>
    <div>Promise.any</div>
    <div>number _ :: {{ specialNunber }}</div>
    <div>replaceAll :: {{ repStr.replaceAll('lsm', 'other') }} | {{ repStr }}</div>
    <div>
      ||= ??= &&= : {{ (operatorOne ||= 2) }} ----- {{ (operatorOne &&= 3) }} -----
      {{ (operatorOne ??= 4) }}
    </div>
    <div>WeakRef: {{ weakObj }}</div>

    <h2>es 13 2022</h2>
    <div>top await: {{ topAwait }}</div>
    <div>at : {{ atArr.at(-1) }}</div>
    <div>
      lastFind, lastFinedIndex : {{ atArr.findLastIndex((item) => item == 'last value') }} :
      {{ atArr.findLast((item) => item == 'last value') }}
    </div>
    <div>error.cause</div>
    <div>class 新特性</div>

    <h2>es 14 2023</h2>
    <div>toReversed: {{ es14Arr.toReversed() }}</div>
    <div>toSorted: {{ es14Arr.toSorted() }}</div>
    <div>toSpliced: {{ es14Arr.toSpliced(0, 3, 100, 200) }}</div>
    <div>with: {{ es14Arr.with(0, 300) }}</div>
    <div>origin arr: {{ es14Arr }}</div>
  </div>
</template>

<script setup lang="ts">
  import '../tss/iterator'
  import { ref } from 'vue'

  // 1. es7
  const sbl = Symbol('key')
  const es7_obj = {
    name: 'lsm',
    // 1: 2,
    [sbl]: 'sbl_value'
  }
  const es7_arr = ['other', sbl]
  const es7_map = new Map<any, any>([
    ['age', 12],
    [sbl, 'sbl_value']
  ])
  const es7_set = new Set(['people'])

  console.group('symbol-obj')
  console.log('lsm--Object.keys(es7_obj)', Object.keys(es7_obj))
  console.log('lsm-- in', sbl in es7_obj)
  for (const key in es7_obj) {
    console.log('lsm----for in key', key)
  }
  console.log(
    'lsm--',
    Object.getOwnPropertySymbols(es7_obj),
    es7_obj[Object.getOwnPropertySymbols(es7_obj)[0]]
  )
  console.log('lsm----hasOwnProperty', es7_obj.hasOwnProperty(sbl))
  console.log('lsm----Reflect.ownKeys(es7_obj)', Reflect.ownKeys(es7_obj))
  console.groupEnd()

  console.group('symbol-map')
  console.log('lsm---map keys`', [...es7_map.keys()])
  console.log('lsm---map obj keys', Object.keys(es7_map))
  for (const key of es7_map) {
    console.log('lsm--es7_map key', key)
  }
  console.groupEnd()

  const flat_arr = [[[121, 'lsm'], 316, 212], 43, 453]

  // es 8

  // 8 - async
  async function asyncFun() {
    return Promise.resolve('111')
    // return 212
  }

  // 8 - padStart padEnd
  const padStr = 'lsm'

  // const sab = new SharedArrayBuffer(1024)
  // const i32a = new Int32Array(sab)

  // const originVal = Atomics.add(i32a, 0, 'a')
  // console.log('lsm----originVal', originVal)

  // es 9
  console.group('lsm-----es9')
  const es9Sbl = Symbol('es9Key')
  const es9Obj = {
    weather: 'wind',
    temperature: 18,
    address: '上海',
    [es9Sbl]: 'symbol'
  }
  Object.defineProperty(es9Obj, 'date', {
    value: new Date().toLocaleString(),
    enumerable: true
  })
  console.log('lsm-----es9obj', es9Obj)
  console.log('lsm-----spread', { ...es9Obj })
  console.log('lsm-- get Description', Object.getOwnPropertyDescriptors(es9Obj))
  const { weather, ...restObj } = es9Obj

  console.log('--------------异步迭代-------------')
  const itArr = [112, 32, 43, 54]
  const arrIterator = itArr[Symbol.iterator]()
  let arrItem = arrIterator.next()
  while (!arrItem.done) {
    console.log('lsm----arr item value', arrItem)
    arrItem = arrIterator.next()
  }
  console.log('lsm----arr item end1', arrItem)
  console.log('lsm----arr item end2', arrIterator.next())

  const itObj = {
    weather: 'wind',
    temperature: 18,
    address: '上海',
    [Symbol.iterator]: () => {
      let index = 0
      let keys = Object.keys(itObj)
      return {
        next: () => {
          return {
            value: itObj[keys[index++]],
            done: index > keys.length
          }
        }
      }
    }
    // [Symbol.iterator]: function* () { // setup 不支持yield
    //   Object.keys(this).map((item) => {
    //     yield this[item]
    //   })
    // }
  }
  const objIterator = itObj[Symbol.iterator]()
  let objItem = objIterator.next()
  while (!objItem.done) {
    console.log('lsm----obj item value', objItem)
    objItem = objIterator.next()
  }
  console.log('lsm----objItem end', objItem)
  for (const iterator of itObj) {
    console.log('lsm----for of if', iterator)
  }
  console.groupEnd()

  const finallyArr = [Promise.resolve(1), Promise.reject(2)]
  Promise.all(finallyArr)
    .then((res) => {
      console.log('lsm---------finally', res)
    })
    .catch((err) => {
      console.log('lsm---------finally', err)
    })
    .finally(() => {
      console.log('lsm---------finally', 3)
    })

  // es 10 2019
  const transSymbolKey = Symbol('symbol key')
  const transObjKey = {}
  const trimStr = '  12 lsm  '
  const transArr: any = [
    ['name', 'lsm'],
    [1, 25],
    [transSymbolKey, 'unique value'],
    [transObjKey, 'test']
  ]
  const transMap = new Map(transArr)
  console.log('lsm-----entries obj', Object.fromEntries(transArr))

  try {
    throw new Error('error')
  } catch {
    console.log('lsm----error')
  }
  const sblTest = Symbol('sbl-test')
  console.log('lsm-----sblTest', sblTest, sblTest.description)
  const sblTest1 = Symbol.for('sbl-test1')
  console.log('lsm-----sblTest1', sblTest1)
  const sblTest2 = Symbol.keyFor(sblTest1)
  console.log('lsm-----sblTest2', sblTest2)
  const sblTest3 = Symbol.for('sbl-test1')
  // console.log('lsm-----sbl equal', sblTest1 === sblTest3)
  console.log('lsm----sbl key for', Symbol.keyFor(sblTest3), sblTest)
  const sblObjKey = {
    [sblTest1]: 'name',
    general: 'name test'
  }
  console.log(
    'lsm---- sblObjKey',
    sblObjKey[sblTest1],
    Object.keys(sblObjKey),
    Object.getOwnPropertySymbols(sblObjKey),
    Reflect.ownKeys(sblObjKey)
  )

  // es 11 2020
  let unValue: Array<any> | undefined
  const unVal = unValue?.map((item) => item)
  const dynamicImportImg = ref('')
  async function getUrl() {
    const module = await import('@/assets/icons/icon17.png')
    dynamicImportImg.value = module.default
    console.log('lsm----imgUrl.value', dynamicImportImg.value)
  }
  getUrl()

  const settledArr = [Promise.resolve('success'), Promise.reject('error')]
  Promise.allSettled(settledArr).then((res) => {
    console.log('lsm------ all settled promise', res)
  })

  const generalNum = 121
  const bigNum = BigInt(121)

  globalThis.custom_memory = new Set()
  function testFunc() {
    console.log('lsm----globalThis.custom_memory', globalThis.custom_memory)
  }
  testFunc()

  //   es 12 2021
  const repStr = 'lsm like a girl, but the girl , i feel she don`t like lsm '
  const specialNunber = 1_000_000_000
  let promiseAnyArr = [Promise.reject('1'), Promise.reject(2)]
  Promise.any(promiseAnyArr)
    .then((res) => {
      console.log('lsm---------any res', res)
    })
    .catch((err) => {
      console.log('lsm-----any err', err)
    })

  const weakTestObj = {
    test: 'test'
  }
  const weakObj = new WeakRef(weakTestObj)
  console.log('lsm----weakObj', weakObj.deref())
  setTimeout(() => {
    console.log('lsm----weakObj set time', weakObj.deref())
  }, 1000)
  let operatorOne = 0

  //   es 2022
  const atArr = ['313', 31, 53, 7, 542, 'last value']
  try {
    throw new Error('error', { cause: 'error test' })
  } catch (err) {
    console.log('lsm-----try catch error', err)
  }

  // es 2023
  const es14Arr = [5, 4, 3, 2, 1]
</script>
<script lang="ts">
  const topAwait = await Promise.resolve('top Await')
  console.log('lsm-----top await', topAwait)
</script>

<style scoped lang="less"></style>
