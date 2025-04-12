// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    message: 'Hello from cloud!',
    products: [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' }
    ]
  }
}
