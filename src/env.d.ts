// 全局类型扩展
declare global {
  // uniapp 组件属性
  interface UniElement extends HTMLElement {
    [key: string]: any
  }
  
  // scroll-view 组件
  interface ScrollViewElement {
    'scroll-y'?: boolean
    'scroll-x'?: boolean
    'refresher-enabled'?: boolean
    'refresher-triggered'?: boolean
    '@refresherrefresh'?: (e: any) => void
    '@scrolltolower'?: (e: any) => void
    [key: string]: any
  }
  
  // view 组件
  interface ViewElement {
    class?: string
    style?: string
    [key: string]: any
  }
  
  // image 组件
  interface ImageElement {
    src?: string
    mode?: string
    class?: string
    [key: string]: any
  }
  
  // text 组件
  interface TextElement {
    class?: string
    [key: string]: any
  }
}

// 禁用某些 TypeScript 检查以避免 Vue 组件内部错误
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

export {}
