/**
 * 请求配置
 */
export interface RequestConfig {
  baseURL: string
  timeout: number
  showLoading: boolean
  loadingText: string
}

/**
 * 请求选项
 */
export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
  params?: Record<string, any>
  header?: Record<string, string>
  timeout?: number
  showLoading?: boolean
  loadingText?: string
}

/**
 * 响应数据
 */
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

/**
 * 存储数据
 */
export interface StorageData<T = any> {
  value: T
  expire?: number
}

/**
 * 分页参数
 */
export interface PageParams {
  page: number
  pageSize: number
}

/**
 * 分页响应
 */
export interface PageResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
