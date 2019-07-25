import Vue from 'vue';
import Router from 'vue-router';
import ShoppingMall from './views/ShoppingMall.vue';
import RegistUser from './views/RegistUser.vue';
import Login from './views/Login.vue';
import Goods from './views/Goods.vue';
import CategoryList from './views/CategoryList.vue';
import Cart from './views/Cart.vue';
import Main from './views/Main.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall,
        },
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: CategoryList,
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
        },
      ],
    },
    {
      path: '/regist',
      name: 'RegistUser',
      component: RegistUser,
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },
  ],
});
