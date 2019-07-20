const BASEURL = 'https://www.easy-mock.com/mock/5d2c2fc48ca32637d286bc87/vue-koa-mall/';
const LOCALURL = 'http://localhost:3000/';

const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  registUser: LOCALURL + 'user/regist', //注册接口
  login: LOCALURL + 'user/login', //登陆接口
  getGoodsDetailInfo: LOCALURL + 'goods/getGoodsDetailInfo', //获得商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', //获得大类列表
  getSubCategoryList: LOCALURL + "goods/getSubCategoryList", //获得子类列表
  getGoodsListBySubCategoryId: LOCALURL + 'goods/getGoodsListBySubCategoryId', //获得子类下的商品列表
};

module.exports = URL;
