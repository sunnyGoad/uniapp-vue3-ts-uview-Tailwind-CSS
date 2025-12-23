/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vue 全局属性扩展
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BasePage: typeof import('./src/components/BasePage/BasePage.vue').default
  }
  
  export interface ComponentCustomProperties {
    [key: string]: any
  }
}

// JSX 类型声明
declare global {
  namespace JSX {
    type Element = any
    type ElementClass = any
    
    interface IntrinsicElements {
      [elem: string]: any
    }
    
    interface ElementAttributesProperty {
      $props: any
    }
    
    interface IntrinsicAttributes {
      [name: string]: any
    }
  }
}

export {}
