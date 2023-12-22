/*
 * @Author: lisongming
 * @Date: 2023-12-22 13:20:40
 * @LastEditors: lisongming
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home/index.vue'

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]
