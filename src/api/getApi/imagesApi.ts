import request from '@/api/request'

function getImageData() {
  return request.get('https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg', {
    responseType: 'blob'
  })
}

export { getImageData }
