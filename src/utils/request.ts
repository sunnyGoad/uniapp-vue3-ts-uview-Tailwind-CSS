import type { RequestConfig, RequestOptions, ResponseData } from '@/types'

/**
 * 请求类
 */
class Request {
  private config: RequestConfig = {
    baseURL: '',
    timeout: 60000,
    showLoading: true,
    loadingText: '加载中...',
  }

  /**
   * 设置配置
   */
  setConfig(config: Partial<RequestConfig>) {
    this.config = { ...this.config, ...config }
  }

  /**
   * 请求拦截器
   */
  private requestInterceptor(options: RequestOptions): RequestOptions {
    // 添加 token
    const token = uni.getStorageSync('token')
    if (token) {
      options.header = {
        ...options.header,
        Authorization: `Bearer ${token}`,
      }
    }

    // 添加基础 URL
    if (this.config.baseURL && !options.url.startsWith('http')) {
      options.url = this.config.baseURL + options.url
    }

    // 处理 params
    if (options.params) {
      const params = new URLSearchParams(options.params).toString()
      options.url += (options.url.includes('?') ? '&' : '?') + params
    }

    return options
  }

  /**
   * 响应拦截器
   */
  private responseInterceptor<T>(response: UniApp.RequestSuccessCallbackResult): Promise<T> {
    const data = response.data as ResponseData<T>

    // 根据业务需求处理响应
    if (data.code === 200 || data.code === 0) {
      return Promise.resolve(data.data)
    }

    // 处理错误
    if (data.code === 401) {
      // token 过期，跳转登录
      uni.removeStorageSync('token')
      uni.reLaunch({
        url: '/pages/login/login',
      })
    }

    uni.showToast({
      title: data.message || '请求失败',
      icon: 'none',
    })

    return Promise.reject(new Error(data.message || '请求失败'))
  }

  /**
   * 发起请求
   */
  request<T = any>(options: RequestOptions): Promise<T> {
    const showLoading = options.showLoading ?? this.config.showLoading
    const loadingText = options.loadingText ?? this.config.loadingText
    const timeout = options.timeout ?? this.config.timeout

    // 显示加载提示
    if (showLoading) {
      uni.showLoading({
        title: loadingText,
        mask: true,
      })
    }

    // 请求拦截
    const requestOptions = this.requestInterceptor(options)

    return new Promise<T>((resolve, reject) => {
      uni.request({
        ...requestOptions,
        method: requestOptions.method || 'GET',
        timeout,
        success: (res) => {
          this.responseInterceptor<T>(res)
            .then(resolve)
            .catch(reject)
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none',
          })
          reject(err)
        },
        complete: () => {
          if (showLoading) {
            uni.hideLoading()
          }
        },
      })
    })
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, params?: Record<string, any>, options?: Partial<RequestOptions>): Promise<T> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...options,
    })
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...options,
    })
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>): Promise<T> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...options,
    })
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, params?: Record<string, any>, options?: Partial<RequestOptions>): Promise<T> {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...options,
    })
  }
}

// 创建实例
const request = new Request()

// 设置基础配置（可在 main.ts 中配置）
export const setRequestConfig = (config: Partial<RequestConfig>) => {
  request.setConfig(config)
}

export default request
