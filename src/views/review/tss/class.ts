enum genderEnum {
  women = '女',
  men = '男'
}

class Friend {
  // 原型方法
  merry(friend: Friend) {
    if (!this.spouse && friend.spouse !== this.userName) {
      this.spouse = friend.userName
      friend.spouse = this.userName
      console.log('Merry successful!')
    } else {
      console.warn('Already married or invalid operation!')
    }
  }

  static staAttr = 'staAttr'
  static staFunc = () => {
    console.log(this.staAttr) // 这里的this指向的就是当前类
  }

  gender: genderEnum // 实例属性
  age: number
  userName: string
  work?: string
  spouse?: string
  hobby = new Set<string>()

  constructor({ userName, age, gender }) {
    this.userName = userName
    this.gender = gender
    this.age = age
  }
}

class GirlFriend extends Friend {
  static readonly gender = genderEnum.women

  hobby = new Set<string>(['travel', 'delicacy', 'shopping'])

  constructor({ userName, age }) {
    super({ gender: GirlFriend.gender, userName, age })
  }
}

// es5 的替换形式
// function Friend({ userName, age, gender }) {
//   this.userName = userName
//   this.gender = gender
//   this.age = age
//   this.work
//   this.spouse
//   this.hobby = new Set<string>()
// }
// Friend.staAttr = 'staAttr'
// Friend.staFunc = () => {
//   console.log(Friend.staAttr) // 这里的this指向的就是当前类
// }

// Friend.prototype.merry = function (friend: Friend) {
//   if (!this.spouse && friend.spouse !== this.userName) {
//     this.spouse = friend.userName
//     friend.spouse = this.userName
//     console.log('Merry successful!')
//   } else {
//     console.warn('Already married or invalid operation!')
//   }
// }

// function GirlFriend({ userName, age }) {
//   Friend.call(this, { gender: GirlFriend.gender, userName, age })

//   this.hobby = new Set<string>(['travel', 'delicacy', 'shopping'])
// }
// GirlFriend.gender = genderEnum.women

// GirlFriend.prototype = Object.create(Friend.prototype)
// GirlFriend.prototype.constructor = GirlFriend

export { Friend, GirlFriend }
