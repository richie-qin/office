<template>
  <div>
    <baidu-map :center="data.center" :zoom="data.zoom" :style="{height:height}" class="bm-view">
      <!-- 缩放 -->
      <bm-navigation v-show="false" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 定位 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <!-- 点 -->
      <bm-marker
        :position="{ lng: data.center.lng, lat: data.center.lat }"
        :dragging="false"
        @click="infoWindowOpen"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <!-- 备注 -->
        <!-- <bm-label
          :content="data.buildName"
          :labelStyle="{ color: 'red', fontSize: '16px' }"
          :offset="{ width: 0, height: 30 }"
        /> -->
        <!-- 弹出框 -->
        <bm-info-window
          :show="show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
          >我爱北京天安门</bm-info-window
        >
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      default: {
        center: { lng: 117.233725, lat: 31.827 },
        zoom: 15,
        buildName: "合肥市中心",
      },
    },
    height:{
      default:"320px"
    }
  },
  data() {
    return {
      show: false,
    };
  },
  created() {},
  methods: {
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
  },
};
</script>
<style lang="less" scoped>
.bm-view {
  width: 100%;
}
</style>
