<template>
  <div class="home">
    <header class="home-header wrap">
      <router-link tag="i" to="./category"
        ><i class="iconfont icon-menu"></i
      ></router-link>
      <div class="header-search">
        <span class="app-name">楼楼商城</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!isLogin"
        >登录</router-link
      >
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
  </div>
</template>

<script>
import { getLocal } from "@/common/js/utils";
export default {
  name: "Home",
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    const token = getLocal("token");
    if (token) {
      this.isLogin = true;
    }
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    .icon-menu {
      color: @primary;
    }
    &.active {
      background: @primary;
      .icon-menu {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }

    .header-search {
      display: flex;
      .wh(74%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .icon-search {
        padding: 0 10px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .login {
      color: @primary;
      line-height: 52px;
      .van-icon-manager-o {
        font-size: 20px;
        vertical-align: -3px;
      }
    }
  }
}
</style>
