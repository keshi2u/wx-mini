import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    featuredProducts: [], // Add this for featured products
    categoryProducts: [], // Add this for category-specific products
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
    statusBarHeight: 0,
    navBarHeight: 44,
    safeAreaInsets: null
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    // Get system info for safe area calculations
    const systemInfo = wx.getSystemInfoSync();
    const { statusBarHeight, safeArea } = systemInfo;
    
    this.setData({
      statusBarHeight: statusBarHeight,
      navBarHeight: statusBarHeight + 44, // 44 is typical navigation bar height
      safeAreaInsets: safeArea ? {
        top: safeArea.top,
        bottom: systemInfo.screenHeight - safeArea.bottom
      } : { top: statusBarHeight, bottom: 0 }
    });

    this.init();

    this.fetchFeaturedProducts();
    this.fetchCategoryProducts();
  },
  fetchFeaturedProducts() {
    // Replace with your actual API call
    const featuredProducts = [
      { id: 1, name: '无忧产品1', image: '/assets/products/product1.jpg' },
      { id: 2, name: '无忧产品2', image: '/assets/products/product2.jpg' },
      { id: 3, name: '无忧产品3', image: '/assets/products/product3.jpg' },
      { id: 4, name: '无忧产品4', image: '/assets/products/product4.jpg' },
      { id: 5, name: '无忧产品5', image: '/assets/products/product5.jpg' },
      { id: 6, name: '无忧产品6', image: '/assets/products/product6.jpg' },
      { id: 7, name: '无忧产品7', image: '/assets/products/product7.jpg' },
      { id: 8, name: '无忧产品8', image: '/assets/products/product8.jpg' },
    ];
    this.setData({ featuredProducts });
  },

  fetchCategoryProducts() {
    const categoryProducts = [
      { id: 1, name: '无忧产品1', image: '/assets/products/product9.jpg' },
      { id: 2, name: '无忧产品2', image: '/assets/products/product2.jpg' },
      { id: 3, name: '无忧产品3', image: '/assets/products/product3.jpg' },
      { id: 4, name: '无忧产品4', image: '/assets/products/product4.jpg' },
    ];
    this.setData({ categoryProducts });
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});