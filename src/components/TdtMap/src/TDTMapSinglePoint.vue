<!--
 * @Author: lisongming
 * @Date: 2023-11-07 17:54:20
 * @LastEditors: lisongming
 * @Description: 基于基础天地图（TDTMap） 点击单点 点击地图， 切换点位置，返回位置信息
-->
<template>
  <div class="w-full h-full relative">
    <TDTMap
      :point-arr="pointArr"
      :icon-common-path="iconCommonPath"
      :is-map-can-click="isMapCanClick"
      :map-zool="mapZool"
      @map-click="mapClick"
      ref="TDTMapRef"
    />
    <div class="absolute top-10px left-10px" v-if="isShowSelectInput">
      <a-select
        v-model:value="searchVal"
        show-search
        placeholder="地址搜索"
        style="width: 300px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :options="searchData"
        @search="handleSearch"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import TDTMap from './TDTMap.vue'

  // type
  import type { BaseTdtMapInfo, BasePointInfo } from '../types'

  interface singlePointMap extends BaseTdtMapInfo {
    pointInfo: BasePointInfo
    isShowSelectInput?: boolean
  }

  // vue api
  const props = withDefaults(defineProps<singlePointMap>(), {
    pointInfo: () => ({
      pointPosition: [116.40969, 39.89945],
      pointIconName: 'position.png'
    }),
    iconCommonPath: 'icons/smallIcons/',
    mapType: 'TMAP_NORMAL_MAP',
    mapCenter: () => [116.40969, 39.89945],
    mapZool: 12,
    isShowSelectInput: false,
    isMapCanClick: true
  })
  const emit = defineEmits(['mapClick'])

  // map
  const T = window.T
  const TDTMapRef = ref()
  const map = computed(() => TDTMapRef.value.mapInstance)
  const pointArr = ref<
    Array<{
      pointPosition: number[]
      pointIconName: string
      pointIconSize?: number
      pointName?: string
    }>
  >([])

  watch(
    () => props.pointInfo,
    (res) => {
      if (res.pointPosition?.length !== 2) {
        pointArr.value = []
        // Promise.reject('请传入有效坐标经纬度')
      } else {
        pointArr.value = [
          {
            pointPosition: res.pointPosition,
            pointIconName: res.pointIconName || 'position.png'
          }
        ]
      }
      // if (!res.pointIconName) {
      //   Promise.reject('icon名称不能为空')
      // }
    },
    {
      immediate: true,
      deep: true
    }
  )

  function mapClick(lnglat) {
    // 返回当前点击位置信息

    const geocoder = new T.Geocoder()
    geocoder.getLocation(lnglat, (res) => {
      if (res?.status !== '0') return
      const address = res.formatted_address
      const addressDetail = res.addressComponent
      const ownCity = ['北京市', '天津市', '上海市', '重庆市']
      const codeObj = {
        province: addressDetail.province_code.slice(3, 5) + '0000',
        city: ownCity.includes(addressDetail.province)
          ? addressDetail.city_code.slice(3, 5) + '0000'
          : addressDetail.city_code.slice(3, 7) + '00',
        area: addressDetail.county_code.slice(3, 9)
      }

      emit('mapClick', codeObj, address, addressDetail, [lnglat.lng, lnglat.lat])
    })

    // 切换marker 位置， 只要换pointArr 数据即可
    pointArr.value = [
      {
        pointPosition: [lnglat.lng, lnglat.lat],
        pointIconName: pointArr.value[0]?.pointIconName || 'position.png'
      }
    ]
  }

  // search input
  const searchVal = ref()
  const searchData = ref<string[]>([])

  function handleSearch(val: string) {
    searchVal.value = val
    const localSearch = new T.LocalSearch(map.value, {
      pageCapacity: 20,
      onSearchComplete: getSearchValues
    })
    localSearch.search(val, 7)
    searchData.value = []
  }

  function handleChange(val: string) {
    const lnglat = val?.split(',') || []
    if (lnglat?.length === 2) {
      mapClick(new T.LngLat(...lnglat))
    }
  }

  function getSearchValues(res) {
    const addressList = res.getPois() || []
    searchData.value =
      addressList.map((item) => {
        return {
          value: item.lonlat,
          label: item.address
        }
      }) || []
  }
</script>

<style scoped></style>
