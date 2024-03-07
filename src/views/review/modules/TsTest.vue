<template>
  <div>
    <h1>ts 测试</h1>

    <!-- ts类型 -->
    <h2>ts 类型</h2>
    <div class="ts-type">
      <div>1.str: {{ str }}</div>
      <div>2.num: {{ num }}</div>
      <div>3.bool: {{ bool }}</div>
      <div>4.arr: {{ arr }}</div>
      <div>5.元组: {{ arrYuan }}</div>
      <div>6.null: {{ customNull }}</div>
      <div>7.undefined: {{ customUndefined }}</div>
      <div>8.enums: {{ Enums.name }}</div>
      <div>9.any: {{ anyType }}</div>
      <div>10. void: {{ notReturn() }}</div>
      <div>11. object: {{ object }}</div>
      <div>12. 联合类型: {{ joint }}</div>
      <div>13. & 结合多个类型: {{ extend }}</div>
      <div>14. 文字类型 : {{ text }}</div>
      <div>15. symbol: {{ symbol }}</div>
      <div>16. bigInt: {{ bigInt }}</div>
      <div>17. never: {{ returnNever }}</div>
    </div>

    <!-- ts 函数-->
    <h2>ts 函数</h2>
    <div class="ts-func">
      <div>普通函数：{{ funcA('1') }}</div>
      <div>给函数添加属性： {{ funcB(25) }}--- {{ funcB.time }}</div>
      <div>构造函数： {{ new FuncC(12) }}</div>
      <div>函数泛型： {{ funcD('121da') }} --- {{ funcD(32) }}</div>
      <div>多个泛型参数： {{ funcE('lsm', 25) }}</div>
      <div>多个函数签名， 必须有一个函数同时实现</div>
      <div>void ： {{ funcF() }}</div>
    </div>

    <!-- ts 对象-->
    <h2>ts 对象</h2>
    <div class="ts-obj">
      <div>只读属性：{{ person }}</div>
      <div>对象签名（属性不确定）：{{ obj2 }}</div>
      <div>接口继承 {{ obj3 }}</div>
      <div>泛型对象 {{ obj4 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { BigIntDecimal } from 'ant-design-vue/es/input-number/src/utils/MiniDecimal'

  //1. ts 类型
  type StrAndNum = string | number
  const str = ref<string>('')
  const num = ref<number>(0)
  const bool = ref<boolean>(false)
  const customNull = ref<null>(null)
  const customUndefined = ref<undefined>()
  const arr = ref<Array<StrAndNum>>([1, '1']) // 也可以使用Array<string>
  const arrYuan = ref<[string, number]>(['lsm', 25])
  const anyType = ref({
    lsm: true,
    toString() {
      return '{}'
    }
  })
  const object = ref<{ name: string; age?: number }>({
    name: 'lgt'
  })
  const joint: StrAndNum = 1 || '2'

  type extendType = {
    name: string
  } & {
    id: number
  }
  const extend = ref<extendType>({ name: 'lsm', id: 1 })
  const text = ref<'lsm' | 'xcz'>()
  text.value = str.value as 'lsm'
  // text.value = <'lsm'>str.value
  // text.value = str.value as const // 不行

  const symbol = ref<symbol>(Symbol(12))
  const bigInt = ref<bigint>(BigInt(12.0))
  console.log(new BigIntDecimal(12.31313))

  enum Enums { // 枚举
    name = 'lsm'
  }
  function notReturn(): void {
    console.log('lsm---inner')
    return undefined
  }
  function returnNever(): never {
    let err: string
    if ((err = '代码错误！')) {
      throw new Error(err)
    } else {
      throw new Error(err)
    }
    // let val = true
    // while (val) {
    //   // console.log()
    //   throw new Error('error')
    // }
  }

  class Fruit<T> {
    fruitName: string
    fruitType: string
    fruitAttr: T
    constructor(fruitName: string, fruitType: string, attr: T) {
      this.fruitName = fruitName
      this.fruitType = fruitType
      this.fruitAttr = attr
    }
  }

  type FruitLastAttr = {
    weight?: number
    number?: number
    unit?: string
  }
  console.log(new Fruit<FruitLastAttr>('apple', 'apple', { weight: 10 }))

  //   2. 函数
  async function func1() {
    let a = 1
    a++
    console.log(a)
  }
  console.log('lsm func1', func1())
  function func2() {
    return new Promise((_res) => {
      _res(undefined)
    })
  }
  console.log('lsm func2', func2())

  type FuncAType = (name: string) => string
  const funcA: FuncAType = (name) => {
    return '1' + name
  }

  type funcBType = {
    time: number
    (age: number): number
  }

  const funcB: funcBType = (age) => {
    return age + 1
  }
  funcB.time = 12

  interface funcCType<T> {
    new (num: number): T
  }
  class Sui {
    num: number
    constructor(num) {
      this.num = num
    }
  }
  const FuncC: funcCType<Sui> = Sui
  function funcD<T>(obj): T {
    if (typeof obj === 'string') {
      return parseInt(obj) as T
    }
    return obj
  }
  console.log('lsm-----func d', funcD<number>('313fad'))

  function funcE<T, E>(name: T, age: E) {
    return name + ':' + age
  }
  //  多个函数签名
  //
  // function funcF(num: number): number
  // function funcF(name: string): string
  //
  // function funcF(numOrName) {
  //   if (name) {
  //     return num + ' : ' + name
  //   } else {
  //     return 100 + num
  //   }
  // }
  // funcF(1, '1')

  type funcFType = () => void

  const funcF: funcFType = () => {
    return 12
  }

  //   3. obj 对象
  interface obj1Type {
    readonly name: string
    age: number
  }
  const person: obj1Type = {
    name: 'lsm',
    age: 12
  }

  interface obj2Type {
    [name: string | number]: string
  }
  const obj2: obj2Type = {}

  interface obj3Type extends obj1Type {
    weight: number
  }
  const obj3: obj3Type = {
    name: 'lsm',
    age: 12,
    weight: 12
  }
  let val1 = 'lsm'
  let val1Type: typeof val1 = 'aa'
  console.log('lsm type val1', val1Type)

  interface obj4Type<T> {
    height: number
    color: string
    attr: T
  }

  const obj4: obj4Type<string> = {
    height: 12,
    color: '11',
    attr: 'any'
  }
</script>

<style scoped lang="less">
  .ts-type,
  .ts-func,
  .ts-obj {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
</style>
