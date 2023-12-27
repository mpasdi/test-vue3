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
          title: '自定义指令测试'
        }
      },
      {
        path: 'cssTest',
        name: 'CssTest',
        component: () => import('@/views/background/modules/CssTest.vue'),
        meta: {
          title: 'css测试'
        }
      },
      {
        path: 'componentTest',
        name: 'ComponentTest',
        component: () => import('@/views/background/modules/ComponentsTest.vue'),
        meta: {
          title: '组件测试'
        }
      },
      {
        path: 'vue3Test',
        name: 'Vue3Test',
        component: () => import('@/views/background/modules/Vue3Test.vue'),
        meta: {
          title: 'vu3测试'
        }
      }
    ]
  }
]

/* 
route 模板
{
  path: '',
  name: '',
  component: () => import(''),
  meta: {
    title: ''
  }
}
 */
