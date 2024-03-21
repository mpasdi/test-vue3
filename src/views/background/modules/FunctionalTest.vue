<!--
 * @Author: lisongming
 * @Date: 2024-03-21 14:02:37
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>功能测试</h1>

    <h2>图像处理（亮度对比度， 饱和度）</h2>
    <div class="medium"><img src="@/assets/images/autumn.jpg" alt="" /></div>
    <div class="medium"><video src="@/assets/videos/v-3.mp4" controls></video></div>
    <canvas ref="canvasEle" class="canvas_ele"></canvas>
    <div>
      亮度
      <a-slider
        id="test"
        :min="-50"
        :max="50"
        v-model:value="mediumAttr.brightness"
        @change="brightnessUpdate"
      />
      对比度
      <a-slider
        id="test"
        :min="-50"
        :max="50"
        v-model:value="mediumAttr.contrast"
        @change="contrastUpdate"
      />
      饱和度
      <a-slider id="test" v-model:value="mediumAttr.saturation" @change="saturationUpdate" />
    </div>

    <div ref="imageRef"></div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useMedium } from '@/hooks/useMedium'
  import { debounce } from '@/utils/toolMethods'

  const canvasEle = ref()
  const { setMedium, updateBrightness, updateContrast, updateSaturation } = useMedium(canvasEle)
  setMedium(
    // 'https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280'
    '/src/assets/images/autumn.jpg'
  )

  const mediumAttr = reactive({
    brightness: 0,
    contrast: 0,
    saturation: 0
  })

  // const imageRef = ref()

  // onMounted(() => {
  //   const image = new Image()
  //   image.src =
  //     'https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280'

  //   imageRef.value?.appendChild(image)
  // })

  const brightnessUpdate = debounce(updateBrightness, 200)
  const contrastUpdate = debounce(updateContrast, 200)
  const saturationUpdate = debounce(updateSaturation, 200)
</script>

<style scoped lang="less">
  .medium {
    width: 200px;
    img,
    video {
      width: 100%;
    }
  }

  // .canvas_ele {
  //   width: 200px;
  //   height: 200px;
  // }
</style>
