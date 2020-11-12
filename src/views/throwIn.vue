<template>
  <!-- 投放房源 -->
  <div id="throwIn">
    <search-nav></search-nav>
    <div id="throwIn-banner">
      <img src="../assets/image/swiper1.jpg" alt="" />
    </div>
    <div id="business-box-zhaofang">
      <h3>在租投放房源</h3>
      <p>为你出租更多闲置办公物业</p>
      <img src="../assets/image/business-require-icon.jpg" alt="" />
      <div>
        <el-input
          class="input1"
          v-model="userName"
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
      <div>
        <el-input
          class="input1"
          v-model="building"
          placeholder="所在楼盘名称"
        ></el-input>
      </div>
      <div class="lp-box">
        <el-input
          class="input1"
          v-model="house"
          placeholder="房屋名称"
        ></el-input>
        <el-select v-model="county" placeholder="区域位置">
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div id="czmj">
        <el-input placeholder="请输入内容" class="input1" v-model="area">
          <template slot="prepend">出租面积</template>
          <template slot="append">㎡</template>
        </el-input>
      </div>
      <div id="zj-box">
        <el-input placeholder="请输入内容" class="input1" v-model="month_rent">
          <template slot="append">元/㎡·月</template>
          <template slot="prepend">租金</template>
        </el-input>
      </div>
      <el-button type="primary" class="ljwt-btn" @click="throwIn"
        >投放房源</el-button
      >
      <div id="box-bottom">
        你也可以拨打 <span>4000-623-678</span> 直接委托需求
      </div>
    </div>
  </div>
</template>
<script>
import { custHouse } from "../api/index";
export default {
  data() {
    return {
      userName: "",
      userPhone: "",
      house: "",
      county: "",
      area: "",
      month_rent: "",
      building: "",
      options: [
        { name: "蜀山区", code: "02" },
        { name: "滨湖新区", code: "03" },
        { name: "政务区", code: "04" },
        { name: "新站区", code: "05" },
        { name: "瑶海区", code: "06" },
        { name: "庐阳区", code: "07" },
        { name: "包河区", code: "08" },
        { name: "长丰县", code: "09" },
        { name: "肥东县", code: "10" },
        { name: "肥西县", code: "11" },
        { name: "庐江县", code: "12" },
        { name: "高新区", code: "13" },
        { name: "经开区", code: "14" },
        { name: "巢湖市", code: "15" },
      ],
    };
  },
  created() {
    this.$store.commit("actNav", 5);
  },
  methods: {
    throwIn() {
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if (!this.userName) {
        this.$notify({
          title: "警告",
          message: "请填写您的真实姓名",
          type: "warning",
        });
        return;
      }
      if (!phoneReg.test(this.userPhone)) {
        this.$notify({
          title: "警告",
          message: "请正确填写手机号",
          type: "warning",
        });
        return;
      }
      if (!this.building) {
        this.$notify({
          title: "警告",
          message: "请填写楼盘名称",
          type: "warning",
        });
        return;
      }
      if (!this.house) {
        this.$notify({
          title: "警告",
          message: "请填写房屋名称",
          type: "warning",
        });
        return;
      }
      if (!this.county) {
        this.$notify({
          title: "警告",
          message: "请选择楼盘所在区域",
          type: "warning",
        });
        return;
      }
      if (!this.area) {
        this.$notify({
          title: "警告",
          message: "请填写出租面积",
          type: "warning",
        });
        return;
      }
      if (!this.month_rent) {
        this.$notify({
          title: "警告",
          message: "请填写租金",
          type: "warning",
        });
        return;
      }
      custHouse({
        name: this.userName,
        phone: this.userPhone,
        area: this.area,
        month_rent: this.month_rent,
        building: this.building,
        county: this.county,
        house: this.house,
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
    .input1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    /deep/ .el-input-group__prepend {
      height: 100%;
      font-size: 14px;
      width: auto;
      border: none;
      background: #f5f5f5;
    }
    /deep/ .el-input-group__append {
      height: 100%;
      font-size: 14px;
      width: auto;
      border: none;
      background: #f5f5f5;
    }
  }
  #zj-box {
    background: #f5f5f5;
    border-radius: 5px;
    width: 90%;
    margin: 10px auto;
    .input1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    /deep/ .el-input-group__prepend {
      height: 100%;
      font-size: 14px;
      width: auto;
      border: none;
      background: #f5f5f5;
    }
    /deep/ .el-input-group__append {
      height: 100%;
      font-size: 14px;
      width: auto;
      border: none;
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
