<!--
 * @Author: lisongming
 * @Date: 2024-04-02 11:51:29
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
  import 'leaflet/dist/leaflet.css'
  import L from 'leaflet'
  import { onMounted } from 'vue'
  import testImage from '@/assets/images/autumn.jpg'

  // vue api
  onMounted(() => {
    initMap()
  })

  async function initMap() {
    const map = new L.Map('map', {
      crs: L.CRS.Simple,
      minZoom: -3,
      maxZoom: 3
      // attributionControl: false,
      // zoomControl: false
    })

    const imageEle = await loadImage(testImage)
    const imageWidth = imageEle.width
    const imageHeight = imageEle.height

    const bounds = [
      [0, 0],
      [imageHeight, imageWidth]
    ]
    L.imageOverlay(imageEle, bounds).addTo(map)
    const boundsRect = [
      // [101, 123],
      // [421, 325]
      // [10, 10],
      // [110, 110]
      [imageHeight - 421, 123],
      [imageHeight - 101, 325]
      // [imageHeight - 100, 100],
      // [imageHeight - 400, 400]
    ]

    // 创建一个橙色的矩形
    L.rectangle(boundsRect, { color: 'blue', weight: 1 }).addTo(map)
    map.fitBounds(boundsRect)
    map.fitBounds(bounds)
  }

  function loadImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        resolve(image)
      }
      image.onerror = () => {
        reject('图片加载异常')
      }
    })
  }
</script>

<style scoped lang="less">
  .wrap {
    height: 500px;
  }
  #map {
    height: 100%;
  }
</style>
