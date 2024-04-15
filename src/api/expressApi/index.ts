/*
 * @Author: lisongming
 * @Date: 2024-03-15 15:05:20
 * @LastEditors: lisongming
 * @Description: 描述
 */
import request from '../request'
import { jsonp } from '@/utils/toolMethods'

import type { AxiosRequestConfig } from 'axios'

enum API_NAME {
  GET_USER_LIST = '/getUserList',
  GET_USER_BY_ID = '/getUserListById',
  JSONP_TEST = '/jsonpTest',
  GET_INFO_BY_COMPRESSION = '/getInfoByCompression',
  CACHE_TEST = '/cacheTest'
}

const base_url = import.meta.env.VITE_APP_BASE_URL

function getUserList() {
  return request.get(API_NAME.GET_USER_LIST)
}

function getUserById(data: { id: number }) {
  return request.post(API_NAME.GET_USER_BY_ID, data)
}

// jsonp 测试
function jsonpTest(params: { id: number }, callbackName) {
  return jsonp(base_url + API_NAME.JSONP_TEST, params, callbackName)
}

// 响应体压缩测试
function getInfoByCompression() {
  return request.get(API_NAME.GET_INFO_BY_COMPRESSION, {
    headers: {
      'Cache-Control': 'public,max-age=10'
    }
  } as AxiosRequestConfig)
}

// 缓存测试
function cacheTest() {
  return request.get(API_NAME.CACHE_TEST, {
    headers: {
      'Cache-Control': 'public'
    }
  } as AxiosRequestConfig)
}

export { getUserList, getUserById, jsonpTest, getInfoByCompression, cacheTest }
