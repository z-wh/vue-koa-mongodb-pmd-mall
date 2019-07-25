<template>
  <div>
    <div class="mb50">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-o">商品</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
    this.changeTabbarActive();
  },
  methods: {
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({ name: "Login" });
          break;
      }
    },
    changeTabbarActive() {
      if (this.$route.path == "/cart") {
        this.active = 2;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mb50 {
  margin-bottom: 50px;
}
</style>
