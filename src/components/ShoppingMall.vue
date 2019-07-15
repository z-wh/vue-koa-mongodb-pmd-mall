<template>
  <div>
    <!-- search-bar layout -->
    <div class="search-bar">
      <van-row>
        <van-col span="3"><div class="iconfont icon-map"></div></van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5"><van-button type='mini' class="search-button">查找</van-button></van-col>
      </van-row>
    </div>

    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key=index>
          <img v-lazy=banner.imageUrl class="img-fluid">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Shopping Mall",
      bannerPicArray:[
                {imageUrl:'http://zyadmin.xhd.cn/u/cms/hangzhou/201905/30183922gbpc.jpg'},
                {imageUrl:'http://zyadmin.xhd.cn/u/cms/hangzhou/201905/30180508emrn.jpg'},
                {imageUrl:'http://zyadmin.xhd.cn/u/cms/hangzhou/201905/30184348vaxn.jpg'},
            ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_1028335_fhply8frqkr.css');

.search-bar {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 1.2rem;
  font-size: 16px;
  line-height: 1.2rem;
  color: #fff;
  background-color: rgba(#fff, .4);
}

.search-input {
  display: block;
  height: .9rem;
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

.img-fluid {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
