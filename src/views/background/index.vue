<!--
 * @Author: lisongming
 * @Date: 2023-12-22 13:19:15
 * @LastEditors: lisongming
 * @Description: 后台测试
-->
<template>
  <div class="background animated animate__zoomIn">
    <header class="header">
      <span>测试后台</span>
      <span @click="jump">2023复习</span>
    </header>

    <main class="main">
      <!-- 菜单区域 -->
      <aside class="aside animated animate__fadeInLeft">
        <MenuAside module-name="Background" />
      </aside>

      <!-- 测试内容区域 -->
      <main class="content animated animate__fadeInRight">
        <RouterView />
      </main>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import MenuAside from '@/components/layout/MenuAside.vue'

  const router = useRouter()
  function jump() {
    router.push('/review')
  }
</script>

<style scoped lang="less">
  .background {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(135deg, #ff9a9e, #fad0c4);

    .header {
      text-align: center;
      padding: 10px;
      display: flex;
      justify-content: center;
      gap: 30px;

      span {
        font-size: 50px;
        font-weight: 700;
        cursor: pointer;
        user-select: none;

        color: #a1c4fd;
        --color1: pink;
        --color2: orangered;
        --color3: red;
        --color4: magenta;
        text-shadow:
          0 0 10px var(--color1),
          0 0 20px var(--color2),
          0 0 40px var(--color3),
          0 0 80px var(--color4);
      }
    }

    .main {
      height: 100%;
      padding: 100px 200px;
      display: flex;
      gap: 30px;

      .aside {
        // background-color: red;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
      }

      .content {
        flex: 1;
        border-radius: 10px;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.3);
        overflow-y: auto;
        height: calc(100vh - 300px);
      }
    }
  }
</style>
