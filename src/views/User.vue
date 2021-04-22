<template>
  <div class="user-box">
    <div>我的</div>
    <router-link to="/detail">跳转到详情页</router-link>
    <router-link to="/login">跳转到登录页</router-link>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style lang="less" scoped></style>
