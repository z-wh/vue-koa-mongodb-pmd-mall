<template>
  <div>
    <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft()" />
    <van-row>
      <van-col span="6">
        <ul class="left-nav">
          <li v-for="(item, index) in categoryList" :key="index" :class="{actived: activedIndex==index}" @click="clickCategory(index, item.ID)">{{item.MALL_CATEGORY_NAME}}</li>
        </ul>
      </van-col>
      <van-col span="18">
          <van-tabs>
              <van-tab v-for="(item,index) in subCategoryList" :key="index" :title="item.MALL_SUB_NAME" />
          </van-tabs>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      categoryList: [],
      activedIndex: 0,
      subCategoryList: [],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categoryList = response.data.message;
            this.getSubCategoryByCategoryId(this.categoryList[0].ID);
            console.log(response.data.message);
          } else {
            console.log("没有获取到商品大类信息");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSubCategoryByCategoryId(categoryId) {
        axios({
            url: url.getSubCategoryList,
            method: 'post',
            data: {
                categoryId: categoryId,
            }
        }).then(response => {
            if (response.data.code == 200 && response.data.message) {
                this.subCategoryList = response.data.message;
                console.log(this.subCategoryList);
            } else {
                console.log("没有获取到子类列表");
                console.log(response);
            }
        }).catch(err => {
            console.log(err);
        })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    clickCategory(index, categoryId) {
        this.activedIndex = index;
        this.getSubCategoryByCategoryId(categoryId);
    },
  }
};
</script>

<style lang="scss" scoped>
.left-nav {
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
</style>
