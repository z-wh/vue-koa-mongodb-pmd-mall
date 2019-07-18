<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow left-text="返回" @click-left="goBack()" />
    <div class="regist-panel">
      <van-field
        class="form-control"
        v-model="userName"
        label="用户名"
        placeholder="请输入用户名"
        right-icon="clear"
        required
        :error-message="userNameErrMsg"
        @click-right-icon="userName = ''"
      />
      <van-field
        class="form-control"
        v-model="password"
        label="密码"
        :error-message="passwordErrMsg"
        placeholder="请输入用户密码"
        required
      />
      <div class="regist-button">
        <van-button type="primary" size="large" :loading="isLoading" @click="registUserAction">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      userName: "",
      password: "",
      isLoading: false,
      userNameErrMsg: "",
      passwordErrMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registUserAction() {
      this.checkForm() && this.axiosRegistUser();
    },
    axiosRegistUser() {
      this.isLoading = true;
      axios({
        url: url.registUser,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            Toast.success("注册成功！");
            this.$router.push("/");
          } else {
            console.log(response.data.message);
            Toast.fail("注册失败！");
            this.isLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("注册失败！");
          this.isLoading = false;
        });
    },
    checkForm() {
      let isOk = true;

      if (this.userName.length < 5) {
        isOk = false;
        this.userNameErrMsg = "用户名长度不能少于5位";
      } else {
        this.userNameErrMsg = "";
      }

      if (this.password.length < 6) {
        isOk = false;
        this.passwordErrMsg = '密码长度不能少于6位';
      } else {
        this.passwordErrMsg = '';
      }

      return isOk;
    },
  }
};
</script>

<style lang="scss" scoped>
.regist-panel {
  width: px2rem(690px);
  margin: px2rem(30px) auto;
  padding: px2rem(20px);
  border-radius: px2rem(8px);
  box-sizing: border-box;
  box-shadow: 0 2px 8px 0 #ccc;
}

.form-control {
  margin: px2rem(30px) 0;
}

.regist-button {
  margin: px2rem(40px) 0 px2rem(20px);
}
</style>
