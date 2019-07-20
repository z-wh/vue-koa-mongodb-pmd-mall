const BASEURL = 'https://www.easy-mock.com/mock/5d2c2fc48ca32637d286bc87/vue-koa-mall/';
const LOCALURL = 'http://localhost:3000/';

const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  registUser: LOCALURL + 'user/regist',
  login: LOCALURL + 'user/login',
  getGoodsDetailInfo: LOCALURL + 'goods/getGoodsDetailInfo',
};

module.exports = URL;
