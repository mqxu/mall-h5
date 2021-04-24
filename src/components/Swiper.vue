<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#c40000">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null,
    },
  },
  methods: {
    goTo(url) {
      window.open(url);
    },
  },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
