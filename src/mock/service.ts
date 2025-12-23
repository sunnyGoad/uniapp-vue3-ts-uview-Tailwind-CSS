/**
 * 模拟接口请求服务
 */
import { mockActivityResponse } from './activity'
import { mockTempleResponse } from './temple'
import { mockOrderList, mockOrderDetail } from './order'

// 定义路由映射
const routes: Record<string, any> = {
  '/api/activities': mockActivityResponse,
  '/api/temples': mockTempleResponse,
  '/api/orders': mockOrderList,
  '/api/order/detail': mockOrderDetail,
}

/**
 * 模拟请求函数
 * @param url 请求路径
 * @param options 请求配置
 */
export const request = <T = any>(url: string, options: any = {}): Promise<{ code: number; message: string; data: T }> => {
  const delay = options.delay ?? 1000
  
  return new Promise((resolve, reject) => {
    console.log(`[Mock Request] ${url}`, options)
    
    setTimeout(() => {
      const response = routes[url]
      
      if (response) {
        resolve(response)
      } else {
        reject({
          code: 404,
          message: '接口未找到',
          data: null
        })
      }
    }, delay)
  })
}
