<template>
<!-- 地图找房 -->
  <div id="mapLookup">
      <black-nav></black-nav>
      <div id="center-box">
        <baidu-map :center="item.center" :zoom="item.zoom" class="bm-view">
      <!-- 缩放 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 定位 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <!-- 点 -->
      <bm-marker
        :position="{ lng: item.center.lng, lat: item.center.lat }"
        :dragging="false"
        animation="BMAP_ANIMATION_BOUNCE"
      >
      </bm-marker>
    </baidu-map>
      </div>
  </div>
</template>
<script>
import { getBuildingDetails } from "../api/index";

export default {
  data() {
    return {
      item:{
        center: { lng: 117.233725, lat: 31.827 },
        zoom: 18,
        buildName: "合肥市中心",
      },
      show: false,
    };
  },
  created() {
      this.$store.commit('actNav', 6);
      if(this.$route.query.build){
        getBuildingDetails(this.$route.query.build).then((res) => {
          if (res.code == 20000) {
            if(res.data.longitude && res.data.latitude){
              this.item.center.lng = res.data.longitude;
              this.item.center.lat = res.data.latitude;
              this.item.center.buildName = res.data.bname;
            }else{
              this.$notify.error({
                title: '错误',
                message: '没有找到该地址'
              });
            }
          }
        });
      }
      
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