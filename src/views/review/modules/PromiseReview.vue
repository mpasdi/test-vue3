<!--
 * @Author: lisongming
 * @Date: 2024-03-11 15:12:17
 * @LastEditors: lisongming
 * @Description: 描述
-->
<template>
  <div>
    <h1>promise review</h1>

    <h2>1. promise 状态</h2>
    <div>fulfilled</div>
    <div>pending</div>
    <div>rejected</div>

    <h2>2. promise 静态方法</h2>
    <div>Promise.resolve() // 返回一个解决的promise</div>
    <div>Promise.reject() // 返回一个拒绝的promise</div>
    <div>Promise.all() // 传入的所有promise 成功返回成功，一个失败则返回失败的promise</div>
    <div>Promise.race() //传入的所有promise 有一个成功或失败返回promise</div>
    <div>
      Promise.allSettled() // 传入的所有promise 中所有的promise状态都成功或失败之后返回 promise
    </div>
    <div>Promise.any() //传入的所有promise 只要有一个成功就返回当前成功的值，否则失败</div>

    <h2>3. 微任务和宏任务的相互穿插</h2>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  // vue api
  onMounted(async () => {
    console.group('lsm----mountd')
    const res = await getPromise()
    console.log('lsm---res', res)
    const res1 = await asyncPromise()
    console.log('lsm----res1', res1)
    console.groupEnd()

    executePromiseFunc()

    console.log('lsm----thenAwaitFunc()', thenAwaitFunc())
    const res3 = await thenAwaitFunc()
    console.log('lsm-----res3', res3)

    await forPromise()
    macroMicroTask()
  })
  function getPromise() {
    return new Promise((res, rej) => {
      let a = 1
      if (a > 0) {
        res(a)
      } else {
        rej('error: ....')
      }
    })
  }

  async function asyncPromise() {
    return Promise.resolve('212')
  }

  // promise 状态

  // 常用静态方法
  // resolve
  function resolveFunc() {
    return Promise.resolve('first')
  }
  // reject
  function rejectFunc() {
    return Promise.reject('error: second')
  }
  // all
  function allFunc() {
    const setPromise = new Set([Promise.resolve(1), Promise.resolve(Promise.resolve(3))])
    // setPromise.add(Promise.reject('error: 3'))
    return Promise.all(setPromise)
  }
  // any
  function anyFunc() {
    const setPromise = new Set([Promise.resolve(1), Promise.resolve(Promise.resolve(3))])
    // setPromise.clear()
    setPromise.add(Promise.reject('error: 3'))
    return Promise.any(setPromise)
  }
  // race
  function raceFunc() {
    const setPromise = new Set([
      Promise.reject('error: 4'),
      Promise.resolve(1),
      Promise.resolve(Promise.resolve(3))
    ])
    // setPromise.clear()
    setPromise.add(Promise.reject('error: 3'))
    return Promise.race(setPromise)
  }
  // allSettled
  function allSettledFunc() {
    const setPromise = new Set([Promise.resolve(1), Promise.resolve(Promise.resolve(3))])
    setPromise.add(Promise.reject('error: 3'))
    return Promise.allSettled(setPromise)
  }

  async function executePromiseFunc() {
    console.group('promise-----start')
    const val1 = await resolveFunc()
    console.log('lsm----resolve', val1)

    rejectFunc().then(
      () => {},
      (error) => {
        console.log('lsm----reject', error)
      }
    )

    allFunc()
      .then((res) => {
        console.log('lsm----all res', res)
      })
      .catch((err) => {
        console.log('lsm----all err', err)
      })

    anyFunc()
      .then((res) => {
        console.log('lsm----any res', res)
      })
      .catch((error) => {
        console.log('lsm----any err', error)
      })

    raceFunc()
      .then((res) => {
        console.log('lsm----race res', res)
      })
      .catch((error) => {
        console.log('lsm----race err', error)
      })

    allSettledFunc()
      .then((res) => {
        console.log('lsm----allSettled res', res)
      })
      .catch((error) => {
        console.log('lsm----allSettled err', error)
      })
    console.groupEnd()
  }

  // then 和 await
  function thenAwaitFunc() {
    return Promise.resolve(212).then((res) => {
      console.log('lsm-----thenAwaitFuncs', res)
      return 1
    })
  }

  // for循环中的 promise
  async function forPromise() {
    const temArr: any = new Set()
    const commonArr = new Array(20).fill(0).map(
      (_, index) =>
        function () {
          return new Promise((res) => {
            setTimeout(() => {
              res(index)
            }, 2000)
          })
        }
    )

    // commonArr.forEach(async (item) => {
    //   const task = item().then((res) => {
    //     console.log('lsm-----after ', res)
    //     temArr.delete(task)
    //   })
    //   temArr.add(task)
    //   if (temArr.size >= 5) {
    //     console.log('lsm------inner stop ')
    //     await Promise.race(temArr)
    //   }
    // })

    console.group('lsm---- for of await start')
    for (const item of commonArr) {
      const task = item().then((res) => {
        console.log('lsm-----after ', res)
        temArr.delete(task)
      })
      temArr.add(task)
      console.log('lsm-----size', temArr.size)
      if (temArr.size >= 5) {
        console.log('lsm------inner stop ')
        await Promise.race(temArr)
      }
    }
    console.groupEnd()
  }

  // promise 宏任务和微任务
  function macroMicroTask() {
    console.group('lsm-----  step')
    console.log('lsm----step 1')
    new Promise((resolve) => {
      console.log('lsm------step 2')
      setTimeout(() => {
        console.log('lsm-------step 3')
        resolve()
        console.log('lsm-------step 4')
      }, 1000)
      console.log('lsm-------step 5')
    })

    console.log('lsm-------step 6')
    setTimeout(() => {
      console.log('lsm-------step 7')
      Promise.resolve().then(() => {
        console.log('lsm-------step 8')
        setTimeout(() => {
          console.log('lsm-------step 9')
        }, 1000)
        console.log('lsm-------step 10')
      })
      console.log('lsm-------step 11')
    }, 1000)
    console.log('lsm-------step 12')

    console.groupEnd()
  }

  //1 2 5 6 12 3 4 7 11 8 9 10
  //
</script>

<style scoped></style>
