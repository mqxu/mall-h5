<template>
  <div class="login">
    <s-header
      :name="type == 'login' ? '登录' : '注册'"
      :back="'/home'"
    ></s-header>
    <img
      class="logo"
      src="//s.weituibao.com/1591183219275/200181591183191_.pic.jpg"
      alt=""
    />
    <div v-if="type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @error="error"
            :showButton="false"
            @success="success"
            :width="'100%'"
            :height="'40px'"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button
            round
            block
            type="info"
            color="#c40000"
            native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @error="error"
            :showButton="false"
            @success="success"
            :width="'100%'"
            :height="'40px'"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin: 16px;">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button
            round
            block
            type="info"
            color="#c40000"
            native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader";
import { login, register } from "../service/user";
import { setLocal } from "@/common/js/utils";
import { Toast } from "vant";
import Verify from "vue2-verify";
export default {
  data() {
    return {
      username: "",
      password: "",
      username1: "",
      password1: "",
      type: "login",
      verify: false,
    };
  },
  components: {
    sHeader,
    Verify,
  },
  methods: {
    dealTriVer() {
      this.$refs.loginVerifyRef.$refs.instance.checkCode();
    },
    toggle(v) {
      this.verify = false;
      this.type = v;
    },
    async onSubmit(values) {
      this.dealTriVer();
      if (!this.verify) {
        Toast.fail("验证码未填或填写错误!");
        return;
      }
      if (this.type == "login") {
        const { data, resultCode } = await login({
          loginName: values.username,
          passwordMd5: this.$md5(values.password),
        });
        setLocal("token", data);
        window.location.href = "/";
      } else {
        const { data } = await register({
          loginName: values.username1,
          password: values.password1,
        });
        Toast.success("注册成功");
        this.type = "login";
      }
    },
    success(obj) {
      this.verify = true;
      // 回调之后，刷新验证码
      obj.refresh();
    },
    error(obj) {
      this.verify = false;
      // 回调之后，刷新验证码
      obj.refresh();
    },
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.login {
  .logo {
    width: 160px;
    // height: 120px;
    display: block;
    margin: 80px auto 0px;
  }
  .login-body {
    padding: 0 20px;
    margin-top: 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .verify-bar-area {
    margin-top: 24px;
    .verify-left-bar {
      border-color: #c40000;
    }
    .verify-move-block {
      background-color: #c40000;
      color: #fff;
    }
  }
  .verify {
    > div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40% !important;
      float: left !important;
    }
    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>
