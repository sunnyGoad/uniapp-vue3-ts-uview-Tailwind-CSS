/**
 * BasePage 组件 Props 类型定义
 */
export interface BasePageProps {
  /** 是否启用下拉刷新 */
  enablePullRefresh?: boolean
  /** 是否启用上拉加载 */
  enableLoadMore?: boolean
  /** 是否正在加载 */
  loading?: boolean
  /** 是否显示空页面 */
  isEmpty?: boolean
  /** 空页面文本 */
  emptyText?: string
  /** 空页面图片 */
  emptyImage?: string
  /** 是否已加载完所有数据 */
  finished?: boolean
  /** 加载完成提示文本 */
  finishedText?: string
  /** 自动触发首次加载 */
  autoLoad?: boolean
}

/**
 * BasePage 组件事件类型定义
 */
export interface BasePageEmits {
  /** 下拉刷新事件 */
  (e: 'refresh'): void
  /** 上拉加载事件 */
  (e: 'loadMore'): void
}
