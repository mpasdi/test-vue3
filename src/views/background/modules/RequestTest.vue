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
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import { getUserList } from '@/api/expressApi/index'

  // vue api
  onBeforeMount(() => {
    queryUserList()
  })

  const userList = ref<Array<any>>([])

  async function queryUserList() {
    const res = await getUserList()
    userList.value = res
  }
</script>

<style scoped lang="less"></style>
