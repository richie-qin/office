<template>
  <div id="houseType-main">
    <div class="houseType" @click="toDetails(data.id)">
      <div><img :src="showImg(data)" alt /></div>
      <div>
        <b style="font-size:20px">{{ data.square }}</b
        >㎡
      </div>
      <div>{{data.renovation}}</div>
      <div>
        <b style="font-size:20px;color:red;">{{ data.month_rent | priceF }}</b
        >元/m²/月
      </div>
      <div>{{ data.bailor_time.split(" ")[0] }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],

  data() {
    return {};
  },
  created() {},
  methods: {
    toDetails(id) {
      let routeData = this.$router.resolve({ path: `./houseDetails?id=${id}` });
      window.open(routeData.href, "_blank");
    },
    showImg(data) {
      if (data.main_pic) {
        return data.main_pic
      } else {
        return require("../assets/image/none-img.png");
      }
    },
  },
};
</script>
<style lang="less" scoped>
#houseType-main {
  width: 100%;
  font-size: 0;
}
.houseType {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover{
    background: #efefef;
  }
  div {
    text-align: center;
    width: 20%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
    img {
      height: 80%;
      width: 70%;
      display: inline-block;
    }
    b {
      font-weight: bold;
    }
  }
}
</style>
