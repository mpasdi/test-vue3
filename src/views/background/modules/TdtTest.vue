<!--
 * @Author: lisongming
 * @Date: 2024-01-31 11:58:45
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div class="tdt">
    <TDTMapInfoWindow
      map-type="TMAP_SATELLITE_MAP"
      icon-common-path="icons/"
      :point-arr="pointArr"
      ref="TDTMapInfoWindowRef"
    >
      <!-- 自定义弹窗 -->
      <template #infoWindow="{ windowInfo }">
        <div class="info-window">
          <div class="title">项目详情</div>
          <div class="name">{{ windowInfo?.projectName }}</div>
          <div class="attr">工程子类型：{{ windowInfo?.projectTypeName }}</div>
          <div class="attr">项目地址：{{ windowInfo?.projectAddress }}</div>
          <div class="attr">icon name：{{ windowInfo?.pointIconName }}</div>
          <div class="attr">icon position：{{ windowInfo?.pointPosition }}</div>

          <!-- <a-button @click="TDTMapInfoWindowRef.closeInfoWindow(false)> 关闭 </a-button> -->
        </div>
      </template>
    </TDTMapInfoWindow>

    <div class="outter-click">
      <a-button type="primary" @click="outClick(pointArr[0])">外部点击事件</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import TDTMapInfoWindow from '@/components/TdtMap/src/TDTMapInfoWindow.vue'

  // map
  const TDTMapInfoWindowRef = ref()
  const pointArr = ref<any[]>([
    {
      pointIconName: 'icon17.png',
      pointIconSize: 48,
      pointIconClickSize: 56,
      pointPosition: [123.424313, 40.424521]
    },
    {
      pointIconName: 'icon17.png',
      pointIconSize: 48,
      pointIconClickSize: 56,
      pointPosition: [123.424313, 41.424521]
    }
  ])

  // click
  function outClick(item) {
    TDTMapInfoWindowRef.value?.outClick(item)
  }
</script>

<style scoped lang="less">
  .tdt {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .info-window {
    width: 250px;
    height: 200px;
    margin-top: -10px;
    padding: 0 24px;
    overflow: hidden;
    // background: url('@/assets/images/big-screen/bgs/bg3.png');
    background-color: rgba(130, 110, 142, 0.6);
    border-radius: 10px;
    background-size: 100% 100%;
    color: white;

    .title {
      margin-top: 13px;
      font-size: 16px;
      text-align: center;
    }

    .name {
      margin: 17px 0;
      text-align: center;
    }

    .attr {
      padding: 0 20px 10px 10px;
    }
  }

  .outter-click {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
