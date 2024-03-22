/*
 * @Author: lisongming
 * @Date: 2024-03-21 14:42:17
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { unref } from 'vue'
// types
import { Ref } from 'vue'

function useMedium(eleRef: Ref<HTMLElement>) {
  const ctxAttrMap: Map<string, number> = new Map<string, number>()

  function initCtxAttrMap() {
    ctxAttrMap.set('brightness', 100)
    ctxAttrMap.set('contrast', 100)
    ctxAttrMap.set('saturate', 100)
  }

  function drawMedium() {
    const mediumEle = unref(eleRef)
    if (!mediumEle) return

    let filterStr = ''
    for (const ctxAttrMapElement of ctxAttrMap) {
      filterStr += ctxAttrMapElement[0] + `(${ctxAttrMapElement[1]}%) `
    }
    mediumEle.style.filter = filterStr
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

  return { updateBrightness, updateContrast, updateSaturation, resetMediumAttr }
}

export { useMedium }
