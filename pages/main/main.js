// pages/main/mains.js
Page({

  /**
   * Page initial data
   */
  data: {
    statusBarHeight: 0,
    cardList: [
      {
        image: 'https://media.architecturaldigest.com/photos/67bcc8747dfc89b75d51a6ab/16:9/w_2580,c_limit/Kishani%20Perera_Point%20Dume%20Project_Photographer%20Anthony%20Barcelo.jpg',
        houseType: '新房装修',
        area: '126.00',
        city: '成都市',
        building: '华侨城滨江壹号:*',
        price: '71017.05'
      },
      {
        image: 'https://media.designcafe.com/wp-content/uploads/2019/12/17054728/pick-out-the-bed-wall-for-bedroom-design-2.jpg',
        houseType: '旧房重装',
        area: '64.20',
        city: '长沙市',
        building: '陈家湖社区:*栋*',
        price: '42986.64'
      },
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzS1Dn8c9hfGOxAGAMe79kobRZ4DQUdB2ddw&s',
        houseType: '旧房局改',
        area: '99.00',
        city: '重庆市',
        building: '保利时区1期:*栋*',
        price: '16837.54'
      },
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzDWkS4pRASQEQd2hpCd19j7pSXp7UGvfMA&s',
        houseType: '新房装修',
        area: '127.00',
        city: '武汉市',
        building: '长江广电·光谷家:*',
        price: '62062.13'
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
    });

    wx.cloud.callFunction({
      name: 'getProducts',
      data: {}, // you can pass parameters here
      success: res => {
        console.log('Cloud function response:', res);
        this.setData({
          products: res.result.products
        });
      },
      fail: err => {
        console.error('Cloud function error:', err);
      }
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})