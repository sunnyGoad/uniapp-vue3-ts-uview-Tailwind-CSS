import type { StorageData } from '@/types'

/**
 * 存储工具类
 */
class Storage {
  /**
   * 设置存储
   * @param key 键
   * @param value 值
   * @param expire 过期时间（秒），不传则永久有效
   */
  set<T = any>(key: string, value: T, expire?: number): void {
    try {
      const data: StorageData<T> = {
        value,
        expire: expire ? Date.now() + expire * 1000 : undefined,
      }
      uni.setStorageSync(key, JSON.stringify(data))
    }
    catch (error) {
      console.error('设置存储失败:', error)
    }
  }

  /**
   * 获取存储
   * @param key 键
   * @param defaultValue 默认值
   */
  get<T = any>(key: string, defaultValue?: T): T | undefined {
    try {
      const str = uni.getStorageSync(key)
      if (!str)
        return defaultValue

      const data: StorageData<T> = JSON.parse(str)

      // 检查是否过期
      if (data.expire && data.expire < Date.now()) {
        this.remove(key)
        return defaultValue
      }

      return data.value
    }
    catch (error) {
      console.error('获取存储失败:', error)
      return defaultValue
    }
  }

  /**
   * 异步设置存储
   */
  async setAsync<T = any>(key: string, value: T, expire?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const data: StorageData<T> = {
          value,
          expire: expire ? Date.now() + expire * 1000 : undefined,
        }
        uni.setStorage({
          key,
          data: JSON.stringify(data),
          success: () => resolve(),
          fail: reject,
        })
      }
      catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 异步获取存储
   */
  async getAsync<T = any>(key: string, defaultValue?: T): Promise<T | undefined> {
    return new Promise((resolve) => {
      uni.getStorage({
        key,
        success: (res) => {
          try {
            const data: StorageData<T> = JSON.parse(res.data)

            // 检查是否过期
            if (data.expire && data.expire < Date.now()) {
              this.remove(key)
              resolve(defaultValue)
              return
            }

            resolve(data.value)
          }
          catch (error) {
            console.error('解析存储失败:', error)
            resolve(defaultValue)
          }
        },
        fail: () => {
          resolve(defaultValue)
        },
      })
    })
  }

  /**
   * 删除存储
   */
  remove(key: string): void {
    try {
      uni.removeStorageSync(key)
    }
    catch (error) {
      console.error('删除存储失败:', error)
    }
  }

  /**
   * 异步删除存储
   */
  async removeAsync(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key,
        success: () => resolve(),
        fail: reject,
      })
    })
  }

  /**
   * 清空存储
   */
  clear(): void {
    try {
      uni.clearStorageSync()
    }
    catch (error) {
      console.error('清空存储失败:', error)
    }
  }

  /**
   * 异步清空存储
   */
  async clearAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
      uni.clearStorage({
        success: () => resolve(),
        fail: reject,
      })
    })
  }

  /**
   * 获取所有键
   */
  keys(): string[] {
    try {
      const info = uni.getStorageInfoSync()
      return info.keys
    }
    catch (error) {
      console.error('获取存储键失败:', error)
      return []
    }
  }
}

const storage = new Storage()

export default storage
