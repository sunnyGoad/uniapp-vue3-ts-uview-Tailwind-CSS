/**
 * 商品相关 Mock 数据
 */

// 商品详情接口返回
export const mockProductDetail = {
  code: 200,
  message: '成功',
  data: {
    id: 1,
    name: '测试商品',
    price: 99.99,
    originalPrice: 199.99,
    stock: 100,
    sales: 1000,
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/400/ff0000',
      'https://via.placeholder.com/400/00ff00'
    ],
    description: '这是一个测试商品的详细描述',
    categoryId: 1,
    categoryName: '测试分类',
    status: 1, // 1-上架 2-下架
    createTime: '2023-01-01 00:00:00'
  }
}

// 商品列表接口返回
export const mockProductList = {
  code: 200,
  message: '成功',
  data: {
    list: [
      {
        id: 1,
        name: '商品1',
        price: 99.99,
        originalPrice: 199.99,
        image: 'https://via.placeholder.com/200',
        sales: 1000,
        stock: 100
      },
      {
        id: 2,
        name: '商品2',
        price: 149.99,
        originalPrice: 299.99,
        image: 'https://via.placeholder.com/200',
        sales: 800,
        stock: 80
      },
      {
        id: 3,
        name: '商品3',
        price: 79.99,
        originalPrice: 159.99,
        image: 'https://via.placeholder.com/200',
        sales: 1200,
        stock: 120
      },
      {
        id: 4,
        name: '商品4',
        price: 199.99,
        originalPrice: 399.99,
        image: 'https://via.placeholder.com/200',
        sales: 500,
        stock: 50
      }
    ],
    total: 4,
    pageNum: 1,
    pageSize: 10
  }
}

// 商品分类列表接口返回
export const mockCategoryList = {
  code: 200,
  message: '成功',
  data: [
    {
      id: 1,
      name: '数码产品',
      icon: 'https://via.placeholder.com/50',
      children: [
        { id: 11, name: '手机', icon: 'https://via.placeholder.com/50' },
        { id: 12, name: '电脑', icon: 'https://via.placeholder.com/50' },
        { id: 13, name: '平板', icon: 'https://via.placeholder.com/50' }
      ]
    },
    {
      id: 2,
      name: '服装配饰',
      icon: 'https://via.placeholder.com/50',
      children: [
        { id: 21, name: '男装', icon: 'https://via.placeholder.com/50' },
        { id: 22, name: '女装', icon: 'https://via.placeholder.com/50' },
        { id: 23, name: '童装', icon: 'https://via.placeholder.com/50' }
      ]
    },
    {
      id: 3,
      name: '食品生鲜',
      icon: 'https://via.placeholder.com/50',
      children: [
        { id: 31, name: '水果', icon: 'https://via.placeholder.com/50' },
        { id: 32, name: '蔬菜', icon: 'https://via.placeholder.com/50' },
        { id: 33, name: '肉类', icon: 'https://via.placeholder.com/50' }
      ]
    }
  ]
}
