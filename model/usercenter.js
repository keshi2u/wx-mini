const userInfo = {
  avatarUrl:
    'https://media.discordapp.net/attachments/802195450627227719/1357825889919827978/ChatGPT_Image_Apr_5_2025_02_44_54_AM.png?ex=67f19d67&is=67f04be7&hm=5d0a9cde2e69997736bd8512d2a59d48716f237c6581c03363ab5e23c023278d&=&format=webp&quality=lossless&width=1746&height=1746',
  nickName: '当家',
  phoneNumber: '13438358888',
  gender: 2,
};
const countsData = [
  {
    num: 2,
    name: '积分',
    type: 'point',
  },
  {
    num: 10,
    name: '优惠券',
    type: 'coupon',
  },
];

const orderTagInfos = [
  {
    orderNum: 1,
    tabType: 5,
  },
  {
    orderNum: 1,
    tabType: 10,
  },
  {
    orderNum: 1,
    tabType: 40,
  },
  {
    orderNum: 0,
    tabType: 0,
  },
];

const customerServiceInfo = {
  servicePhone: '4006336868',
  serviceTimeDuration: '每周三至周五 9:00-12:00  13:00-15:00',
};

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = () => ({
  userInfo,
  countsData,
  orderTagInfos,
  customerServiceInfo,
});
