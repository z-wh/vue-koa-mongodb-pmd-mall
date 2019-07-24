<template>
  <div>
    <van-nav-bar class="nav-bar" title="购物车" />
    <div class="clear-button">
      <van-button size="small" type="danger" @click="clearCart()">清空购物车</van-button>
    </div>
    <div class="goods-list" v-for="(item, index) in cartInfo" :key="index">
      <div class="goods-img">
        <img :src="item.goodsImg" alt="item.goodsName" class="img-fluid" />
      </div>
      <div class="goods-desc">
        <p class="goods-name">{{item.goodsName}}</p>
        <van-stepper v-model="item.goodsAmount" />
      </div>
      <div class="goods-price">
        <p>￥{{item.goodsPrice | moneyFilter}}元</p>
        <p class="goods-amount">X{{item.goodsAmount}}</p>
        <p class="all-price">￥{{item.goodsPrice * item.goodsAmount | moneyFilter}}元</p>
      </div>
    </div>
    <div class="total-money">
      商品总价：￥
      <span>{{totalMoney | moneyFilter}}</span>元
    </div>
  </div>
</template>

<script>
import toMoney from "@/filter/moneyFilter.js";

export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false
    };
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach(goodsItem => {
        allMoney += goodsItem.goodsPrice * goodsItem.goodsAmount;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  },
  created() {
    this.getCartInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getCartInfo() {
      if (localStorage.getItem("cartInfo")) {
        this.cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
      }
      console.log(JSON.stringify(this.cartInfo));
      this.isEmpty = localStorage.getItem("cartInfo").length > 0 ? true : false;
      console.log(this.isEmpty);
    },
    //清空购物车
    clearCart() {
      localStorage.cartInfo = "";
      this.cartInfo = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
  box-shadow: 0 2px 2px 0 #eee;
}
.clear-button {
  padding: {
    left: px2rem(30px);
    right: px2rem(30px);
  }
  text-align: right;
}

.goods-list {
  display: flex;
  padding: {
    top: px2rem(30px);
    left: px2rem(30px);
    right: px2rem(30px);
    bottom: px2rem(30px);
  }
  border-bottom: 1px solid #eee;
}

.goods-img {
  flex: 6;
}

.goods-desc {
  flex: 13;
  font-size: 12px;
  text-align: left;
}

.goods-price {
  flex: 5;
  font-size: 12px;
  text-align: left;
}

.all-price {
  color: red;
}

.total-money {
  padding: {
    top: px2rem(30px);
    bottom: px2rem(30px);
    right: px2rem(30px);
  }
  font-size: 16px;
  text-align: right;
  span {
    font-weight: bold;
    color: red;
  }
}
</style>
