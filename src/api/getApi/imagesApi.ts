import request from '@/api/request'

function getImageData(): Promise<Blob> {
  return request.get('https://pic.rmb.bdstatic.com/bjh/914b8c0f9814b14c5fedeec7ec6615df5813.jpeg', {
    responseType: 'blob'
  })
}

function getKmlData() {
  return request.get(
    // 'https://md-mon-video.oss-cn-hangzhou.aliyuncs.com/ali-oss-upload-93a36f56-177e-4138-9ade-34714b8132c4?Expires=1717130373&OSSAccessKeyId=LTAI5DRlaZP1R7Kr&Signature=Rkmi22zyhhffGU43LKergm5Lkuw=', // kml
    'https://md-mon-video.oss-cn-hangzhou.aliyuncs.com/ali-oss-aiExamineFile-9906cbb1-1955-4b4e-ad32-ffe8e9f32f7c?Expires=1717130757&OSSAccessKeyId=LTAI5DRlaZP1R7Kr&Signature=kXij6MgIuIf8OLdpXMoEfEq1B6Y=', //video
    {
      // responseType: 'blob'
    }
  )
}

export { getImageData, getKmlData }
