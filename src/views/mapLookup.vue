<template>
<!-- 地图找房 -->
  <div id="mapLookup">
      <black-nav></black-nav>
      <div id="center-box">
        <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
      <!-- 缩放 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 定位 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
    </baidu-map>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      center: { lng: 117.233725, lat: 31.827 },
        zoom: 15,
        buildName: "合肥市中心",
        show: false,
    };
  },
  created() {
      this.$store.commit('actNav', 6);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
#mapLookup{
    width: 100%;
    background: #f7f7f7;
    height: 100%;
}
#center-box{
  width: 100%;
  height: 100%;
  .bm-view{
    width: 100%;
    height: 100%;
  }
}
</style>