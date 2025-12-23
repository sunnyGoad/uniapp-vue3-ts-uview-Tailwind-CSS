/**
 * 订单相关 Mock 数据
 */

// 订单详情接口返回
export const mockOrderDetail = {
  code: 200,
  message: '成功',
  data: {
    id: 1,
    orderNo: 'ORD20231223001',
    status: 1, // 1-待支付 2-待发货 3-待收货 4-已完成 5-已取消
    statusText: '待支付',
    totalAmount: 299.97,
    actualAmount: 289.97,
    discountAmount: 10.00,
    freight: 0,
    paymentMethod: 1, // 1-微信支付 2-支付宝 3-余额支付
    createTime: '2023-12-23 14:00:00',
    payTime: '',
    deliveryTime: '',
    finishTime: '',
    products: [
      {
        id: 1,
        productId: 1,
        name: '商品1',
        price: 99.99,
        quantity: 2,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 2,
        productId: 2,
        name: '商品2',
        price: 99.99,
        quantity: 1,
        image: 'https://via.placeholder.com/100'
      }
    ],
    address: {
      id: 1,
      name: '张三',
      phone: '13800138000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: 'xx街道xx小区xx栋xx号',
      isDefault: true
    }
  }
}

// 订单列表接口返回
export const mockOrderList = {
  code: 200,
  message: '成功',
  data: {
    list: [
      {
        id: 1,
        orderNo: 'ORD20231223001',
        status: 1,
        statusText: '待支付',
        totalAmount: 299.97,
        createTime: '2023-12-23 14:00:00',
        products: [
          {
            productId: 1,
            name: '商品1',
            price: 99.99,
            quantity: 2,
            image: 'https://via.placeholder.com/100'
          }
        ]
      },
      {
        id: 2,
        orderNo: 'ORD20231223002',
        status: 2,
        statusText: '待发货',
        totalAmount: 149.99,
        createTime: '2023-12-23 13:00:00',
        products: [
          {
            productId: 2,
            name: '商品2',
            price: 149.99,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
          }
        ]
      },
      {
        id: 3,
        orderNo: 'ORD20231223003',
        status: 4,
        statusText: '已完成',
        totalAmount: 79.99,
        createTime: '2023-12-22 10:00:00',
        products: [
          {
            productId: 3,
            name: '商品3',
            price: 79.99,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
          }
        ]
      }
    ],
    total: 3,
    pageNum: 1,
    pageSize: 10
  }
}

// 创建订单接口返回
export const mockCreateOrder = {
  code: 200,
  message: '订单创建成功',
  data: {
    orderId: 10,
    orderNo: 'ORD20231223010'
  }
}

// 取消订单接口返回
export const mockCancelOrder = {
  code: 200,
  message: '订单已取消',
  data: null
}
