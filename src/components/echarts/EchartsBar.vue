<!--
 * @Author: lisongming
 * @Date: 2024-01-18 11:28:51
 * @LastEditors: lisongming
 * @Description: 描述
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

  const allData = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
  const allY = ['a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i', 'g']
  let myChart: any
  // echarts
  const mapEcharts = ref()
  function init() {
    myChart = echarts.init(unref(mapEcharts))

    const option = {
      backgroundColor: 'black',

      // title: {
      //   text: 'World Population'
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: false
      },
      xAxis: {
        // type: 'value',
        boundaryGap: [0, 0.01],
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(246, 246, 244)'
          }
        },
        max: 5,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        data: allY.slice(0, 6)
      },
      series: [
        {
          // name: '2012',
          realtimeSort: true,
          type: 'bar',
          data: allData.slice(0, 6),
          // barCategoryGap: '50%',
          label: {
            show: true,
            position: 'right',
            formatter: (params) => params.value + '台',
            color: 'white'
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgba(3, 230, 248, 0.1)' },
              { offset: 0.5, color: 'rgba(3, 230, 248, 0.5)' },
              { offset: 1, color: 'rgba(3, 230, 248,1)' }
            ])
          }
        }
      ]
    }

    myChart.setOption(option)
  }

  let index = 0
  function run() {
    index++
    const data = allData.slice(0 + index, 6 + index)
    const yData = allY.slice(0 + index, 6 + index)
    console.log('lsm-----data', data)
    if (data.length < 6) return
    myChart.setOption({
      yAxis: {
        data: yData
      },
      series: [
        {
          type: 'bar',
          data
        }
      ]
    })
  }

  setInterval(function () {
    run()
  }, 3000)
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1200px;
    height: 600px;
  }
</style>
