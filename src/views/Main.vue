<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/shoppingMall">首页</van-tabbar-item>
            <van-tabbar-item icon="shop-o" to="/categoryList">商品</van-tabbar-item>
            <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/login">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
