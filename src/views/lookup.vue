<template>
  <!-- 找房 -->
  <div id="lookup">
    <black-nav></black-nav>
    <div id="search-nav">
      <div id="search-nav-left">
        <img src="../assets/image/nav_logo2.png" alt />
        <span>合肥</span>
        <div>去去去</div>
        <div>去去去</div>
        <div>去去去</div>
      </div>
      <div id="search-nav-right">
        <el-input placeholder="请输入大厦名称" v-model="input4">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div id="search-box">
      <div class="search-item" v-for="item in 7" :key="item">
        <div class="search-item-type">城市：</div>
        <div class="search-item-data">
          <div class="search-item-data-i">北京</div>
          <div class="search-item-data-i">上海</div>
          <div class="search-item-data-i">南京</div>
          <div class="search-item-data-i">福建</div>
        </div>
      </div>
    </div>
    <div id="content-box">
      <div id="content-left-box">
        <div id="data-list-type">
          <div class="data-list-type-item act-type-item">反反复复</div>
          <div class="data-list-type-item">反反复复</div>
          <div class="data-list-type-item">反反复复</div>
          <div class="data-list-type-item">反反复复</div>
          <div id="data-num">共4915套房源</div>
        </div>
        <div>
          <house v-for="item in 8" :key="item"></house>
        </div>
        <div id="data-pagination">
          <el-pagination background layout="prev, pager, next" :page-size="8" :total="25"></el-pagination>
        </div>
      </div>
      <div id="content-right-box">
        <div id="poster-map">
          <h3>地图找房</h3>
          <div>
            <p>上海写字楼</p>
          </div>
        </div>
        <div id="poster-hot-house">
          <h3>热门大厦</h3>
          <div id="hot-house-item" v-for="item in 5" :key="item">
            <img
              src="https://images.diandianzu.com/Public/Home/v5/images/listing/side_bg_mapsearch.png"
              alt
            />
            <div>
              <p>中航天盛广场</p>
              <p>4 元/m²/天</p>
              <p>近30天有 12 人关注</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import blackNav from "../components/blackNav";
import house from "../components/house";
export default {
  components: { blackNav, house },
  data() {
    return {
      input4: ""
    };
  },
  created() {
    this.$store.commit("actNav", 2);
  },
  methods: {}
};
</script>
<style lang='less' scoped>
#lookup {
  width: 100%;
  background: #fff;
}
#search-nav {
  height: 70px;
  border: solid 1px #ddd;
  width: 100%;
  padding: 0 calc(50% - 600px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  #search-nav-left {
    display: flex;
    align-items: center;
    img {
      height: 28px;
      width: auto;
      margin-right: 5px;
    }
    span {
      font-size: 12px;
      margin-right: 30px;
    }
    div {
      line-height: 28px;
      margin-right: 30px;
      color: #666;
      font-size: 16px;
    }
  }
  #search-nav-right {
    /deep/ .el-input {
      width: 480px;
      border-radius: 5px;
    }
    /deep/ .el-button {
      color: #888;
      font-size: 18px;
    }
  }
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
    height: 28px;
    border-bottom: dashed 1px #ddd;
    .search-item-type {
      font-size: 14px;
      color: #999;
    }
    .search-item-data {
      display: flex;
      align-items: center;
      padding-left: 20px;
      .search-item-data-i {
        font-size: 13px;
        color: #333;
        cursor: pointer;
        margin-right: 15px;
        &:hover {
          color: #cc2929;
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
        height: 100%;
        padding: 0 25px;
        line-height: 50px;
        font-size: 14px;
        display: inline-block;
        cursor: pointer;
        &:hover {
          color: #17a1e6;
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
    border-bottom: 1px solid rgba(0,0,0,0.1);
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
  }
}
</style>