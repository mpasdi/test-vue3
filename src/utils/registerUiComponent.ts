/*
 * @Author: lisongming
 * @Date: 2024-01-15 13:12:49
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { App } from 'vue'
import { Button, Input, DatePicker, Tabs } from 'ant-design-vue'

export function registerUiComponents(app: App) {
  app.use(Button).use(Input).use(DatePicker).use(Tabs)
}
