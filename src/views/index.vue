<template>
  <div id="index-main">
    <div id="header-con">
      <div id="header-content">
        <div id="nav-logo">
          <img src="../assets/image/qz-logo1.png" alt />
        </div>
        <div id="nav-data">
          <router-link
            to="./"
            class="nav-item"
            style="font-weight: bold;color:#ffb200"
            >首页</router-link
          >
          <router-link to="./building" class="nav-item">楼宇</router-link>
          <router-link to="./resource" class="nav-item">办公室</router-link>
          <router-link to="./entrust" class="nav-item">委托我们</router-link>
          <router-link to="./throwIn" class="nav-item">投放房源</router-link>
          <router-link to="./mapLookup" class="nav-item">地图找房</router-link>
        </div>
        <div id="nav-phone">
          <i class="el-icon-phone"></i>
          <span>400-138-9996</span>
        </div>
      </div>
    </div>
    <div id="header-box">
      <baidu-map
        @ready="map_handler"
        :center="item.center"
        :zoom="14"
        class="bm-view"
      >
        <!-- 缩放 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

        <!-- 点 -->
        <bm-marker
          v-for="(item, index) in buildMapData"
          :key="index"
          :position="{ lng: item.longitude, lat: item.latitude }"
          :dragging="false"
          :icon="{
            url: require('../assets/image/map_icon.png'),
            size: { width: 28, height: 36 },
          }"
          @mouseover="mouseover(index)"
        >
          <bm-info-window
            :width="400"
            :height="120"
            :autoPan="true"
            :show="item.showInfo"
            @close="item.showInfo = false"
          >
            <div class="markerInfo" @click="toDetails(item.id)">
              <img :src="item.main_pic" alt="" />
              <div class="markerInfo-text">
                <h3>{{ item.bname }}</h3>
                <div>地址：{{ item.address || "暂无数据" }}</div>
                <div>装修程度：{{ item.renovation || "暂无数据" }}</div>
                <p>
                  参考价格：{{
                    item.price ? item.price + "元/m²/天" : "暂无报价"
                  }}
                </p>
              </div>
            </div>
          </bm-info-window>
        </bm-marker>
      </baidu-map>
      <div class="inside-search">
        <div class="search-box">
          <div class="srarch-tabs">楼宇</div>
          <div class="search-line"></div>
          <el-input
            class="search-input"
            placeholder="请输入内容"
            v-model="searchKey"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="search-btn" @click="toSearch">
            立即搜索
          </div>
        </div>
        <div class="search-sx">
          <div class="sx-item">
            <el-select
              @change="searchChange1"
              v-model="regionKey"
              placeholder="区域"
            >
              <el-option
                v-for="(item, index) in regionList"
                :key="index"
                :label="item.name"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
          <div class="sx-item">
            <el-select
              @change="searchChange2"
              v-model="metroKey"
              placeholder="地铁(1号线)"
            >
              <el-option
                v-for="(item, index) in metroList"
                :key="index"
                :label="item.name"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
          <div class="sx-item">
            <el-select
              @change="searchChange3"
              v-model="renovationKey"
              placeholder="装修"
            >
              <el-option
                v-for="(item, index) in renovationList"
                :key="index"
                :label="item.label"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
          <div class="sx-item">
            <el-select
              @change="searchChange4"
              v-model="buildKey"
              placeholder="类型"
            >
              <el-option
                v-for="(item, index) in buildList"
                :key="index"
                :label="item.label"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="header-box">
      <el-carousel height="680px">
        <el-carousel-item v-for="(item, index) in swipers" :key="index">
          <img :src="item.src" alt />
        </el-carousel-item>
      </el-carousel>
      <div id="swiper-inside-house">
        <div id="inside-house-search">
          <el-input
            placeholder="请输入房源"
            v-model="searchKey"
            class="input-with-select"
          >
            <el-button @click="toSearch" slot="append" icon="el-icon-search"
              >搜索</el-button
            >
          </el-input>
        </div>
        <div id="inside-house-box" v-show="newHouseData.length>0">
          <h3>新上房源</h3>
          <div
            class="inside-house-item"
            @click="toHouseDetails(item.id)"
            v-for="(item, index) in newHouseData"
            :key="index"
          >
            <img :src="item.main_pic" alt="" />
            <div class="house-item-info">
              <p class="info-p1">{{ item.house_title }}</p>
              <p class="info-p2">{{ item.bailor_time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="our-nice">
      <div class="our-nice-box">
        <div
          class="our-nice-item"
          v-for="(item, index) in trustList"
          :key="index"
        >
          <img :src="item.icon" alt="" />
          <div>
            <div class="our-nice-num">{{ item.num }}</div>
            <div class="our-nice-title">{{ item.title }}</div>
          </div>

          <div v-show="index != trustList.length - 1" class="line"></div>
        </div>
      </div>
    </div>
    <div id="hot-work-area">
      <div id="hot-work-title">
        <h3>热门办公区域</h3>
        <p>合肥核心商圈 优质写字楼集群</p>
      </div>
      <div id="hot-work-box">
        <div class="hot-work-item" @click="searchChange1(item.index)"  v-for="(item,index) in hotWorkList" :key="index">
        <img :src="item.img" alt="">
        <div class="work-item-name">{{item.area}}</div>
        <div class="work-item-info">{{item.msg}}</div>
      </div>
      </div>
      
    </div>
    <div id="hot-area" v-show="buildData1.length > 0">
      <div id="hot-area-title">
        优质写字楼
      </div>
      <div id="hot-build-box">
        <div
          class="build-city"
          @click="toDetails(item.id)"
          v-for="(item, index) in buildData1"
          :key="index"
        >
          <img :src="item.main_pic" alt="" />
          <div class="build-info-bot">
            <h3>{{ item.bname }}</h3>
            <div class="build-info-bot-m">
              <div class="info-addr">
                <i class="el-icon-location"></i>
                <div class="build-info-addr">
                  {{ item.county || "暂无数据" }}
                </div>
              </div>
              <div class="build-info-price" v-show="item.price">
                <span>{{ item.price | priceF }}</span
                >元/㎡/月
              </div>
            </div>
          </div>
          <div class="build-info-tag" v-show="item.label.length > 0">
            <div
              class="build-tag-item"
              v-for="(item2, index2) in item.label"
              :key="index2"
            >
              {{ item2 }}
            </div>
          </div>
        </div>
        <div class="more-city">
          <div class="more-city-info">
            <div>更多优质写字楼<br />任你挑</div>
            <button @click="toBuildList(1)">查看更多</button>
          </div>
        </div>
      </div>
    </div>
    <div id="hot-area" v-show="buildData2.length > 0">
      <div id="hot-area-title">
        优质园区
      </div>
      <div id="hot-build-box">
        <div
          class="build-city"
          @click="toDetails(item.id)"
          v-for="(item, index) in buildData2"
          :key="index"
        >
          <img :src="item.main_pic" alt="" />
          <div class="build-info-bot">
            <h3>{{ item.bname }}</h3>
            <div class="build-info-bot-m">
              <div class="info-addr">
                <i class="el-icon-location"></i>
                <div class="build-info-addr">
                  {{ item.county || "暂无数据" }}
                </div>
              </div>
              <div class="build-info-price" v-show="item.price">
                <span>{{ item.price | priceF }}</span
                >元/㎡/月
              </div>
            </div>
          </div>
          <div class="build-info-tag" v-show="item.label.length > 0">
            <div
              class="build-tag-item"
              v-for="(item2, index2) in item.label"
              :key="index2"
            >
              {{ item2 }}
            </div>
          </div>
        </div>
        <div class="more-city">
          <div class="more-city-info">
            <div>更多优质园区<br />任你挑</div>
            <button @click="toBuildList(2)">查看更多</button>
          </div>
        </div>
      </div>
    </div>
    <div id="hot-area" v-show="buildData3.length > 0">
      <div id="hot-area-title">
        优质联合办公
      </div>
      <div id="hot-build-box">
        <div
          class="build-city"
          @click="toDetails(item.id)"
          v-for="(item, index) in buildData3"
          :key="index"
        >
          <img :src="item.main_pic" alt="" />
          <div class="build-info-bot">
            <h3>{{ item.bname }}</h3>
            <div class="build-info-bot-m">
              <div class="info-addr">
                <i class="el-icon-location"></i>
                <div class="build-info-addr">
                  {{ item.county || "暂无数据" }}
                </div>
              </div>
              <div class="build-info-price" v-show="item.price">
                <span>{{ item.price | priceF }}</span
                >元/㎡/月
              </div>
            </div>
          </div>
          <div class="build-info-tag" v-show="item.label.length > 0">
            <div
              class="build-tag-item"
              v-for="(item2, index2) in item.label"
              :key="index2"
            >
              {{ item2 }}
            </div>
          </div>
        </div>
        <div class="more-city">
          <div class="more-city-info">
            <div>更多优质联合办公<br />任你挑</div>
            <button @click="toBuildList(3)">查看更多</button>
          </div>
        </div>
      </div>
    </div>
    <div id="hot-area" v-show="hotBuildData.length > 0">
      <div id="hot-area-title">
        热门楼宇，进驻城市中心
      </div>
      <div id="hot-build-box">
        <div
          class="build-city"
          @click="toDetails(item.id)"
          v-for="(item, index) in hotBuildData"
          :key="index"
        >
          <img :src="item.main_pic" alt="" />
          <div class="build-info-bot">
            <h3>{{ item.bname }}</h3>
            <div class="build-info-bot-m">
              <div class="info-addr">
                <i class="el-icon-location"></i>
                <div class="build-info-addr">
                  {{ item.county || "暂无数据" }}
                </div>
              </div>
              <div class="build-info-price" v-show="item.price">
                <span>{{ item.price | priceF }}</span
                >元/㎡/月
              </div>
            </div>
          </div>
          <div class="build-info-tag" v-show="item.label.length > 0">
            <div
              class="build-tag-item"
              v-for="(item2, index2) in item.label"
              :key="index2"
            >
              {{ item2 }}
            </div>
          </div>
        </div>
        <div class="more-city">
          <div class="more-city-info">
            <div>更多热门楼宇<br />任你挑</div>
            <button @click="toBuildList(4)">查看更多</button>
          </div>
        </div>
      </div>
    </div>
    <div id="recommend-area" v-show="hotHouseData.length > 0">
      <div id="recommend-area-title">巧租推荐，精选优质房源</div>
      <div id="recommend-area-content">
        <div id="recommend-house1" @click="toHouseDetails(hotHouseData[0].id)">
          <img
            v-if="hotHouseData[0] && hotHouseData[0].main_pic"
            :src="hotHouseData[0].main_pic"
            alt=""
          />
          <div class="recommend-house1-info">
            <div>
              <div
                class="recommend-house1-title"
                v-if="hotHouseData[0] && hotHouseData[0].house_title"
              >
                {{ hotHouseData[0].house_title }}
              </div>
              <div class="recommend-house1-lookUp">查看详情</div>
            </div>
          </div>
        </div>
        <div id="recommend-house-r">
          <div
            class="recommend-house-item"
            v-for="(item, index) in hotHouseData.slice(1, 5)"
            :key="index"
          >
            <img :src="item.main_pic" alt="" />
            <div class="recommend-house-item-info">
              <div>
                <div class="recommend-house-item-title">
                  {{ item.house_title }}
                </div>
                <div
                  class="recommend-house-item-lookUp"
                  @click="toHouseDetails(item.id)"
                >
                  查看详情
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
          class="recommend-city"
          @click="toHouseDetails(item.id)"
          v-for="(item, index) in hotHouseData"
          :key="index"
        >
          <div class="recommend-city-img">
            <img :src="item.main_pic" alt="" />
          </div>
          <div class="recommend-city-info">
            <div class="recommend-city-title">{{ item.house_title }}</div>
          </div>
        </div> -->
        <!-- <div
          class="recommend-city more-ciry"
          @click="toHouseDetails(item.id)"
          v-for="(item, index) in hotHouseData"
          :key="index"
        >
          <div class="more-text1">10000+</div>
          <div class="more-text2">套办公室任你挑</div>
          <div class="more-btn" @click="resourceMore">查看更多房源</div>
        </div> -->
      </div>
    </div>
    <div id="business-info-box">
      <div id="business-info-in">
        <div
          class="business-item"
          v-for="(item, index) in businessInfo"
          :key="index"
        >
          <h3>{{ item.title }}</h3>
          <div>{{ item.body }}</div>
        </div>
      </div>
    </div>
    <div id="contact-me-box">
      <div id="contact-me-input">
        <h3>联系我们</h3>
        <div id="userPhone">
          <el-input v-model="userPhone" placeholder="请输入手机号"></el-input>
        </div>
        <div id="userTextArea">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea"
            resize="none"
          >
          </el-input>
        </div>
        <div id="userBtn">
          <el-button type="primary" @click="userSend">点击提交</el-button>
        </div>
      </div>
      <img id="contact-me-img" src="../assets/image/home-img1.jpg" alt="" />
    </div>
  </div>
</template>
<script>
import { getBuilding, getResource } from "../api/index";

export default {
  data() {
    return {
      swipers: [
        {
          src: "https://house123.oss-cn-beijing.aliyuncs.com/banner/图片1.png",
        },
        {
          src: "https://house123.oss-cn-beijing.aliyuncs.com/banner/图片2.png",
        },
        {
          src: "https://house123.oss-cn-beijing.aliyuncs.com/banner/图片3.png",
        },
        {
          src: "https://house123.oss-cn-beijing.aliyuncs.com/banner/图片4.png",
        },
        {
          src: "https://house123.oss-cn-beijing.aliyuncs.com/banner/图片6.png",
        },
      ],
      searchMap: {
        county: "全部", //区域搜索
        end: "", //截止面积
        start: "", //开始面积
        bname: "", //搜索名字
        type: null,
        hot: 1, //最热
        newest: null, //最新
        recommend: null, //推荐
      },
      hotBuildData: [], //热门楼宇
      hotHouseData: [],
      newHouseData: [],
      businessInfo: [
        {
          title: "全系列房源",
          body:
            "覆盖14个区县优质房源，精准匹配客户需求，巧租为您提供全系列房源信息。",
        },
        {
          title: "真实房源保证",
          body:
            "真实价格，真实房源，诚意满满在巧租可以了解到最放心的房源信息。",
        },
        {
          title: "贴心经纪人服务",
          body: "快速响应客户需求，提供周到的看房服务租房，巧租来陪您。",
        },
      ],
      userPhone: "",
      textarea: "",
      trustList: [
        {
          num: "10000+",
          title: "房源",
          icon: require("../assets/image/BannerItem1-c.png"),
        },
        {
          num: "2000+",
          title: "楼宇",
          icon: require("../assets/image/BannerItem2-c.png"),
        },
        {
          num: "800+",
          title: "用户认可",
          icon: require("../assets/image/BannerItem3-c.png"),
        },
        {
          num: "50",
          title: "精品服务人员",
          icon: require("../assets/image/BannerItem4-c.png"),
        },
      ],
      searchKey: "",
      buildMapData: [],
      buildData1: [],
      buildData2: [],
      buildData3: [],
      BMap: null,
      map: null,
      item: {
        center: { lng: 117.233725, lat: 31.827 },
        radius: 1000,
      },
      regionKey: "", //区域key
      metroKey: "",
      renovationKey: "",
      buildKey: "",
      hotWorkList:[
        {index:7,area:"包河区",img:"http://www.91kdz.com/upload/image/20200106/20200106112005_85684.jpg",msg:"新华国际广场、华地金融中心、西湖国际广场、IFC、之心城环球中心、华润五彩城等"},
        {index:1,area:"蜀山区",img:"http://www.91kdz.com/upload/image/20200106/20200106112005_85684.jpg",msg:"新华国际广场、华地金融中心、西湖国际广场、IFC、之心城环球中心、华润五彩城等"},
        {index:6,area:"庐阳区",img:"http://www.91kdz.com/upload/image/20200106/20200106112005_85684.jpg",msg:"新华国际广场、华地金融中心、西湖国际广场、IFC、之心城环球中心、华润五彩城等"},
        {index:3,area:"政务区",img:"http://www.91kdz.com/upload/image/20200106/20200106112005_85684.jpg",msg:"新华国际广场、华地金融中心、西湖国际广场、IFC、之心城环球中心、华润五彩城等"},
        {index:2,area:"滨湖新区",img:"http://www.91kdz.com/upload/image/20200106/20200106112005_85684.jpg",msg:"新华国际广场、华地金融中心、西湖国际广场、IFC、之心城环球中心、华润五彩城等"},
        {index:13,area:"经开区",img:"http://www.91kdz.com/upload/image/20200106/20200106112005_85684.jpg",msg:"新华国际广场、华地金融中心、西湖国际广场、IFC、之心城环球中心、华润五彩城等"},
      ]
    };
  },
  computed: {
    regionList() {
      return this.$store.state.regionList;
    },
    metroList() {
      return this.$store.state.metroList;
    },
    renovationList() {
      //装修类型
      return this.$store.state.renovationList;
    },
    buildList() {
      //楼宇类型
      return this.$store.state.buildList;
    },
  },
  created() {
    getBuilding({ county: "全部" }, { page: 1, size: 200 }).then((res) => {
      //前两百写字楼
      if (res.code == 20000) {
        let setData = res.data.rows;
        setData.forEach((item) => {
          item.showInfo = false;
        });
        this.buildMapData = setData;
      }
    });

    getBuilding({ type: 1, recommend: 1 }, { page: 1, size: 7 }).then((res) => {
      //优质写字楼
      if (res.code == 20000) {
        this.buildData1 = Object.freeze(res.data.rows);
      }
    });

    getBuilding({ type: 5, recommend: 1 }, { page: 1, size: 7 }).then((res) => {
      //优质园区
      if (res.code == 20000) {
        this.buildData2 = Object.freeze(res.data.rows);
      }
    });

    getBuilding({ type: 6, recommend: 1 }, { page: 1, size: 7 }).then((res) => {
      //优质联合办公
      if (res.code == 20000) {
        this.buildData3 = Object.freeze(res.data.rows);
      }
    });

    getBuilding({ hot: 1 }, { page: 1, size: 7 }).then((res) => {
      //热门楼宇
      localStorage.removeItem("hotBuildData");
      if (res.code == 20000) {
        this.hotBuildData = Object.freeze(res.data.rows);
        localStorage.setItem("hotBuildData", JSON.stringify(res.data.rows));
      }
    });

    getResource({ hot: 1 }, { page: 1, size: 5 }).then((res) => {
      localStorage.removeItem("hotHouseData");
      if (res.code == 20000) {
        this.hotHouseData = Object.freeze(res.data.rows);
        localStorage.setItem("hotHouseData", JSON.stringify(res.data.rows));
      }
    });
    getResource(
      {
        newest: 1, //最新
      },
      { page: 1, size: 5 }
    ).then((res) => {
      localStorage.removeItem("newHouseData");
      if (res.code == 20000) {
        this.newHouseData = res.data.rows;
        localStorage.setItem("newHouseData", JSON.stringify(res.data.rows));
      }
    });
  },
  methods: {
    searchChange1(index) {
      this.$router.push({
        name: "building",
        params: { activeName: "area", regionIndex: index },
      });
    },
    searchChange2(index) {
      this.$router.push({
        name: "building",
        params: { activeName: "metro", metroIndex: index },
      });
    },
    searchChange3(index) {
      this.$router.push({ name: "building", params: { zxIndex: index } });
    },
    searchChange4(index) {
      this.$router.push({ name: "building", params: { typeIndex: index } });
    },
    mouseover(index) {
      this.buildMapData[index].showInfo = true;
    },
    map_handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    toBuildList(item) {
      this.$router.push({ name: "building", params: { searchType: item } });
    },
    toSearch() {
      this.$router.push({
        name: "building",
        params: { searchKeyVal: this.searchKey },
      });
    },
    userSend() {
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if (!phoneReg.test(this.userPhone)) {
        this.$notify({
          title: "警告",
          message: "请正确填写手机号",
          type: "warning",
        });
        return;
      }
      if (!this.textarea) {
        this.$notify({
          title: "警告",
          message: "请填写需求内容",
          type: "warning",
        });
        return;
      }
      this.$notify({
        title: "成功",
        message: "请等待管理员给您致电",
        type: "success",
      });
    },
    toHouseDetails(id) {
      let routeData = this.$router.resolve({ path: `/houseDetails?id=${id}` });
      window.open(routeData.href, "_blank");
    },
    resourceMore() {
      this.$router.push({ name: "resource" });
    },
    goLookup(item, index) {
      //index 1:区域搜索 2：面积搜素
      this.$router.push({
        name: "building",
        params: { type: index, code: item.code },
      });
    },
    toDetails(id) {
      let routeData = this.$router.resolve({
        path: `./edificeDetails?id=${id}`,
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
<style lang="less" scoped>
//显示一行，超出省略号
.show-text-1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
#index-main {
  width: 100%;
  background: #f7f7f7;
  height: auto;
  font-size: 0;
  overflow: hidden;
}
#header-box {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  .bm-view {
    width: 100%;
    height: 100%;
  }
}
#swiper-inside-house {
  position: absolute;
  top: 50px;
  bottom: 50px;
  min-width: 1200px;
  width: 100%;
  z-index: 99;
  right: -50%;
  left: -50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  #inside-house-search {
    width: 1000px;
    height: 100px;
    // background: red;
    display: flex;
    justify-content: center;
    /deep/ .el-select .el-input {
      width: 90px;
      font-size: 16px;
    }
    /deep/ .input-with-select .el-input-group__prepend {
      background-color: #fff;
      font-size: 16px;
      height: 55px;
    }
    /deep/ .el-input__inner {
      height: 55px;
    }
    /deep/ .el-button {
      width: 120px;
      background: #ffb200;
      color: #333;
      height: 55px;
      font-size: 20px;
      font-weight: bold;
      &:hover {
        background: #ffb200;
      }
    }
    /deep/ .el-input-group {
      width: 600px;
      margin-left: 200px;
      height: 55px;
    }
  }
  #inside-house-box {
    flex: none;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px;
    border-radius: 5px;
    width: 310px;
    overflow: hidden;
    h3 {
      font-size: 20px;
      color: #fff;
      font-family: serif;
      margin-bottom: 10px;
    }
    .inside-house-item {
      display: flex;
      align-items: center;
      padding: 7px 0 7px 10px;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 3px 30px 5px rgba(255, 255, 255, 0.5);
      }
      img {
        width: 100px;
        height: 80px;
        object-fit: cover;
      }
      .house-item-info {
        margin-left: 10px;
        padding-right: 10px;
        p {
          margin: 15px 0;
        }
        .info-p1 {
          font-size: 16px;
          color: #fff;
        }
        .info-p2 {
          font-size: 16px;
          color: #aaa;
        }
      }
    }
  }
}
.el-carousel__item img {
  width: 100%;
  height: auto;
  min-height: 100%;
}
#header-con {
  height: 80px;
  width: 100%;
  // margin: auto;
  // position: absolute;
  // top: 0;
  // left: -50%;
  // right: -50%;
  // z-index: 10;
  #header-content {
    height: 100%;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #nav-logo {
      img {
        width: auto;
        height: 40px;
      }
    }
    #nav-data {
      display: flex;
      align-items: center;
      .nav-item {
        padding: 8px 22px;
        color: #fff;
        font-size: 18px;
        margin: 0 15px;
        font-weight: 500;
        border-radius: 20px;
        cursor: pointer;
        color: #333;
        &:hover {
          color: #fff;
          background-color: #ffb200;
        }
      }
    }
    #nav-phone {
      display: flex;
      align-items: center;
      cursor: pointer;
      i {
        margin-right: 8px;
        font-size: 22px;
        color: #ffb200;
      }
      span {
        font-size: 16px;
        color: #ffb200;
        font-weight: bold;
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
    min-height: 400px;
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
            color: #ffb200;
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
          &:hover {
            background: #efefef;
          }
        }
      }
    }
    #looking-btn {
      margin: 15px 30px;
      font-size: 14px;
      font-weight: 600;
      background: #ffb200;
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
.our-nice {
  width: 100%;
  // background: #fff;
  background: #000;
  .our-nice-box {
    width: 1200px;
    margin: 0 auto;
    padding: 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .our-nice-item {
      text-align: center;
      position: relative;
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50px;
        height: auto;
        margin-right: 10px;
      }
      .line {
        position: absolute;
        top: 50%;
        bottom: 50%;
        margin: auto;
        width: 1px;
        height: 20px;
        background-color: #c3c3c3;
        right: 0;
      }
      .our-nice-num {
        color: #ffb200;
        font-size: 30px;
        font-weight: 600;
      }
      .our-nice-title {
        // color: #333;
        color: #fff;
        font-size: 25px;
        font-weight: 600;
        margin-top: 5px;
      }
    }
  }

  ul {
    width: 1160px;
    height: 90px;
    margin: 0 auto;
    li {
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
      .line {
        width: 1px;
        height: 20px;
        background-color: #c3c3c3;
        float: right;
        margin-top: 35px;
      }
    }
    .fangyuan {
      text-indent: 50px;
      background: url("../assets/image/BannerItem1.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    }
    .yongjin {
      text-indent: 43px;
      background: url("../assets/image/BannerItem2.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    }
    .kanfang {
      text-indent: 43px;

      background: url("../assets/image/BannerItem3.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    }
    .fuwu {
      text-indent: 85px;

      background: url("../assets/image/BannerItem4.png") 80px 28px no-repeat;
      background-size: 32px 32px;
    }
  }
}
#hot-work-area{
  width: 1200px;
  margin: 80px auto 0;
  #hot-work-title{
    text-align: center;
    h3{
      font-size: 34px;
      letter-spacing: 2px;
      margin-bottom: 3px;
      color: #333;
      font-weight: bold;
    }
    p{
      font-size: 14px;
      margin-top: 10px;
    }
  }
  #hot-work-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 50px;
    .hot-work-item{
      width: 392px;
      height: 260px;
      position: relative;
      overflow: hidden;
      margin-bottom: 12px;
      cursor: pointer;
      &:hover{
          img{
            transform:scale(1.1);
            transition: all 0.4s;
          }
        }
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
            transition: all 0.4s;
      }
      .work-item-name{
        width: 100%;
        text-align: center;
        font-size: 26px;
        color: #FFF;
        position: absolute;
        left:0;
        top: 50%;
        bottom: 50%;
        margin: auto;
        font-weight: bold;
      }
      .work-item-info{
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        font-size: 14px;
        color: #FFF;
        line-height: 22px;
        padding: 10px 20px;
        background: rgba(0,0,0,.35);
      }
    }
  }
}
#hot-area {
  width: 1200px;
  margin: 50px auto 0;
  padding: 0 30px;
  #hot-area-title {
    margin-bottom: 30px;
    font-size: 34px;
    font-weight: 700;
    text-shadow: 1px 1px 0 #fff;
  }
  #hot-build-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    .build-city {
      width: 274px;
      background-color: #fff;
      border-radius: 0 0 4px 4px;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      position: relative;
      height: 364px;
      overflow: hidden;
      margin-bottom: 15px;
      &:hover {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
        box-shadow: 0 24px 40px -24px rgba(0, 0, 0, 0.1);
        .build-info-bot {
          background: #ffb200;
          transition: all 0.3s;
          h3 {
            color: #fff;
            transition: all 0.3s;
          }
          .build-info-bot-m {
            .info-addr {
              i {
                color: #fff;
                transition: all 0.3s;
              }
              .build-info-addr {
                color: #fff;
                transition: all 0.3s;
              }
            }
            .build-info-price {
              color: #fff;
              transition: all 0.3s;
            }
          }
        }
      }
      img {
        width: 100%;
        height: 268px;
        object-fit: cover;
        display: block;
      }
      .build-info-bot {
        padding: 23px 17px;
        color: #333;
        width: 100%;
        font-size: 14px;
        transition: all 0.3s;
        h3 {
          flex: none;
          font-size: 16px;
          font-weight: 700;
          width: 100%;
          line-height: 30px;
          .show-text-1;
        }
        .build-info-bot-m {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .info-addr {
            display: flex;
            align-items: center;
            i {
              font-size: 20px;
              color: #aaa;
            }
            .build-info-addr {
              font-size: 14px;
              width: 100px;
              height: 100%;
              display: block;
              color: #aaa;
              .show-text-1;
            }
          }
          .build-info-price {
            // width: 80px;
            font-size: 14px;
          }
          span {
            font-size: 22px;
            margin-right: 5px;
            color: red;
            font-weight: bold;
          }
        }
      }
      .build-info-tag {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 100%;
        padding: 0 15px;
        display: flex;
        align-items: center;
        .build-tag-item {
          border-radius: 10px;
          font-size: 12px;
          padding: 4px 10px;
          margin-right: 10px;
          color: #fff;
          &:nth-child(1) {
            background: #ffb200;
          }
          &:nth-child(2) {
            background: #02a7f0;
          }
          &:nth-child(3) {
            background: indianred;
          }
          &:nth-child(4) {
            background: cornflowerblue;
          }
          &:nth-child(5) {
            background: darkseagreen;
          }
          &:nth-child(6) {
            background: #02a7f0;
          }
        }
      }
    }
    .more-city {
      width: 274px;
      border-radius: 0 0 4px 4px;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      height: 364px;
      overflow: hidden;
      margin-bottom: 15px;
      background: #ffb200;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        // -webkit-transform: translateY(-5px);
        // transform: translateY(-5px);
        // box-shadow: 0 24px 40px -24px rgba(0, 0, 0, 0.1);
        .more-city-info {
          button {
            color: #ffb200;
            background: #fff;
          }
        }
      }
      .more-city-info {
        text-align: center;
        font-size: 14px;
        color: #fff;
        div {
          text-align: center;
          font-size: 20px;
          line-height: 30px;
          color: #fff;
          margin-bottom: 20px;
        }
        button {
          display: block;
          margin: 0 auto;
          width: 130px;
          height: 40px;
          border: 1px solid #fff;
          color: #fff;
          border-radius: 5px;
          background: #ffb200;
          transition: background 0.2s linear;
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
  }
}
#recommend-area {
  width: 1200px;
  margin: 80px auto 0;
  padding: 0 30px;
  #recommend-area-title {
    font-size: 34px;
    color: #333;
    font-weight: bold;
    margin-bottom: 30px;
    text-shadow: 1px 1px 0 #fff;
  }
  // #recommend-area-content {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   flex-wrap: wrap;
  //   .recommend-city {
  //     width: 365px;
  //     height: 270px;
  //     margin-bottom: 20px;
  //     border-radius: 5px;
  //     overflow: hidden;
  //     transition: all 0.2s;
  //     cursor: pointer;
  //     &:hover {
  //       transform: scale(1.02);
  //       box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  //       transition: all 0.2s;
  //     }
  //     .recommend-city-img {
  //       width: 100%;
  //       height: 225px;
  //       overflow: hidden;
  //       img {
  //         width: 100%;
  //         height: 100%;
  //         object-fit: cover;
  //       }
  //     }
  //     .recommend-city-info {
  //       // height: 65px;
  //       background: #fff;
  //       text-align: center;
  //       overflow: hidden;
  //       .recommend-city-title {
  //         height: 30px;
  //         line-height: 30px;
  //         font-size: 20px;
  //         color: #353535;
  //         margin: 8px 0;
  //       }
  //       .recommend-city-text {
  //         color: #b2b2b2;
  //         font-size: 14px;
  //       }
  //     }
  //   }
  //   .more-ciry {
  //     background: #ffb200;
  //     text-align: center;
  //     &:hover {
  //       transform: scale(1);
  //       box-shadow: 0;
  //     }
  //     .more-text1 {
  //       width: 100%;
  //       font-size: 30px;
  //       color: #fff;
  //       margin-top: 70px;
  //     }
  //     .more-text2 {
  //       width: 100%;

  //       font-size: 20px;
  //       height: 30px;
  //       line-height: 30px;
  //       margin-bottom: 10px;
  //       color: #fff;
  //     }
  //     .more-btn {
  //       display: block;
  //       margin: 0 auto;
  //       width: 130px;
  //       height: 40px;
  //       border: 1px solid #fff;
  //       text-align: center;
  //       line-height: 39px;
  //       color: #fff;
  //       border-radius: 5px;
  //       background: #ffb200;
  //       transition: background 0.2s linear;
  //       cursor: pointer;
  //       font-size: 14px;
  //       color: #fff;
  //       &:hover {
  //         background: #fff;
  //         color: #ffb200;
  //       }
  //     }
  //   }
  // }
  #recommend-area-content {
    display: flex;
    #recommend-house1 {
      width: 400px;
      height: 500px;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .recommend-house1-info {
        position: absolute;
        height: 470px;
        width: 350px;
        background: rgba(0, 0, 0, 0.3);
        left: 15px;
        top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        .recommend-house1-title {
          width: 100%;
          font-size: 20px;
          color: #fff;
          text-align: center;
          margin-bottom: 20px;
        }
        .recommend-house1-lookUp {
          border-radius: 10px;
          width: 120px;
          height: 45px;
          text-align: center;
          font-size: 16px;
          border: solid 1px #fff;
          margin: 0 auto 20px;
          color: #fff;
          line-height: 45px;
          cursor: pointer;
          &:hover {
            background: #ffb200;
            color: #fff;
          }
        }
      }
    }
    #recommend-house-r {
      width: 800px;
      height: 500px;
      display: flex;
      // align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-left: 20px;
      .recommend-house-item {
        width: 360px;
        height: 240px;
        // margin: 7.5px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 20px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .recommend-house-item-info {
          position: absolute;
          height: 197px;
          width: 327px;
          background: rgba(0, 0, 0, 0.2);
          left: 15px;
          top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          .recommend-house-item-title {
            width: 100%;
            font-size: 20px;
            color: #fff;
            text-align: center;
            margin-bottom: 20px;
          }
          .recommend-house-item-lookUp {
            border-radius: 10px;
            width: 120px;
            height: 45px;
            text-align: center;
            font-size: 16px;
            border: solid 1px #fff;
            margin: 0 auto 20px;
            color: #fff;
            line-height: 45px;
            cursor: pointer;
            &:hover {
              background: #ffb200;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
#business-info-box {
  width: 100%;
  margin: 50px auto;
  font-size: 0;
  // border-top: solid 1px #333;
  // border-bottom: solid 1px #333;
  background: #fff;
  padding: 30px 0;
  #business-info-in {
    width: 1200px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .business-item {
      text-align: center;
      padding: 0 50px;
      h3 {
        font-size: 25px;
        color: #333;
      }
      div {
        font-size: 14px;
        color: #888;
        margin-top: 5px;
      }
    }
  }
}
#contact-me-box {
  width: 1200px;
  margin: 0 auto 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
  padding: 30px;
  #contact-me-input {
    width: 500px;
    height: 300px;
    h3 {
      font-size: 25px;
      color: #fff;
    }
    #userPhone {
      margin-top: 50px;
    }
    #userTextArea {
      margin-top: 20px;
    }
    #userBtn {
      margin-top: 30px;
      text-align: center;
      /deep/ button {
        width: 250px;
        height: 50px;
        background-color: #ffb200;
        font-size: 16px;
      }
    }
  }
  #contact-me-img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
}
/deep/ .el-input-group__append {
  border: none;
  border-radius: 0 5px 5px 0;
  background: none;
  overflow: hidden;
  /deep/ .el-button {
    border-radius: 0 5px 5px 0;
  }
}
.markerInfo {
  width: 100%;
  height: 120px;
  cursor: pointer;

  img {
    height: 100%;
    width: 160px;
    margin-right: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .markerInfo-text {
    display: inline-block;
    width: calc(100% - 190px);
    vertical-align: middle;
    h3 {
      font-size: 16px;
      line-height: 18px;
      height: 18px;
      font-weight: bold;
      color: #000;
      padding-right: 20px;
      margin-bottom: 5px;
      .show-text-1;
      &:hover {
        text-decoration: underline;
      }
    }
    div {
      font-size: 14px;
      color: #888;
      .show-text-1;
      margin-bottom: 5px;
    }
    p {
      display: block;
      font-size: 14px;
      color: #fabe0f;
      .show-text-1;
    }
  }
}
.inside-search {
  position: absolute;
  width: 1125px;
  height: 100px;
  bottom: 100px;
  left: -50%;
  right: -50%;
  margin: 0 auto;
  z-index: 999;
  .search-box {
    background: #fff;
    height: 60px;
    border-radius: 30px;
    border: 1px solid #ffb200;
    box-shadow: 10px 10px 20px 0px rgba(17, 17, 17, 0.3);
    padding: 6px;
    display: flex;
    align-items: center;
    .srarch-tabs {
      width: 120px;
      height: 100%;
      border-radius: 24px 0 0 24px;
      background-color: #ffb200;
      color: #fff;
      font-size: 16px;
      line-height: 48px;
      text-align: center;
    }
    .search-line {
      width: 2px;
      height: 31px;
      background-color: #c1c5c8;
      margin-left: 18px;
    }
    /deep/ .search-input {
      width: 700px;
      margin-left: 5px;
      overflow: hidden;
      i {
        font-size: 20px;
      }
      input {
        border: none;
        margin-left: 10px;
        font-size: 16px;
        color: #888;
      }
    }
    .search-btn {
      margin-left: 5px;
      width: 260px;
      height: 100%;
      border-radius: 24px;
      background-color: #ffb200;
      border: none;
      text-align: center;
      font-size: 18px;
      line-height: 48px;
      color: #fff;
      cursor: pointer;
    }
  }
  .search-sx {
    margin-top: 16px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .sx-item {
      /deep/ input {
        border: none;
        background-color: #000;
        border-radius: 21px;
        font-size: 14px;
        padding-left: 25px;
        color: #fff;
      }
    }
  }
}
</style>
