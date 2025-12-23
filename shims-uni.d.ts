// uview-plus 模块声明
declare module 'uview-plus' {
  const uviewPlus: any
  export default uviewPlus
}

// uni-app 全局对象声明
declare const uni: any
declare const plus: any
declare const wx: any
declare const getApp: any
declare const getCurrentPages: any

// 扩展 Window 接口
interface Window {
  uni: any
  plus: any
  wx: any
}

export {}
