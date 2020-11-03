<template>
  <!-- 房子详情 -->
  <div id="houseDetails">
    <search-nav></search-nav>
    <div id="build-title">
      {{ details.bname }}
      <span>在售</span>
      <div>{{ details.county }}</div>
    </div>
    <div id="img-box">
      <div id="img-left">
        <el-carousel height="420px">
          <el-carousel-item
            v-for="(item, index) in swiperImg(details.image)"
            :key="index"
          >
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="img-right">
        <div id="buildInfo-price">
          <div id="price-title">参考均价</div>
          <div id="price-number">{{ details.price }}</div>
          <div id="price-unit">
            {{ details.price ? "元/m²/天" : "暂无数据" }}
          </div>
        </div>
        <div id="build-right-msg">
          <div class="build-right-info">
            <span class="info-span1">层高</span>
            <span class="info-span2">{{
              details.floor_height || "暂无数据"
            }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">层数</span>
            <span class="info-span2">{{
              details.floor_number || "暂无数据"
            }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">物业费</span>
            <span class="info-span2">{{
              details.bproperty ? details.bproperty + "元/㎡/月" : "暂无数据"
            }}</span>
          </div>
          <div class="build-right-info">
            <span class="info-span1">详细地址</span>
            <span class="info-span2">{{ details.address || "暂无数据" }}</span>
          </div>
        </div>
        <div id="build-agent">
          <div id="agent-msg">
            <img src="../assets/image/BannerItem4.png" alt="" />
            <div>
              <p>汪汪汪汪</p>
              <p>{{ details.relation }}</p>
            </div>
          </div>
          <div id="agent-phone">{{ details.phone }}</div>
        </div>
      </div>
    </div>
    <div id="information">
      <div id="left-info-box">
        <!-- <div id="jbxx">
          <h3 class="info-title"><i></i>基本信息</h3>
          <h4>  </h4>
          <div class="base-info-item" v-for="item in 8" :key="item">
            <div class="base-info-title">房源编码</div>
            <div class="base-info-content">3213123123</div>
          </div>
        </div> -->
        <div id="jzxx">
          <h3 class="info-title"><i></i>基本信息</h3>
          <div id="jzxx-content">
            <div class="content-div">
              <div class="base-info-item">
                <div class="base-info-title">楼宇：</div>
                <div class="base-info-content">
                  {{ details.county }}-{{ details.bname }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">类型：</div>
                <div class="base-info-content">后台没返回</div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">单价：</div>
                <div class="base-info-content">
                  {{ details.price ? details.price + "元/m²/天" : "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">楼层高度：</div>
                <div class="base-info-content">
                  {{ details.floor_height || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">物业：</div>
                <div class="base-info-content">
                  {{ details.boffice || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">车位数量：</div>
                <div class="base-info-content">
                  {{ details.car_number || "暂无数据" }}
                </div>
              </div>

              <div class="base-info-item">
                <div class="base-info-title">空调：</div>
                <div class="base-info-content">
                  {{ details.air || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">空调费：</div>
                <div class="base-info-content">
                  {{ details.air_pay || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">网络：</div>
                <div class="base-info-content">
                  {{ details.internet || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">楼盘标签：</div>
                <div
                  v-show="details.label && details.label.length > 0"
                  class="base-info-content"
                  v-for="(item, index) in details.label"
                  :key="index"
                >
                  {{ item }}
                </div>
                <div
                  class="base-info-content"
                  v-show="details.label.length == 0"
                >
                  暂无数据
                </div>
                &nbsp;
              </div>
            </div>
            <div class="content-div">
              <div class="base-info-item">
                <div class="base-info-title">详细地址：</div>
                <div class="base-info-content">
                  {{ details.address || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">装修程度：</div>
                <div class="base-info-content">
                  {{ details.renovation || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">入住企业：</div>
                <div class="base-info-content">
                  {{ details.enter || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">楼层数量：</div>
                <div class="base-info-content">
                  {{ details.floor_number || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">物业费：</div>
                <div class="base-info-content">
                  {{
                    details.bproperty
                      ? details.bproperty + "元/㎡/月"
                      : "暂无数据"
                  }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">车位月租：</div>
                <div class="base-info-content">
                  {{ details.car_month || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">状态：</div>
                <div class="base-info-content">
                  {{ details.bstatus || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">空调开放时间：</div>
                <div class="base-info-content">
                  {{ details.air_open || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">电梯：</div>
                <div class="base-info-content">
                  {{ details.elevator || "暂无数据" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">描述：</div>
                <div class="base-info-content">
                  {{ details.bdesc || "暂无数据" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="zzhx" v-show="zzhxList.length > 0">
          <h3 class="info-title"><i></i>在租户型</h3>
          <div id="houseTypeTitle">
            <div>照片</div>
            <div>面积</div>
            <div>装修程度</div>
            <div>单价</div>
            <div>更新时间</div>
          </div>
          <div>
            <houseType
              v-for="(item, index) in zzhxList"
              :key="index"
              :data="item"
            ></houseType>
          </div>
          <div
            id="lookMore"
            @click="getResource"
            v-show="zzhxList.length < zzhxAll"
          >
            查看更多户型
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
        <div id="tjfy">
          <h3><i></i>推荐房源</h3>
          <div id="tjfy-content">
            <div v-for="(item, index) in 4" :key="index">
              <p>某某大厦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBuildingDetails, getResource, getSubscribe } from "../api/index";
import houseType from "../components/houseType";

export default {
  components: { houseType },
  data() {
    return {
      swipers: [
        { src: require("../assets/image/swiper1.jpg") },
        { src: require("../assets/image/swiper2.jpg") },
        { src: require("../assets/image/swiper3.jpg") }
      ],
      input10: "",
      details: {},
      zzhxList: [],
      zzhxAll: 0,
      page: 1,
      size: 8,
      item: {
        center: { lng: 117.233725, lat: 31.827 },
        radius: 1000
      },
      BMap: null,
      map: null,
      actMapIndex: 0,
      peripheryVal: "合肥市政府",
      keyword: "景点",
      keywordList: ["景点", "公交车", "地铁", "学校", "医院", "酒店", "餐饮"]
    };
  },
  created() {
    this.$store.commit("actNav", 2);
    getBuildingDetails(this.$route.query.id).then(res => {
      if (res.code == 20000) {
        this.details = res.data;
        this.peripheryVal = res.data.bname;
        this.item.lng = res.data.longitude;
        this.item.lat = res.data.latitude;
        this.getResource();
      }
    });
  },
  mounted() {},
  methods: {
    choicePer(item, index) {
      this.keyword = item;
      this.actMapIndex = index;
    },
    map_handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    subscribe(val) {
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if (!phoneReg.test(val)) {
        this.$notify({
          title: "警告",
          message: "请正确填写手机号",
          type: "warning"
        });
        return;
      }
      getSubscribe({
        house_id: this.details.id,
        mobile: val,
        house_name: this.details.house_title
      }).then(res => {
        if (res.code == 20000) {
          this.$notify({
            title: "成功",
            message: "预约成功",
            type: "success"
          });
        } else {
          this.$notify({
            title: "警告",
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    getResource() {
      getResource(
        { building: this.details.bname },
        { page: this.page, size: this.size }
      ).then(res => {
        if (res.code == 20000) {
          if (this.zzhxList.length > 0) {
            res.data.rows.forEach(item => {
              this.zzhxList.push(item);
            });
          } else {
            this.zzhxList = res.data.rows;
          }
          this.zzhxAll = res.data.total;
          this.page++;
        }
      });
    },
    // 去地图查看
    lookupMap() {
      this.$router.push({
        name: "mapLookup",
        query: { build: this.details.id }
      });
    },
    swiperImg(arr) {
      if (arr && arr.length > 0) {
        return arr;
      } else {
        return [require("../assets/image/none-img.png")];
      }
    },
  }
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
    div {
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
      height: 100%;
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
          color: #fe615a;
          font-family: Tahoma-Bold;
          font-size: 30px;
          font-weight: bold;
        }
        #price-unit {
          font-family: HiraginoSansGB-W6;
          font-size: 16px;
          color: #fe615a;
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
          color: crimson;
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
          height: 17px;
          font-size: 12px;
          color: #b2b2b2;
          display: inline-block;
        }
        .base-info-content {
          font-size: 12px;
          color: #4a4a4a;
          height: 17px;
          display: inline;
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
          .content-div {
            width: 50%;
            padding-right: 20px;
          }
        }
      }
      #zzhx {
        margin-top: 40px;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        #houseTypeTitle {
          display: flex;
          div {
            width: 20%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
          }
        }
        #lookMore {
          width: 200px;
          margin: 20px auto;
          text-align: center;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: tomato;
          border: solid 1px tomato;
          padding: 0 30px;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            background: tomato;
            color: #fff;
          }
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
#baiduMap-box {
  width: 100%;
  height: 420px;
  margin: 50px 0;
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
        color: #17a1e6;
      }
    }
    .activityDiv {
      color: #fff;
      font-weight: bold;
      background: #17a1e6;
      &:hover {
        color: #fff;
      }
    }
  }
  .bm-view {
    width: 100%;
    height: 100%;
  }
  /deep/ .BMap_bubble_content {
    div {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
