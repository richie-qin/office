<template>
  <!-- 房源 -->
  <div id="build">
    <search-nav @searchKey="searchKey"></search-nav>
    <div id="search-nav-right">
      <el-input
        placeholder="请输入房源名称"
        v-model="searchMap.house_title"
        :clearable="true"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchKey"
        ></el-button>
      </el-input>
    </div>
    <div id="search-box">
      <div id="search-box-content">
        <div id="search-item-wz">
          <div id="wz-title">
            <span class="item-title">位置</span>
            <div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="区域" name="area">区域</el-tab-pane>
                <el-tab-pane label="地铁(1号线)" name="metro"
                  >地铁(1号线)</el-tab-pane
                >
              </el-tabs>
            </div>
          </div>
          <div id="wx-content1" v-show="activeName == 'area'">
            <div
              class="wz-region-item"
              v-for="(item, index) in regionList"
              :key="index"
              @click="clickRegion(index)"
              :class="{ 'activityData-i': regionIndex == index }"
            >
              {{ item.name }}
            </div>
          </div>
          <div id="wx-content2" v-show="activeName == 'metro'">
            <div
              class="wz-region-item"
              v-for="(item, index) in metroList"
              :key="index"
              @click="clickRegion(index)"
              :class="{ 'activityData-i': regionIndex == index }"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div id="search-item-zx">
          <div class="item-title">单价</div>
          <div>
            <el-radio-group v-model="priceIndex" @change="clickPrice">
              <el-radio
                v-for="(item, index) in priceList"
                :key="index"
                :class="{ 'activityData-i': priceIndex == index }"
                :label="index"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <div id="search-item-lx">
          <div class="item-title">面积</div>
          <div>
            <el-radio-group v-model="areaIndex" @change="clickArea">
              <el-radio
                v-for="(item, index) in areaList"
                :key="index"
                :class="{ 'activityData-i': areaIndex == index }"
                :label="index"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div id="content-box">
      <div id="content-left-box">
        <div id="data-list-type">
          <div
            class="data-list-type-item"
            :class="{ 'act-type-item': moldIndex == 0 }"
            @click="changeMold(0)"
          >
            全部
          </div>
          <div
            class="data-list-type-item"
            :class="{ 'act-type-item': moldIndex == 1 }"
            @click="changeMold(1)"
          >
            推荐
          </div>
          <div
            class="data-list-type-item"
            :class="{ 'act-type-item': moldIndex == 2 }"
            @click="changeMold(2)"
          >
            最新
          </div>
          <div
            class="data-list-type-item"
            :class="{ 'act-type-item': moldIndex == 3 }"
            @click="changeMold(3)"
          >
            热门
          </div>
          <div id="data-num">共{{ allNum }}套房源</div>
        </div>
        <div v-show="dataList.length > 0" id="haveList">
          <house
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></house>
        </div>
        <div v-show="dataList.length == 0" id="noneList">
          暂无数据~
        </div>
        <div id="data-pagination" v-show="allNum > size">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :page-size="size"
            :total="allNum"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
      <div id="content-right-box">
        <div id="poster-map" @click="$router.push('/mapLookup')">
          <h3>地图找房</h3>
          <div>
            <p>合肥写字楼</p>
          </div>
        </div>
        <div id="poster-hot-house">
          <h3>热点房源</h3>
          <div
            id="hot-house-item"
            @click="toDetails(item.id)"
            v-for="(item, index) in hotHouseData"
            :key="index"
          >
            <img :src="item.main_pic" alt />
            <div>
              <p>{{ item.house_title }}</p>
              <p v-show="item.month_rent">
                {{ item.month_rent | priceF }}元/m²/天
              </p>
              <p v-show="item.renovation">{{ item.renovation }}</p>
            </div>
          </div>
        </div>
        <div id="poster-entrust">
          <h3>委托找房</h3>
          <div id="poster-entrust-text1">10分钟快速响应</div>
          <div id="poster-entrust-btn" @click="$router.push('./entrust')">
            立即委托
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import house from "../components/house";
import { getResource } from "../api/index";

export default {
  components: { house },
  data() {
    return {
      regionIndex: 0, //选择区域index
      areaIndex: 0, //选择面积index
      priceIndex: 0, //选择单价index
      moldIndex: 0, //选择最新或最热
      money1: "",
      money2: "",
      area1: "",
      area2: "",
      checkList: [],
      searchMap: {
        county: "全部", //区域搜索
        renovation: null, //装修
        end: "", //截止面积
        start: "", //开始面积
        house_title: "", //搜索名字
        type: null,
        hot: null, //最热
        newest: null, //最新
        recommend: null, //推荐
      },
      dataList: [],
      allNum: 0,
      page: 1,
      size: 8,
      hotHouseData: [],
      activeName: "area", //area  metro
    };
  },
  computed: {
    metroList() {
      return this.$store.state.metroList;
    },
    regionList() {
      //区域列表
      return this.$store.state.regionList;
    },
    areaList() {
      //面积列表
      return this.$store.state.areaList;
    },
    priceList() {
      //面积列表
      return this.$store.state.priceList;
    },
  },
  created() {
    this.$store.commit("actNav", 3);
    if (this.$route.params.type == 1) {
      //1:区域搜索
      this.regionList.forEach((item, index) => {
        if (item.code == this.$route.params.code) {
          this.searchMap.county = item.name;
          this.regionIndex = index;
          return;
        }
      });
    } else if (this.$route.params.type == 2) {
      //2：面积搜索
      this.areaList.forEach((item, index) => {
        if (item.code == this.$route.params.code) {
          this.searchMap.start = item.start;
          this.searchMap.end = item.end;
          this.areaIndex = index;
          return;
        }
      });
    }
    if (localStorage.getItem("hotHouseData")) {
      this.hotHouseData = JSON.parse(localStorage.getItem("hotHouseData"));
    }
    if(this.$route.params.searchKey){
      this.searchMap.house_title = this.$route.params.searchKey
    }
    this.getResource();
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    toDetails(id) {
      let routeData = this.$router.resolve({ path: `./houseDetails?id=${id}` });
      window.open(routeData.href, "_blank");
    },
    changeMold(index) {
      //选择最新最热
      this.moldIndex = index;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      if (index == 1) {
        this.searchMap.recommend = 1;
      } else if (index == 2) {
        this.searchMap.newest = 1;
      } else if (index == 3) {
        this.searchMap.hot = 1;
      }
      this.getResource();
    },
    choisePrice() {
      //选择面积
      this.priceList.forEach((item, index) => {
        if (item.start == this.money1 && item.end == this.money2) {
          this.clickPrice(index);
          return;
        }
      });
      if (this.money1 > -1 && this.money2 > this.money1) {
        this.page = 1; //恢复页码
        this.searchMap.start = this.money1;
        this.searchMap.end = this.money2;
        this.getResource();
      } else {
        console.log("请正确输入信息");
      }
    },
    choiseArea() {
      //选择面积
      this.areaList.forEach((item, index) => {
        if (item.start == this.area1 && item.end == this.area2) {
          this.clickArea(index);
          return;
        }
      });
      if (this.area1 > -1 && this.area2 > this.area1) {
        this.page = 1; //恢复页码
        this.searchMap.start = this.area1;
        this.searchMap.end = this.area2;
        this.getResource();
      } else {
        console.log("请正确输入信息");
      }
    },
    searchKey() {
      //搜索
      this.regionIndex = -1;
      this.areaIndex = -1;
      this.page = 1;
      (this.county = ""), //区域搜索
        (this.end = ""), //截止面积
        (this.start = ""), //开始面积
        this.getResource();
    },
    clickRegion(index) {
      //点击区域
      this.regionIndex = index;
      this.moldIndex = 0;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      this.page = 1; //恢复页码
      this.searchMap.county = this.regionList[index].name;
      this.getResource();
    },
    clickPrice(index) {
      //点击单价
      this.money1 = "";
      this.money2 = "";
      this.priceIndex = index;
      this.moldIndex = 0;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      this.page = 1; //恢复页码
      if (index == 0) {
        this.searchMap.month_price_start = "";
        this.searchMap.month_price_end = "";
      } else {
        this.searchMap.month_price_start = this.priceList[index].start;
        this.searchMap.month_price_end = this.priceList[index].end;
      }
      this.getResource();
    },
    clickArea(index) {
      //点击面积
      this.area1 = "";
      this.area2 = "";
      this.areaIndex = index;
      this.moldIndex = 0;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      this.page = 1; //恢复页码
      if (index == 0) {
        this.searchMap.start = "";
        this.searchMap.end = "";
      } else {
        this.searchMap.start = this.areaList[index].start;
        this.searchMap.end = this.areaList[index].end;
      }
      this.getResource();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getResource();
    },
    getResource() {
      getResource(this.searchMap, { page: this.page, size: this.size }).then(
        (res) => {
          if (res.code == 20000) {
            this.dataList = res.data.rows;
            this.allNum = res.data.total;
          }
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
#build {
  width: 100%;
  background: #fff;
}
#search-nav-right {
  width: 1200px;
  margin: 50px auto;
  height: 45px;
  /deep/ .el-input__inner {
    width: 500px;
    height: 50px;
    border: none;
    background: #eee;
  }
  /deep/ .el-input {
    width: 500px;
    height: 45px;
    font-size: 16px;
  }
  /deep/ .el-button {
    color: #888;
    font-size: 20px;
    width: 80px;
    height: 48px;
    color: #fff;
    font-weight: bold;
    background: #17A1E6;
  }
}
#search-box {
  background-color: #f5f5f5;
  padding-top: 24px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 35px;
  #search-box-content {
    width: 1200px;
    margin: 0 auto;
    .item-title {
      width: 70px;
      font-size: 14px;
      color: #333;
    }
    /deep/ .el-radio__label {
      color: #000;
    }
    .activityData-i {
      color: #17A1E6;
    }
    #search-item-wz {
      margin-bottom: 20px;
      border-bottom: solid 1px #ddd;

      #wz-title {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333;
        /deep/ .el-tabs__header {
          margin: 0;
        }
      }
      #wx-content1 {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px 0 10px 70px;

        .wz-region-item {
          font-size: 14px;
          cursor: pointer;
          margin: 5px 40px 10px 0;
        }
      }
      #wx-content2 {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px 0 10px 70px;

        .wz-region-item {
          font-size: 14px;
          cursor: pointer;
          margin: 5px 40px 10px 0;
        }
      }
    }
    #search-item-zx {
      display: flex;
      margin-bottom: 15px;
      color: #333;
    }
    #search-item-lx {
      display: flex;
      margin-bottom: 15px;
    }
  }
}
/deep/ .el-radio{
  margin-right: 40px;
}
#content-box {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  #content-left-box {
    width: 860px;
    #data-list-type {
      height: 50px;
      border-bottom: 2px solid #17a1e6;
      margin: 20px;

      .data-list-type-item {
        padding: 0 25px;
        line-height: 50px;
        font-size: 14px;
        display: inline-block;
        cursor: pointer;
        &:hover {
          // color: #17a1e6;
        }
      }
      .act-type-item {
        background: #17a1e6;
        color: #fff;
        font-weight: bold;
      }
      #data-num {
        float: right;
        font-size: 14px;
        line-height: 50px;
      }
    }
    #haveList {
      margin-bottom: 30px;
    }
    #noneList {
      height: 300px;
      line-height: 300px;
      font-size: 20px;
      color: #888;
      text-align: center;
    }
    #data-pagination {
      text-align: right;
      margin: 30px 0 40px 0;
    }
  }
  #content-right-box {
    width: 250px;
    #poster-map {
      padding: 0 0 30px 0;
      margin: 0 0 30px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      h3 {
        margin: 0 0 15px 0;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.71;
        color: #000;
        font-size: 14px;
        font-weight: 600;
      }
      div {
        position: relative;
        width: 250px;
        height: 100px;
        border-radius: 4px;
        background: url(../assets/image/side_bg_mapsearch.png) no-repeat 0 0;
        background-size: 100%;
        cursor: pointer;
        p {
          padding: 40px 0 0 70px;
          line-height: 24px;
          font-size: 14px;
        }
      }
    }
    #poster-hot-house {
      padding: 0 0 10px 0;
      margin: 0 0 30px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      h3 {
        margin: 0 0 15px 0;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.71;
        color: #000;
        font-size: 14px;
        font-weight: 600;
      }
      #hot-house-item {
        display: flex;
        align-items: center;
        margin: 0 0 20px 0;
        padding: 10px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
        img {
          width: 96px;
          height: 60px;
          border-radius: 4px;
        }
        div {
          margin-left: 10px;
          p {
            &:nth-child(1) {
              font-size: 14px;
              height: 20px;
              line-height: 20px;
              margin: 0 0 1px 0;
              color: #000;
            }
            &:nth-child(2) {
              margin-top: 3px;
              height: 17px;
              line-height: 17px;
              font-size: 12px;
              color: #cc2929;
            }
            &:nth-child(3) {
              margin-top: 3px;
              height: 17px;
              line-height: 17px;
              margin: 2px 0 0 0;
              font-size: 12px;
              color: #b2b2b2;
            }
          }
        }
      }
    }
    #poster-entrust {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 30px;
      h3 {
        margin: 0 0 15px 0;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.71;
        color: #000;
        font-size: 14px;
        font-weight: 600;
      }
      #poster-entrust-text1 {
        margin-top: -23px;
        margin-bottom: 5px;
        padding: 10px 0;
        color: #b2b2b2;
        font-size: 12px;
      }
      #poster-entrust-btn {
        width: 260px;
        height: 48px;
        line-height: 48px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        background: #17a1e6;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
