<template>
  <!-- 地图找房 -->
  <div id="mapLookup">
    <search-nav></search-nav>
    <div id="center-box">
      <div id="search-box">
        <div id="srarch-content">
          <el-input
            placeholder="请输入内容"
            v-model="searchKey"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="楼宇" value="1"></el-option>
              <el-option label="房源" value="2"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchBtn"
            ></el-button>
          </el-input>
        </div>
        <div id="periphery">
          <div
            @click="choicePer(item, index)"
            :class="{ choisePer: perIndex == index }"
            v-for="(item, index) in keywordList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div id="dataList" v-show="dataList.length > 0">
          <div
            class="data-item"
            :class="{ chiosediv: index == chioseIndex }"
            @click="chioseItem(item, index)"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <img :src="item.main_pic" alt="" />
            <div class="item-info">
              <div class="info-title">
                {{ item.county }}-{{ item.bname || item.house_title }}
              </div>
              <div class="info-addr">{{ item.address }}</div>
              <div class="info-time">{{ item.createtime }}</div>
              <div></div>
            </div>
          </div>
        </div>
        <div id="pagination-box" v-show="dataTotal > size">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            small
            layout="prev, pager, next"
            :page-size="size"
            :total="dataTotal"
          >
          </el-pagination>
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
          <bm-info-window
            :show="showPeriphery"
            @close="showPeriphery = false"
            @open="showPeriphery = true"
            >{{ peripheryVal }}</bm-info-window
          >
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>
<script>
// import { getBuildingDetails } from "../api/index";
import { getBuilding } from "../api/index";
import { getResource } from "../api/index";

export default {
  data() {
    return {
      item: {
        center: { lng: 117.233725, lat: 31.827 },
        radius: 1000,
      },
      showPeriphery: true,
      peripheryVal: "合肥市政府",
      searchKey: "",
      select: "1",
      show: false,
      buildSearchMap: {
        county: "全部", //区域搜索
        bname: "", //搜索名字
      },
      houseSearchMap: {
        county: "全部", //区域搜索
        house_title: "", //搜索名字
      },
      dataList: [],
      page: 1,
      size: 10,
      chioseIndex: -1,
      BMap: null,
      map: null,
      perIndex: 0,
      keyword: "景点",
      keywordList: [
        "景点",
        "公交车",
        "地铁",
        "学校",
        "医院",
        "酒店",
        "餐饮",
      ],
      dataTotal: 0,
    };
  },
  created() {
    this.$store.commit("actNav", 6);
    // if (this.$route.query.build) {
    //   getBuildingDetails(this.$route.query.build).then((res) => {
    //     if (res.code == 20000) {
    //       if (res.data.longitude && res.data.latitude) {
    //         this.item.center.lng = res.data.longitude;
    //         this.item.center.lat = res.data.latitude;
    //         this.item.center.buildName = res.data.bname;
    //       } else {
    //         this.$notify.error({
    //           title: "错误",
    //           message: "没有找到该地址",
    //         });
    //       }
    //     }
    //   });
    // }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      if (this.select == 1) {
        this.getBuilding();
      } else if (this.select == 2) {
        this.getResource();
      }
    },
    choicePer(item, index) {
      this.keyword = item;
      this.perIndex = index;
    },
    map_handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    chioseItem(item, index) {
      this.chioseIndex = index;
      this.item.center.lat = item.latitude;
      this.item.center.lng = item.longitude;
      this.peripheryVal = item.bname || item.house_title;
      this.showPeriphery = true;
    },
    searchBtn() {
      if (this.searchKey == "") {
        this.$notify({
          title: "警告",
          message: "请输入您要搜索的数据",
          type: "warning",
        });
        return;
      }
      if (this.select == 1) {
        //楼宇
        this.buildSearchMap.bname = this.searchKey;
        this.getBuilding();
      } else if (this.select == 2) {
        this.houseSearchMap.house_title = this.searchKey;
        this.getResource();
      }
    },
    getBuilding() {
      getBuilding(this.buildSearchMap, {
        page: this.page,
        size: this.size,
      }).then((res) => {
        if (res.code == 20000) {
          this.dataList = Object.freeze(res.data.rows);
          this.dataTotal = res.data.total;
        }
      });
    },
    getResource() {
      getResource(this.houseSearchMap, {
        page: this.page,
        size: this.size,
      }).then((res) => {
        if (res.code == 20000) {
          this.dataList = Object.freeze(res.data.rows);
          this.dataTotal = res.data.total;
        }
      });
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
/deep/ .BMap_bubble_content {
  div {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
}
#mapLookup {
  width: 100%;
  background: #f7f7f7;
  height: 105%;
  overflow: hidden;
}
#center-box {
  width: 100%;
  height: 100%;
  position: relative;
  .bm-view {
    width: 100%;
    height: 100%;
  }
}
#search-box {
  background: #fff;
  position: absolute;
  width: 350px;
  z-index: 999;
  top: 20px;
  left: 20px;
  max-height: calc(100% - 110px);
  /deep/ .el-input-group__append {
    font-size: 14px;
    background: #ffb200;
    color: #fff;
  }
  /deep/ .el-select {
    font-size: 14px;
    width: 80px;
  }
  #periphery {
    position: absolute;
    height: 40px;
    background: #fff;
    left: 400px;
    top: 0;
    min-width: 100%;
    width: auto;
    border: solid 1px #ddd;
    display: flex;
    div {
      vertical-align: middle;
      font-size: 14px;
      height: 40px;
      width: 60px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      &:hover {
        background: rgba(23, 160, 230, 0.2);
      }
    }
    .choisePer {
      background: rgba(23, 160, 230, 0.2);
    }
  }
  #dataList {
    background: #fff;
    padding: 15px 10px;
    max-height: calc(100% - 40px);
    overflow-y: auto;
    .data-item {
      font-size: 18px;
      color: #333;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10px;
      &:hover {
        background: rgba(23, 160, 230, 0.2);
      }
      img {
        width: 100px;
        height: 80px;
      }
      .item-info {
        width: calc(100% - 100px);
        height: 80px;
        padding-left: 15px;
        .info-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          .show-text-1;
        }
        .info-addr {
          font-size: 14px;
          color: #888;
          margin: 12px 0;
          .show-text-1;
        }
        .info-time {
          font-size: 14px;
          color: #888;
          .show-text-1;
        }
      }
    }
    .chiosediv {
      background: rgba(23, 160, 230, 0.2);
    }
  }
  #pagination-box {
    height: 40px;
    text-align: center;
  }
}
</style>
