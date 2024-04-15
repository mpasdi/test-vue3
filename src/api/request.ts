/*
 * @Author: lisongming
 * @Date: 2023-12-21 17:15:16
 * @LastEditors: lisongming
 * @Description: 描述
 */
import axios from 'axios'
import { ContentTypeEnum } from '@/utils/enums'
// import type { RawAxiosResponseHeaders } from 'axios'

const request = axios.create({
  // baseURL: '/api',
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  }
})

// let lastResponseHeader = {} as RawAxiosResponseHeaders

request.interceptors.request.use((config) => {
  // console.log('lsm---config', config)
  // config.headers['If-None-Match'] = lastResponseHeader.etag // 走协商缓存
  // config.headers['If-None-Match'] = '2121' // 走协商缓存
  // config.headers['If-Modified-Since'] = lastResponseHeader['last-modified'] // 走协商缓存

  return config
})

request.interceptors.response.use((resp): any => {
  // console.log('lsm---- -resp', resp.headers)
  // lastResponseHeader = resp.headers
  if (resp.status === 200) {
    return resp.data
  }
  return resp
})

export default request
