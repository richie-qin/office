<template>
  <div id="index-main">
    <div id="header-box">
      <el-carousel height="680px">
        <el-carousel-item v-for="(item, index) in swipers" :key="index">
          <img :src="item.src" alt />
        </el-carousel-item>
      </el-carousel>
      <div id="header-con">
        <div id="header-content">
          <div id="nav-logo">
            <img src="../assets/image/nav_logo.png" alt />
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
              <li v-for="item in 8" :key="item">不限</li>
            </ul>
          </div>
          <div class="search-div2">
            <h3>选择面积</h3>
            <ul id="area-ul">
              <li v-for="item in 6" :key="item">0-100㎡</li>
            </ul>
          </div>
          <div id="looking-btn">马上找房</div>
          <div id="from-Map">
            <el-input placeholder="大厦名称或区域位置" prefix-icon="el-icon-search" v-model="input21"></el-input>
            <el-button type="primary" plain>地图找房</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="our-nice">
      <ul>
        <li class="fangyuan">
          真实房源
          <div class="line"></div>
        </li>

        <li class="yongjin">
          全程免佣
          <div class="line"></div>
        </li>
        <li class="kanfang">
          VR看房
          <div class="line"></div>
        </li>
        <li class="fuwu" style="float:left">1对1贴心服务</li>
      </ul>
    </div>
    <div id="hot-area">
      <div id="hot-area-title">
        <h3>热门商圈</h3>
        <p>进驻核心地段，尽享成熟配套</p>
      </div>
      <div id="hot-area-content">
        <div id="hot-left-img">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600447514753&di=bbae8a582384c863b42a387e671fdb9d&imgtype=0&src=http%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F50072%2F5457.jpg_wh1200.jpg" alt="">
          <div class="img-cityName">张家嘴</div>
        </div>
        <div id="hot-right-img">
          <div id="right-top-img">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600447514753&di=bbae8a582384c863b42a387e671fdb9d&imgtype=0&src=http%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F50072%2F5457.jpg_wh1200.jpg" alt="">
          <div class="img-cityName">张家嘴</div>

          </div>
          <div id="right-bot-img">
            <div id="bot-img1">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600447514753&di=bbae8a582384c863b42a387e671fdb9d&imgtype=0&src=http%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F50072%2F5457.jpg_wh1200.jpg" alt="">
          <div class="img-cityName">张家嘴</div>

            </div>
            <div id="bot-img2">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600447514753&di=bbae8a582384c863b42a387e671fdb9d&imgtype=0&src=http%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F50072%2F5457.jpg_wh1200.jpg" alt="">
          <div class="img-cityName">张家嘴</div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="recommend-area">
      <div id="recommend-area-title">不容错过的办公室</div>
      <div id="recommend-area-content">
        <div class="recommend-city" v-for="(item) in 11" :key="item">
          <div class="recommend-city-img">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600447514753&di=bbae8a582384c863b42a387e671fdb9d&imgtype=0&src=http%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F50072%2F5457.jpg_wh1200.jpg" alt="">
          </div>
          <div class="recommend-city-info">
            <div class="recommend-city-title">北京软件园区</div>
            <div class="recommend-city-text">文化之根 智慧之源 生态之城</div>
          </div>
        </div>
        <div class="recommend-city more-ciry">
          <div class="more-text1">10000+</div>
          <div class="more-text2">套办公室任你挑</div>
          <div class="more-btn">查看更多房源</div>
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
        { src: require("../assets/image/swiper3.jpg") }
      ],
      input21: ""
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
#index-main{
  width: 100%;
  background: #f7f7f7;
}
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
    .search-div {
      border-bottom: 1px solid #eee;
      margin: 30px 30px 0 30px;
      h3 {
        color: #000;
        font-size: 14px;
        margin-bottom: 15px;
        font-weight: 600;
      }
      #region-ul {
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
    .search-div2 {
      margin: 15px 30px 0 30px;

      h3 {
        color: #000;
        font-size: 14px;
        margin-bottom: 15px;
        font-weight: 600;
      }
      #area-ul {
        display: block;
        li {
          display: inline-block;
          font-size: 12px;
          background: #fafafa;
          padding: 5px 10px;
          border-radius: 5px;
          margin-right: 15px;
          margin-bottom: 10px;
          cursor: pointer;
          &:hover{
            background: #efefef;
          }
        }
      }
    }
    #looking-btn {
      margin: 15px 30px;
      font-size: 14px;
      font-weight: 600;
      background: #17a1e6;
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #fff;
      border-radius: 5px;
      display: block;
      clear: both;
      cursor: pointer;
    }
    #from-Map {
      padding: 0 30px;
      width: 100%;
      height: 60px;
      background: #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        margin-left: 10px;
      }
    }
  }
}
.our-nice{
  width: 100%;
  height: 90px;
  background: #f7f7f7;
  ul{
    width: 1160px;
    height: 90px;
    margin: 0 auto;
    li{
      width: 280px;
    height: 90px;
    line-height: 90px;
    float: left;
    list-style-type: none;
    text-align: center;
    color: #353535;
    margin-top: 0;
    margin-right: 10px;
    font-size: 22px;
    background-size: 32px 32px;
    text-indent: 50px;
    .line{
      width: 1px;
    height: 20px;
    background-color: #c3c3c3;
    float: right;
    margin-top: 35px;
    }
    }
    .fangyuan{
      text-indent: 50px;
      background: url("../assets/image/BannerItem1.png") 80px 28px no-repeat;
      background-size: 32px 32px;

    }
    .yongjin{
      text-indent: 43px;
      background: url("../assets/image/BannerItem2.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    
    }
    .kanfang{
      text-indent: 43px;

      background: url("../assets/image/BannerItem3.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    
    }
    .fuwu{
      text-indent: 85px;

      background: url("../assets/image/BannerItem4.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    
    }
  }
}
#hot-area{
  width: 1200px;
  margin: 50px auto 0;
  padding: 0 30px;
  #hot-area-title{
    text-align: center;
    margin-bottom: 30px;
    h3{
      font-size: 35px;
      color: #000;
    }
    p{
      font-size: 15px;
      color: #333;
      margin: 15px 0 20px;
    }
  }
  #hot-area-content{
    overflow: hidden;
    div{
      overflow: hidden;
      position: relative;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s;
      &:hover{
        box-shadow: 0 15px 20px rgba(0,0,0,.1);
        transform: scale(1.2);
        -ms-transform: scale(1.2);
        transition: all 0.2s;
      }
    }
    .img-cityName{
          width: 100%;
          height: 108px;
          line-height: 130px;
          display: block;
          font-size: 20px;
          color: #fff;
          position: absolute;
          bottom: 0;
          padding-left: 20px;
          background: linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    }
    #hot-left-img{
      width: 370px;
      height: 470px;
      display: inline-block;
      margin-right: 10px;
      
    }
    #hot-right-img{
      width: 760px;
      height: 470px;
      display: inline-block;
      #right-top-img{
        width: 100%;
        height: 235px;
        margin-bottom: 10px;
        display: inline-block;

      }
      #right-bot-img{
        width: 100%;
        height: 225px;
        display: inline-block;
        #bot-img1{
          width: 375px;
          height: 100%;
          display: inline-block;

        }
        #bot-img2{
          width: 375px;
          height: 100%;
          display: inline-block;
          margin-left: 10px;

        }
      }
    }
  }
}
#recommend-area{
  width: 1200px;
  margin: 50px auto 0;
  padding: 0 30px;
  #recommend-area-title{
    font-size: 25px;
    color: #333;
    text-align: center;
    // font-weight: bold;
    margin-bottom: 30px;
  }
  #recommend-area-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .recommend-city{
      width: 365px;
      height: 290px;
      margin-bottom: 20px;
      border-radius: 5px;
      overflow: hidden;
      transition: all 0.2s;
      &:hover{
        transform: scale(1.02);
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
      transition: all 0.2s;

      }
      .recommend-city-img{
        width: 100%;
        height: 225px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .recommend-city-info{
        height: 65px;
        background: #fff;
        text-align: center;
        overflow: hidden;
        .recommend-city-title{
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          color: #353535;
          margin-top: 8px;
        }
        .recommend-city-text{
          color: #b2b2b2;
          font-size: 14px;
        }
      }
    }
    .more-ciry{
      background: #17a1e6;
      text-align: center;
      &:hover{
        transform: scale(1);
        box-shadow: 0;
      }
      .more-text1{
        width: 100%;
        font-size: 30px;
        color: #fff;
        margin-top: 70px;
      }
      .more-text2{
        width: 100%;

        font-size: 20px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        color: #fff;

      }
      .more-btn{
            display: block;
            margin: 0 auto;
            width: 130px;
            height: 40px;
            border: 1px solid #fff;
            text-align: center;
            line-height: 39px;
            color: #fff;
            border-radius: 5px;
            background: #17a1e6;
            transition: background .2s linear;
            cursor: pointer;
            font-size: 14px;
            color: #fff;
            &:hover{
              background: #fff;
              color: #17a1e6;
            }

      }
    }
  }
}
</style>
