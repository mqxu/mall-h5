<template>
  <div class="seting-box">
    <s-header :name="'账号管理'"></s-header>
    <div class="input-item">
      <van-field v-model="nickName" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
      <van-image
        round
        width="80px"
        height="80px"
        :src="avatar"
        style="margin-left:10px;"
        @click="handleClick"
      ></van-image>
      <div style="display:none;">
        <input type="file" @change="onChange" ref="selectFile" />
      </div>
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
      avatar: "",
      file: {},
    };
  },
  async mounted() {
    const { data } = await getUserInfo();
    // console.log(data);
    this.nickName = data.nickName;
    this.introduceSign = data.introduceSign;
    this.avatar = data.avatar;
  },
  methods: {
    handleClick() {
      this.$refs.selectFile.click();
    },
    onChange(e) {
      // console.log(e);
      let _this = this;
      //确定选中的文件
      this.file = this.$refs.selectFile.files[0];
      if (!e || !window.FileReader) return; // 判断是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(this.file); // 文件转换
      reader.onloadend = function() {
        _this.avatar = this.result;
      };
    },
    upload() {
      // let OSS = require("ali-oss");
      // let client = new OSS({
      //   region: "oss-cn-hangzhou",
      //   accessKeyId: "LTAI4G9dDHPToxFZeqPFjAbK",
      //   accessKeySecret: "YrCmEl7ck8wkH3VdtlYamv9T2UER0H",
      //   bucket: "mqxu-upload",
      // });
      // let _this = this;
      // async function put() {
      //   try {
      //     let result = await client.put(_this.file.name, _this.file);
      //     _this.avatar = result.url;
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }
      // put();
    },
    async save() {
      let OSS = require("ali-oss");
      let client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "LTAI4G9dDHPToxFZeqPFjAbK",
        accessKeySecret: "YrCmEl7ck8wkH3VdtlYamv9T2UER0H",
        bucket: "mqxu-upload",
      });
      let _this = this;
      async function put() {
        try {
          let result = await client.put(_this.file.name, _this.file);
          _this.avatar = result.url;
          const params = {
            introduceSign: _this.introduceSign,
            nickName: _this.nickName,
            passwordMd5: _this.$md5(_this.password),
            avatar: _this.avatar,
          };
          const { message } = await editUserInfo(params);
          if (message == "SUCCESS") {
            Toast.success("保存成功");
            _this.$router.push({ path: "user" });
          }
        } catch (e) {
          console.log(e);
        }
      }
      put();
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
.hidden {
  display: hidden;
}
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
