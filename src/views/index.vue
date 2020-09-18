<template>
  <div>
    <div id="header-box">
      <el-carousel indicator-position="outside" height="680px">
        <el-carousel-item v-for="(item, index) in swipers" :key="index">
          <img :src="item.src" alt="" />
        </el-carousel-item>
      </el-carousel>
      <div id="header-con">
        <div id="header-content">
          <div id="nav-logo">
            <img src="../assets/image/nav_logo.png" alt="" />
          </div>
          <div id="nav-data">
            <div class="nav-item">找办公室</div>
            <div class="nav-item">委托找房</div>
            <div class="nav-item">投放房源</div>
            <div class="nav-item">企业礼包</div>
          </div>
        </div>
      </div>
      <div id="select-search-box">
        <div id="search-box">
          <div class="search-div">
            <h3>选择区域</h3>
            <ul id="region-ul">
              <li v-for="item in 15" :key="item">不限</li>
            </ul>
          </div>
          <div class="search-div"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swipers: [
        { src: require("../assets/image/swiper1.jpg") },
        { src: require("../assets/image/swiper2.jpg") },
        { src: require("../assets/image/swiper3.jpg") },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
#header-box {
  width: 100%;
  height: 680px;
  position: relative;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#header-con {
  height: 60px;
  width: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  z-index: 10;
  #header-content {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #nav-logo {
      img {
        width: 80px;
        height: 28px;
      }
    }
    #nav-data {
      display: flex;
      align-items: center;
      .nav-item {
        color: #fff;
        font-size: 18px;
        margin-left: 20px;
        cursor: pointer;
        &:hover {
          color: #17a1e6;
        }
      }
    }
  }
}
#select-search-box {
  position: absolute;
  z-index: 10;
  width: 1200px;
  top: 129px;
  margin: 0 auto;
  left: -50%;
  right: -50%;
  #search-box {
    width: 396px;
    height: 400px;
    background-color: #fff;
    box-shadow: 0 30px 40px 0 rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
    padding: 30px;
    .search-div {
      border-bottom: 1px solid #eee;

      h3 {
        color: #000;
        font-size: 14px;
        margin-bottom: 20px;
        font-weight: 600;
      }
      .region-ul {
        display: block;
        li {
          height: 30px;
          line-height: 30px;
          color: #666;
          font-size: 14px;
          border-radius: 5px;
          text-align: center;
          display: inline-block;
          margin-right: 24px;
          margin-bottom: 10px;
          cursor: pointer;
          &:hover {
            color: #17a1e6;
          }
        }
      }
    }
  }
}
</style>
