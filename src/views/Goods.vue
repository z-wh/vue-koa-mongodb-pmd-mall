<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft()" />
    <div class="goods-img">
      <img :src="goodsInfo.IMAGE1" :alt="goodsInfo.NAME" class="img-fluid" />
    </div>
    <h4 class="goods-name">{{goodsInfo.NAME}}</h4>
    <p class="goods-price">
      <span>原价:{{goodsInfo.ORI_PRICE | moneyFilter}}元&nbsp;</span>
      现价:{{goodsInfo.PRESENT_PRICE | moneyFilter}}元
    </p>
    <div class="goods-desc">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情" v-html="goodsInfo.DETAIL"></van-tab>
        <van-tab title="用户评价">正在制作中...</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart()">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import toMoney from "@/filter/moneyFilter.js";

export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  created() {
    this.getGoodsDetailInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getGoodsDetailInfo() {
      // 页面打开后从url参数中获得goodsId
      this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
      axios({
        url: url.getGoodsDetailInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            console.log(response.data.message);
            this.goodsInfo = response.data.message;
          } else {
            Toast.fail("服务器错误，获取数据失败");
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart() {
      //1.查找localStorage中是否有购物车数据,如果有附值，没有传入空数组
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
      //2.判断是否有和当前页面的商品
      let isHaveGoods = cartInfo.find(goodsItem => goodsItem.goodsId == this.goodsId);
      //3.如果没有该商品则添加，有则提示已添加过
      if (!isHaveGoods) {
        let newGoodsItem = {
          goodsId: this.goodsInfo.ID,
          goodsName: this.goodsInfo.NAME,
          goodsPrice: this.goodsInfo.PRESENT_PRICE,
          goodsImg: this.goodsInfo.IMAGE1,
          goodsAmount: 1,
        };
        cartInfo.push(newGoodsItem);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        console.log(JSON.stringify(localStorage.cartInfo));
      } else {
        Toast.fail("您已添加过该商品");
      }

      // 4.添加完成后，跳转到购物车页面
      this.$router.push({name: "Cart"});
    },
  }
};
</script>

<style lang="scss" scoped>
.goods-name {
  padding-left: px2rem(30px);
  margin: px2rem(10px) 0 px2rem(4px);
  font-size: 18px;
  text-align: left;
}

.goods-price {
  padding-left: px2rem(30px);
  margin: px2rem(4px) 0;
  font-size: 16px;
  text-align: left;
  color: red;

  span {
    font-size: 12px;
    text-decoration: line-through;
    color: #aaa;
  }
}

.goods-desc {
  line-height: 0;
}

.goods-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  padding: px2rem(12px);
  line-height: 0;
  background-color: #fff;
  box-sizing: border-box;

  div {
    flex: 1;
  }
}
</style>
