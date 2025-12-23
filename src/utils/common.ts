/**
 * 通用工具函数
 */

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null
  return (...args: Parameters<T>) => {
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, wait) as unknown as number
  }
}

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null
  let previous = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func(...args)
    }
    else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func(...args)
      }, remaining) as unknown as number
    }
  }
}

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object')
    return obj
  if (obj instanceof Date)
    return new Date(obj.getTime()) as any
  if (obj instanceof Array) {
    const cloneArr: any[] = []
    obj.forEach((item) => {
      cloneArr.push(deepClone(item))
    })
    return cloneArr as any
  }
  if (obj instanceof Object) {
    const cloneObj: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key))
        cloneObj[key] = deepClone(obj[key])
    }
    return cloneObj
  }
  return obj
}

/**
 * 格式化时间
 */
export const formatTime = (date: Date | number | string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

/**
 * 生成唯一 ID
 */
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * rpx 转 px
 */
export const rpxToPx = (rpx: number): number => {
  const systemInfo = uni.getSystemInfoSync()
  return (rpx / 750) * systemInfo.windowWidth
}

/**
 * px 转 rpx
 */
export const pxToRpx = (px: number): number => {
  const systemInfo = uni.getSystemInfoSync()
  return (px / systemInfo.windowWidth) * 750
}
