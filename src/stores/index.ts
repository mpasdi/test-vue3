/*
 * @Author: lisongming
 * @Date: 2023-12-21 18:06:15
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { createPinia } from 'pinia'

import type { App } from 'vue'

const store = createPinia()

function setupStore(app: App) {
  app.use(store)
}

export { setupStore, store }
