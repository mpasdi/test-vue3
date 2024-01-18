<!--
 * @Author: lisongming
 * @Date: 2024-01-18 10:36:06
 * @LastEditors: lisongming
 * @Description: 雷达图
-->
<template>
  <div>
    <div ref="mapEcharts" class="map-echarts"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, unref } from 'vue'
  import * as echarts from 'echarts'

  // vue api
  onMounted(() => {
    init()
  })

  // echarts
  const mapEcharts = ref()

  function init() {
    const myChart = echarts.init(unref(mapEcharts))

    const option = {
      // backgroundColor: 'black',
      // title: {
      //   text: 'Basic Radar Chart'
      // },
      legend: {
        data: ['Allocated Budget', 'Actual Spending'],
        show: false
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '完整性', max: 30000 },
          { name: '安全性', max: 30000 },
          { name: '可靠性', max: 30000 },
          { name: '稳定性', max: 30000 },
          { name: '准确性', max: 30000 }
        ],
        splitNumber: 5,
        axisName: {
          color: 'rgba(40, 140, 255)'
        },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(40, 140, 255, 0.3)',
              'rgba(40, 140, 255, 0.4)',
              'rgba(40, 140, 255, 0.5)',
              'rgba(40, 140, 255, 0.6)',
              'rgba(40, 140, 255, 0.8)',
              'rgba(40, 140, 255, 1)'
            ].reverse()
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(40, 140, 255, 0.5)'
          }
        }
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          symbol: 'none',
          itemStyle: {
            // color: '#F9713C'
            color: 'rgba(40, 140, 255, 1)'
          },
          data: [
            {
              value: [25000, 24000, 28000, 26000, 22000, 21000]
              // name: 'Actual Spending'
            }
          ],
          areaStyle: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
              {
                offset: 0,
                color: 'rgba(40, 140, 255, 0.1)'
              },
              {
                offset: 1,
                color: 'rgba(40, 140, 255, 1)'
              }
            ])
          }
        }
      ]
    }

    myChart.setOption(option)
  }
</script>

<style scoped>
  .map-echarts {
    width: 1200px;
    height: 600px;
  }
</style>
