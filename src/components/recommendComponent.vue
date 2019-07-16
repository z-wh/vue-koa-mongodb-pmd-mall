<template>
  <div>
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" :alt="item.goodsName" class="img-fluid" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-black" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ToMoney from "@/filter/moneyFilter.js";

export default {
  props: ["recommendData"],
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      recommendGoods: []
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  watch: {
    recommendData: function() {
      this.recommendGoods = this.recommendData;
    }
  },
  filters: {
    moneyFilter(money) {
      return ToMoney(money);
    }
  }
};
</script>

<style lang="scss" scoped>
.recommend-area {
  margin-top: px2rem(10px);
}

.recommend-title {
  padding: px2rem(20px);
  font-size: 16px;
  font-weight: bold;
}

.recommend-item {
  padding: px2rem(10px);

  div {
    font-size: 12px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
