// 面试题： 发送接口求一个数组的总和

function sum(num1: number, num2: number) {
  return Promise.resolve(num1 + num2)
}

const sumValArr: number[] = new Array(6).fill(1).map((_, index) => index + 1)
const sumTask: Set<Promise<number>> = new Set()

function generatePromise() {
  sumTask.clear()
  let i = 0
  while (i < sumValArr.length) {
    sumTask.add(sum(sumValArr[i], sumValArr[i + 1] || 0))
    i = i + 2
  }

  sumValArr.length = 0
}

function total() {
  return new Promise((resolve) => {
    generatePromise()

    function test() {
      for (const number of [1, 2, 3]) {
        if (number == 2) break
      }
    }
    test()

    function loop(): any {
      for (const item of sumTask) {
        item.then((res) => {
          sumValArr.push(res)
          sumTask.delete(item)

          // debugger
          if (sumValArr.length >= 2) {
            generatePromise()
            return loop()
          }

          if (sumTask.size === 0 && sumValArr.length === 1) {
            resolve(sumValArr[0])
          }
        })
      }
    }
    loop()
  })
}

total().then((totalVal) => {
  console.log('lsm---- total val ', totalVal)
})
