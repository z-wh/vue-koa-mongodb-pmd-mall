import Vue from 'vue';
import Router from 'vue-router';
import ShoppingMall from './views/ShoppingMall.vue';
import RegistUser from './views/RegistUser.vue';
import Login from './views/Login.vue';
import Goods from './views/Goods.vue';
import CategoryList from './views/CategoryList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall,
    },
    {
      path: '/regist',
      name: 'RegistUser',
      component: RegistUser,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },
    {
      path: '/categoryList',
      name: 'CategoryList',
      component: CategoryList,
    },
  ],
});
