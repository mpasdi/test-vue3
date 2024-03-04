<!--
 * @Author: lisongming
 * @Date: 2024-03-01 13:56:41
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    我是测试组件
    <a-tag color="blue">{{ proVal }}</a-tag>
    <a-button @click="updateUserState">state 状态监听测试</a-button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, useAttrs, inject } from 'vue'
  import { useUser } from '@/stores/modules/user'

  // vue api
  const attr = useAttrs()
  onMounted(() => {
    console.log('lsm----attr', attr)
    console.log('lsm----sub numVal', proVal.value)
    // proVal.value = 10 // 不会生效
  })
  const proVal = inject('numVal', 10)
  const userStore = useUser()

  // data
  const compIndex = ref(1)

  function compFunc() {
    console.log('lsm --- compIndex', compIndex.value + '10')
  }

  function updateUserState() {
    const user = {
      userName: 'update other name ',
      userAge: 30
    }
    userStore.setUserInfo(user)
  }

  defineExpose({
    compIndex,
    compFunc
  })
</script>

<style scoped lang="less"></style>
