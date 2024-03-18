/*
 * @Author: lisongming
 * @Date: 2024-03-18 10:10:52
 * @LastEditors: lisongming
 * @Description: 描述
 */
import request from '@/api/request'

enum JAVA_API {
  GET_USER_LIST = '/javaApi/users/getUserList'
}
function javaGetUserList(data = {}) {
  return request.post(JAVA_API.GET_USER_LIST, data, {
    // baseURL: 'http://localhost:8333'
    // baseURL: '/api' // 使用nginx代理的时候
  })
}

export { javaGetUserList }
