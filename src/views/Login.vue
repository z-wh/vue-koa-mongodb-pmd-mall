<template>
  <div>
    <van-nav-bar title="用户登陆" left-arrow left-text="返回" @click-left="goBack()" />
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
        type="password"
        label="密码"
        :error-message="passwordErrMsg"
        placeholder="请输入用户密码"
        required
      />
      <div class="regist-button">
        <van-button type="primary" size="large" :loading="isLoading" @click="loginAction">马上登陆</van-button>
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
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已登陆");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.axiosLogin();
    },
    axiosLogin() {
      this.isLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = JSON.stringify({
                userName: this.userName
              });
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登陆状态保存成功" + response.data.message);
                this.$router.push("/");
                console.log(response.data.message);
              })
              .catch(err => {
                Toast.fail("登陆状态保存失败");
                console.log(err);
              });
          } else {
            this.isLoading = false;
            Toast.success("登陆失败" + response.data.message);
            console.log(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
          Toast.fail("登陆失败");
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
        this.passwordErrMsg = "密码长度不能少于6位";
      } else {
        this.passwordErrMsg = "";
      }

      return isOk;
    }
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
