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
    <img width="200" src="http://localhost:9332/images/lover.jpg" alt="express.static" />

    <h2>getUserById</h2>
    <div>{{ singleUser }}</div>

    <h2>jsonp test</h2>
    <div>
      <a-button @click="jsonpTestFunc">jsonp 测试</a-button>
      <div>{{ jsonpData }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import { getUserById, getUserList, jsonpTest } from '@/api/expressApi'
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

  async function jsonpTestFunc() {
    const params = {
      id: 1
    }
    const res = await jsonpTest(params, 'jsonpFunc')
    jsonpData.value = res
  }
</script>

<style scoped lang="less"></style>
