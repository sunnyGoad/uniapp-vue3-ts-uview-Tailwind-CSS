# uniapp-vue3-ts-uview-Tailwind-CSS

这是一个 uniapp + vue3 + ts + uview + Tailwind CSS 搭建的基础前端框架

## 特性

- ✅ **Vue 3** - 使用最新的 Vue 3 Composition API
- ✅ **TypeScript** - 完整的类型支持
- ✅ **Pinia** - 轻量级状态管理
- ✅ **uView Plus** - 丰富的 UI 组件库
- ✅ **Tailwind CSS** - 实用的 CSS 框架
- ✅ **Request 封装** - 支持拦截器、错误处理
- ✅ **Storage 工具** - 支持过期时间的缓存
- ✅ **BasePage 组件** - 支持下拉刷新、上拉加载
- ✅ **Swagger 自动对接** - 一键生成 API 和类型定义
- ✅ **主题配置** - 预设 class 类名，快速开发
- ✅ **多端兼容** - 支持微信小程序和 H5

## 项目结构

```
src/
├── api/                    # API 接口（自动生成）
├── components/             # 公共组件
│   └── BasePage/          # 基础页面组件
├── config/                 # 配置文件
│   └── theme.ts           # 主题配置
├── pages/                  # 页面
│   ├── index/             # 首页
│   └── temple/            # 示例页面
├── store/                  # Pinia 状态管理
├── types/                  # TypeScript 类型定义
├── utils/                  # 工具函数
│   ├── request.ts         # 请求封装
│   ├── storage.ts         # 缓存工具
│   └── common.ts          # 通用工具
├── App.vue                # 应用入口
├── main.ts                # 主文件
├── manifest.json          # 应用配置
├── pages.json             # 页面配置
└── uni.scss               # 全局样式

scripts/                    # 脚本文件
├── swagger-parser.ts      # Swagger 解析器
├── type-generator.ts      # 类型生成器
├── api-generator.ts       # API 生成器
└── generate-api.ts        # 生成入口
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Swagger（可选）

编辑 `swagger.config.json`：

```json
{
  "swaggerUrl": "https://your-api.com/swagger.json",
  "outputDir": "src/api",
  "typeOutputDir": "src/api/types",
  "apiOutputDir": "src/api/modules"
}
```

### 3. 生成 API（可选）

```bash
npm run generate:api
```

### 4. 运行项目

```bash
# H5 端
npm run dev:h5

# 微信小程序端
npm run dev:mp-weixin
```

### 5. 构建项目

```bash
# H5 端
npm run build:h5

# 微信小程序端
npm run build:mp-weixin
```

## 核心功能

### Request 请求工具

```typescript
import request from "@/utils/request";

// GET 请求
const data = await request.get("/api/users", { page: 1 });

// POST 请求
const result = await request.post("/api/users", { name: "John" });
```

### Storage 缓存工具

```typescript
import storage from "@/utils/storage";

// 设置缓存（永久）
storage.set("key", "value");

// 设置缓存（30秒后过期）
storage.set("key", "value", 30);

// 获取缓存
const value = storage.get("key");
```

### BasePage 组件

```vue
<template>
  <BasePage
    :enable-pull-refresh="true"
    :enable-load-more="true"
    :loading="loading"
    :is-empty="isEmpty"
    @refresh="handleRefresh"
    @load-more="handleLoadMore"
  >
    <!-- 内容 -->
  </BasePage>
</template>
```

### 主题配置

使用预设的 class 类名：

```vue
<view class="bg-primary text-white p-3 rounded-lg shadow">
  内容
</view>
```

## Swagger 自动对接

### 配置

```json
{
  "swaggerUrl": "https://api.example.com/swagger.json",
  "outputDir": "src/api",
  "generateTypes": true,
  "generateApi": true
}
```

### 生成

```bash
npm run generate:api
```

### 使用

```typescript
// 自动生成的 API
import { getUsers, createUser } from "@/api/modules/user";

// 自动生成的类型
import type { User, CreateUserRequest } from "@/api/types";

const users = await getUsers({ page: 1 });
const newUser = await createUser({ name: "John" });
```

## 开发指南

### 新建页面

1. 在 `src/pages` 创建页面文件夹和 `.vue` 文件
2. 在 `src/pages.json` 中注册页面
3. 使用 `BasePage` 组件快速开发

### 状态管理

```typescript
import { defineStore } from "pinia";

export const useMyStore = defineStore("my", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### 工具函数

```typescript
// 防抖
import { debounce } from "@/utils/common";

// 节流
import { throttle } from "@/utils/common";

// 时间格式化
import { formatTime } from "@/utils/common";
```

## 兼容性

- ✅ 微信小程序
- ✅ H5
- 🚧 其他平台（需要测试）

## License

MIT
