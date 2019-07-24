<template>
  <div>
    <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft()" />
    <van-row>
      <van-col span="6">
        <ul id="left-nav">
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            :class="{actived: activedIndex==index}"
            @click="clickCategory(index, item.ID)"
          >{{item.MALL_CATEGORY_NAME}}</li>
        </ul>
      </van-col>
      <van-col span="18">
        <van-tabs swipeable v-model="subActivedIndex" @click="clickSubCategory">
          <van-tab
            v-for="(item,index) in subCategoryList"
            :key="index"
            :name="item.ID"
            :title="item.MALL_SUB_NAME"
          />
        </van-tabs>
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh()">
          <van-list
            id="list-wrapper"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad()"
          >
            <div class="goods-wrapper" v-for="(item, index) in goodsList" :key="index" @click="goGoodsInfo(item.ID)">
              <div class="goods-img">
                <img :src="item.IMAGE1" class="img-fluid" :onerror="errorImg" />
              </div>
              <div class="goods-name">{{item.NAME}}</div>
              <div class="goods-price">￥{{item.PRESENT_PRICE | moneyFilter}}</div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import toMoney from "@/filter/moneyFilter";

export default {
  data() {
    return {
      categoryList: [], //大类列表
      activedIndex: 0, //大类点击激活状态
      subCategoryList: [], //子类列表
      subCategoryId: "", //子类ID
      subActivedIndex: 0, //子类点击后激活状态
      page: 1, //当前展示第几页数据
      goodsList: [], //商品列表信息
      loading: false, //上拉加载状态
      finished: false, //数据是否被加载完
      isRefresh: false, //下拉刷新状态
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"',
      /**
       * 上拉加载由于各种原因会同时触发2次甚至多次，
       * 比如
       * 1.vant的list组件刚载入初始化时会立即loading一次
       * 2.list组件发现数据不够一屏时，会继续请求数据
       * 3.滚动到页面底部加载更多，稍微滚动一下就会触发n多次scroll事件
       * 因些，设定一个定时器，在单位时间内限制只能提交一次请求
       * 避免[1]多加载数据或同时请求相同page的数据从而导致[2]数据重复的问题
       */
      timer: null
    };
  },
  created() {
    // 1.页面一载入就开始获取大类
    this.getCategoryList();
  },
  mounted() {
    const winHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    document.getElementById("left-nav").style.height = winHeight - 46 + "px";
    document.getElementById("list-wrapper").style.height =
      winHeight - 90 + "px";
  },
  filters: {
    moneyFilter: function(money) {
      return toMoney(money);
    }
  },
  methods: {
    // 获取商品大类列表
    getCategoryList() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categoryList = response.data.message;
            // 2.获取大类方法中，通过大类ID获取子类
            this.getSubCategoryByCategoryId(this.categoryList[0].ID);
            console.log("********商品大类信息*************");
            console.log(response.data.message);
          } else {
            console.log("没有获取到商品大类信息");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 通过大类ID获取子类
    getSubCategoryByCategoryId(categoryId) {
      axios({
        url: url.getSubCategoryList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.subCategoryList = response.data.message;
            this.subActivedIndex = 0;
            console.log("********商品子类信息*************");
            console.log(this.subCategoryList);
            /**
             * 页面打开->
             * created生命周期中即开始获取大类->
             * 获取大类方法中，通过大类ID开始获取子类->
             * 3.获取子类方法中，通过子类ID开始获取商品列表
             */
            this.subCategoryId = this.subCategoryList[0].ID;
            console.log("获取子类中的方法" + this.subCategoryId);
            this.onLoad();
          } else {
            console.log("没有获取到子类列表");
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击返加箭头事件
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击商品大类事件
    clickCategory(index, categoryId) {
      this.activedIndex = index;
      console.log("----------------点击大类--------------");
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.getSubCategoryByCategoryId(categoryId);
    },
    /**
     * 点击商品子类事件
     * vant的tab的点击事件要绑定在tabs上，不能绑在tab上
     * @param index vant-tabs组件的click事件默认传入(name, title)
     * (name,title) 通过vant-tab上的props绑定传入
     */
    clickSubCategory(index) {
      this.subCategoryId = index;
      console.log("--------------点击子类:" + this.subCategoryId);
      this.page = 1;
      this.goodsList = [];
      this.finished = false;
      this.onLoad();
    },
    // 通过子类ID获取该子类下的商品列表
    getGoodsListBySubCategoryId() {
      axios({
        url: url.getGoodsListBySubCategoryId,
        method: "post",
        data: {
          subCategoryId: this.subCategoryId,
          page: this.page
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodsList = this.goodsList.concat(response.data.message);
            console.log("********商品信息*************:下次请求页" + this.page);
            console.log(this.goodsList);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上拉加载更多数据
    onLoad() {
      /**
       * 只有当定时器不存在的时候才执行
       * 如果已经在执行了，就不执行
       * 避免同一时间多次请求
       */
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.subCategoryId = this.subCategoryId
            ? this.subCategoryId
            : this.subCategoryList[0].ID;
          console.log("onLoad中:" + this.subCategoryId);
          this.getGoodsListBySubCategoryId();
          console.log("onLoad中page:" + this.page);
          this.timer = null;
        }, 1000);
      } else {
        console.log("正在请求中。。。。");
      }
    },
    // 下拉刷新
    onRefresh() {
      this.isRefresh = false;
      this.page = 1;
      this.finished = false;
      this.goodsList = [];
      this.onLoad();
    },
    // 点击商品跳转到商品详情
    goGoodsInfo(goodsId) {
      this.$router.push({name:'Goods', params: {goodsId}})
    }
  }
};
</script>

<style lang="scss" scoped>
#left-nav {
  font-size: 14px;
  background: #f4f4f4;

  li {
    padding: {
      top: px2rem(20px);
      bottom: px2rem(20px);
    }
    border-bottom: 1px solid #eee;
  }

  .actived {
    background: #fff;
  }
}

#list-wrapper {
  overflow: scroll;
}

.goods-wrapper {
  display: flex;
  padding: px2rem(30px) px2rem(10px);
  border-bottom: 1px solid #eee;
}

.goods-img {
  flex: 8;
}

.goods-name {
  flex: 12;
  font-size: 12px;
}

.goods-price {
  flex: 4;
  font-size: 12px;
}
</style>
