<template>
  <div id="house-box">
    <div id="house-left-box">
      <img
        src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3380780980,2310670331&fm=26&gp=0.jpg"
        alt
      />
    </div>
    <div id="house-center-box">
      <h3 @click="toDetails">浦东-陆家嘴 世界广场 1074㎡</h3>
      <div class="house-info">
        <i class="el-icon-info"></i>
        <span>世界之窗 1074㎡ 约196-300人 精装</span>
      </div>
      <div class="house-info">
        <i class="el-icon-location-outline"></i>
        <span>浦东-陆家嘴 · 距离「2号线-东昌路站」约115米</span>
      </div>
      <div class="house-info">
        <i class="el-icon-time"></i>
        <span>2天前更新 · 近30天内共有13人关注</span>
      </div>
      <div id="house-info-type">
        <span>近地铁</span>
        <span>近地铁</span>
        <span>近地铁</span>
        <span>近地铁</span>
      </div>
    </div>
    <div id="house-right-box">
      <div id="house-m1"><b>21.23</b>万元/月</div>
      <div id="house-m2">6.5元/m²/天</div>
      <div id="house-info-btn" @click="toDetails">查看详情</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {};
  },
  created() {},
  methods: {
    toDetails() {
      this.$router.push("./houseDetails");
    }
  }
};
</script>
<style lang='less' scoped>
#house-box {
  width: 100%;
  height: 225px;
  width: 100%;
  padding: 30px 0;
  border-bottom: 1px solid #e5e5e5;
  transition: box-shadow 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 10px;
  &:hover {
    background: #eee;
    #house-info-btn {
      transition: all 0.2s;
      opacity: 1;
    }
  }
  #house-left-box {
    width: 240px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
    flex: none;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  #house-center-box {
    width: 100%;
    margin-left: 20px;
    h3 {
      color: #000;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        color: #17a1e6;
      }
    }
    .house-info {
      margin-top: 12px;
      display: flex;
      align-items: center;
      height: 19px;
      line-height: 19px;
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
    #house-info-type {
      margin-top: 12px;
      span {
        display: inline-block;
        height: 26px;
        line-height: 26px;
        border-radius: 2px;
        font-size: 12px;
        margin-right: 10px;
        padding: 0 10px 0 10px;
        border-radius: 5px;
        &:nth-child(1) {
          background-color: #eaf6ff;
          color: #3baaf5;
        }
        &:nth-child(2) {
          background-color: #fcf2ef;
          color: #e67b60;
        }
        &:nth-child(3) {
          background-color: #f2f2f6;
          color: #8d88c2;
        }
        &:nth-child(4) {
          background-color: #e6f6f1;
          color: #2fc296;
        }
        &:nth-child(5) {
          background-color: #fcf5e8;
          color: #f0b030;
        }
      }
    }
  }
  #house-right-box {
    text-align: right;
    #house-m1 {
      color: #cc2929;
      font-size: 12px;
      b {
        color: #cc2929;
        font-size: 28px;
      }
    }
    #house-m2 {
      font-size: 12px;
      color: #353535;
      margin: 12px 0;
    }
  }
}
#house-info-btn {
  opacity: 0;
  width: 118px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  background: #17a1e6;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #18aaf2;
  }
}
</style>