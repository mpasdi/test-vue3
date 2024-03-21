/*
 * @Author: lisongming
 * @Date: 2024-03-21 14:42:17
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { unref, onMounted } from 'vue'
// types
import { Ref } from 'vue'
function useMedium(eleRef: Ref<HTMLVideoElement | HTMLImageElement>) {
  let ctxAttrMap: Map<string, number> = new Map<string, number>()

  onMounted(() => {
    // initCanvas()
    setMedium()
  })

  // function initCanvas() {
  //   const canvasEleRaw = unref(canvasEle)
  //   if (!(canvasEleRaw && canvasEle)) return
  //   ctx ||= canvasEleRaw.getContext('2d')
  // }

  function initCtxAttrMap() {
    ctxAttrMap.set('brightness', 100)
    ctxAttrMap.set('contrast', 100)
    ctxAttrMap.set('saturate', 100)
  }

  // TODO: 需要对String 进行URL校验
  // async function setMedium(source: Blob | string) {
  //   let mediumSource: string
  //
  //   // TODO: 待测试
  //   if (source instanceof Blob) {
  //     mediumSource ||= URL.createObjectURL(source)
  //   } else {
  //     mediumSource = source
  //   }
  //
  //   // TODO : 考虑视频
  //   img.src = mediumSource
  //   img.onload = function () {
  //     initCtxAttrMap()
  //     drawMedium()
  //   }
  // }
  async function setMedium() {
    const mediumEle = unref(eleRef)
    console.log('lsm----inner mediumEle', mediumEle)
    if (mediumEle instanceof HTMLImageElement) {
      drawMedium()
    } else {
      drawVideo()
    }
  }

  function drawMedium() {
    let filterStr = ''
    for (const ctxAttrMapElement of ctxAttrMap) {
      filterStr += ctxAttrMapElement[0] + `(${ctxAttrMapElement[1]}%) `
    }
    console.log('lsm----inner', filterStr)
    const mediumEle = unref(eleRef)
    mediumEle.style.filter = filterStr
  }

  function drawVideo() {
    const mediumEle = unref(eleRef)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let id = requestAnimationFrame(function draw() {
      ctx.drawImage(mediumEle, 0, 0, canvas.width, canvas.height)

      let filterStr = ''
      for (const ctxAttrMapElement of ctxAttrMap) {
        filterStr += ctxAttrMapElement[0] + `(${ctxAttrMapElement[1]}%) `
      }

      ctx.filter = filterStr
      ctx.drawImage(mediumEle, 0, 0, canvas.width, canvas.height)
      id = requestAnimationFrame(draw)
    })

    // mediumEle.addEventListener('pause', function () {
    //   cancelAnimationFrame(id)
    // })
  }
  function updateBrightness(value: number = 100) {
    ctxAttrMap.set('brightness', value)
    drawMedium()
  }

  function updateContrast(value: number = 100) {
    ctxAttrMap.set('contrast', value)
    drawMedium()
  }

  function updateSaturation(value: number = 100) {
    ctxAttrMap.set('saturate', value)
    drawMedium()
  }

  function resetMediumAttr() {
    initCtxAttrMap()
    drawMedium()
  }

  return { setMedium, updateBrightness, updateContrast, updateSaturation, resetMediumAttr }
}

export { useMedium }
