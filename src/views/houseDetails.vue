<template>
  <!-- 房子详情 -->
  <div id="houseDetails">
    <black-nav></black-nav>
    <search-nav></search-nav>
    <div id="title-money">
      <div id="title">南苏55（720全景VR看房）</div>
      <div id="money">
        <b>4~7.3</b>元/m²/天
      </div>
    </div>
    <div id="addr">
      <i class="el-icon-location-outline"></i>
      <span>浦东-陆家嘴 · 距离「2号线-东昌路站」约115米</span>
    </div>
    <div id="news">
      <i class="el-icon-time"></i>
      <span>2天前更新 · 近30天内共有13人关注</span>
    </div>
    <div id="img-box">
      <div id="img-left">
        <baidu-map
          class="bm-view"
          :center="{lng: 121.4095, lat: 31.1796}"
          :zoom="15"
          :scroll-wheel-zoom="true"
        >
          <bm-marker
            :position="{lng: 121.4095, lat: 31.1796}"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
          />
        </baidu-map>
      </div>
      <div id="img-right"></div>
    </div>
  </div>
</template>
<script>
import blackNav from "../components/blackNav";
import searchNav from "../components/searchNav";
export default {
  components: { blackNav, searchNav },
  data() {
    return {};
  },
  created() {
    this.$store.commit("actNav", 2);
  },
  methods: {}
};
</script>
<style lang='less' scoped>
#houseDetails {
  width: 100%;
  background: #f7f7f7;
  #title-money {
    padding: 0 calc(50% - 600px);

    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0 15px 0;
    #title {
      color: #000;
      font-size: 28px;
    }
    #money {
      color: #cc2929;
      font-size: 12px;
      b {
        font-size: 28px;
        font-weight: 400;
      }
    }
  }
  #addr {
    padding: 0 calc(50% - 600px);
    margin: 0 0 8px 0;

    i {
      font-size: 19px;
      color: #b2b2b2;
      display: inline-block;
    }
    span {
      color: #353535;
      font-size: 14px;
      margin-left: 5px;
      display: inline-block;
    }
  }
  #news {
    padding: 0 calc(50% - 600px);
    margin: 0 0 26px 0;

    i {
      font-size: 19px;
      color: #b2b2b2;
      display: inline-block;
    }
    span {
      color: #353535;
      font-size: 14px;
      margin-left: 5px;
      display: inline-block;
    }
  }
  #img-box {
    padding: 0 calc(50% - 600px);
    height: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #img-left {
      width: 820px;
      height: 100%;
      background: red;
      overflow: hidden;
      border-radius: 5px;
    }
    #img-right {
      width: 370px;
      height: 100%;
      background: sandybrown;
      overflow: hidden;
      border-radius: 5px;
    }
  }
}
</style>