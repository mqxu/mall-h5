<template>
  <div class="setting-box">
    <s-header :name="'账号管理'"></s-header>
    <div class="input-item">
      <van-field v-model="nickName" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
      <van-image
        round
        width="60px"
        height="60px"
        :src="avatar"
        style="margin-left:20px;"
        @click="handleClick"
      ></van-image>
      <div style="display:none;">
        <input type="file" @change="onChange" ref="selectFile" multiple />
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
import { getClient } from "../utils/client";
import { renameFile } from "../utils/util";
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
  created() {},
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
      let _this = this;
      //确定选中的文件
      this.file = this.$refs.selectFile.files[0];
      // 预览图片
      if (!e || !window.FileReader) return; // 判断是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(this.file); // 文件转换
      reader.onloadend = function() {
        _this.avatar = this.result;
      };
    },
    async save() {
      let _client = getClient();
      console.log(_client);
      let prefix = _client.options.prefix;
      const uploadFileName = renameFile(this.file.name);
      console.log(uploadFileName);
      let _this = this;
      async function put() {
        try {
          //上传
          let result = await _client.put(
            `${prefix}/${uploadFileName}`,
            _this.file
          );
          //将上传结果（图片url）同步给头像更新
          _this.avatar = result.url;
          //构造请求参数
          const params = {
            introduceSign: _this.introduceSign,
            nickName: _this.nickName,
            passwordMd5: _this.$md5(_this.password),
            avatar: _this.avatar,
          };
          //请求接口，修改用户信息
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
.setting-box {
  .input-item {
    margin-top: 44px;
    padding: 20px;
  }
  .save-btn {
    width: 90%;
    margin: 20px auto;
  }
}
</style>
