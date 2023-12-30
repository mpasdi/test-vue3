<!--
 * @Author: lisongming
 * @Date: 2023-12-27 10:10:33
 * @LastEditors: lisongming
 * @Description: 组件测试
-->
<template>
  <div>
    <h1>组件测试，主要测试第三方组件</h1>

    <h2>1. input 标签中的type=image 测试</h2>
    <input type="image" src="" />
    <input
      type="image"
      src="http://122.152.220.184:9000/bucket-1/image/js_1702216443238.webp"
      class="input-image"
    />

    <h2>2. antd rangePicker 测试</h2>
    <a-range-picker
      showTime
      :value="hackValue || value"
      :disabled-date="disabledDate"
      @change="onChange"
      @openChange="onOpenChange"
      @calendarChange="onCalendarChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Dayjs } from 'dayjs'

  //types
  type RangeValue = [Dayjs, Dayjs]

  // 2. antd rangePicker 测试
  const dates = ref<RangeValue>()
  const value = ref<RangeValue>()
  const hackValue = ref<RangeValue>()

  const disabledDate = (current: Dayjs) => {
    if (!dates.value || (dates.value as any).length === 0) {
      return false
    }
    const tooLate = dates.value[0] && current.diff(dates.value[0], 'days') > 7
    const tooEarly = dates.value[1] && dates.value[1].diff(current, 'days') > 7
    return tooEarly || tooLate
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      dates.value = [] as any
      hackValue.value = [] as any
    } else {
      hackValue.value = undefined
    }
  }

  const onChange = (val: RangeValue) => {
    value.value = val
  }

  const onCalendarChange = (val: RangeValue) => {
    dates.value = val
  }
</script>

<style scoped lang="less">
  .input-image {
    width: 200px;
  }
</style>