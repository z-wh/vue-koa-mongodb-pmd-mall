<template>
  <div>
    <!-- search-bar layout -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <div class="iconfont icon-map"></div>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button type="mini" class="search-button">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" class="img-fluid" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- categroy -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" class="img-fluid" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- adBanner -->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" class="img-fluid" />
    </div>

    <!-- recommend goods area -->
    <recommend-component :recommendData="recommendGoods"></recommend-component>

    <!-- floor area -->
    <floor-component :floorData="floor1" :floorName="floorNames.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorName="floorNames.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorName="floorNames.floor3"></floor-component>

    <!-- hot goods area -->
    <div class="hot-goods-area">
      <div class="hot-goods-title">热卖商品</div>
      <div class="hot-goods-body">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info-component :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info-component>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from '@/serviceAPI.config.js'
import recommendComponent from "@/components/recommendComponent";
import floorComponent from "@/components/floorComponent";
import goodsInfoComponent from "@/components/goodsInfoComponent";

export default {
  data() {
    return {
      bannerPicArray: [],
      category: [],
      adBanner: {},
      recommendGoods: [],
      floorNames: {},
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods: []
    };
  },
  components: {
    recommendComponent,
    floorComponent,
    goodsInfoComponent
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "GET"
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floorNames = response.data.data.floorName;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_1028335_fhply8frqkr.css");

.search-bar {
  z-index: 999;
  width: 100%;
  height: px2rem(100px);
  font-size: 16px;
  line-height: px2rem(100px);
  color: #fff;
  background-color: #e5017d;
}

.search-input {
  display: block;
  height: px2rem(80px);
  width: 95%;
  outline: 0;
  border: 0;
  border-bottom: 1px solid #fff;
  background-color: transparent;
}

.search-button {
  border: 0;
  color: #222;
}

.type-bar {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  div {
    flex: 0 1 20%;
    padding: 0.2rem;
    font-size: 12px;
    text-align: center;
  }
}

.hot-goods-title {
    padding: px2rem(20px);
    font-size: 16px;
    font-weight: bold;
}
</style>
