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

export { throttle, debounce, arrayFlat, deepClone }
