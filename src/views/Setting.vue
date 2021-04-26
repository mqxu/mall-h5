<template>
  <div class="seting-box">
    <s-header :name="'账号管理'"></s-header>
    <div class="input-item">
      <van-field v-model="nickName" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button
      class="save-btn"
      color="#c40000"
      type="primary"
      @click="save"
      block
      >保存</van-button
    >
    <van-button
      class="save-btn"
      color="#c40000"
      type="primary"
      @click="logout"
      block
      >退出登录</van-button
    >
  </div>
</template>

<script>
import sHeader from "@/components/SimpleHeader";
import { getUserInfo, editUserInfo, logout } from "../service/user";
import { setLocal } from "@/common/js/utils";
import { Toast } from "vant";
export default {
  name: "Setting",
  components: {
    sHeader,
  },
  data() {
    return {
      nickName: "",
      introduceSign: "",
      password: "",
    };
  },
  async mounted() {
    const { data } = await getUserInfo();
    this.nickName = data.nickName;
    this.introduceSign = data.introduceSign;
  },
  methods: {
    async save() {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: this.$md5(this.password),
      };
      const { message } = await editUserInfo(params);
      if (message == "SUCCESS") {
        Toast.success("保存成功");
        this.$router.push({ path: "user" });
      }
    },
    async logout() {
      const { resultCode } = await logout();
      if (resultCode == 200) {
        setLocal("token", "");
        window.location.href = "/";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.seting-box {
  .input-item {
    margin-top: 44px;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
