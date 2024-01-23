<!--
 * @Author: lisongming
 * @Date: 2024-01-19 09:50:18
 * @LastEditors: lisongming
 * @Description: 折线
-->
<template>
  <div>
    <div ref="mapEcharts" class="map-echarts"></div>
  </div>
</template>

<script setup lang="ts">
  import { markRaw, onMounted, ref, unref } from 'vue'
  import * as echarts from 'echarts'

  // vue api
  onMounted(() => {
    init()
  })

  // echarts
  const mapEcharts = ref()
  const echartInit: any = ref()
  function init() {
    echartInit.value = markRaw(echarts.init(unref(mapEcharts)))
    const option = {
      backgroundColor: 'black',
      xAxis: {
        type: 'category'
        // data: ['2019-10-10', '2019-10-11', '2019-10-13', '2019-10-14', '2019-10-15', '2019-10-16']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
        // formatter: (params) => {
        //   console.log(params)
        //   return `<div>${params[0]?.value[1]}%</div>`
        // }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          color: 'red',
          symbolSize: 6,
          // data: [200, 560, 750, 580, 250, 300, 450, 300],
          data: [
            ['2019-10-10', 200],
            ['2019-10-11', 560],
            ['2019-10-12', 750],
            ['2019-10-13', 580],
            ['2019-10-14', 250],
            ['2019-10-15', 300],
            ['2019-10-16', 450],
            ['2019-10-17', 300],
            ['2019-10-18', 100]
          ],
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#1968FF'
              },
              {
                offset: 1,
                color: '#00FFFC'
              }
            ]),
            width: 4
          },
          itemStyle: {
            color: 'white',
            shadowColor: 'white',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 8
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(25, 104, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgb(25, 104, 255, 0.1)'
              }
            ])
          }
        }
      ]
    }

    echartInit.value.setOption(option)
  }
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1400px;
    height: 700px;
  }
</style>
