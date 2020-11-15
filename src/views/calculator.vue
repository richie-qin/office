<template>
  <!-- 计算器 -->
  <div id="calculator-main">
    <search-nav></search-nav>
    <div id="content-box">
      <h3 id="title">面积测算器</h3>
      <div id="count-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="估算" name="first">
            <div id="gs-box">
              <div id="gs-input">
                <span class="gs-title">所需工位数</span>
                <el-input v-model="gsInput" placeholder="请输入内容"></el-input>
                <span>个</span>
              </div>
              <div id="gs-result">
                <span class="gs-title">您需要办公室</span>
                <div>
                  约<span>{{ gsValue }}</span
                  >㎡
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="精准计算" name="second">
            <div id="jz-box">
              <div class="jz-input-item">
                <span class="jz-title">所需工位数</span>
                <el-input
                  v-model="jzInput1"
                  placeholder="请输入内容"
                ></el-input>
                <span>个</span>
                <button @click="recommend">推荐配置</button>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">人员工位面积/人</span>
                <el-input
                  v-model="jzInput2"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">前台面积</span>
                <el-input
                  v-model="jzInput3"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
                <div class="jz-count">
                  <el-input-number
                    v-model="jzInput3num"
                    size="mini"
                    @change="handleChange(3)"
                    :min="0"
                    label="0"
                  ></el-input-number>
                  <span>个</span>
                </div>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">财务室</span>
                <el-input
                  v-model="jzInput4"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
                <div class="jz-count">
                  <el-input-number
                    v-model="jzInput4num"
                    size="mini"
                    @change="handleChange(4)"
                    :min="0"
                    label="0"
                  ></el-input-number>
                  <span>个</span>
                </div>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">会议室</span>
                <el-input
                  v-model="jzInput5"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
                <div class="jz-count">
                  <el-input-number
                    v-model="jzInput5num"
                    size="mini"
                    @change="handleChange(5)"
                    :min="0"
                    label="0"
                  ></el-input-number>
                  <span>个</span>
                </div>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">接待室</span>
                <el-input
                  v-model="jzInput6"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
                <div class="jz-count">
                  <el-input-number
                    v-model="jzInput6num"
                    size="mini"
                    @change="handleChange(6)"
                    :min="0"
                    label="0"
                  ></el-input-number>
                  <span>个</span>
                </div>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">储物室</span>
                <el-input
                  v-model="jzInput7"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
                <div class="jz-count">
                  <el-input-number
                    v-model="jzInput7num"
                    size="mini"
                    @change="handleChange(7)"
                    :min="0"
                    label="0"
                  ></el-input-number>
                  <span>个</span>
                </div>
              </div>
              <div class="jz-input-item">
                <span class="jz-title">其他</span>
                <el-input
                  v-model="jzInput8"
                  placeholder="请输入内容"
                ></el-input>
                <span>㎡</span>
                <div class="jz-count">
                  <el-input-number
                    v-model="jzInput8num"
                    size="mini"
                    @change="handleChange(8)"
                    :min="0"
                    label="0"
                  ></el-input-number>
                  <span>个</span>
                </div>
              </div>
              <div id="start-count">
                <button @click="startCount">开始计算</button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div id="result-box" v-show="resultShow">
        <div id="result-content">
          <h3>
            您需要办公室约
            <span>{{ allArea.toFixed(2) }}</span>
            ㎡
          </h3>
          <div id="table-box">
            <div id="table-title">面积配置如下:</div>
            <table>
              <tr>
                <td>房间</td>
                <td>面积</td>
                <td>数量</td>
              </tr>
              <tr v-show="jzInput3num > 0">
                <td>前台</td>
                <td>{{ (jzInput3 * jzInput3num).toFixed(2) }}</td>
                <td>{{ jzInput3num }}</td>
              </tr>
              <tr v-show="jzInput4num > 0">
                <td>财务室</td>
                <td>{{ (jzInput4 * jzInput4num).toFixed(2) }}</td>
                <td>{{ jzInput4num }}</td>
              </tr>
              <tr v-show="jzInput5num > 0">
                <td>会议室</td>
                <td>{{ (jzInput5 * jzInput5num).toFixed(2) }}</td>
                <td>{{ jzInput5num }}</td>
              </tr>
              <tr v-show="jzInput6num > 0">
                <td>接待室</td>
                <td>{{ (jzInput6 * jzInput6num).toFixed(2) }}</td>
                <td>{{ jzInput6num }}</td>
              </tr>
              <tr v-show="jzInput7num > 0">
                <td>储物室</td>
                <td>{{ (jzInput7 * jzInput7num).toFixed(2) }}</td>
                <td>{{ jzInput7num }}</td>
              </tr>
              <tr v-show="jzInput8num > 0">
                <td>其他</td>
                <td>{{ (jzInput8 * jzInput8num).toFixed(2) }}</td>
                <td>{{ jzInput8num }}</td>
              </tr>
            </table>
          </div>
          <div id="choise-value">
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
            <el-select
              @change="searchChange2"
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
            <el-select
              @change="searchChange3"
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
          <div id="weituo">
            <button @click="matching">匹配写字楼</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
<script>
export default {
  data() {
    return {
      gsInput: "",
      gsValue: 0,
      activeName: "first",
      jzInput1: "", //
      jzInput2: "", //
      jzInput3: "", //
      jzInput3num: "",
      jzInput4: "", //
      jzInput4num: "",
      jzInput5: "", //
      jzInput5num: "",
      jzInput6: "", //
      jzInput6num: "",
      jzInput7: "", //
      jzInput7num: "",
      jzInput8: "", //
      jzInput8num: "",
      allArea: 0,
      resultShow: false,
      regionKey: "",
      renovationKey: "",
      buildKey: "",
      regionIndex: 0,
      zxIndex: 0,
      typeIndex: 0,
    };
  },
  computed: {
    regionList() {
      return this.$store.state.regionList;
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
    this.$store.commit("actNav", 0);
  },
  methods: {
    matching() {
      console.log("区域", this.regionKey);
      console.log("装修", this.renovationKey);
      console.log("类型", this.buildKey);
      console.log("面积", this.allArea);
      let areaIndex = 0;
      if (this.allArea > 0 && this.allArea <= 100) {
        areaIndex = 1;
      } else if (this.allArea > 100 && this.allArea <= 300) {
        areaIndex = 2;
      } else if (this.allArea > 300 && this.allArea <= 500) {
        areaIndex = 3;
      } else if (this.allArea > 500 && this.allArea <= 1000) {
        areaIndex = 4;
      } else if (this.allArea > 1000 && this.allArea <= 1500) {
        areaIndex = 5;
      } else if (this.allArea > 1500 && this.allArea <= 2000) {
        areaIndex = 6;
      } else if (this.allArea > 2000) {
        areaIndex = 7;
      }
      this.$router.push({
        name: "building",
        params: {
          matching:1,
          areaIndex: areaIndex,
          regionIndex: this.regionIndex,
          zxIndex: this.zxIndex,
          typeIndex: this.typeIndex,
        },
      });
    },
    searchChange1(index) {
      this.regionIndex = index;
    },
    searchChange2(index) {
      this.zxIndex = index;
    },
    searchChange3(index) {
      this.typeIndex = index;
    },
    recommend() {
      //推荐
      if (!/^[1-9]\d*$/.test(this.jzInput1)) {
        this.$notify({
          title: "警告",
          message: "请输入正整数",
          type: "warning",
        });
        return false;
      }
      if (this.jzInput1 >= 1 && this.jzInput1 <= 3) {
        this.jzInput2 = 3.6;
        this.jzInput8 = 5;
        this.jzInput8num = 1;
      } else if (this.jzInput1 >= 4 && this.jzInput1 <= 10) {
        this.jzInput2 = 3.6;
        this.jzInput3 = 5;
        this.jzInput3num = 1;
        this.jzInput5 = 16;
        this.jzInput5num = 1;
        this.jzInput6 = 6;
        this.jzInput6num = 1;
        this.jzInput7 = 4;
        this.jzInput7num = 1;
        this.jzInput8 = 10;
        this.jzInput8num = 1;
      } else if (this.jzInput1 >= 11 && this.jzInput1 <= 30) {
        this.jzInput2 = 3.4;
        this.jzInput3 = 5;
        this.jzInput3num = 1;
        this.jzInput4 = 5;
        this.jzInput4num = 1;
        this.jzInput5 = 23;
        this.jzInput5num = 1;
        this.jzInput6 = 10;
        this.jzInput6num = 1;
        this.jzInput7 = 10;
        this.jzInput7num = 1;
        this.jzInput8 = 15;
        this.jzInput8num = 1;
      } else if (this.jzInput1 >= 31 && this.jzInput1 <= 50) {
        this.jzInput2 = 3.4;
        this.jzInput3 = 14;
        this.jzInput3num = 1;
        this.jzInput4 = 9;
        this.jzInput4num = 1;
        this.jzInput5 = 23;
        this.jzInput5num = 1;
        this.jzInput6 = 15;
        this.jzInput6num = 1;
        this.jzInput7 = 10;
        this.jzInput7num = 1;
        this.jzInput8 = 20;
        this.jzInput8num = 1;
      } else if (this.jzInput1 >= 51 && this.jzInput1 <= 70) {
        this.jzInput2 = 3.2;
        this.jzInput3 = 14;
        this.jzInput3num = 1;
        this.jzInput4 = 15;
        this.jzInput4num = 1;
        this.jzInput5 = 37;
        this.jzInput5num = 1;
        this.jzInput6 = 22;
        this.jzInput6num = 1;
        this.jzInput7 = 20;
        this.jzInput7num = 1;
        this.jzInput8 = 25;
        this.jzInput8num = 1;
      } else if (this.jzInput1 >= 71 && this.jzInput1 <= 100) {
        this.jzInput2 = 3.2;
        this.jzInput3 = 21;
        this.jzInput3num = 1;
        this.jzInput4 = 15;
        this.jzInput4num = 1;
        this.jzInput5 = 46;
        this.jzInput5num = 1;
        this.jzInput6 = 22;
        this.jzInput6num = 1;
        this.jzInput7 = 20;
        this.jzInput7num = 1;
        this.jzInput8 = 30;
        this.jzInput8num = 1;
      } else if (this.jzInput1 > 100) {
        this.jzInput2 = 6.4;
        this.jzInput3 = 21;
        this.jzInput3num = 1;
        this.jzInput4 = 15;
        this.jzInput4num = 1;
        this.jzInput5 = 46;
        this.jzInput5num = 1;
        this.jzInput6 = 22;
        this.jzInput6num = 1;
        this.jzInput7 = 20;
        this.jzInput7num = 1;
        this.jzInput8 = 40;
        this.jzInput8num = 1;
      }
    },
    handleChange() {
      // console.log(index)
      // let value = this[`jzInput${index}`];
      // let num = this[`jzInput${index}num`];
    },
    startCount() {
      if (!/^[1-9]\d*$/.test(this.jzInput1)) {
        this.$notify({
          title: "警告",
          message: "请输入正整数",
          type: "warning",
        });
        return false;
      }
      let num1 = this.jzInput1 * this.jzInput2.toFixed(2);
      let num2 = this.jzInput3 * this.jzInput3num.toFixed(2);
      let num3 = this.jzInput4 * this.jzInput4num.toFixed(2);
      let num4 = this.jzInput5 * this.jzInput5num.toFixed(2);
      let num5 = this.jzInput6 * this.jzInput6num.toFixed(2);
      let num6 = this.jzInput7 * this.jzInput7num.toFixed(2);
      let num7 = this.jzInput8 * this.jzInput8num.toFixed(2);
      this.allArea = num1 + num2 + num3 + num4 + num5 + num6 + num7;
      this.resultShow = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  watch: {
    gsInput(val) {
      if (val == "") {
        this.gsValue = 0;
        return;
      }
      if (/^[1-9]\d*$/.test(val)) {
        this.gsValue = parseInt(val * 8);
      }
    },
  },
};
</script>
      
<style lang="less" scoped>
#calculator-main {
  width: 100%;
  min-height: 100%;
  background: #f7f7f7;
  overflow: hidden;
}
#content-box {
  width: 1200px;
  margin: 50px auto;
  h3 {
    font-size: 20px;
    color: #555;
    text-align: center;
  }
}
#count-box {
  display: inline-block;
  width: 50%;
  vertical-align: top;
}
#gs-box {
  width: 100%;
  padding-top: 50px;
  .gs-title {
    width: 150px;
    font-size: 14px;
    color: #555;
    font-weight: bold;
  }
  #gs-input {
    width: 100%;
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: #555;
      font-weight: bold;
    }
    /deep/ .el-input {
      width: 200px;
      margin-right: 20px;
    }
  }
  #gs-result {
    margin-top: 50px;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #666;
      font-weight: bold;

      span {
        margin: 0 10px;
        color: #f90;
        font-size: 48px;
      }
    }
  }
}
#jz-box {
  width: 100%;
  padding-top: 50px;
  .jz-title {
    width: 150px;
    font-size: 14px;
    color: #555;
    font-weight: bold;
  }
  .jz-input-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    /deep/ .el-input {
      width: 200px;
      margin-right: 20px;
    }
    span {
      font-size: 14px;
      color: #555;
      font-weight: bold;
    }
    button {
      width: 78px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      border: 1px #999 solid;
      border-radius: 3px;
      color: #666;
      font-size: 12px;
      margin-left: 25px;
      cursor: pointer;
    }
    .jz-count {
      margin-left: 25px;
      display: inline-block;
      width: 130px;
      display: flex;
      align-items: center;
      /deep/ .el-input {
        width: 100%;
        margin-right: 0;
      }
      span {
        margin-left: 15px;
      }
    }
  }
  #start-count {
    margin-top: 50px;
    text-align: center;
    button {
      background: #f90;
      color: #fff;
      font-size: 14px;
      border-radius: 3px;
      height: 44px;
      line-height: 44px;
      width: 162px;
      text-align: center;
      cursor: pointer;
    }
  }
}
#result-box {
  display: inline-block;
  width: 50%;
  #result-content {
    width: 395px;
    background: #eee;
    margin: 40px auto 0;
    padding-bottom: 30px;
    h3 {
      border-bottom: 1px #e8e8e8 solid;
      padding: 34px 0 30px;
      text-align: center;
      font-size: 0;
      height: 48px;
      font-weight: 700;
      font-size: 24px;
      color: #666;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 48px;
        color: #f90;
        padding: 0 10px;
      }
    }
    #choise-value {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/ .el-select {
        width: 108px;
      }
      /deep/ .el-select__caret {
        color: #000 !important;
      }
    }
    #weituo {
      text-align: center;
      margin-top: 30px;
      button {
        width: 320px;
        height: 40px;
        font-size: 16px;
        background: #f90;
        color: #fff;
        cursor: pointer;
      }
    }
    #table-box {
      #table-title {
        padding: 10px 0 5px;
        color: #999;
        font-size: 12px;
        padding: 0 30px;
      }
      table {
        display: block;
        margin: 20px 30px;
        background: #fff;
        tr {
          height: 28px;
          line-height: 28px;
          display: flex;
          justify-content: space-between;
          td {
            width: 33.33%;
            text-align: center;
            border-bottom: 1px #f5f5f6 solid;
            border-right: 1px #f5f5f6 solid;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
}
/deep/ .el-tabs__item.is-active {
  color: #f90;
}
/deep/ .el-tabs__active-bar {
  background-color: #f90;
}
/deep/ .el-tabs__item:hover {
  color: #f90;
}
</style>