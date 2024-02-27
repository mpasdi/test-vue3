<template>
  <div class="review animated animate__rotateInDownLeft">
    <header class="header">
      <span @click="jump">测试后台</span>
      <span class="animated animate__wobble">2023复习</span>
    </header>

    <main class="main">
      <!-- 菜单区域 -->
      <aside class="aside animated animate__fadeInLeft">
        <MenuAside module-name="Review" />
      </aside>

      <!-- 测试内容区域 -->
      <main class="content animated animate__fadeInRight">
        <RouterView />
      </main>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import MenuAside from '@/components/layout/MenuAside.vue'
  import { RouterView } from 'vue-router'

  const router = useRouter()

  function jump() {
    router.push('/background')
  }
</script>

<style scoped lang="less">
  .review {
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
