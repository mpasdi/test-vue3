/*
 * @Author: lisongming
 * @Date: 2024-01-25 11:59:19
 * @LastEditors: lisongming
 * @Description: 描述
 */
interface BasePointInfo {
  pointPosition: number[]
  pointIconName: string // iconCommonPath + pointIconName 需要满足 两者相加 可以在项目中找到图标
  pointIconSize?: number // icon 初识大小
  pointIconClickSize?: number // icon 点击之后大小
  pointName?: string
  time?: string
  sensorDataList?: any
}

interface BaseTdtMapInfo {
  pointArr?: Array<BasePointInfo> // 标点信息
  iconCommonPath?: string // 所有标点的相对路径
  mapType?: string // 地图类型  //TMAP_SATELLITE_MAP 卫星地图  TMAP_NORMAL_MAP ： 普通地图
  mapCenter?: number[] // 地图中心
  mapZool?: number // 地图默认缩放大小
  isMapCanClick?: boolean
}

export type { BasePointInfo, BaseTdtMapInfo }
