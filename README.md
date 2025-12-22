# uniapp-vue3-ts-uview-Tailwind-CSS

<p align="center">
  <img src="https://img.shields.io/badge/uniapp-3.0+-green.svg" alt="uniapp">
  <img src="https://img.shields.io/badge/vue-3.0+-brightgreen.svg" alt="vue">
  <img src="https://img.shields.io/badge/typescript-5.0+-blue.svg" alt="typescript">
  <img src="https://img.shields.io/badge/uview-3.0+-orange.svg" alt="uview">
  <img src="https://img.shields.io/badge/tailwindcss-3.0+-06B6D4.svg" alt="tailwindcss">
</p>

## 📖 简介 (Introduction)

这是一个基于 **uniapp + Vue3 + TypeScript + uview-plus + Tailwind CSS** 搭建的跨平台应用开发基础框架模板。该框架整合了现代前端开发的最佳实践，旨在帮助开发者快速启动项目，提高开发效率。

This is a cross-platform application development starter template built with **uniapp + Vue3 + TypeScript + uview-plus + Tailwind CSS**. This framework integrates modern front-end development best practices to help developers quickly start projects and improve development efficiency.

## ✨ 特性 (Features)

- 🚀 **uniapp** - 一套代码，多端运行（iOS、Android、H5、小程序等）
- ⚡️ **Vue 3** - 采用 Vue 3 Composition API，更好的逻辑复用和代码组织
- 🔷 **TypeScript** - 类型安全，提升代码质量和开发体验
- 🎨 **uview-plus** - 功能丰富的 uni-app UI 组件库
- 🌈 **Tailwind CSS** - 原子化 CSS 框架，快速构建现代化界面
- 📦 **开箱即用** - 预配置好的开发环境，可立即开始开发
- 🔧 **最佳实践** - 遵循业界标准的项目结构和编码规范

## 🛠️ 技术栈 (Tech Stack)

| 技术 | 版本 | 说明 |
|------|------|------|
| [uniapp](https://uniapp.dcloud.net.cn/) | 3.0+ | 跨平台应用开发框架 |
| [Vue](https://cn.vuejs.org/) | 3.0+ | 渐进式 JavaScript 框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.0+ | JavaScript 的超集 |
| [uview-plus](https://uviewui.com/) | 3.0+ | uni-app 全面的组件和工具集 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.0+ | 实用优先的 CSS 框架 |

## 📦 快速开始 (Quick Start)

### 环境要求 (Prerequisites)

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **npm** 或 **yarn** 或 **pnpm**: 任意包管理器
- **HBuilderX**: 推荐使用最新版本（可选，也可使用 CLI 开发）

### 安装 (Installation)

1. **克隆仓库**

```bash
git clone https://github.com/sunnyGoad/uniapp-vue3-ts-uview-Tailwind-CSS.git
cd uniapp-vue3-ts-uview-Tailwind-CSS
```

2. **安装依赖**

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

3. **运行开发服务器**

```bash
# H5 端
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin

# 支付宝小程序
npm run dev:mp-alipay

# App 端
npm run dev:app
```

4. **构建生产版本**

```bash
# 构建 H5
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin

# 构建 App
npm run build:app
```

## 📂 项目结构 (Project Structure)

```
uniapp-vue3-ts-uview-Tailwind-CSS/
├── src/                      # 源代码目录
│   ├── pages/               # 页面文件
│   │   └── index/          # 首页
│   ├── components/          # 公共组件
│   ├── static/             # 静态资源
│   ├── store/              # Pinia 状态管理
│   ├── utils/              # 工具函数
│   ├── api/                # API 接口
│   ├── types/              # TypeScript 类型定义
│   ├── styles/             # 全局样式
│   ├── App.vue             # 应用入口组件
│   ├── main.ts             # 应用入口文件
│   ├── manifest.json       # 应用配置
│   └── pages.json          # 页面路由配置
├── public/                  # 公共资源
├── dist/                    # 构建输出目录
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── package.json            # 项目依赖
└── README.md               # 项目说明文档
```

## 🎯 开发指南 (Development Guide)

### 页面开发

1. 在 `src/pages/` 目录下创建新页面
2. 在 `src/pages.json` 中注册页面路由
3. 使用 Vue 3 Composition API 编写页面逻辑
4. 使用 TypeScript 确保类型安全

### 组件开发

1. 在 `src/components/` 目录下创建组件
2. 使用 uview-plus 组件库快速构建界面
3. 结合 Tailwind CSS 进行样式定制

### 状态管理

推荐使用 Pinia 进行状态管理：

```typescript
// src/store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null
  }),
  actions: {
    setUserInfo(info: any) {
      this.userInfo = info
    }
  }
})
```

### API 调用

在 `src/api/` 目录下组织 API 接口：

```typescript
// src/api/user.ts
import { http } from '@/utils/http'

export const getUserInfo = (id: string) => {
  return http.get('/user/info', { id })
}
```

## 🎨 样式开发

### 使用 Tailwind CSS

```vue
<template>
  <view class="flex items-center justify-center h-screen bg-gray-100">
    <text class="text-2xl font-bold text-blue-500">Hello World</text>
  </view>
</template>
```

### 使用 uview-plus 组件

```vue
<template>
  <u-button type="primary" @click="handleClick">点击按钮</u-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  uni.showToast({
    title: '按钮被点击'
  })
}
</script>
```

## 🔧 配置说明 (Configuration)

### Tailwind CSS 配置

在 `tailwind.config.js` 中自定义 Tailwind CSS：

```javascript
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007aff',
      },
    },
  },
  plugins: [],
}
```

### TypeScript 配置

在 `tsconfig.json` 中配置 TypeScript 编译选项：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "types": ["@dcloudio/types"]
  }
}
```

### uniapp 配置

在 `src/manifest.json` 中配置应用信息：

```json
{
  "name": "应用名称",
  "appid": "__UNI__XXXXXX",
  "description": "应用描述",
  "versionName": "1.0.0",
  "versionCode": "100"
}
```

## 📱 多端支持 (Multi-platform Support)

该框架支持编译到以下平台：

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 头条小程序
- ✅ QQ 小程序
- ✅ Android App
- ✅ iOS App

## 🚀 构建与部署 (Build & Deployment)

### H5 部署

```bash
# 构建
npm run build:h5

# 将 dist/build/h5 目录部署到静态服务器
```

### 小程序部署

```bash
# 构建微信小程序
npm run build:mp-weixin

# 使用微信开发者工具打开 dist/build/mp-weixin 目录
# 上传代码到微信平台
```

### App 打包

```bash
# 构建 App
npm run build:app

# 使用 HBuilderX 或云打包服务打包原生应用
```

## 🐛 常见问题 (FAQ)

### 1. 如何解决依赖安装失败？

```bash
# 清除缓存后重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 2. Tailwind CSS 样式不生效？

确保在 `main.ts` 中导入了 Tailwind CSS：

```typescript
import 'tailwindcss/tailwind.css'
```

### 3. uview-plus 组件不显示？

检查是否正确安装和注册了 uview-plus：

```typescript
// main.ts
import uviewPlus from 'uview-plus'
app.use(uviewPlus)
```

### 4. TypeScript 报错？

确保安装了 uni-app 的类型定义：

```bash
npm install -D @dcloudio/types
```

## 📝 编码规范 (Coding Standards)

- 使用 **ESLint** 进行代码检查
- 使用 **Prettier** 进行代码格式化
- 遵循 **Vue 3 风格指南**
- 使用 **TypeScript** 编写类型安全的代码
- 组件使用 **大驼峰命名**
- 文件使用 **小写短横线命名**

## 🤝 贡献指南 (Contributing)

我们欢迎所有的贡献！如果你想为这个项目做出贡献，请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 贡献规范

- 确保代码通过所有测试
- 遵循现有的代码风格
- 添加必要的注释和文档
- 更新相关的文档

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE) 开源协议。

## 📮 联系方式 (Contact)

- **项目地址**: [https://github.com/sunnyGoad/uniapp-vue3-ts-uview-Tailwind-CSS](https://github.com/sunnyGoad/uniapp-vue3-ts-uview-Tailwind-CSS)
- **问题反馈**: [Issues](https://github.com/sunnyGoad/uniapp-vue3-ts-uview-Tailwind-CSS/issues)

## 🙏 鸣谢 (Acknowledgments)

感谢以下开源项目：

- [uniapp](https://uniapp.dcloud.net.cn/)
- [Vue.js](https://cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [uview-plus](https://uviewui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📊 更新日志 (Changelog)

### v1.0.0 (2025-12-22)

- 🎉 初始版本发布
- ✨ 集成 uniapp + Vue3 + TypeScript
- ✨ 集成 uview-plus UI 组件库
- ✨ 集成 Tailwind CSS
- 📝 完善项目文档

---

**如果这个项目对你有帮助，请给它一个 ⭐️ Star！**

Made with ❤️ by [sunnyGoad](https://github.com/sunnyGoad)
