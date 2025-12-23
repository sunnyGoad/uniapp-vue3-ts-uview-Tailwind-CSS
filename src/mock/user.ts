/**
 * 用户相关 Mock 数据
 */

// 用户信息接口返回
export const mockUserInfo = {
  code: 200,
  message: '成功',
  data: {
    id: 1,
    username: 'testuser',
    nickname: '测试用户',
    avatar: 'https://via.placeholder.com/100',
    phone: '13800138000',
    email: 'test@example.com',
    gender: 1, // 1-男 2-女 0-未知
    birthday: '1990-01-01',
    createTime: '2023-01-01 00:00:00',
    updateTime: '2023-12-23 14:20:00'
  }
}

// 用户列表接口返回
export const mockUserList = {
  code: 200,
  message: '成功',
  data: {
    list: [
      {
        id: 1,
        username: 'user1',
        nickname: '用户1',
        avatar: 'https://via.placeholder.com/100',
        phone: '13800138001',
        status: 1 // 1-正常 2-禁用
      },
      {
        id: 2,
        username: 'user2',
        nickname: '用户2',
        avatar: 'https://via.placeholder.com/100',
        phone: '13800138002',
        status: 1
      },
      {
        id: 3,
        username: 'user3',
        nickname: '用户3',
        avatar: 'https://via.placeholder.com/100',
        phone: '13800138003',
        status: 1
      }
    ],
    total: 3,
    pageNum: 1,
    pageSize: 10
  }
}

// 登录接口返回
export const mockLogin = {
  code: 200,
  message: '登录成功',
  data: {
    token: 'mock-token-string-123456789',
    userInfo: {
      id: 1,
      username: 'testuser',
      nickname: '测试用户',
      avatar: 'https://via.placeholder.com/100'
    }
  }
}

// 注册接口返回
export const mockRegister = {
  code: 200,
  message: '注册成功',
  data: {
    id: 10,
    username: 'newuser',
    nickname: '新用户'
  }
}
