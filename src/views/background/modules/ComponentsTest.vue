<!--
 * @Author: lisongming
 * @Date: 2023-12-27 10:10:33
 * @LastEditors: lisongming
 * @Description: 组件测试
-->
<template>
  <div class="wrap">
    <h1>组件测试，主要测试第三方组件</h1>

    <h2>1. input 标签中的type=image 测试</h2>
    <input type="image" src="" />
    <input
      type="image"
      src="http://122.152.220.184:9000/bucket-1/image/js_1702216443238.webp"
      class="input-image"
    />

    <h2>2. antd rangePicker 测试</h2>
    <div>
      <a-range-picker
        showTime
        :value="hackValue || value"
        :disabled-date="disabledDate"
        @change="onChange"
        @openChange="onOpenChange"
        @calendarChange="onCalendarChange"
        class="disabled-css"
      />
    </div>

    <!--    3. antd rangePicker v-model测试 -->
    <h2>3. antd rangePicker v-model测试</h2>
    <a-range-picker showTime v-model:value="commonTimevalue" />
    选中时间 time： {{ commonTimevalue }}
    <br />
    <a-range-picker v-model:value="commonTimevalue" />
    选中时间： {{ commonTimevalue }}

    <h2>4. antd Carousel 走马灯测试</h2>
    <div class="carousel-wrap">
      <a-carousel ref="carouselRef" dot-position="left" :dots="false">
        <div>
          <h3>{{ showValue0 }}</h3>
        </div>
        <div>
          <h3>{{ showValue1 }}</h3>
        </div>
      </a-carousel>
    </div>
    21
    <div ref="echartRef" class="echart-class"></div>
    <a-carousel dot-position="left" :dots="true">
      <div>
        <!-- <div ref="echartRef" class="echart-class"></div> -->
      </div>
      <div>
        <h3>111</h3>
      </div>
    </a-carousel>

    <!-- <div class="carousel-wrap">
      <a-carousel dot-position="left" :dots="true">
        <div>
          <h3><EchartsLine /></h3>
        </div>
        <div>
          <h3><EchartsBar /></h3>
        </div>
      </a-carousel>
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, unref, onUnmounted } from 'vue'
  import { Dayjs } from 'dayjs'
  import * as echarts from 'echarts'

  // import EchartsLine from '@/components/echarts/EchartsLine.vue'
  // import EchartsBar from '@/components/echarts/EchartsBar.vue'

  //types
  type RangeValue = [Dayjs, Dayjs]

  // 2. antd rangePicker 测试
  /**
   *  解决方式：
   *    1. 选择完时间 进行验证
   *    2. 切换 输入框 进行验证
   *    3. 进制切换
   *    4. 点击picker的时候触发 按钮点击事件
   *    5. 在弹窗的时候禁止
   */
  const dates = ref<RangeValue>()
  const value = ref<RangeValue>()
  const hackValue = ref<RangeValue>()

  const disabledcss = ref('all')

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
      disabledcss.value = 'none'
    } else {
      hackValue.value = undefined
      disabledcss.value = 'all'
    }
  }

  const onChange = (val: RangeValue) => {
    value.value = val
  }

  const onCalendarChange = (val: RangeValue) => {
    dates.value = val
  }

  //   3. antd rangePicker v-model测试
  const commonTimevalue = ref<RangeValue>()

  // 4 走马灯测试
  const carouselRef = ref()
  const data = new Array(10).fill(0).map((_, index) => 'value _ ' + index)
  const showValue0 = ref(data[0])
  const showValue1 = ref('')
  const currentValue = ref(0)
  let currentIndex = 0
  let interTimer: any

  onMounted(() => {
    interTimer = setInterval(() => {
      currentIndex++
      if (currentIndex > data.length - 1) {
        clearInterval(interTimer)
        return
      }
      if (currentValue.value == 0) {
        currentValue.value = 1
        showValue1.value = data[currentIndex]
      } else {
        currentValue.value = 0
        showValue0.value = data[currentIndex]
      }
      console.log('lsm-----ref', carouselRef.value)
      carouselRef.value.next()
    }, 4000)

    initEchart()
  })

  onUnmounted(() => {
    clearInterval(interTimer)
  })

  const echartRef = ref()
  let echartInstance: any
  function initEchart() {
    echartInstance = echarts.init(unref(echartRef))
    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
    echartInstance.setOption(option)
  }
</script>

<style scoped lang="less">
  .wrap {
    height: 100%;
    // overflow: auto;
  }
  .input-image {
    width: 200px;
  }

  .disabled-css {
    pointer-events: v-bind(disabledcss);
  }

  .carousel-wrap {
    width: 1000px;
  }

  .ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 200px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel :deep(.slick-slide h3) {
    color: #fff;
  }

  .echart-class {
    width: 200px;
    height: 200px;
  }
</style>
