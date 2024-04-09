/*
 * @Author: lisongming
 * @Date: 2023-12-21 16:25:10
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/css/index'
import { registerUiComponents } from './utils/registerUiComponent'
import { registerDirective } from '@/utils/redgisterDirective'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册ui组件
app.use(registerUiComponents)

// 注册自定义指令
app.use(registerDirective)

app.mount('#app')
