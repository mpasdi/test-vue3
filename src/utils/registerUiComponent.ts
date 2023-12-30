import { App } from 'vue'
import { Button, Input, DatePicker } from 'ant-design-vue'

export function registerUiComponents(app: App) {
  app.use(Button).use(Input).use(DatePicker)
}
