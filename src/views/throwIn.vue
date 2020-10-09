<template>
  <!-- 投放房源 -->
  <div id="throwIn">
    <black-nav></black-nav>
    <search-nav></search-nav>
    <div id="throwIn-banner">
      <img src="../assets/image/swiper1.jpg" alt="" />
    </div>
    <div id="business-box-zhaofang">
      <h3>在租投放房源</h3>
      <p>为你出租更多闲置办公物业</p>
      <img src="../assets/image/business-require-icon.jpg" alt="" />
      <!-- <el-input
        type="textarea"
        :rows="3"
        placeholder="你的需求， 如：外滩SOHO，200平米写字楼，简装带家私，租金8元/㎡/天左右，附近有地铁"
        v-model="textarea"
      >
      </el-input> -->
      <!-- <el-input class="input1" v-model="userPhone" placeholder="手机号"></el-input>
      <el-input class="input2" placeholder="验证码" v-model="yzm">
        <template slot="append">获取验证码</template>
      </el-input> -->
      <div>
        <el-input
          class="input1"
          v-model="userPhone"
          placeholder="真实姓名"
        ></el-input>
      </div>
      <div>
        <el-input
          class="input1"
          v-model="userPhone"
          placeholder="手机号码"
        ></el-input>
      </div>
      <div class="lp-box">
        <el-input
          class="input1"
          v-model="userPhone"
          placeholder="楼盘名称"
        ></el-input>
        <el-select v-model="value" placeholder="区域位置">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div id="czmj">
        <el-input placeholder="请输入内容" class="input1" v-model="input3">
          <template slot="prepend">出租面积</template>
          <template slot="append">㎡</template>
        </el-input>
      </div>
      <div id="zj-box">
        <el-input placeholder="请输入内容" class="input1" v-model="input3">
          <template slot="append">元/㎡·月</template>
          <template slot="prepend">租金</template>
        </el-input>
      </div>
      <el-button type="primary" class="ljwt-btn">投放房源</el-button>
      <div id="box-bottom">
        你也可以拨打 <span>4000-623-678</span> 直接委托需求
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: "",
      userPhone: "",
      yzm: "",
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  created() {
    this.$store.commit("actNav", 3);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
#throwIn {
  width: 100%;
  background: #f7f7f7;
  overflow: hidden;
}
#throwIn-banner {
  height: 260px;
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#business-box-zhaofang {
  width: 460px;
  border-radius: 10px;
  background-color: #fff;
  border: solid 1px #ececec;
  margin: -190px auto 50px auto;
  position: relative;
  z-index: 10;
  h3 {
    height: 31px;
    font-size: 24px;
    text-align: center;
    color: #000;
    margin-top: 46px;
  }
  p {
    height: 19px;
    text-align: center;
    color: #666;
    margin-top: 13px;
    margin-bottom: 37px;
    font-size: 14px;
  }
  img {
    width: 90%;
    height: auto;
    margin: 0 auto;
    display: block;
  }
  /deep/ .el-textarea {
    display: block;
    width: 90%;
    margin: 40px auto 0;

    textarea {
      line-height: 20px;
      border: 1px solid #f5f5f5;
      background: #f5f5f5;
      border-radius: 5px;
      padding: 15px 20px;
    }
  }
  /deep/ .input1 {
    display: block;
    width: 90%;
    margin: 10px auto;
    input {
      border: 1px solid #f5f5f5 !important;
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius: 5px;
      background-color: #f5f5f5;
      padding: 0 20px;
      font-size: 14px;
    }
  }
  /deep/ .input2 {
    display: block;
    width: 90%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
    input {
      border: 1px solid #f5f5f5 !important;
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius: 5px;
      background-color: #f5f5f5;
      padding: 0 20px;
      font-size: 14px;
    }
    div {
      line-height: 48px;
      padding: 0 30px;
      background: none;
      font-size: 14px;
      border: none;
      cursor: pointer;
      width: auto;
    }
  }
  .lp-box {
    background: #f5f5f5;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input1 {
      margin: 0;
    }
    .el-select {
      /deep/ .el-input__inner {
        border: none;
        background: #f5f5f5;
      }
    }
  }
  #czmj {
    background: #f5f5f5;
    border-radius: 5px;
    width: 90%;
    margin: 10px auto;
    font-size: 19px;
    .input1{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    /deep/ .el-input-group__prepend{
      height: 100%;
      font-size: 14px;
      width: auto;
      border:none;
      background: #f5f5f5;
    }
    /deep/ .el-input-group__append{
      height: 100%;
      font-size: 14px;
      width: auto;
      border:none;
      background: #f5f5f5;
    }
  }
  #zj-box {
    background: #f5f5f5;
    border-radius: 5px;
    width: 90%;
    margin: 10px auto;
    .input1{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    /deep/ .el-input-group__prepend{
      height: 100%;
      font-size: 14px;
      width: auto;
      border:none;
      background: #f5f5f5;
    }
    /deep/ .el-input-group__append{
      height: 100%;
      font-size: 14px;
      width: auto;
      border:none;
      background: #f5f5f5;
    }
  }
  .ljwt-btn {
    width: 90%;
    margin: 20px 0 40px 0;
    display: block;
    text-align: center;
    color: #fff;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    height: 48px;
    border-radius: 4px;
    background-color: #17a1e6;
    font-size: 14px;
    font-weight: 600;
  }
  #box-bottom {
    width: 458px;
    height: 70px;
    background-color: #f5f5f5;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: center;
    margin-top: 45px;
    line-height: 75px;
    font-size: 12px;
    color: #777;
    span {
      font-size: 12px;
      color: #17a1e6;
    }
  }
}
</style>
