/*
 * @Author: lisongming
 * @Date: 2024-03-15 15:05:20
 * @LastEditors: lisongming
 * @Description: 描述
 */
import request from '../request'
import { jsonp } from '@/utils/toolMethods'

enum API_NAME {
  GET_USER_LIST = '/getUserList',
  GET_USER_BY_ID = '/getUserListById',
  JSONP_TEST = '/jsonpTest'
}

const base_url = import.meta.env.VITE_APP_BASE_URL

function getUserList() {
  return request.get(API_NAME.GET_USER_LIST)
}

function getUserById(data: { id: number }) {
  return request.post(API_NAME.GET_USER_BY_ID, data)
}

function jsonpTest(params: { id: number }, callbackName) {
  return jsonp(base_url + API_NAME.JSONP_TEST, params, callbackName)
}

export { getUserList, getUserById, jsonpTest }
