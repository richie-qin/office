<template>
  <div id="house-box">
    <div id="house-left-box">
      <img
        :src="showImg(data)"
        alt
      />
    </div>
    <div id="house-center-box">
      <h3 @click="toDetails(data.id)">{{ data.county }}-{{ data.bname }} <span v-show="data.type">（{{data.type==1?"写字楼":data.type==2?"公寓":data.type==3?"商铺":data.type==4?"厂房":"园区"}}）</span> </h3>
      <div class="house-info" v-show="data.renovation">
        <i class="el-icon-info"></i>
        <span>装修程度：{{ data.renovation }}</span>
      </div>
      <div class="house-info" v-show="data.address">
        <i class="el-icon-location-outline"></i>
        <span>{{ data.address }}</span>
      </div>
      <div class="house-info" v-show="data.createtime">
        <i class="el-icon-time"></i>
        <span>发布时间：{{ data.createtime }}</span>
      </div>
      <div id="house-info-type" v-show="data.label.length>0">
        <span v-for="(item,index) in data.label" :key="index">{{item}}</span>
      </div>
    </div>
    <div id="house-right-box">
      <div id="house-m1" v-show="data.price">
        <b>{{ data.price | priceF }}</b
        >元/m²/天
      </div>
      <div id="house-m1" v-show="!data.price">
        暂无报价
      </div>
      <!-- <div id="house-m2">{{data.bproperty}}元/m²/天</div> -->
      <!-- <div id="house-info-btn" @click="toDetails(data.id)">查看详情</div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  created() {},
  methods: {
    toDetails(id) {
      let routeData = this.$router.resolve({path:`./edificeDetails?id=${id}`});
      window.open(routeData.href, '_blank');
    },
    showImg(data){
      if(data.main_pic){
        return data.main_pic
      }else{
        return require('../assets/image/none-img.png')
      }
    }
  },
};
</script>
<style lang="less" scoped>
#house-box {
  width: 100%;
  height: 225px;
  width: 100%;
  padding: 30px 0;
  border-bottom: 1px solid #e5e5e5;
  transition: box-shadow 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: 10px;
  &:hover {
    background: #eee;
    #house-info-btn {
      transition: all 0.2s;
      opacity: 1;
    }
  }
  #house-left-box {
    width: 240px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
    flex: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  #house-center-box {
    width: 450px;
    margin-left: 20px;
    h3 {
      color: #000;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      &:hover {
        color: #ffb200;
      }
    }
    .house-info {
      margin-top: 12px;
      display: flex;
      align-items: center;
      height: 19px;
      line-height: 19px;

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
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    #house-info-type {
      margin-top: 12px;
      span {
        display: inline-block;
        height: 26px;
        line-height: 26px;
        border-radius: 2px;
        font-size: 12px;
        margin-right: 10px;
        padding: 0 10px 0 10px;
        border-radius: 5px;
        &:nth-child(1) {
          background-color: #eaf6ff;
          color: #3baaf5;
        }
        &:nth-child(2) {
          background-color: #fcf2ef;
          color: #e67b60;
        }
        &:nth-child(3) {
          background-color: #f2f2f6;
          color: #8d88c2;
        }
        &:nth-child(4) {
          background-color: #e6f6f1;
          color: #2fc296;
        }
        &:nth-child(5) {
          background-color: #fcf5e8;
          color: #f0b030;
        }
      }
    }
  }
  #house-right-box {
    text-align: right;
    width: 150px;
    #house-m1 {
      color: #cc2929;
      font-size: 12px;
      b {
        color: #cc2929;
        font-size: 28px;
      }
    }
    #house-m2 {
      font-size: 12px;
      color: #353535;
      margin: 12px 0;
    }
  }
}
#house-info-btn {
  opacity: 0;
  width: 118px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  background: #ffb200;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #18aaf2;
  }
}
</style>
