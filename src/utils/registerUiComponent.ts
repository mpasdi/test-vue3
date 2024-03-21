/*
 * @Author: lisongming
 * @Date: 2024-01-15 13:12:49
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { App } from 'vue'
// 添加组件时请同步 导入组件对应less文件
import { Button, Input, DatePicker, Tabs, Carousel, Table, Tag, Slider } from 'ant-design-vue'

export const registerUiComponents = {
  install(app: App) {
    app
      .use(Button)
      .use(Input)
      .use(DatePicker)
      .use(Tabs)
      .use(Carousel)
      .use(Table)
      .use(Tag)
      .use(Slider)
  }
}
