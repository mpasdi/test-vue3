/*
 * @Author: lisongming
 * @Date: 2024-01-15 13:12:49
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { RouteRecordRaw } from 'vue-router'

export const Review: RouteRecordRaw[] = [
  {
    path: '/review',
    name: 'Review',
    component: () => import('@/views/review/index.vue'),
    redirect: '/review/tsTest',
    meta: {
      title: '复习'
    },
    children: [
      {
        path: 'tsTest',
        name: 'TsTest',
        component: () => import('@/views/review/modules/TsTest.vue'),
        meta: {
          title: 'ts复习'
        }
      },
      {
        path: 'jsPath',
        name: 'JsPath',
        component: () => import('@/views/review/modules/JsReview.vue'),
        meta: {
          title: 'js复习'
        }
      },
      {
        path: 'workNoteReview',
        name: 'WorkNoteReview',
        component: () => import('@/views/review/modules/WorkNoteReview.vue'),
        meta: {
          title: '工作笔记复习'
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
