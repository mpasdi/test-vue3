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
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import { getUserList } from '@/api/expressApi'
  import { javaGetUserList } from '@/api/javaApi'

  // vue api
  onBeforeMount(() => {
    queryUserList()
    queryJavaUserList()
  })

  const userList = ref<Array<any>>([])
  const javaUserList = ref<Array<any>>([])

  async function queryUserList() {
    const res = await getUserList()
    userList.value = res as any
  }

  async function queryJavaUserList() {
    const res = await javaGetUserList()
    console.log('lsm----java res', res)
    javaUserList.value = res.data
  }
</script>

<style scoped lang="less"></style>
