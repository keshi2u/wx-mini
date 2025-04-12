import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
    section1Open: true,
    section2Open: true 
  },
  async init() {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  toggleSection: function(e) {
    const section = e.currentTarget.dataset.section;
    if (section === '1') {
      this.setData({
        section1Open: !this.data.section1Open
      });
    } else if (section === '2') {
      this.setData({
        section2Open: !this.data.section2Open
      });
    }
  },
  onChange() {
    wx.navigateTo({
      url: '/pages/goods/list/index',
    });
  },
  onLoad() {
    this.init(true);
  },
});
