import updateManager from './common/updateManager';

App({
  // onLaunch: function () {},
  // onShow: function () {
  //   updateManager();
  // },
  onLaunch() {
    // 初始化云开发
    wx.cloud.init({
      env: '你的环境ID', // 替换为你的环境ID
      traceUser: true, // 记录用户访问
    });
  }
});
