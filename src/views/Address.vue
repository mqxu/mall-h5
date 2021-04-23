<template>
  <div class="address-box">
    <s-header :title="'地址管理'" :back="'/user'"></s-header>
    <div class="address-item">
      <van-address-list
        v-if="from != 'mine'"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
      <van-address-list
        v-else
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader";
import { getAddressList } from "../service/address";
export default {
  components: {
    sHeader,
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      from: this.$route.query.from,
    };
  },
  async mounted() {
    const { data } = await getAddressList();
    this.list = data.map((item) => {
      return {
        id: item.addressId,
        name: item.userName,
        tel: item.userPhone,
        address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
        isDefault: !!item.defaultFlag,
      };
    });
  },
  methods: {
    onAdd() {
      this.$router.push({ path: `address-edit?type=add&from=${this.from}` });
    },
    onEdit(item, index) {
      this.$router.push({
        path: `address-edit?type=edit&addressId=${item.id}&from=${this.from}`,
      });
    },
    select(item, index) {
      this.$router.push({
        path: `create-order?addressId=${item.id}&from=${this.from}`,
      });
    },
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.address-box {
  .van-radio__icon {
    display: none;
  }
  .address-item {
    margin-top: 44px;
    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>
