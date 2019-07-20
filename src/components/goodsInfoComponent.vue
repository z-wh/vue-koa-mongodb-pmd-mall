<template>
    <div>
        <div class="goods-info" @click="getGoodsDetial()">
          <div class="goods-image">
            <img :src="goodsImage" class="img-fluid">
          </div>
          <div class="goods-name">{{goodsName}}</div>
          <div class="goods-price">{{goodsPrice | moneyFilter}}</div>
        </div>
    </div>
</template>

<script>
import toMoney from "@/filter/moneyFilter.js";

    export default {
        props: ["goodsId", "goodsImage", "goodsName", "goodsPrice"],
        data() {
            return {

            }
        },
        filters: {
          moneyFilter (money) {
            return toMoney(money);
          }
        },
        methods: {
          getGoodsDetial() {
            this.$router.push({name: 'Goods', query: {goodsId: this.goodsId}});
          },
        },
    }
</script>

<style lang="scss" scoped>
.goods-name {
  padding: px2rem(10px);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.goods-price {
  font-size: 14px;
  color: red;
}

</style>
