/*
 * @Author: lisongming
 * @Date: 2024-03-21 14:42:17
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { unref, onMounted } from 'vue'
// types
import { Ref } from 'vue'
function useMedium(canvasEle: Ref<HTMLCanvasElement>) {
  let ctx = null
  const mediumAttr = {
    preBrightnessUpdate: 0,
    preContractUpdate: 0,
    preSaturationUpdate: 0
  }

  onMounted(() => {
    initCanvas()
  })

  function initCanvas() {
    const canvasEleRaw = unref(canvasEle)
    if (!(canvasEleRaw && canvasEle)) return
    ctx ||= canvasEleRaw.getContext('2d')
  }

  // TODO: 需要对String 进行URL校验
  async function setMedium(source: Blob | String) {
    let mediumSource

    // TODO: 待测试
    if (source instanceof Blob) {
      mediumSource ||= URL.createObjectURL(Blob)
    }
    // TODO : 考虑视频
    const img = new Image()
    img.src = source
    img.onload = function () {
      mediumSource = img
      ctx.drawImage(mediumSource, 0, 0, img.width, img.height, 0, 0, img.width / 5, img.height / 5)
    }
  }

  function updateBrightness(value: number = 5) {
    console.log('lsm----updateBrightness', value)
    const mediumData = ctx.getImageData(0, 0, 300, 150)
    const mediumDataArr = mediumData.data || []

    for (let i = 0; i < mediumDataArr.length; i += 4) {
      mediumDataArr[i] -= mediumAttr.preBrightnessUpdate
      mediumDataArr[i] += value // 调整亮度
    }
    ctx.putImageData(mediumData, 0, 0)
    mediumAttr.preBrightnessUpdate = value
  }

  function updateContrast(value: number = 5) {
    const mediumData = ctx.getImageData(0, 0, 300, 150)
    const mediumDataArr = mediumData.data || []
    for (let i = 0; i < mediumDataArr.length; i += 4) {
      const avg = (mediumDataArr[i] + mediumDataArr[i + 1] + mediumDataArr[i + 2]) / 3
      // const preContractUpdate = mediumAttr.preContractUpdate
      if (avg > 127) {
        // value = +value
        // mediumDataArr[i] -= preContractUpdate
        // mediumDataArr[i + 1] -= preContractUpdate
        // mediumDataArr[i + 2] -= preContractUpdate

        mediumDataArr[i] += value
        mediumDataArr[i + 1] += value
        mediumDataArr[i + 2] += value
      } else {
        // mediumDataArr[i] += preContractUpdate
        // mediumDataArr[i + 1] += preContractUpdate
        // mediumDataArr[i + 2] += preContractUpdate
        // value = -value
        mediumDataArr[i] -= value
        mediumDataArr[i + 1] -= value
        mediumDataArr[i + 2] -= value
      }

      // const preContractUpdate = mediumAttr.preContractUpdate
      // mediumDataArr[i] -= preContractUpdate
      // mediumDataArr[i + 1] -= preContractUpdate
      // mediumDataArr[i + 2] -= preContractUpdate

      // mediumDataArr[i] += value
      // mediumDataArr[i + 1] += value
      // mediumDataArr[i + 2] += value
    }
    ctx.putImageData(mediumData, 0, 0)
    mediumAttr.preContractUpdate = value
  }

  function updateSaturation(value: number = 5) {
    const mediumData = ctx.getImageData(0, 0, 300, 150)
    const mediumDataArr = mediumData.data || []

    for (let i = 0; i < mediumDataArr.length; i += 4) {
      const avg = (mediumDataArr[i] + mediumDataArr[i + 1] + mediumDataArr[i + 2]) / 3
      mediumDataArr[i] += (value * (mediumDataArr[i] - avg)) / 255 // 调整饱和度
      mediumDataArr[i + 1] += (value * (mediumDataArr[i + 1] - avg)) / 255
      mediumDataArr[i + 2] += (value * (mediumDataArr[i + 2] - avg)) / 255
    }

    ctx.putImageData(mediumData, 0, 0)
  }

  return { setMedium, updateBrightness, updateContrast, updateSaturation }
}

export { useMedium }
