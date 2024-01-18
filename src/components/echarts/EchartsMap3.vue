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
  import { onMounted, ref, unref } from 'vue'
  import * as echarts from 'echarts'
  import chinaJson from './ChinaMapGeojson.json'

  // vue api
  onMounted(() => {
    init()
    setTimeout(() => {
      // series.value = []
      startPointInfo.value.position = [90.447408, 40.559334]
      endPointInfo.value.position = [109.093068, 23.45767]
      refreshSeries()
      refresh()
      setTimeout(() => {
        series.value[0].data.push(
          ...[{ value: [121.464811, 31.289111, 0] }, { value: [116.471453, 40.025279, 0] }]
        )

        series.value[1].data.push([
          {
            coord: [121.464811, 31.289111]
          },
          {
            coord: [116.471453, 40.025279]
          }
        ])
        refresh()
      }, 2000)
    }, 3000)
  })

  // data
  const hasDataProvinceInfo = ref<Array<any>>([
    {
      code: '',
      name: '海南省',
      position: [110.3893, 19.8516],
      projectNum: 3
    },
    {
      code: '',
      name: '广东省',
      position: [113.12244, 23.009505],
      projectNum: 11
    }
  ])

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
  const echartInit: any = ref()
  const series = ref<any[]>([
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

  function refreshSeries() {
    series.value = [
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
    ]
  }

  // init
  function init() {
    echarts.registerMap('china', chinaJson as any)
    echartInit.value = echarts.init(unref(mapEcharts))

    refresh()

    echartInit.value?.on('click', function (params) {
      console.log('lsm--', params) // 输出被点击的地理区域信息
      if (!params.region?.external) return
      console.log('lsm----params region', params.region?.external)
    })
  }

  function refresh() {
    echartInit.value?.clear()
    console.log('lsm-----series', series.value)
    const option = {
      // backgroundColor: 'transparent',
      backgroundColor: 'black',
      tooltip: {
        className: 'custom-tooltip-bk-box', //添
        triggerOn: 'mousemove', // 鼠标移动时触发
        backgroundColor: 'transparent', //提示标签背景颜色 这里设置为了透明色
        textStyle: { color: 'transparent' } //提示标签字体颜色
        // show: false
      }, // 必须有， geo中的 tooltip 才生效
      geo: {
        map: 'china',
        show: true,
        roam: false,
        zoom: 1,
        center: [113.83531246, 34.0267395887],
        regions: hasDataProvinceInfo.value.map((item) => ({
          name: item.name,
          itemStyle: {
            // areaColor: 'red',
            // color: 'red',
            borderColor: 'rgba(128, 217, 248, 1)',
            emphasis: {
              areaColor: 'rgba(128, 217, 248, 0.4)'
            }
          },
          tooltip: {
            className: 'custom-tooltip-bk-box', //添加一个类名
            triggerOn: 'mousemove', // 鼠标移动时触发
            // position: function (pos, params, dom, rect, size) {
            //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            //   var obj = { top: 60 }
            //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            //   return obj
            // },
            axisPointer: {
              type: 'none'
            },
            // 鼠标移到图里面的浮动提示框
            // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
            formatter(params) {
              let htmlStr = `
              <div class="custom-tooltip-box">
                <h3 style='text-align: center;color: white;'>${params.name}</h3>
                <div style='text-align: center;'>项目总数量：<span style='color: #00FFFC;font-size:20px;'>${11}</span>个</div>
                <div>
                  <div style='margin-top:8px;'>
                   地区：${21}/个
                  </div>
                </div>
              </div>
            `
              return htmlStr
            },
            backgroundColor: 'rgba(255,255,255,0)', //提示标签背景颜色 这里设置为了透明色
            textStyle: { color: '#fff' } //提示标签字体颜色
          },
          select: {
            itemStyle: {
              areaColor: 'rgba(128, 217, 248, 0.4)',
              borderColor: 'rgba(128, 217, 248, 1)'
            },
            label: {
              show: true,
              color: 'rgba(128, 217, 248)',
              // position: 'insideRight',
              // distance: 5,
              fontSize: '10'
            }
          },
          external: item
        })),
        selectedMode: 'single',
        select: {
          itemStyle: {
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
            }
          },
          label: {
            show: true,
            color: 'rgba(128, 217, 248)',
            // position: 'insideRight',
            // distance: 5,
            fontSize: '10'
          }
        },
        label: {
          show: true,
          color: 'orange',
          // position: 'insideRight',
          // distance: 5,
          fontSize: '10',
          emphasis: {
            color: 'rgba(128, 217, 248)'
          }
        },
        itemStyle: {
          normal: {
            borderColor: 'rgba(147, 235, 248, 0.1)',
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
            // areaColor: 'rgba(128, 217, 248, 0.4)'
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
            }
            // borderWidth: 0
          }
        }
      },
      series: series.value
    }
    echartInit.value?.setOption(option)
  }
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1400px;
    height: 700px;
  }

  :deep .custom-tooltip-bk-box {
    box-shadow: none !important; //去掉自带的阴影与边框
    border: none;
    border-width: 0 !important;
    .custom-tooltip-box {
      // background: url(../../assets/images/tc-bg.png) no-repeat;
      background-color: rgba(128, 217, 248, 0.4);
      background-size: 100% 100%;
      min-width: 300px;
      height: fit-content;
      padding: 20px 30px 4px !important;
      p {
        line-height: 0px;
      }
    }
  }
</style>
