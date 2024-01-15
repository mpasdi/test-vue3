<!--
 * @Author: lisongming
 * @Date: 2024-01-15 13:14:06
 * @LastEditors: lisongming
 * @Description: 工具类测试
-->
<template>
  <div>
    <h1>工具类测试</h1>

    <!-- 数组拍平 arrayFlat -->
    <h2>数组拍平 arrayFlat</h2>
    <p>原数组1：{{ arr1 }} --- 拍平后数组：{{ arrayFlat(arr1) }}</p>
    <p>原数组2：{{ arr2 }} --- 拍平后数组：{{ arrayFlat(arr2) }}</p>
    <p>原数组3：{{ arr3 }} --- 拍平后数组：{{ arrayFlat(arr3) }}</p>
    <p>原数组3：{{ arr3 }} --- 拍平(2层)后数组：{{ arrayFlat(arr3, 2) }}</p>
    <p>原数组4：{{ arr4 }} --- 拍平后数组：{{ arrayFlat(arr4, Infinity) }}</p>

    <!-- 深拷贝 deepClone -->
    <h2>深拷贝 deepClone</h2>
    <p>xx=-=-=-=-=> 请看控制台</p>
  </div>
</template>

<script setup lang="ts">
  import { arrayFlat, deepClone } from '@/utils/toolMethods'

  // arrayFlat
  const arr1 = [[100]]
  const arr2 = [12, 'lsm', {}]
  const arr3 = [12, [21, 'hello'], arr2, arr1]
  const arr4 = ['aa', [arr1], arr2, arr3]

  // deepClone
  const obj1 = {
    name: 'lsm',
    aaa: undefined,
    others: {
      age: 12,
      lover: null,
      hasWork: true,
      members: {
        mother: 'm',
        father: 'f',
        brother: 'b',
        sister: 's'
      }
    },
    speak() {
      console.log('lsm-----speak')
    }
  }
  const obj1New = deepClone<typeof obj1>(obj1)
  obj1New.others.members.mother = 'mother'
  console.log('obj1 old ', obj1)
  console.log('obj1 new ', obj1New)

  const obj2 = [{ name: 1, age: 12 }, [10, 20]]
  const obj2New = deepClone(obj2)
  obj2New[1][1] = 200
  console.log('lsm-----obj2', obj2)
  console.log('lsm-----obj2New', obj2New)
</script>

<style scoped lang="less"></style>
