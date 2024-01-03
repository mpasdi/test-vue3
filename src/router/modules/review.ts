import { RouteRecordRaw } from 'vue-router'

export const Review: RouteRecordRaw[] = [
  {
    path: '/review',
    name: 'Review',
    component: () => import('@/views/review/index.vue'),
    meta: {
      title: '复习'
    },
    children: []
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
