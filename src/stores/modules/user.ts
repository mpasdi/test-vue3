import { defineStore } from 'pinia'

interface UserInter {
  userName: string
  userAge: number
}
export const useUser = defineStore('user', {
  state() {
    return {
      userInfo: null
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    setUserInfo(user: UserInter) {
      this.userInfo = user
    }
  }
})
