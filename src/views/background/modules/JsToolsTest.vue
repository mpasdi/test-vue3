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

    <h2>使用a元素实现下载</h2>
    <a-button
      @click="
        downloadByAEle('http://122.152.220.184:8223/api/downloadFile/test%E4%B8%8B%E8%BD%BD.txt')
      "
    >
      下载
    </a-button>

    <!-- 前端实现导出功能 -->
    <h2>前端实现导出功能</h2>
    <a-button type="primary" @click="tableExport(columnsObj, tableData, 'test.xlsx')">
      导出表格
    </a-button>
    <a-table :dataSource="tableData" :columns="columns" />

    <!-- 复制文本功能 -->
    <h2>文本复制功能</h2>
    <a-button @click="textCopy(tableData)">文本拷贝</a-button>

    <h2>instanceof 实现</h2>
    <div>{{ ins_obj }} ---- {{ customInstanceof(ins_obj, Object) }}</div>
    <div>{{ ins_arr }} ---- {{ customInstanceof(ins_arr, Array) }}</div>
    <div>{{ ins_fun }} ---- {{ customInstanceof(ins_fun, Object) }}</div>
    <div>{{ ins_map }} ---- {{ customInstanceof(ins_map, Map) }}</div>
    <div>{{ ins_set }} ---- {{ customInstanceof(ins_set, Set) }}</div>
    <div>ins_obj, Array ---- {{ customInstanceof(ins_obj, Array) }}</div>
    <div>null object ---- {{ customInstanceof(null, Object) }}</div>
  </div>
</template>

<script setup lang="ts">
  import {
    arrayFlat,
    deepClone,
    downloadByAEle,
    tableExport,
    textCopy,
    customInstanceof
  } from '@/utils/toolMethods'
  import { computed } from 'vue'

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

  // tableExport
  const columnsObj = {
    name: '姓名',
    age: '年龄',
    address: '地址'
  }
  const tableData = new Array(3).fill(0).map((_, index) => ({
    id: index,
    name: '姓名' + index,
    age: '年龄' + index,
    address: '地址' + index
  }))
  const columns = computed(() => {
    return Object.entries(columnsObj).map((item) => ({
      title: item[1],
      dataIndex: item[0],
      key: item[0]
    }))
  })

  //   instanceof
  let ins_obj = {}
  let ins_arr = []
  let ins_fun = function () {}
  let ins_map = new Map()
  let ins_set = new Set()
</script>

<style scoped lang="less"></style>
