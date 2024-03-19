console.group('lsm ---- generator----- 研究迭代器 和 异步迭代器')
const geObj = {
  brand: 'hua-shuo',
  price: 30000,
  weight: '40kg',
  // [Symbol.iterator]: () => {
  //   const keys = Object.keys(geObj)
  //   let index = 0
  //   return {
  //     next: () => {
  //       return {
  //         value: geObj[keys[index++]],
  //         done: index > keys.length
  //       }
  //     }
  //   }
  // }

  [Symbol.iterator]: function* () {
    for (const geObjKey in geObj) {
      if (geObj.hasOwnProperty(geObjKey)) {
        // if (geObjKey in geObj) {
        yield geObj[geObjKey]
      }
    }
  }
}
// geObj.__proto__.test = 'test'
Object.getPrototypeOf(geObj).test = 'second test'
// const geObIterator = geObj[Symbol.iterator]()
// console.log(geObIterator.next())
// console.log(geObIterator.next())
// console.log(geObIterator.next())
// console.log(geObIterator.next())
for (const geObjItem of geObj) {
  console.log('lsm-----geObjItem', geObjItem)
}

const asyncObj = {
  specie: 'Cat',
  age: 12,
  weight: '21kg',
  eat: 'meat',
  // [Symbol.asyncIterator]: async function* () {
  //   for (const asyncKey in asyncObj) {
  //     if (asyncObj.hasOwnProperty(asyncKey)) {
  //       yield asyncObj[asyncKey]
  //     }
  //   }
  // }
  [Symbol.asyncIterator]: function () {
    const keys = Object.keys(asyncObj)
    let index = 0
    return {
      next: () => {
        return Promise.resolve({
          value: asyncObj[keys[index++]],
          done: index > keys.length
        })
      }
    }
  }
}

const asyncObjIterator = asyncObj[Symbol.asyncIterator]()
// asyncObjIterator.next().then((res) => {
//   console.log('lsm---- inner async res', res)
// })
// asyncObjIterator.next().then((res) => {
//   console.log('lsm---- inner async res', res)
// })

;(async () => {
  for (let i = 0; i < 4; i++) {
    console.log('lsm111------i', i)
    const asyncItem = await asyncObjIterator.next()
    console.log('lsm-------- asyncItem', asyncItem)
  }
})()

// ;(async () => {
//   for await (const asyncKey of asyncObj) {
//     console.log('lsm------asyncKey', asyncKey)
//   }
// })()

let asyncArr = [31, 53, 6, 47, 232, 8, 5352]
asyncArr[Symbol.asyncIterator] = async function* () {
  for (const asyncArrItem of asyncArr) {
    yield asyncArrItem
  }
}
const asyncArrIterator = asyncArr[Symbol.asyncIterator]()
console.log('lsm-----next ', asyncArrIterator.next())

// ;(async () => {
//   for await (const asyncArrElement of asyncArr) {
//     console.log('lsm----async arr item ', asyncArrElement)
//   }
// })()

console.groupEnd()
