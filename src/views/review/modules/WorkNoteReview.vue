<template>
  <div>
    <h1>工作笔记复习</h1>

    <h2>set</h2>
    <div>old arr : {{ setArr }}</div>
    <div>new arr 1 : {{ newArr1 }}</div>
    <div>new arr 2 : {{ newArr2 }}</div>
    <div>set keys : {{ new Set(setArr).keys() }}</div>
    <div>set values : {{ new Set(setArr).values() }}</div>

    <h2>map</h2>
    <div>old obj : {{ mapObj }}</div>
    <div>map : {{ objToMap }}</div>
    <div>map to obj : {{ mapToObj }}</div>
    <div>测试 \xa0 测试</div>

    <h2>fileReader</h2>
    <img :src="fileUrl" alt="file" />
    <img :src="fileUrl1" alt="file1" />

    <h2>input file</h2>
    <input type="file" ref="inputFile" />
    <img :src="fileImg" alt="" />

    <h2>requestAnimationFrame</h2>
    <div>{{ currentTime }}</div>

    <h2>文件切片上传</h2>
    <input type="file" accept=".mp4,.md" ref="bigVideo" />
  </div>
</template>

<script setup lang="ts">
  //set test
  import { computed, onBeforeMount, ref, nextTick, onMounted } from 'vue'
  import { getImageData } from '@/api/getApi/imagesApi'
  import { pieceUpload } from '@/api/postApi/fileApi'
  import dayjs from 'dayjs'
  import { AxiosResponse } from 'axios'

  // vue api
  onBeforeMount(() => {
    getImage()
  })

  onMounted(() => {
    inputFileChangeEvent()
    refreshTime()
    bigFileUpload()
  })

  // set
  const setArr = [1, 231, 31, 13, 1]
  const newArr1 = computed(() => {
    return [...new Set(setArr)]
  })
  const newArr2 = computed(() => {
    return Array.from(new Set(setArr))
  })

  new Set(setArr).forEach((item) => {
    console.log(item)
  })
  console.log(new Set(setArr).keys())
  for (const item of new Set(setArr).keys()) {
    console.log('lsm--- key item : ' + item)
  }

  //   map test
  const mapObj = {
    name: 'lsm',
    age: 27,
    gender: '男'
  }

  const objToMap = computed(() => {
    return Object.entries(mapObj)
  })

  const mapToObj = computed(() => {
    return Object.fromEntries(objToMap.value)
  })

  const map1 = Object.entries(mapObj)
  const map2 = new Map(map1)
  console.log(map1, Array.isArray(map1))
  console.log(map2, Array.isArray(map2))
  console.log(map2.has('name'))
  map2.set('test', 'test')
  console.log('new map2', map2)
  console.log(Array.from(map2))
  for (const item of map2) {
    console.log('map 2 item : ', item, Array.isArray(item))
  }

  //   fileReader
  const fileUrl = ref('')
  const fileUrl1 = ref('')
  async function getImage() {
    const res = await getImageData()
    if (!res.data) return
    handBlobByFileReader(res.data)
    handBlobByURI(res.data)
  }

  function handBlobByFileReader(data: Blob) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(data)
    fileReader.onload = () => {
      fileUrl.value = fileReader.result as string
    }
  }
  async function handBlobByURI(data: Blob) {
    const url = window.URL.createObjectURL(data)
    fileUrl1.value = url
    await nextTick()
    window.URL.revokeObjectURL(url)
  }

  //   input file
  const inputFile = ref()
  const fileImg = ref('')

  function inputFileChangeEvent() {
    inputFile.value.addEventListener('change', async (event) => {
      console.log('lsm---- event')
      const file = event.target.files[0]
      if (!file) return
      if (file.type.includes('image')) {
        // fileImg.value = URL.createObjectURL(file)
        const fileReader = new FileReader()
        fileReader.onload = () => {
          fileImg.value = fileReader.result as string
        }
        fileReader.readAsDataURL(file)
      }
      console.log('file type: ', file instanceof Blob, file.type)
      // file.type
    })
  }

  // requestAnimationFrame
  const currentTime = ref(dayjs().format('YYYY-MM-DD : HH:mm:ss'))
  function refreshTime() {
    // const timer = setTimeout(() => {
    //   currentTime.value = dayjs().format('YYYY-MM-DD : HH:mm:ss')
    //   clearTimeout(timer)
    //   refreshTime()
    // }, 1000)
    currentTime.value = dayjs().format('YYYY-MM-DD : HH:mm:ss')
    requestAnimationFrame(refreshTime)
  }

  //   文件切片上传
  const bigVideo = ref()
  function bigFileUpload() {
    bigVideo.value.addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (!file) return

      const fileSize = file.size
      const pieceSize = 1024 * 1024 // 1m
      const totalPiece = Math.ceil(fileSize / pieceSize)
      const fileName = file.name
      let pieceFileMap: Map<number, File> = new Map<number, File>()

      for (let i = 0; i < totalPiece; i++) {
        let currentPiece: File = file.slice(i * pieceSize, (i + 1) * pieceSize)
        if (i === totalPiece - 1) {
          currentPiece = file.slice(i * pieceSize, fileSize)
        }
        pieceFileMap.set(i, currentPiece)
      }

      function loopUpload() {
        let loopIndex = 0
        const failUploadPiece: Map<number, File> = new Map<number, File>()
        const taskArr: any = []
        const maxReqNum = 5

        pieceFileMap.forEach(async (item, index) => {
          const formData = new FormData()
          formData.append('pieceFile', item)
          formData.append('fileIndex', index.toString())
          formData.append('totalPiece', totalPiece.toString())
          formData.append('fileName', fileName)

          const task = pieceUpload(formData)
            .then(() => {
              const successIndex = taskArr.findIndex((el) => el === task)
              taskArr.splice(successIndex, 1)
            })
            .catch((err) => {
              console.log('error: ', err)
              failUploadPiece.set(index, item)
            })
            .finally(() => {
              loopIndex++
              if (loopIndex === pieceFileMap.size - 1 && failUploadPiece.size > 0) {
                pieceFileMap = failUploadPiece
                loopUpload()
              }
            })

          taskArr.push(task)
          if (taskArr.length === maxReqNum) {
            await Promise.race(taskArr)
          }
        })
      }
      loopUpload()
    })
  }
</script>

<style scoped lang="less">
  img {
    width: 300px;
  }
</style>
