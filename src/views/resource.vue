<template>
  <!-- 房源 -->
  <div id="build">
    <search-nav @searchKey="searchKey"></search-nav>
    <div id="search-box">
      <div class="search-item">
        <div class="search-item-type">区域：</div>
        <div class="search-item-data">
          <div
            class="search-item-data-i"
            v-for="(item, index) in regionList"
            :key="index"
            @click="clickRegion(index)"
            :class="{ 'activityData-i': regionIndex == index }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="search-item">
        <div class="search-item-type">单价：</div>
        <div class="search-item-data">
          <div class="search-item-data-i" v-for="(item, index) in priceList"
            :key="index"
            @click="clickPrice(index)"
            :class="{ 'activityData-i': priceIndex == index }">{{item.name}}</div>
          <div class="search-item-input-box">
            <input
              type="text"
              maxlength="5"
              autocomplete="off"
              v-model="money1"
            />
            <span>-</span>
            <input
              type="text"
              maxlength="5"
              autocomplete="off"
              v-model="money2"
            />
            万
            <button @click="choisePrice">确定</button>
          </div>
        </div>
      </div>
      <div class="search-item">
        <div class="search-item-type">面积：</div>
        <div class="search-item-data">
          <div
            class="search-item-data-i"
            v-for="(item, index) in areaList"
            :key="index"
            @click="clickArea(index)"
            :class="{ 'activityData-i': areaIndex == index }"
          >
            {{ item.name }}
          </div>
          <div class="search-item-input-box">
            <input
              type="text"
              maxlength="5"
              autocomplete="off"
              v-model="area1"
            />
            <span>-</span>
            <input
              type="text"
              maxlength="5"
              autocomplete="off"
              v-model="area2"
            />
            ㎡
            <button @click="choiseArea">确定</button>
          </div>
        </div>
      </div>
      <!-- <div class="search-item">
        <div class="search-item-type">房源名称：</div>
        <div class="search-item-data">
          <el-input placeholder="请输入内容" v-model="input5">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div> -->
    </div>
    <div id="content-box">
      <div id="content-left-box">
        <div id="data-list-type">
          <div
            class="data-list-type-item"
            :class="{ 'act-type-item': moldIndex == 0 }"
            @click="changeMold(0)"
          >
            全部房源
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
          <house v-for="(item,index) in dataList" :key="index" :data="item"></house>
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
          <h3>热点楼盘</h3>
          <div id="hot-house-item" @click="toDetails(item.id)"  v-for="(item,index) in hotBuildData" :key="index">
            <img
              :src="item.image[0]"
              alt
            />
            <div>
              <p>{{item.bname}}</p>
              <p v-show="item.price">{{item.price | priceF}}元/m²/天</p>
              <p v-show="item.renovation">{{item.renovation}}</p>
            </div>
          </div>
        </div>
        <div id="poster-entrust">
          <h3>委托找房</h3>
          <div id="poster-entrust-text1">10分钟快速响应</div>
          <div id="poster-entrust-btn" @click="$router.push('./entrust')">立即委托</div>
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
        renovation:null,//装修
        end: "", //截止面积
        start: "", //开始面积
        bname: "", //搜索名字
        type: null,
        hot: null, //最热
        newest: null, //最新
        recommend: null //推荐
      },
      dataList: [],
      allNum: 0,
      page: 1,
      size: 8,
      hotBuildData:[],

    };
  },
  computed: {
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
    if(localStorage.getItem("hotBuildData")){
      this.hotBuildData = JSON.parse(localStorage.getItem("hotBuildData"));
    }
    this.getResource();
  },
  methods: {
    toDetails(id) {
      let routeData = this.$router.resolve({path:`./edificeDetails?id=${id}`});
      window.open(routeData.href, '_blank');
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
    choisePrice(){
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
    searchKey(key) {
      //搜索
      console.log("搜索key", key);
      this.searchMap.bname = key;
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
      this.page = 1; //恢复页码
      this.searchMap.county = this.regionList[index].name;
      this.getResource();
    },
    clickPrice(index){
      //点击单价
      this.money1 = "";
      this.money2 = "";
      this.priceIndex = index;
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
#search-box {
  width: 1200px;
  background: #fff;
  border: solid 1px #ddd;
  margin: 30px auto;
  padding: 5px 10px;
  .search-item {
    display: flex;
    align-items: center;
    // height: 28px;
    line-height: 35px;
    border-bottom: dashed 1px #aaa;
    padding: 10px 5px;
    &:last-child {
      border-bottom: none;
    }
    .search-item-type {
      font-size: 14px;
      color: #999;
      flex: none;
    }
    .search-item-data {
      display: flex;
      align-items: center;
      padding-left: 20px;
      flex-wrap: wrap;
      /deep/ .el-checkbox-group {
        display: flex;
        align-items: center;
      }
      .search-item-data-i {
        font-size: 13px;
        color: #333;
        cursor: pointer;
        margin-right: 15px;
        &:hover {
          color: #cc2929;
        }
      }
      .activityData-i {
        color: #cc2929;
      }
      .search-item-input-box {
        font-size: 12px;
        span {
          color: #888;
          margin: 0 5px;
        }
        input {
          display: inline-block;
          border: 1px solid #cccccc;
          border-radius: 3px;
          height: 16px;
          line-height: 16px;
          padding: 0 3px;
          text-align: center;
          margin: -4px 0px 0px 0px;
          margin-top: 0px;
          width: 35px;
          font-size: 12px;
          outline: none;
          text-align: center;
        }
        button {
          width: 40px;
          height: 22px;
          margin-left: 3px;
          color: #333333;
          cursor: pointer;
          border: 1px solid #cccccc;
          background-color: #f6f6f6;
          font-size: 12px;
          margin-left: 15px;
        }
      }
    }
  }
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
        padding: 10px ;
        cursor: pointer;
        &:hover{
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
