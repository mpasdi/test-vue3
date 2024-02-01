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
      <slot name="infoWindow" :windowInfo="pointInfo">
        <div class="slot-default">该位置是一个插槽</div>
      </slot>
    </div>

    <template v-if="isShowLabel">
      <div ref="mapLabelRef" v-for="(item, index) in pointArr" :key="index">
        <slot name="mapLabel" :labelInfo="item">
          <div class="slot-default">该位置是一个插槽</div>
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, readonly, onMounted, watchEffect } from 'vue'

  // components
  import TDTMap from './TDTMap.vue'

  // type
  import type { BaseTdtMapInfo, BasePointInfo } from '../types'

  interface windowPointInfo extends BasePointInfo {
    [x: string | number]: any
  }
  interface windowTdtMapInfo extends BaseTdtMapInfo {
    isShowLabel: boolean
  }

  // vue api
  const props = withDefaults(defineProps<windowTdtMapInfo>(), {
    isShowLabel: false
  })
  const emit = defineEmits(['markerClick', 'mapClick']) // 提供出来
  onMounted(() => {
    props.isShowLabel && watchEffect(addMapLabel)
  })

  // map
  const T = window.T
  const TDTMapRef = ref()
  const infoWindowRef = ref()
  const mapLabelRef = ref()
  const isShowWindowInfo = ref(false)
  const markerInfoWindow = ref<any>()
  const pointInfo = ref<windowPointInfo>()
  const map = computed(() => TDTMapRef.value.mapInstance)

  function addMapLabel() {
    props.pointArr?.map((item, index) => {
      if (!item.pointPosition) return

      var tmpNode = document.createElement('div')
      tmpNode.appendChild(mapLabelRef.value[index])

      const latlng = new T.LngLat(...item.pointPosition)
      const label = new T.Label({
        text: tmpNode.innerHTML,
        position: latlng,
        offset: new T.Point(0, 0)
      })

      // 创建地图文本对象
      map.value.addOverLay(label)
    })
  }

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
  :deep(.tdt-label) {
    background-color: transparent;
    padding: 0;
    line-height: fit-content;
    border: none;
    box-shadow: none;
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

  #map-label {
    min-width: 20px;
    max-width: 600px;
    min-height: 20px;
  }

  .slot-default {
    background: white;
  }
</style>
