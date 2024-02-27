/*
 * @Author: lisongming
 * @Date: 2023-12-21 17:15:16
 * @LastEditors: lisongming
 * @Description: 描述
 */
import axios from 'axios'
import { ContentTypeEnum } from '@/utils/enums'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  }
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((config) => {
  return config
})

export default request
