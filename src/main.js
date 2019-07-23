import Vue from 'vue';
import {
  Button, Row, Col, Swipe, SwipeItem, Lazyload, List, NavBar, Field, Tab, Tabs, PullRefresh,
} from 'vant';
import calcRootFontSize from './fontSize';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(List)
  .use(NavBar)
  .use(Field)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh);

Vue.config.productionTip = false;

calcRootFontSize();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
