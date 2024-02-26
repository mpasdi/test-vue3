/*
 * @Author: lisongming
 * @Date: 2024-01-15 13:17:45
 * @LastEditors: lisongming
 * @Description: 描述
 */

/**
 * 节流
 * @param {*} callback 回调函数
 * @param {*} seconds 多少秒触发一次
 */
function throttle(callback, seconds) {
  if (typeof callback !== 'function') return
  if (typeof seconds !== 'number') return

  let timer: any = null // 明显的闭包

  return () => {
    if (timer) return
    callback()
    timer = setTimeout(() => {
      timer = null
    }, seconds)
  }
}

/**
 * 防抖
 * @param {*} callback
 * @param {*} seconds
 */
function debounce(callback, seconds) {
  if (typeof callback !== 'function') return
  if (typeof seconds !== 'number') return

  let timer: any = null

  return (...args) => {
    timer && clearTimeout(timer) // 值得注意的，这个地方不能设置timer = null， 设置timer=null依然无法阻止settimeout中的回调执行。
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, seconds)
  }
}

/**
 * 数组拍平
 * @param arr 原数组
 * @param deep 拍平深度
 */
function arrayFlat(arr: any[], deep: number = 1) {
  if (!arr.length || deep < 1) return arr

  const temArr: any[] = []
  arr.forEach((item) => {
    if (item instanceof Array) {
      temArr.push(...arrayFlat(item, deep - 1))
    } else {
      temArr.push(item)
    }
  })
  return temArr
}

/**
 * 深拷贝
 * @param obj 源对象
 */
function deepClone<T extends Array<any> | { [name: string | number]: any }>(obj: T): T {
  const temObj = Object.assign(obj instanceof Array ? [] : {}, obj)
  Object.keys(temObj).forEach((item) => {
    if (temObj[item] && typeof temObj[item] === 'object') {
      temObj[item] = deepClone(temObj[item])
    }
  })
  return temObj
}

/**
 * a链接导出
 * @param url url
 * @param fileName 下载文件名
 */
function downloadByAEle(url: string, fileName = 'download') {
  if (!url) return
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', fileName)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * 导出表格
 * @param columns object englishName对应table中的englishName  value对应中文表单
 * @param tableData 表数据
 * @param  fileName 文件名
 *
 */
function tableExport(
  columns: { [englishName: string]: string },
  tableData: Array<{ [englishName: string | number]: any }>,
  fileName: string
) {
  console.log(columns, tableData)
  let tableStr = '\ufeff' // 使 , 有换行效果
  Object.values(columns).forEach((item) => {
    tableStr += item + ','
  })
  tableStr += '\r\n'

  tableData.forEach((item) => {
    Object.keys(columns).forEach((key) => {
      tableStr += (item[key] ?? '--') + ','
    })
    tableStr += '\r\n'
  })

  // const downloadUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(tableStr)
  const urlBlob = new Blob([tableStr], { type: 'text/plain;charset=UTF-8' })
  const downloadUrl = URL.createObjectURL(urlBlob)
  downloadByAEle(downloadUrl, fileName)
  URL.revokeObjectURL(downloadUrl)
}

/**
 * 文本拷贝
 * @param text 拷贝内容
 */
function textCopy(text) {
  if ('clipboard' in navigator) {
    console.log('use navigator.clipboard api')
    navigator.clipboard
      .writeText(text)
      .then((_) => {
        console.info('复制成功')
      })
      .catch((error) => {
        console.error('复制失败 : ' + error)
      })
  } else {
    console.log('use document.execCommand api')
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.setAttribute('display', 'none')
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      console.info('复制成功')
    } catch (error) {
      console.error('复制失败 : ' + error)
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

export { throttle, debounce, arrayFlat, deepClone, downloadByAEle, tableExport, textCopy }
