/*
 * @Author: lisongming
 * @Date: 2023-12-21 16:25:10
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

// modules
const allRoutes: any = import.meta.glob('./modules/**.ts', {
  eager: true
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(allRoutes)
    .map((item: any) => Object.values(item))
    .flat(Infinity) as RouteRecordRaw[]
})

export default router
