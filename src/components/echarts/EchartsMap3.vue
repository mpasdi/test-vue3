<!--
 * @Author: lisongming
 * @Date: 2024-01-17 10:26:34
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <div ref="mapEcharts" class="map-echarts"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, unref } from 'vue'
  import * as echarts from 'echarts'
  import chinaJson from './ChinaMapGeojson.json'

  // vue api
  onMounted(() => {
    init()
  })

  // data
  const hasDataProvinceInfo = [
    {
      code: '',
      name: '海南',
      position: [110.3893, 19.8516],
      projectNum: 3
    },
    {
      code: '',
      name: '广东',
      position: [113.12244, 23.009505],
      projectNum: 11
    }
  ]

  const startPointInfo = ref({
    position: [121.464811, 31.289111],
    name: '上海市'
  })
  const endPointInfo = ref({
    position: [116.471453, 40.025279],
    name: '北京'
  })

  // echarts
  const mapEcharts = ref()
  const series = ref([
    // 点
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        //涟漪特效
        period: 4, //动画时间，值越小速度越快
        brushType: 'fill', //波纹绘制方式 stroke, fill
        scale: 14 //波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          show: false,
          position: 'right', //显示位置
          offset: [5, 0], //偏移设置
          formatter: function (params) {
            //圆环显示文字
            return params.data.name
          },
          fontSize: 13
        },
        emphasis: {
          // show: true,
          show: false
        }
      },
      symbol: 'circle',
      symbolSize: function (val) {
        return 5 + val[2] * 5 //圆环大小
      },
      itemStyle: {
        normal: {
          show: false,
          color: '#34c6bb'
        }
      },
      data: [
        {
          value: startPointInfo.value.position.concat(0)
        },
        {
          value: endPointInfo.value.position.concat(0)
        }
      ]
    },
    // 线
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'circle', //箭头图标
        symbolSize: 10, //图标大小
        loop: false
      },
      lineStyle: {
        normal: {
          color: 'red',
          width: 1, //尾迹线条宽度
          opacity: 1, //尾迹线条透明度
          curveness: 0.3 //尾迹线条曲直度
        }
      },
      data: [
        [
          {
            coord: startPointInfo.value.position
          },
          {
            coord: endPointInfo.value.position
            // value: dataItem[0].value
          }
        ]
      ]
    }
  ])

  // init
  function init() {
    echarts.registerMap('china', chinaJson as any)
    const option = {
      // backgroundColor: 'transparent',
      backgroundColor: 'black',
      geo: {
        map: 'china',
        show: true,
        roam: false,
        zoom: 1,
        center: [113.83531246, 34.0267395887],
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            },
            // areaColor: 'red',
            shadowColor: 'rgba(128, 217, 248, 1)',
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      },
      series: series.value
    }
    const myChart = echarts.init(unref(mapEcharts))
    myChart.setOption(option)

    setTimeout(() => {
      series.value = {}
    }, 3000)
  }
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1400px;
    height: 800px;
  }
</style>
