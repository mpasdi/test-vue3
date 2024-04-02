/*
 * @Author: lisongming
 * @Date: 2024-04-02 17:13:37
 * @LastEditors: lisongming
 * @Description: 描述
 */
/**
 * 在图片上绘制AI标点框
 * @param {string} source 图片资源，可以是图片链接或者base64编码
 * @param {Array<Array<Array<number>>>} markPosition AI标点，每个元素为一个框的坐标：[[[x1, y1], [x2, y2]], ...]
 * @param {string} color 描边颜色，默认为蓝色
 * @returns {Promise<string>} 返回绘制后的图片base64编码
 */
function aiMark(source, markPosition, color = 'red') {
  return new Promise((resolve, reject) => {
    // 检查参数是否有效
    if (!source || !markPosition || markPosition.length === 0) {
      reject(new Error('无效的输入参数'))
      return
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    // 绘制图片
    const image = new Image()
    image.src = source
    image.crossOrigin = 'anonymous' // 解决：非同源图片导致canvas.toDataURL()调用报错
    image.onload = () => {
      // 设置 Canvas 大小与原图一致
      canvas.width = image.width
      canvas.height = image.height

      context?.drawImage(image, 0, 0)

      // 在图片上绘制框
      context!.strokeStyle = color
      context?.setLineDash([5, 5]) // 虚线

      markPosition.forEach((item) => {
        const x = item[0][0]
        const y = item[0][1]
        const width = item[1][0] - item[0][0]
        const height = item[1][1] - item[0][1]
        context?.strokeRect(x, y, width, height)
      })

      // const imgBase64 = canvas.toDataURL('image/webp')
      // resolve(imgBase64)

      canvas.toBlob((blob: Blob) => {
        const link = URL.createObjectURL(blob)
        resolve(link)
      })
    }

    // 图片加载失败处理
    image.onerror = () => {
      reject(new Error('图片加载失败处理'))
    }
  })
}

export { aiMark }
