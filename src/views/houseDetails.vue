<template>
  <!-- 房子详情 -->
  <div id="houseDetails">
    <search-nav></search-nav>
    <div id="build-title">
      {{ details.house_title }}
      <span v-show="details.rent_status">{{details.rent_status}}</span>
      <div>{{details.county}}</div>
    </div>
    <div id="img-box">
      <div id="img-left">
        <swiper
            :options="swiperOptionTop"
            class="gallery-top"
            ref="swiperTop"
          >
            <swiper-slide
              v-for="(item, index) in swiperImg(details.image)"
              :key="index"
              ><img :src="item" alt=""
            /></swiper-slide>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
          </swiper>
          <!-- swiper2 Thumbs -->
          <swiper
            :options="swiperOptionThumbs"
            class="gallery-thumbs"
            ref="swiperThumbs"
          >
            <swiper-slide
              v-for="(item, index) in swiperImg(details.image)"
              :key="index"
              ><img :src="item" alt=""
            /></swiper-slide>
          </swiper>
      </div>
      <div id="img-right">
        <div id="buildInfo-price">
          <div id="price-title">参考均价</div>
          <div id="price-number">{{ details.month_rent | priceF }}</div>
          <div id="price-unit">
            {{ details.month_rent ? "元/月" : "暂无数据" }}
          </div>
        </div>
        <div id="build-right-msg">
          <div class="build-right-info">
            <span class="info-span1">类型</span>
            <span class="info-span2">{{
              natureMsg(details.nature)
            }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">年限</span>
            <span class="info-span2">{{ details.years || "暂无数据" }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">所在楼层</span>
            <span class="info-span2">{{ details.floor || "暂无数据" }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">装修程度</span>
            <span class="info-span2">{{ details.renovation || "暂无数据" }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">详细地址</span>
            <span class="info-span2">{{ details.address || "暂无数据" }}</span>
          </div>
        </div>
        <div id="build-agent">
          <div id="agent-msg">
            <img :src="agentData.avatar" alt="" />
            <div>
              <p>{{agentData.name}}</p>
              <p>{{agentData.usertype}}</p>
            </div>
          </div>
          <div id="agent-phone">{{agentData.mobile}}</div>
        </div>
      </div>
    </div>
    <div id="information">
      <div id="information-content">
        <div id="left-info-box">
        <div id="jbxx">
          <h3 class="info-title"><i></i>基本信息</h3>
          <div class="base-info-item">
            <div class="base-info-title">房源名称</div>
            <div class="base-info-content">
              {{ details.house_title || "暂无数据" }}
            </div>
          </div>
          <div class="base-info-item">
            <div class="base-info-title">所在楼宇</div>
            <div class="base-info-content">{{ details.building || "暂无数据" }}</div>
          </div>
          <div class="base-info-item">
            <div class="base-info-title">房源楼层</div>
            <div class="base-info-content">{{ details.floor || "暂无数据" }}</div>
          </div>
          <!-- <div class="base-info-item">
            <div class="base-info-title">房源房号</div>
            <div class="base-info-content">
              {{ details.house_number || "暂无数据" }}
            </div>
          </div> -->
        </div>
        <div id="jzxx">
          <h3 class="info-title"><i></i>建筑信息</h3>
          <div id="jzxx-content">
            <div>
              <div class="base-info-item">
                <div class="base-info-title">房源朝向</div>
                <div class="base-info-content">
                  {{ details.orientation || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">装修程度</div>
                <div class="base-info-content">
                  {{ details.renovation || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">注册</div>
                <div class="base-info-content">{{details.registers || "暂无数据"}}</div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">房源面积</div>
                <div class="base-info-content">{{ details.square?details.square+"㎡" : "暂无数据" }}</div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">付款方式</div>
                <div class="base-info-content">
                  {{ details.pay_way || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">性质</div>
                <div class="base-info-content">{{natureMsg(details.nature)}}</div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">看房方式</div>
                <div class="base-info-content">
                  {{ details.look_way || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">分割</div>
                <div class="base-info-content">{{details.divisions || "暂无数据"}}</div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">房屋年限</div>
                <div class="base-info-content">{{ details.years || "暂无数据" }}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="jgxx">
          <h3 class="info-title"><i></i>价格信息</h3>
          <div id="jzxx-content">
            <div>
              <div class="base-info-item">
                <div class="base-info-title">月租费用</div>
                <div class="base-info-content">
                  {{ details.month_rent ? details.month_rent + "元/月" : "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">得房率</div>
                <div class="base-info-content">
                  {{ details.rate ? details.rate + "%" : "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">车位费</div>
                <div class="base-info-content">{{ details.car || "暂无数据" }}</div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">物业费</div>
                <div class="base-info-content">
                  {{ details.property ? details.property + "元/㎡/月" : "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">房屋状态</div>
                <div class="base-info-content">
                  {{ details.rent_status || "暂无数据" }}
                </div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">起租期</div>
                <div class="base-info-content">
                  {{ details.start_rent ? details.start_rent + "个月" : "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">水电费</div>
                <div class="base-info-content">
                  {{ details.hydropower || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">用地性质</div>
                <div class="base-info-content">
                  {{ details.land_use || "暂无数据" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="baiduMap-box">
          <h3 class="info-title"><i></i>十分钟步行圈</h3>
          <div id="mapTypeSearch">
            <div
              @click="choicePer(item, index)"
              :class="{ activityDiv: actMapIndex == index }"
              v-for="(item, index) in keywordList"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <baidu-map
            @ready="map_handler"
            :center="item.center"
            :zoom="11"
            class="bm-view"
          >
            <bm-local-search
              :keyword="keyword"
              :nearby="item"
              :auto-viewport="true"
              :panel="false"
            ></bm-local-search>
            <bm-circle :center="item.center" :radius="item.radius"></bm-circle>
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
              <bm-info-window :show="true" @open="showPeriphery = true">{{
                peripheryVal
              }}</bm-info-window>
            </bm-marker>
          </baidu-map>
        </div>
      </div>
      <div id="right-info-box">
        <div id="ljyy">
          <h3><i></i>预约看房</h3>
          <el-input placeholder="请输入您的手机号" v-model="input10" clearable>
          </el-input>
          <el-button type="primary" @click="subscribe(input10)"
            >立即预约</el-button
          >
          <p>巧租承诺仅将你的联系方式用于找房服务</p>
        </div>
        <div id="tjfy" v-show="hotHouseData.length>0">
          <h3><i></i>热点房源</h3>
          <div id="tjfy-content">
            <div @click="toDetails(item.id)" v-for="(item,index) in hotHouseData.slice(0,4)" :key="index">
              <img :src="item.main_pic" alt />
              <p>{{item.house_title}}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div id="big-swiper" v-show="showBigS">
      <div id="big-swiper-content">
        <el-carousel indicator-position="none" :interval="5000" arrow="always">
          <el-carousel-item v-for="(item, index) in swiperImg(details.image)" :key="index">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <i @click="showBigS=false" class="el-icon-error close-icon"></i>
    </div>
  </div>
</template>
<script>
let that = null;
import { getResourceDetails,getSubscribe,getUser } from "../api/index";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: {  Swiper, SwiperSlide },
  data() {
    return {
      swiperOptionTop: {
        on:{
          click: function(){
            that.showBigS = true
          }
        },
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
      input10: "",
      details: {},
      item: {
        center: { lng: 117.233725, lat: 31.827 },
        radius: 1000
      },
      BMap: null,
      map: null,
      actMapIndex: 0,
      peripheryVal: "合肥市政府",
      keyword: "景点",
      keywordList: ["景点", "公交车", "地铁", "学校", "医院", "酒店", "餐饮"],
      hotHouseData: [],
      agentData:{},
      showBigS:false

    };
  },
  created() {
    this.$store.commit("actNav", 3);
    if (localStorage.getItem("hotHouseData")) {
      this.hotHouseData = JSON.parse(localStorage.getItem("hotHouseData"));
    }
    getResourceDetails(this.$route.query.id).then((res) => {
      if (res.code == 20000) {
        this.details = Object.freeze(res.data);
        this.peripheryVal = res.data.house_title;
        this.item.lng = res.data.longitude;
        this.item.lat = res.data.latitude;
        getUser({username:res.data.receiver,userType:"经纪人"}).then(res2=>{
          
          if(res2.code == 20000){
            this.agentData = res2.data[0];
          }
        })
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
      that = this
    });
  },
  methods: {
    toDetails(id) {
      let routeData = this.$router.resolve({ path: `./houseDetails?id=${id}` });
      window.open(routeData.href, "_blank");
    },
    choicePer(item, index) {
      this.keyword = item;
      this.actMapIndex = index;
    },
    map_handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    natureMsg(val){
      if(val==1){
        return "写字楼"
      }else if(val==2){
        return "公寓"
      }else if(val==3){
        return "商铺"
      }else if(val==4){
        return "厂房"
      }else if(val==5){
        return "园区"
      }else if(val==5){
        return "联合办公"
      }else{
        return "暂无数据"
      }
    },
    swiperImg(arr) {
      if (arr && arr.length > 0) {
        return arr;
      } else {
        return [require("../assets/image/none-img.png")];
      }
    },
    subscribe(val){
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if(!phoneReg.test(val)){
        this.$notify({
            title: "警告",
            message: "请正确填写手机号",
            type: "warning",
          });
          return
      }
      getSubscribe({
        house_id:this.details.id,
        mobile:val,
        house_name:this.details.house_title
      }).then(res=>{
        if (res.code == 20000) {
          this.$notify({
            title: "成功",
            message: "预约成功",
            type: "success",
          });
        } else {
          this.$notify({
            title: "警告",
            message: res.message,
            type: "warning",
          });
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
#houseDetails {
  width: 100%;
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
  #build-title {
    width: 1200px;
    margin: 50px auto 30px auto;
    font-size: 26px;
    color: #101d37;
    font-weight: 600;
    height: 35px;
    line-height: 35px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      line-height: 23px;
      height: 23px;
      padding: 0 5px;
      vertical-align: middle;
      font-size: 14px;
      display: inline-block;
      margin-left: 7px;
      color: #fff;
      background-image: linear-gradient(-135deg, #6b99f6, #3072f6);
    }
    div{
      font-size: 14px;
      color: #888;
      flex: none;
      width: 100%;
    }
  }
  #img-box {
    // height: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    width: 100%;
    padding: 25px calc(50% - 600px);
    border-radius: 5px;
    overflow: hidden;
    color: #fff;
    #img-left {
      width: 700px;
      height: 420px;
      overflow: hidden;
      border-radius: 5px;
      .el-carousel__item img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
    }
    #img-right {
      width: 480px;
      height: 420px;
      overflow: hidden;
      border-radius: 5px;
      margin-left: 20px;
      position: relative;
      padding: 20px 30px;
      box-sizing: border-box;
      background: #fff;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.06);
      -webkit-box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.06);
      #buildInfo-price {
        display: flex;
        align-items: baseline;
        border-bottom: 1px solid #e4e6f0;
        padding-bottom: 15px;
        #price-title {
          width: 81px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #9399a5;
        }
        #price-number {
          color: #ffb200;
          font-family: Tahoma-Bold;
          font-size: 30px;
          font-weight: bold;
        }
        #price-unit {
          font-family: HiraginoSansGB-W6;
          font-size: 16px;
          color: #ffb200;
        }
      }
      #build-right-msg {
        padding: 20px 0;
        border-bottom: 1px solid #e4e6f0;
        height: 195px;
        overflow: hidden;
        .build-right-info {
          margin-bottom: 15px;
          word-break: break-all;
          .info-span1 {
            width: 81px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #9399a5;
            display: inline-block;
          }
          .info-span2 {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333;
            display: inline-block;
            font-weight: bold;
            display: inline;
            line-height: 20px;
          }
        }
      }
      #build-agent {
        height: 130px;
        overflow: hidden;
        #agent-phone {
          font-size: 25px;
          font-weight: bold;
          color: #ffb200;
        }
        #agent-msg {
          display: flex;
          align-items: center;
          margin: 15px 0;
          img {
            width: 70px;
            height: 70px;
            margin-right: 15px;
            object-fit: cover;
          }
          div {
            p {
              font-size: 16px;
              &:first-child {
                color: #333;
                font-weight: bold;
                margin-bottom: 15px;
              }
              &:last-child {
                color: #9399a5;
                margin-top: 15px;
              }
            }
          }
        }
      }
    }
  }
  #information {
    width: 100%;
    background: #f5f5f5;
    overflow: hidden;
    #information-content{
      width: 1200px;
      margin: 30px auto 50px;
      display: flex;
      justify-content: space-between;
    }

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
          background: #ffb200;
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
            background: #ffb200;
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
            background: #ffb200;
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
            cursor: pointer;
            img{
              width: 100%;
              height: 125px;
            }
            p {
              box-sizing: border-box;
              display: block;
              width: 160px;
              height: 35px;
              line-height:35px;
              padding: 0 10px;
              font-size: 14px;
              color: #333;
              background: #fff;
            }
          }
        }
      }
    }
  }
}
#baiduMap-box {
  width: 100%;
  height: 520px;
  margin: 50px 0;
  overflow: hidden;

  #mapTypeSearch {
    display: flex;
    align-items: center;
    div {
      font-size: 14px;
      color: #333;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      cursor: pointer;
      &:hover {
        color: #ffb200;
      }
    }
    .activityDiv {
      color: #fff;
      font-weight: bold;
      background: #ffb200;
      &:hover {
        color: #fff;
      }
    }
  }
  .bm-view {
    width: 100%;
    height: 441px;
  }
  /deep/ .BMap_bubble_content {
    div {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
  }
}
/deep/ .gallery-top {
  height: 75% !important;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

  }
}
/deep/ .gallery-thumbs {
  height: 25% !important;
  box-sizing: border-box;
  padding: 10px 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
/deep/ .gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
/deep/ .gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
/deep/ .el-carousel__arrow {
  display: none;
}
/deep/ .swiper-button-white{
  background: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 40px;
  font-size: 12px;
  &:after{
    font-size: 14px;
  }
}
#big-swiper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  .close-icon{
    position: absolute;
    top: 5vh;
    right: 15vh;
    font-size: 40px;
    color: #fff;
    cursor: pointer;
  }
  #big-swiper-content{
    width: 80vw;
    height: 80vh;
    /deep/ .el-carousel{
      width: 100%;
      height: 100%;
      /deep/ .el-carousel__container{
        width: 100%;
        height: 100%;
        text-align: center;
        /deep/ .el-carousel__item{
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    /deep/ .el-carousel__arrow{
      display: block;
      background: rgba(0, 0, 0, 0.9);
    }
    /deep/ img{
      width: auto;
      height: auto;
      max-width: 100%;
      min-width: 50%;
      max-height: 100%;
      object-fit: cover;
    }
  }
}
/deep/ .el-button--primary{
  background: #ffb200;
}
</style>
