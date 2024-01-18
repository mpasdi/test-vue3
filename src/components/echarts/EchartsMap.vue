<!--
 * @Author: lisongming
 * @Date: 2024-01-16 13:18:43
 * @LastEditors: lisongming
 * @Description: 地图echarts
-->
<template>
  <div>
    <div ref="mapEcharts" class="map-echarts"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, unref } from 'vue'
  import * as echarts from 'echarts'
  import axios from 'axios'

  // vue api
  const mapEcharts = ref()
  onMounted(() => {
    init()
  })

  // echarts
  var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

  async function init() {
    const { data: svg } = await axios.get(ROOT_PATH + '/data/asset/geo/Beef_cuts_France.svg')

    echarts.registerMap('Beef_cuts_France', { svg: svg })

    const option = {
      tooltip: {},
      visualMap: {
        left: 'center',
        bottom: '10%',
        min: 5,
        max: 100,
        orient: 'horizontal',
        text: [null, 'Price'],
        realtime: true,
        calculable: true,
        inRange: {
          color: ['#dbac00', '#db6e00', '#cf0000']
        }
      },
      series: [
        {
          name: 'French Beef Cuts',
          type: 'map',
          map: 'Beef_cuts_France',
          roam: false,
          emphasis: {
            label: {
              show: false
            }
          },
          selectedMode: false,
          data: [
            { name: 'Queue', value: 15 },
            { name: 'Langue', value: 35 },
            { name: 'Plat de joue', value: 15 },
            { name: 'Gros bout de poitrine', value: 25 },
            { name: 'Jumeau à pot-au-feu', value: 45 },
            { name: 'Onglet', value: 85 },
            { name: 'Plat de tranche', value: 25 },
            { name: 'Araignée', value: 15 },
            { name: 'Gîte à la noix', value: 55 },
            { name: "Bavette d'aloyau", value: 25 },
            { name: 'Tende de tranche', value: 65 },
            { name: 'Rond de gîte', value: 45 },
            { name: 'Bavettede de flanchet', value: 85 },
            { name: 'Flanchet', value: 35 },
            { name: 'Hampe', value: 75 },
            { name: 'Plat de côtes', value: 65 },
            { name: 'Tendron Milieu de poitrine', value: 65 },
            { name: 'Macreuse à pot-au-feu', value: 85 },
            { name: 'Rumsteck', value: 75 },
            { name: 'Faux-filet', value: 65 },
            { name: 'Côtes Entrecôtes', value: 55 },
            { name: 'Basses côtes', value: 45 },
            { name: 'Collier', value: 85 },
            { name: 'Jumeau à biftek', value: 15 },
            { name: 'Paleron', value: 65 },
            { name: 'Macreuse à bifteck', value: 45 },
            { name: 'Gîte', value: 85 },
            { name: 'Aiguillette baronne', value: 65 },
            { name: 'Filet', value: 95 }
          ]
        }
      ]
    }

    const myChart = echarts.init(unref(mapEcharts))
    myChart.setOption(option)
  }
</script>

<style scoped lang="less">
  .map-echarts {
    width: 1000px;
    height: 500px;
  }
</style>
