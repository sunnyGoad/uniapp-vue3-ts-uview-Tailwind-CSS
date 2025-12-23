export interface ExperimentModule {
  id: number
  title: string
  description: string
  type: 'ui' | 'logic' | 'core'
  author: string
  time: string
}

export const mockTempleResponse = {
  code: 200,
  message: '成功',
  data: [
    {
      id: 1,
      title: '响应式状态机',
      description: '深入理解 Vue3 响应式原理，构建复杂的 UI 交互逻辑流。',
      type: 'logic',
      author: 'Antigravity',
      time: '3分钟前',
    },
    {
      id: 2,
      title: '玻璃数字孪生',
      description: '基于 CSS 变量与 Backdrop-filter 的极致视觉层叠效果。',
      type: 'ui',
      author: 'DeepMind',
      time: '14:20',
    },
    {
      id: 3,
      title: '自动化架构',
      description: '从 Swagger 到 TypeScript 的全自动类型映射与代码生成。',
      type: 'core',
      author: 'Google',
      time: '昨天',
    },
    {
      id: 4,
      title: '性能优化指南',
      description: 'UniApp 跨端编译下的极致加载速度与运行负载均衡方案。',
      type: 'core',
      author: 'Antigravity',
      time: '刚上线',
    },
    {
      id: 5,
      title: '动效工坊',
      description: '探索原生 Canvas 与 CSS 动画在高频交互中的平衡。',
      type: 'ui',
      author: 'Vite',
      time: '2小时前',
    },
    {
      id: 6,
      title: '状态持久化',
      description: '基于 Pinia 的跨端存储同步与多端版本控制。',
      type: 'logic',
      author: 'DeepMind',
      time: '周一',
    },
  ]
}

export const mockTempleList = mockTempleResponse.data
