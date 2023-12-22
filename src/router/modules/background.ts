/*
 * @Author: lisongming
 * @Date: 2023-12-22 13:23:42
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { RouteRecordRaw } from 'vue-router'

export const Background: RouteRecordRaw[] = [
  {
    path: '/background',
    name: 'Background',
    component: () => import('@/views/background/index.vue'),
    redirect: '/background/directive',
    meta: {
      title: '后台测试'
    },
    children: [
      {
        path: 'directive',
        name: 'Directive',
        component: () => import('@/views/background/modules/CustomDirective.vue'),
        meta: {
          title: '自定义指定测试'
        }
      }
    ]
  }
]
