<!--
 * @Author: lisongming
 * @Date: 2024-03-15 15:21:18
 * @LastEditors: lisongming
 * @Description: 接口请求测试
-->
<template>
  <div>
    <h1>接口请求测试</h1>

    <h2>getUserList</h2>
    <div v-for="item in userList" :key="item">{{ item }}</div>

    <h2>javaGetUserList</h2>
    <div v-for="item in javaUserList" :key="item.id">
      {{ item?.userName }} --- {{ item?.userAge }}
    </div>

    <h2>express static 静态代理测试</h2>
    <img alt="express.static" src="http://localhost:9332/images/lover.jpg" width="200" />

    <h2>getUserById</h2>
    <div>{{ singleUser }}</div>

    <h2>jsonp test</h2>
    <div>
      <a-button @click="jsonpTestFunc">jsonp 测试</a-button>
      <div>{{ jsonpData }}</div>
    </div>

    <h2>响应压缩测试</h2>
    <div>
      <a-button type="primary" @click="responseCompression">响应压缩测试</a-button>
      &nbsp;
      <a-button type="primary" @click="compressionInfo = ''">清除数据</a-button>

      <div>{{ compressionInfo }}</div>
    </div>

    <h2>缓存测试</h2>
    <div>
      <a-button type="primary" @click="postCacheTest">缓存测试</a-button>
      &nbsp;
      <a-button type="primary" @click="cacheInfo = ''">清除数据</a-button>

      <div>{{ cacheInfo }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue'
  import {
    getUserById,
    getUserList,
    jsonpTest,
    getInfoByCompression,
    cacheTest
  } from '@/api/expressApi'
  import { javaGetUserList } from '@/api/javaApi'

  // vue api
  onBeforeMount(() => {
    queryUserList()
    queryJavaUserList()
    getSingleUser()
  })

  const userList = ref<Array<any>>([])
  const javaUserList = ref<Array<any>>([])
  const singleUser = ref<any>({})
  const jsonpData = ref()

  async function queryUserList() {
    const res = await getUserList()
    userList.value = res as any
  }

  async function queryJavaUserList() {
    const res = await javaGetUserList()
    console.log('lsm----java res', res)
    javaUserList.value = res.data
  }

  async function getSingleUser() {
    const params = { id: 1 }
    const res = await getUserById(params)
    console.log('lsm----res single', res)
    singleUser.value = res
  }

  // jsonp
  async function jsonpTestFunc() {
    const params = {
      id: 1
    }
    const res = await jsonpTest(params, 'jsonpFunc')
    jsonpData.value = res
  }

  // 响应压缩测试
  const compressionInfo = ref()

  async function responseCompression() {
    const res = await getInfoByCompression()
    compressionInfo.value = res
    console.log('lsm-----res', res)
  }

  // 缓存测试
  const cacheInfo = ref()
  async function postCacheTest() {
    const res = await cacheTest()
    cacheInfo.value = res
  }
</script>

<style lang="less" scoped></style>
