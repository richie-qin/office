<template>
  <!-- 委托 -->
  <div id="entrust">
    <search-nav></search-nav>
    <div id="entrust-banner">
      <img src="../assets/image/swiper1.jpg" alt="" />
    </div>
    <div id="business-box-zhaofang">
      <h3>免费委托找房</h3>
      <p>一键提交需求，巧租帮您寻找最合适的办公室</p>
      <img src="../assets/image/business-require-icon.jpg" alt="" />
      <el-input
        type="textarea"
        :rows="3"
        placeholder="你的需求， 如：外滩SOHO，200平米写字楼，简装带家私，租金8元/㎡/天左右，附近有地铁"
        v-model="textarea"
      >
      </el-input>
      <el-input
        class="input1"
        v-model="userName"
        placeholder="您的称呼"
      ></el-input>
      <el-input
        class="input1"
        v-model="userPhone"
        placeholder="手机号"
      ></el-input>
      <el-input
        class="input1"
        v-model="agent"
        placeholder="经纪人名称（选填）"
      ></el-input>
      <!-- <el-input class="input2" placeholder="验证码" v-model="yzm">
        <template slot="append">获取验证码</template>
      </el-input> -->
      <el-button type="primary" class="ljwt-btn" @click="ljwtBtn"
        >立即委托</el-button
      >
      <div id="box-bottom">
        你也可以拨打 <span>4000-623-678</span> 直接委托需求
      </div>
    </div>
  </div>
</template>
<script>
import { entrustSeek } from "../api/index";

export default {
  data() {
    return {
      userName: "",
      textarea: "",
      userPhone: "",
      yzm: "",
      agent: "",
    };
  },
  created() {
    this.$store.commit("actNav", 4);
  },
  methods: {
    ljwtBtn() {
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if(!this.textarea){
        this.$notify({
            title: "警告",
            message: "请填写您的需求",
            type: "warning",
          });
          return
      }
      if(!phoneReg.test(this.userPhone)){
        this.$notify({
            title: "警告",
            message: "请正确填写手机号",
            type: "warning",
          });
          return
      }
      entrustSeek({
        cust_name: this.userName, //名字
        cust_phone: this.userPhone, //电话
        agent: this.agent, //经纪人
        remark: this.textarea, //内容
      }).then((res) => {
        if (res.code == 20000) {
          this.$notify({
            title: "成功",
            message: res.message,
            type: "success",
          });
        } else {
          this.$notify({
            title: "警告",
            message: res.message,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
#entrust {
  width: 100%;
  background: #f7f7f7;
  overflow: hidden;
}
#entrust-banner {
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
    background-color: #ffb200;
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
      color: #ffb200;
    }
  }
}
</style>
