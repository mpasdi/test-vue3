/*
 * @Author: lisongming
 * @Date: 2024-03-15 15:05:20
 * @LastEditors: lisongming
 * @Description: 描述
 */
import request from '../request'

enum API_NAME {
  GET_USER_LIST = '/getUserList'
}

function getUserList() {
  return request.get(API_NAME.GET_USER_LIST)
}

export { getUserList }
