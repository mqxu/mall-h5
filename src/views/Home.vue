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
    <swiper :list="swiperList"></swiper>
    <!-- 分类栏目 -->
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId">
        <img :src="require('../assets/' + item.imgUrl)" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getLocal } from "@/common/js/utils";
import swiper from "@/components/Swiper";
import { getHome } from "../service/home";
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      isLogin: false,
      swiperList: [],
      categoryList: [
        {
          name: "楼楼交友",
          imgUrl: "jiaoyou.png",
          categoryId: 100001,
        },
        {
          name: "楼楼家政",
          imgUrl: "jiazheng.png",
          categoryId: 100003,
        },
        {
          name: "楼楼水产",
          imgUrl: "shuichan1.png",
          categoryId: 100002,
        },
        {
          name: "楼楼租车",
          imgUrl: "zuche.png",
          categoryId: 100004,
        },
        {
          name: "楼楼招聘",
          imgUrl: "pin.png",
          categoryId: 100005,
        },
        {
          name: "楼楼二手",
          imgUrl: "ershou.png",
          categoryId: 100006,
        },
        {
          name: "楼楼宠物",
          imgUrl: "chongwu.png",
          categoryId: 100007,
        },
        {
          name: "楼楼外卖",
          imgUrl: "wm.png",
          categoryId: 100008,
        },
        {
          name: "楼楼电器",
          imgUrl: "dianqi.png",
          categoryId: 100009,
        },
        {
          name: "楼楼充值",
          imgUrl: "czcz.png",
          categoryId: 1000010,
        },
      ],
    };
  },
  components: {
    swiper,
  },
  async mounted() {
    const token = getLocal("token");
    if (token) {
      this.isLogin = true;
    }
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    const { data } = await getHome();
    this.swiperList = data.carousels;
  },
};
</script>
<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  // 吸顶头部样式
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
      .nbmenu2 {
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

  //分类栏目样式
  .category-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(40px, 40px);
        margin: 13px auto 8px auto;
      }
    }
  }
}
</style>
