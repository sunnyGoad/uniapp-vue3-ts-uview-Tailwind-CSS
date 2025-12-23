import { defineStore } from 'pinia'
import { themeConfig } from '@/config/theme'

/**
 * 应用状态管理
 */
export const useAppStore = defineStore('app', {
  state: () => ({
    theme: themeConfig,
    systemInfo: {} as UniApp.GetSystemInfoResult,
  }),

  actions: {
    /**
     * 设置系统信息
     */
    setSystemInfo() {
      this.systemInfo = uni.getSystemInfoSync()
    },

    /**
     * 更新主题
     */
    updateTheme(theme: Partial<typeof themeConfig>) {
      this.theme = { ...this.theme, ...theme }
    },
  },
})
