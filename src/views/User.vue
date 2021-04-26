<template>
  <div class="user-box">
    <s-header :title="'我的'"></s-header>
    <div class="user-info">
      <div class="info">
        <img :src="user.avatar" />
        <div class="user-desc">
          <span>昵称：{{ user.nickName }}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span class="name">个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item @click="goTo('order')" icon="orders-o" text="我的订单" />
      <van-grid-item @click="goTo('setting')" icon="user-o" text="账号管理" />
      <van-grid-item
        @click="goTo('address?from=mine')"
        icon="location-o"
        text="地址管理"
      />
      <van-grid-item @click="goTo('about')" icon="friends-o" text="关于我们" />
    </van-grid>
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader";
import { getUserInfo } from "../service/user";
export default {
  name: "User",
  components: {
    sHeader,
  },
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    // 获取用户信息数据
    const { data } = await getUserInfo();
    // 赋值给 user
    this.user = data;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goTo(r) {
      this.$router.push({ path: r });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.user-box {
  .user-info {
    border-radius: 6px;
    margin-top: 40px;
    .info {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      align-items: center;
      justify-content: center;
      background-color: #d55b52;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        border: 1px solid #e9e9e9;
        margin-bottom: 12px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        align-items: center;
        span {
          font-size: 14px;
          margin: 2px 0;
          color: #fff;
          font-weight: 500;
        }
        .id {
          border-radius: 20px;
          padding: 2px 5px;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
