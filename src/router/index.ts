/*
 * @Author: lisongming
 * @Date: 2023-12-21 16:25:10
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { createRouter, createWebHistory } from 'vue-router'

// modules
import { HomeRoute } from './modules/home'
import { Background } from './modules/background'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...HomeRoute, ...Background]
})

export default router
