import request from '@/api/request'
import { ContentTypeEnum } from '@/utils/enums'
import { AxiosResponse } from 'axios/index'

function pieceUpload(data: FormData) {
  console.log('lsm -0--data', data)
  return request({
    method: 'post',
    url: '/files/pieceUpload',
    data,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    }
  })
}

export { pieceUpload }
