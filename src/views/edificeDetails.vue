<template>
  <!-- 房子详情 -->
  <div id="houseDetails">
    <black-nav></black-nav>
    <search-nav></search-nav>
    <div id="img-box">
      <div id="img-left">
        <el-carousel height="420px">
          <el-carousel-item v-for="(item, index) in details.image" :key="index">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="img-right">
        <div id="img-right-div1">
          <b>{{ details.bname }}</b>
          <p>
            <span>{{ details.bproperty }}</span> 元/㎡/天
          </p>
        </div>
        <div id="img-right-div2">
          <div class="div2-item">
            <div class="div2-item-top">
              {{ details.floor_number || "暂无数据" }}楼
            </div>
            <div class="div2-item-bot">楼层数量</div>
          </div>
          <div class="div2-item">
            <div class="div2-item-top">
              {{ details.car_number || "暂无数据" }}
            </div>
            <div class="div2-item-bot">车位数量</div>
          </div>
          <div class="div2-item">
            <div class="div2-item-top">
              {{ details.renovation || "暂无数据" }}
            </div>
            <div class="div2-item-bot">装修程度</div>
          </div>
        </div>
        <div id="img-right-div3">
          <div v-show="details.county">
            <span>区域：</span>{{ details.county }}
          </div>
          <div v-show="details.address">
            <span>详细地址：</span>{{ details.address }}
          </div>
          <div v-show="details.enter">
            <span>入住企业：</span>{{ details.enter }}
          </div>
          <div v-show="details.bdesc">
            <span>描述：</span>{{ details.bdesc }}
          </div>
        </div>
        <div id="img-right-div4">
          <!-- <div style="display: flex;align-items: center;">
            <img src="../assets/image/act-wx.png" alt="" />
            <div id="img-right-div4-user">
              <p id="div-user-title">{{details.name}}</p>
              <p>{{details.relation}}</p>
              <p>{{details.look_way}}</p>
            </div>
          </div> -->
          <div id="user-btn">
            <el-button type="primary" icon="el-icon-phone-outline"
              >12321321323</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div id="information">
      <div id="left-info-box">
        <div id="jbxx">
          <h3 class="info-title"><i></i>基本信息</h3>
          <div class="base-info-item" v-for="item in 8" :key="item">
            <div class="base-info-title">房源编码</div>
            <div class="base-info-content">3213123123</div>
          </div>
        </div>
        <div id="jzxx">
          <h3 class="info-title"><i></i>建筑信息</h3>
          <div id="jzxx-content">
            <div v-for="item in 3" :key="item">
              <div class="base-info-item" v-for="item in 3" :key="item">
                <div class="base-info-title">房源编码</div>
                <div class="base-info-content">3213123123</div>
              </div>
            </div>
          </div>
        </div>
        <div id="jgxx">
          <h3 class="info-title"><i></i>价格信息</h3>
          <div id="jzxx-content">
            <div v-for="item in 3" :key="item">
              <div class="base-info-item" v-for="item in 3" :key="item">
                <div class="base-info-title">房源编码</div>
                <div class="base-info-content">3213123123</div>
              </div>
            </div>
          </div>
        </div>
        <div id="jpxx">
          <h3 class="info-title"><i></i>接盘信息</h3>
          <div class="base-info-item" v-for="item in 8" :key="item">
            <div class="base-info-title">房源编码</div>
            <div class="base-info-content">3213123123</div>
          </div>
        </div>
        <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
          <!-- 缩放 -->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <!-- 定位 -->
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <!-- 点 -->
          <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="false" @click="infoWindowOpen" animation="BMAP_ANIMATION_BOUNCE">
            <!-- 备注 -->
            <bm-label :content="buildName" :labelStyle="{color: 'red', fontSize : '16px'}" :offset="{width: -35, height: 30}"/>
            <!-- 弹出框 -->
            <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
      <div id="right-info-box">
        <div id="ljyy">
          <h3><i></i>预约看房</h3>
          <el-input placeholder="请输入内容" v-model="input10" clearable>
          </el-input>
          <el-button type="primary">立即预约</el-button>
          <p>巧租承诺仅将你的联系方式用于找房服务</p>
        </div>
        <div id="tjfy">
          <h3><i></i>推荐房源</h3>
          <div id="tjfy-content">
            <div v-for="item in 4" :key="item">
              <p>某某大厦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBuildingDetails } from "../api/index";
export default {
  data() {
    return {
      swipers: [
        { src: require("../assets/image/swiper1.jpg") },
        { src: require("../assets/image/swiper2.jpg") },
        { src: require("../assets/image/swiper3.jpg") },
      ],
      input10: "",
      details: {},
      center: {lng: 117.233725, lat: 31.827},
      zoom: 15,
      buildName:"合肥市中心",
      show:false,
    };
  },
  created() {
    this.$store.commit("actNav", 2);
    getBuildingDetails(this.$route.query.id).then((res) => {
      if (res.code == 20000) {
        this.details = res.data;
      }
    });
  },
  mounted() {
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      // this.center.lng = 116.404
      // this.center.lat = 39.915
      // this.zoom = 15
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    }
  },
};
</script>
<style lang="less" scoped>
#houseDetails {
  width: 100%;
  background: #f7f7f7;
  overflow: hidden;
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
    // height: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    // margin: 0 calc(50% - 600px);
    width: 100%;
    padding: 25px calc(50% - 600px);
    border-radius: 5px;
    overflow: hidden;
    background: #3d5a73;
    color: #fff;
    #img-left {
      width: 820px;
      height: 100%;
      overflow: hidden;
      border-radius: 5px;
      .el-carousel__item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #img-right {
      width: 370px;
      height: 100%;
      overflow: hidden;
      border-radius: 5px;
      padding-left: 20px;
      padding-right: 30px;
      #img-right-div1 {
        // height: 88px;
        margin-top: 6px;
        border-bottom: solid 1px #ebebeb;
        // line-height: 88px;
        font-size: 12px;
        font-weight: 500;

        b {
          font-size: 26px;
          font-weight: 500;
        }
        p {
          margin: 10px 0;
          font-size: 18px;
          span {
            font-size: 34px;
          }
        }
      }
      #img-right-div2 {
        border-bottom: solid 1px #ebebeb;

        height: 88px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .div2-item {
          .div2-item-top {
            height: 33px;
            line-height: 33px;
            font-size: 24px;
            font-weight: 500;
          }
        }
        .div2-item-bot {
          height: 17px;
          line-height: 17px;
          font-size: 12px;
          margin-top: 5px;
        }
      }
      #img-right-div3 {
        padding: 20px 0;
        border-bottom: solid 1px #ebebeb;

        div {
          margin-bottom: 10px;
          line-height: 17px;
          font-size: 12px;
          span {
            font-size: 12px;
            height: 17px;
          }
        }
      }
      #img-right-div4 {
        padding: 10px 0;
        border-bottom: solid 1px #ebebeb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        #img-right-div4-user {
          margin-left: 10px;

          #div-user-title {
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
          }
          p {
            line-height: 17px;
            font-size: 12px;
          }
        }
        #user-btn {
          font-size: 12px;
          margin: 0 auto;
        }
      }
    }
  }
  #information {
    width: 1200px;
    margin: 30px auto 50px;
    display: flex;
    justify-content: space-between;

    #left-info-box {
      width: 820px;
      height: auto;
      padding: 30px 30px 0 30px;
      background: #fff;
      .base-info-item {
        margin: 10px 0;
        .base-info-title {
          min-width: 78px;
          height: 17px;
          font-size: 12px;
          color: #b2b2b2;
          display: inline-block;
        }
        .base-info-content {
          font-size: 12px;
          color: #4a4a4a;
          height: 17px;
          display: inline-block;
        }
      }
      .info-title {
        height: 19px;
        line-height: 19px;
        font-size: 20px;
        font-weight: 500;
        color: #000;
        margin-bottom: 20px;
        i {
          width: 3px;
          background: #17a1e6;
          height: 19px;
          margin-right: 5px;
          display: inline-block;
          vertical-align: bottom;
        }
      }
      #jbxx {
        padding-bottom: 30px;
        border-bottom: solid 1px #ebebeb;
      }
      #jzxx {
        margin-top: 40px;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;

        #jzxx-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      #jgxx {
        margin-top: 40px;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        #jzxx-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      #jpxx {
        padding: 40px 0 30px;
      }
    }
    #right-info-box {
      background: #fff;
      width: 370px;
      padding: 20px 15px;
      #ljyy {
        text-align: center;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        h3 {
          width: 100%;
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          margin-bottom: 20px;
          text-align: left;
          i {
            width: 3px;
            background: #17a1e6;
            height: 19px;
            margin-right: 5px;
            display: inline-block;
            vertical-align: bottom;
          }
        }
        button {
          margin-top: 30px;
        }
        p {
          margin-top: 5px;
          color: #bebebe;
          font-size: 12px;
        }
      }
      #tjfy {
        text-align: center;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        margin-top: 30px;
        h3 {
          width: 100%;
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          margin-bottom: 20px;
          text-align: left;
          i {
            width: 3px;
            background: #17a1e6;
            height: 19px;
            margin-right: 5px;
            display: inline-block;
            vertical-align: bottom;
          }
        }
        #tjfy-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          div {
            width: 160px;
            height: 160px;
            border: solid 1px #eee;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
            p {
              box-sizing: border-box;
              position: absolute;
              bottom: 0;
              left: 0;
              display: block;
              width: 160px;
              height: 25px;
              line-height: 25px;
              padding: 0 10px;
              font-size: 14px;
              color: #fff;
              background: rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
  }
}
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
