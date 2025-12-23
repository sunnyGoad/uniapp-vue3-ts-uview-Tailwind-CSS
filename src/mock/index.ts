/**
 * Mock 数据统一导出入口
 */

// 用户相关
export {
  mockUserInfo,
  mockUserList,
  mockLogin,
  mockRegister
} from './user'

// 商品相关
export {
  mockProductDetail,
  mockProductList,
  mockCategoryList
} from './product'

// 订单相关
export {
  mockOrderDetail,
  mockOrderList,
  mockCreateOrder,
  mockCancelOrder
} from './order'
// 活动相关
export {
  mockActivityList,
  mockActivityResponse
} from './activity'
// 实验/模板相关
export {
  mockTempleList,
  mockTempleResponse
} from './temple'
