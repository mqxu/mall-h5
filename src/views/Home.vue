<template>
  <div class="home">
    <!-- 顶部导航 -->
    <header class="home-header wrap" :class="{ active: headerScroll }">
      <!-- 点击搜索框跳转到分类页 -->
      <router-link tag="i" to="./category"
        ><i class="iconfont icon-menu"></i
      ></router-link>
      <!-- 搜索框 -->
      <div class="header-search">
        <span class="app-name">楼楼商城</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <!-- 登录和头像切换 -->
      <router-link class="login" tag="span" to="./login" v-if="!isLogin"
        >登录</router-link
      >
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <!-- 轮播图 -->
    <swiper :list="swiperList"></swiper>
    <!-- 分类栏目 -->
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId">
        <img :src="require('../assets/' + item.imgUrl)" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- 新品上线、热门商品、最新推荐 -->
    <div class="good">
      <header class="good-header">新品上线</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in newGoods"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="`http://localhost:8080${item.goodsCoverImg}`" />
          <div class="good-info">
            <p class="name">{{ item.goodsName }}</p>
            <p class="subtitle">{{ item.goodsIntro }}</p>
            <span class="price">￥ {{ item.sellingPrice }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">热门商品</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in hotGoods"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="`http://localhost:8080${item.goodsCoverImg}`" />
          <div class="good-info">
            <p class="name">{{ item.goodsName }}</p>
            <p class="subtitle">{{ item.goodsIntro }}</p>
            <span class="price">￥ {{ item.sellingPrice }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px' }">
      <header class="good-header">最新推荐</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in recommendGoods"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="`http://localhost:8080${item.goodsCoverImg}`" />
          <div class="good-info">
            <p class="name">{{ item.goodsName }}</p>
            <p class="subtitle">{{ item.goodsIntro }}</p>
            <span class="price">￥ {{ item.sellingPrice }}</span>
          </div>
        </div>
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
      headerScroll: false,
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
      hotGoods: [],
      newGoods: [],
      recommendGoods: [],
    };
  },
  components: {
    swiper,
  },
  async mounted() {
    window.addEventListener("scroll", this.pageScroll);
    const token = getLocal("token");
    if (token) {
      this.isLogin = true;
    }
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 1500,
    });
    const { data } = await getHome();
    this.swiperList = data.carousels; //轮播图
    this.hotGoods = data.hotGoods; // 热门商品
    this.newGoods = data.newGoods; // 新品上线
    this.recommendGoods = data.recommendGoods; // 最新推荐
  },
  methods: {
    pageScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > 100
        ? (this.headerScroll = true)
        : (this.headerScroll = false);
    },
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
  .good {
    .good-header {
      background: #f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: @primary;
      font-size: 16px;
      font-weight: 500;
    }
    .good-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item {
        .fj();
        width: 100%;
        height: 120px;
        padding: 10px 0;
        border-bottom: 1px solid #dcdcdc;
        img {
          width: 140px;
          height: 120px;
          padding: 0 10px;
          .boxSizing();
        }
        .good-info {
          width: 56%;
          height: 120px;
          padding: 5px;
          text-align: left;
          .boxSizing();
          p {
            margin: 0;
          }
          .name {
            width: 100%;
            max-height: 40px;
            line-height: 20px;
            font-size: 15px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .subtitle {
            width: 100%;
            max-height: 20px;
            padding: 10px 0;
            line-height: 25px;
            font-size: 13px;
            color: #999;
            overflow: hidden;
          }
          .price {
            color: @primary;
            font-size: 16px;
          }
        }
      }
    }
  }
  .floor-list {
    width: 100%;
    padding-bottom: 50px;
    .floor-head {
      width: 100%;
      height: 40px;
      background: #f6f6f6;
    }
    .floor-content {
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      width: 100%;
      .boxSizing();
      .floor-category {
        width: 50%;
        padding: 10px;
        border-right: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        .boxSizing();
        &:nth-child(2n) {
          border-right: none;
        }
        p {
          font-size: 17px;
          color: #333;
          &:nth-child(2) {
            padding: 5px 0;
            font-size: 13px;
            color: @primary;
          }
        }
        .floor-products {
          .fj();
          width: 100%;
          img {
            .wh(65px, 65px);
          }
        }
      }
    }
  }
}
</style>
