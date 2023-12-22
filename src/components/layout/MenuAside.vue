<template>
  <div class="menu-aside">
    <div
      class="menu-aside_item animated animate__zoomIn"
      :class="{ selected: item.name === selectItemName }"
      v-for="item in currentModuleAside"
      :key="item.path"
      @click="menuClick(item)"
    >
      {{ item.meta?.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // type
  import type { RouteRecordRaw } from 'vue-router'

  // vue api
  const router = useRouter()
  const route = useRoute()
  console.log('lsm----route', route)
  const props = defineProps({
    moduleName: String
  })

  // menu
  const selectItemName = ref('')
  const currentModule = computed(() => {
    return router.options.routes.find((el) => el.name === props.moduleName)
  })

  const currentModuleAside = computed(() => {
    return currentModule.value?.children || []
  })

  watchEffect(() => {
    const currentAsidePath = route.path.split('/')[2]
    selectItemName.value =
      (currentModuleAside.value.find((item) => item.path === currentAsidePath)?.name as string) ??
      ''
  })

  function menuClick(item: RouteRecordRaw) {
    selectItemName.value = item.name as string
    const fullPath = currentModule.value?.path + '/' + item.path
    router.push(fullPath)
  }
</script>

<style scoped lang="less">
  .menu-aside {
    padding: 10px;
    &_item {
      width: 200px;
      height: 50px;
      line-height: 50px;
      background-color: #a1c4fd;
      font-size: 20px;
      font-weight: 550;
      border-radius: 7px;
      padding: 0 10px;
      overflow: hidden;
      white-space: no-wrap;
      text-overflow: ellipsis;
      margin-bottom: 10px;
      cursor: pointer;
    }

    &_item:hover {
      background-color: #c2e9fb;
      transition: all 0.5s;
    }

    .selected {
      background-color: #c2e9fb;
      transition: all 0.5s;
    }
  }
</style>
