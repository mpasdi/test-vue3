<!--
 * @Author: lisongming
 * @Date: 2023-12-21 16:44:54
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="home animated" :class="{ animate__hinge: isHidden }">
    <div class="home-text animated animate__jackInTheBox" @click="jumpBackgroud">vue3 测试 >></div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const isHidden = ref(false)

  async function jumpBackgroud() {
    isHidden.value = true
    setTimeout(() => {
      router.push('/background')
    }, 2000)
  }
</script>

<style scoped lang="less">
  .home {
    height: 100vh;
    background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
    display: flex;
    justify-content: center;
    align-items: center;

    .home-text {
      background: linear-gradient(135deg, #ff9a9e, #fad0c4);
      font-size: 100px;
      font-weight: 800;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
    }
  }
</style>
