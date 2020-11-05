<template>
  <!-- 楼宇 -->
  <div id="build">
    <search-nav></search-nav>
    <div id="search-nav-right">
      <el-input
        placeholder="请输入大厦名称"
        v-model="searchKeyVal"
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
          <div class="item-title">装修</div>
          <div>
            <el-radio-group v-model="zxIndex" @change="clickBuildZX">
              <el-radio
                v-for="(item, index) in renovationList"
                :key="index"
                :class="{ 'activityData-i': zxIndex == index }"
                :label="index"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <div id="search-item-lx">
          <div class="item-title">类型</div>
          <div>
            <el-radio-group v-model="typeIndex" @change="clickBuildType">
              <el-radio
                v-for="(item, index) in buildList"
                :key="index"
                :class="{ 'activityData-i': typeIndex == index }"
                :label="index"
                >{{ item.label }}</el-radio
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
          <buildItem
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></buildItem>
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
          <div
            id="hot-house-item"
            @click="toDetails(item.id)"
            v-for="(item, index) in hotBuildData.slice(0,4)"
            :key="index"
          >
            <img :src="item.main_pic" alt />
            <div>
              <p>{{ item.bname }}</p>
              <p v-show="item.price">{{ item.price | priceF }}元/m²/天</p>
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
import build from "../components/build";
import { getBuilding } from "../api/index";

export default {
  components: { buildItem: build },
  data() {
    return {
      regionIndex: 0, //选择区域index
      areaIndex: 0, //选择面积index
      zxIndex: 0, //选择装修
      typeIndex: 0, //选择类型
      moldIndex: 0, //选择最新或最热
      money1: "",
      money2: "",
      checkList: [],
      searchMap: {
        county: "全部", //区域搜索
        renovation: null, //装修
        end: "", //截止面积
        start: "", //开始面积
        bname: "", //搜索名字
        type: null,
        hot: null, //最热
        newest: null, //最新
        recommend: null, //推荐
      },
      dataList: [],
      allNum: 0,
      page: 1,
      size: 8,
      hotBuildData: [],
      searchKeyVal: "",
      activeName: "area", //area  metro
    };
  },
  computed: {
    regionList() {
      //区域列表
      return this.$store.state.regionList;
    },
    metroList() {
      return this.$store.state.metroList;
    },
    areaList() {
      //面积列表
      return this.$store.state.areaList;
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
    this.$store.commit("actNav", 2);
    let searchType = this.$route.params.searchType;
    if(searchType==1){//优质写字楼
    this.searchMap.type = "写字楼"
    this.searchMap.recommend = 1;
    this.typeIndex = 1;
    this.moldIndex = 1;
    }else if(searchType==2){//优质园区
    this.searchMap.type = "园区"
    this.searchMap.recommend = 1;
    this.typeIndex = 5;
    this.moldIndex = 1;
    }else if(searchType==3){//优质联合办公
    this.searchMap.type = "联合办公"
    this.searchMap.recommend = 1;
    this.typeIndex = 6;
    this.moldIndex = 1;
    }else if(searchType==4){//热门楼宇
      this.searchMap.hot = 1;
      this.moldIndex = 3;
    }
    
    if (localStorage.getItem("hotBuildData")) {
      this.hotBuildData = JSON.parse(localStorage.getItem("hotBuildData"));
    }
    this.getBuilding();
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    toDetails(id) {
      let routeData = this.$router.resolve({
        path: `./edificeDetails?id=${id}`,
      });
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
      this.getBuilding();
    },
    searchKey() {
      //搜索
      this.searchMap.bname = this.searchKeyVal;
      this.regionIndex = 0;
      this.areaIndex = 0;
      this.page = 1;
      (this.searchMap.county = ""), //区域搜索
        (this.searchMap.end = ""), //截止面积
        (this.searchMap.start = ""), //开始面积
        this.getBuilding();
    },
    clickBuildZX(index) {
      // 点击装修
      this.zxIndex = index;
      this.page = 1; //恢复页码
      this.moldIndex = 0;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      if (index == 0) {
        this.searchMap.renovation = null;
      } else {
        this.searchMap.renovation = this.renovationList[index].label;
      }
      this.getBuilding();
    },
    clickBuildType(index) {
      // 点击类型
      this.typeIndex = index;
      this.page = 1; //恢复页码
      this.moldIndex = 0;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      if (index == 0) {
        this.searchMap.type = null;
      } else {
        this.searchMap.type = this.buildList[index].value;
      }
      this.getBuilding();
    },
    clickRegion(index) {
      //点击区域
      this.regionIndex = index;
      this.page = 1; //恢复页码
      this.searchMap.county = this.regionList[index].name;
      this.moldIndex = 0;
      this.searchMap.hot = null;
      this.searchMap.newest = null;
      this.searchMap.recommend = null;
      this.getBuilding();
    },
    clickArea(index) {
      //点击面积
      this.areaIndex = index;
      this.page = 1; //恢复页码
      // this.searchMap.county = this.regionList[index].name;
      if (index == 0) {
        this.searchMap.start = "";
        this.searchMap.end = "";
      } else {
        this.searchMap.start = this.areaList[index].start;
        this.searchMap.end = this.areaList[index].end;
      }
      this.getBuilding();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getBuilding();
    },
    getBuilding() {
      getBuilding(this.searchMap, { page: this.page, size: this.size }).then(
        (res) => {
          if (res.code == 20000) {
            this.dataList = Object.freeze(res.data.rows);
            this.allNum = res.data.total;
          }
        }
      );
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
/deep/ .el-radio{
  margin-right: 40px;
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
    /deep/ .el-radio__label{
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
        // &:hover {
        //   color: #17a1e6;
        // }
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
      cursor: pointer;
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
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 0 0 20px 0;
        padding: 10px;
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
          width: 122px;
          p {
            .show-text-1;
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
