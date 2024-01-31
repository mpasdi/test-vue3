<!--
 * @Author: lisongming
 * @Date: 2024-01-25 11:56:47
 * @LastEditors: lisongming
 * @Description: 基于基础天地图（TDTMap） 新增：点击标点 弹出信息窗体
-->
<template>
  <div class="tdt-map-info-window">
    <TDTMap
      :point-arr="pointArr"
      :icon-common-path="iconCommonPath"
      :map-type="mapType"
      @marker-click="markerClick"
      @map-click="mapClick"
      ref="TDTMapRef"
    />
    <div id="info-window" ref="infoWindowRef" v-show="isShowWindowInfo">
      <slot name="infoWindow" :windowInfo="pointInfo">该位置是一个插槽</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, readonly } from 'vue'

  // type
  import type { BaseTdtMapInfo, BasePointInfo } from '../types'

  // components
  import TDTMap from './TDTMap.vue'

  interface windowPointInfo extends BasePointInfo {
    [x: string | number]: any
  }

  // vue api
  defineProps<BaseTdtMapInfo>()
  const emit = defineEmits(['markerClick', 'mapClick']) // 提供出来

  // map
  const T = window.T
  const TDTMapRef = ref()
  const infoWindowRef = ref()
  const isShowWindowInfo = ref(false)
  const markerInfoWindow = ref<any>()
  const pointInfo = ref<windowPointInfo>()
  const map = computed(() => TDTMapRef.value.mapInstance)

  function closeInfoWindow() {
    isShowWindowInfo.value = false
    markerInfoWindow.value?.closeInfoWindow()
    TDTMapRef.value.resetLastMarker()
  }

  // 点击标点 弹出信息窗体
  async function markerClick(marker, itemMarkerInfo: windowPointInfo) {
    markerUpdate(marker, itemMarkerInfo)
    emit('markerClick', itemMarkerInfo)
  }

  function markerUpdate(marker, itemMarkerInfo) {
    pointInfo.value = itemMarkerInfo

    // 创建信息窗口对象
    markerInfoWindow.value = new T.InfoWindow('', {
      offset: new T.Point(70, -20),
      closeOnClick: true,
      minWidth: 50,
      maxWidth: 600,
      closeButton: false
    })

    isShowWindowInfo.value = true
    markerInfoWindow.value.setContent(infoWindowRef.value)

    // 弹框关闭时的回调
    // markerInfoWin.addEventListener('close', () => {});
    map.value.openInfoWindow(markerInfoWindow.value, marker.getLngLat()) //开启信息窗口
  }

  function outClick(itemMarkerInfo) {
    const LngLatPosition = new T.LngLat(...itemMarkerInfo.pointPosition)
    const temMarker = new T.Marker(LngLatPosition, {}) // 根据传入信息创建一个marker， 为了和地图上的所有的marker进行比较
    const temMarkerPosition = temMarker.getLngLat()

    const allMarkers = map.value?.getOverlays()
    //找图地图上marker
    const marker = allMarkers.find((itemMarker) => {
      const position = itemMarker.getLngLat()
      return (
        temMarkerPosition['lng'] == position['lng'] && temMarkerPosition['lat'] == position['lat']
      )
    })

    // 对地图上的marker 进行操作
    TDTMapRef.value?.markerUpdate(marker)
    markerUpdate(marker, itemMarkerInfo)
  }

  // 点击地图关闭信息窗体
  function mapClick() {
    emit('mapClick')
  }

  const setMapType = (mapType) => {
    map.value.setMapType(window[mapType])
  }

  const clearMaker = () => {
    if (map.value) {
      map.value.clearOverLays(null)
    }
  }

  defineExpose({
    isShowWindowInfo: readonly(isShowWindowInfo),
    closeInfoWindow,
    setMapType,
    clearMaker,
    mapInstance: map,
    outClick
  })
</script>

<style lang="less" scoped>
  :deep(.tdt-left) {
    display: none;
  }

  :deep(.tdt-infowindow-tip-container) {
    display: none;
  }

  :deep(.tdt-infowindow-content-wrapper) {
    height: 0;
    padding: 0;
  }

  .tdt-map-info-window {
    height: 100%;
    width: 100%;
    position: relative;
  }

  #info-window {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    min-width: 100px;
    max-width: 600px;
    min-height: 20px;
    // background: rgb(255 255 255 / 40%);
  }
</style>
