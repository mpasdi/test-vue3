/*
 * @Author: lisongming
 * @Date: 2024-03-15 15:05:20
 * @LastEditors: lisongming
 * @Description: 描述
 */
import request from '../request'

enum API_NAME {
  GET_USER_LIST = '/getUserList',
  GET_USER_BY_ID = '/getUserListById'
}

function getUserList() {
  return request.get(API_NAME.GET_USER_LIST)
}

function getUserById(data: { id: number }) {
  return request.post(API_NAME.GET_USER_BY_ID, data)
}

export { getUserList, getUserById }
