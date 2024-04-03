/*
 * @Author: lisongming
 * @Date: 2024-03-08 09:38:18
 * @LastEditors: lisongming
 * @Description: 描述
 */
import { defineStore } from 'pinia'

interface UserInter {
  userName: string
  userAge: number
}
export const useUser = defineStore('user', {
  state() {
    return {
      userInfo: null,
      sessionInfo: null
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getSessionInfo(state) {
      try {
        return sessionStorage.getItem('sessionInfo') || state.sessionInfo
      } catch {
        return state.sessionInfo
      }
    }
  },
  actions: {
    setUserInfo(user: UserInter) {
      this.userInfo = user
    },
    setSessionInfo(info: string) {
      this.sessionInfo = info
    }
  }
})
