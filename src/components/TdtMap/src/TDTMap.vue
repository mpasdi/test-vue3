<!--
 * @Author: lisongming
 * @Date: 2024-01-23 11:54:24
 * @LastEditors: lisongming
 * @Description: 基础天地图(该组件主要功能：渲染多个标点， 并绑定点击事件。)
-->
<template>
  <div id="map-container" class="tdt-map"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'

  // type
  import type { BaseTdtMapInfo } from '../types'

  // vue api
  onMounted(async () => {
    await initMap()
    handMapClickHandler()
    addMarker()
  })

  const props = withDefaults(defineProps<BaseTdtMapInfo>(), {
    mapType: 'TMAP_NORMAL_MAP',
    mapCenter: () => [116.40969, 39.89945],
    mapZoom: 12,
    isMapCanClick: true
  })

  const emit = defineEmits(['markerClick', 'mapClick'])

  watch(
    () => props.pointArr,
    () => {
      addMarker()
    },
    {
      deep: true
    }
  )

  function getImage(commonPath: string, name: string) {
    // return new URL(`../../../assets/` + commonPath + name, import.meta.url).href
    return new URL(`../../../assets/${commonPath + name}`, import.meta.url).href

    // 下面这种写法就是不行
    // return new URL(`../../../assets/${commonPath}${name}`, import.meta.url).href
  }

  // map
  const map = ref<any>()
  const T = window.T
  let lastClickMarker: any
  let iconSize = 26
  let clickIconSize = 38
  function initMap() {
    return new Promise((resolve, reject) => {
      const firstPointPosition = props.pointArr?.[0]?.pointPosition || null
      const positionArr = firstPointPosition || props.mapCenter // 地图中心点，默认第一个标点的坐标

      if (positionArr.length !== 2) {
        reject('请传入正确坐标点!')
      }

      let position = new T.LngLat(...positionArr) //确定坐标

      // 创建实例
      map.value = new T.Map('map-container', {
        minZoom: 4,
        maxZoom: 18
      })

      map.value.setMapType(window[props.mapType])
      map.value.centerAndZoom(position, 1) // 地图初始化
      resolve(null)
    })
  }

  //设置地图类型
  const setMapType = (mapType) => {
    map.value.setMapType(window[mapType])
  }

  // 添加标点
  function addMarker() {
    return new Promise((resolve, reject) => {
      if (props.pointArr?.length && !props.iconCommonPath) reject('路径地址不能为空')

      // 设置icon大小
      const firstPoint = props.pointArr?.[0]
      if (firstPoint?.pointIconSize && firstPoint?.pointIconClickSize) {
        iconSize = firstPoint.pointIconSize
        clickIconSize = firstPoint.pointIconClickSize
      }
      map.value.clearOverLays() //添加标点之前，先清空
      const LngLatArr: any = [] //所有标点的 经纬度数组

      props.pointArr?.map((item) => {
        if (item.pointPosition?.length !== 2) return
        const iconPointSize = new T.Point(iconSize, iconSize)
        const icon = new T.Icon({
          iconUrl: getImage(props.iconCommonPath as string, item.pointIconName),
          iconSize: iconPointSize,
          iconAnchor: iconPointSize
        })

        const LngLatPosition = new T.LngLat(...item.pointPosition)
        LngLatArr.push(LngLatPosition)
        const marker = new T.Marker(LngLatPosition, {
          icon
        }) // 创建标注
        map.value.addOverLay(marker) // 将标注添加到地图中
        console.log('lsm-----marker ', marker)
        addMarkerClickHandler(marker, item)
      })

      map.value.setViewport(LngLatArr)
      if (props.pointArr && props.pointArr.length <= 1) map.value.setZoom(props.mapZoom)
      resolve(null)
    })
  }

  // 注册maker 点击事件
  function addMarkerClickHandler(marker, item) {
    marker.addEventListener('click', function () {
      markerUpdate(marker)

      // const point = marker.getLngLat()
      emit('markerClick', marker, item)
    })
  }

  /**
   * marker 的触发动作
   * 单独抽取出来是为了：
   * 1. 在 marker点击事件的回调中触发
   * 2. 将该方法导出， 供给外部调用(可用于模拟marker点击事件)
   *   -- 上述两种操作方式是完全相反的
   *
   * */
  function markerUpdate(marker) {
    if (!marker) return
    const point = marker.getLngLat()
    const T = window.T
    // 移动地图到适应位置
    map.value.panTo(new T.LngLat(point.lng, point.lat), 12)

    /* ----------- marker 图标 -----------*/
    // marker 的图片放大， 其他icon还原
    resetLastMarker()
    const getMarkerIcon = marker.getIcon()
    const icon = new T.Icon({
      iconUrl: getMarkerIcon.options.iconUrl,
      iconSize: new T.Point(clickIconSize, clickIconSize),
      iconAnchor: getMarkerIcon.options.iconAnchor
    })
    marker.setIcon(icon)
    // 保存上一个marker，用来还原
    lastClickMarker = marker
  }

  // 还原上一个marker 大小
  function resetLastMarker() {
    const T = window.T
    if (lastClickMarker) {
      const lastMarkerIcon = lastClickMarker.getIcon()
      const icon = new T.Icon({
        iconUrl: lastMarkerIcon.options.iconUrl,
        iconSize: new T.Point(iconSize, iconSize),
        iconAnchor: lastMarkerIcon.options.iconAnchor
      })
      lastClickMarker.setIcon(icon)
    }
  }

  // 注册map 点击事件
  function handMapClickHandler() {
    if (!props.isMapCanClick) return
    map.value.addEventListener('click', (res) => {
      resetLastMarker()
      emit('mapClick', res.lnglat)
    })
  }

  defineExpose({
    mapInstance: map,
    setMapType,
    resetLastMarker,
    markerUpdate
  })
</script>

<style scoped lang="less">
  // 解决天地图自带样式 .tdt-map-pane svg: {position: relative} 导致的项目中的 Icon 组件位置异常
  :deep(.tdt-map-pane) {
    .app-iconify svg {
      position: unset;
    }
  }

  .tdt-map {
    height: 100%;
    width: 100%;
    z-index: 0;
  }
</style>
