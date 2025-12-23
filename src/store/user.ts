import { defineStore } from 'pinia'
import storage from '@/utils/storage'

/**
 * 用户信息
 */
interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  token: string
}

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.get<UserInfo>('userInfo') ?? null,
    token: storage.get<string>('token') ?? '',
  }),

  getters: {
    isLogin: state => !!state.token,
  },

  actions: {
    /**
     * 设置用户信息
     */
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      this.token = userInfo.token
      storage.set('userInfo', userInfo)
      storage.set('token', userInfo.token)
    },

    /**
     * 清除用户信息
     */
    clearUserInfo() {
      this.userInfo = null
      this.token = ''
      storage.remove('userInfo')
      storage.remove('token')
    },

    /**
     * 登出
     */
    logout() {
      this.clearUserInfo()
      uni.reLaunch({
        url: '/pages/index/index',
      })
    },
  },
})
