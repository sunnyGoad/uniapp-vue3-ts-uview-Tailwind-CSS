# Mock 数据说明

这个文件夹用于存放临时的 Mock 接口数据，用于模拟后端 API 返回。

## 文件结构

- `user.ts` - 用户相关接口的 Mock 数据
- `product.ts` - 商品相关接口的 Mock 数据
- `order.ts` - 订单相关接口的 Mock 数据
- `index.ts` - Mock 数据入口文件

## 使用方式

1. 在各个模块文件中定义 Mock 数据
2. 在 `index.ts` 中统一导出
3. 在项目中需要的地方导入使用

## 示例

```typescript
// 导入 Mock 数据
import { mockUserInfo, mockUserList } from "@/mock";

// 使用 Mock 数据
const userInfo = mockUserInfo;
const userList = mockUserList;
```

## 注意事项

- Mock 数据仅用于开发测试，不要提交到生产环境
- 保持 Mock 数据结构与真实 API 返回一致
- 定期同步更新 Mock 数据与 API 文档
