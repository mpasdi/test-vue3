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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
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
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'World1', 'wirld2']
      },
      series: [
        {
          name: '2012',
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807, 121211, 341211],
          barCategoryGap: '50%',
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
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1200px;
    height: 600px;
  }
</style>
