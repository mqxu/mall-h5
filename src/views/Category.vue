<template>
  <div class="category-box">
    <header class="category-header wrap">
      <i class="iconfont icon-back"></i>
      <div class="header-search">
        <i class="iconfont icon-search"></i>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=category"
          >全场50元起步</router-link
        >
      </div>
      <i class="iconfont icon-more"></i>
    </header>
  </div>
</template>

<script>
import { getCategory } from "../service/goods";
export default {
  name: "Category",
  data() {
    return {
      categoryData: [],
    };
  },
  async mounted() {
    const { data } = await getCategory();
    this.categoryData = data;
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.category-box {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      border-radius: 20px;
      .icon-search {
        padding: 0 10px 0 20px;
        font-size: 16px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
