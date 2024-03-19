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
  </div>
</template>

<script setup lang="ts">
  import '../tss/iterator'
  // import { reactive } from 'vue'

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
</script>

<style scoped lang="less"></style>
