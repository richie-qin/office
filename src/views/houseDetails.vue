<template>
  <!-- 房子详情 -->
  <div id="houseDetails">
    <search-nav></search-nav>
    <!-- <div id="title-money">
      <div id="title">南苏55（720全景VR看房）</div>
      <div id="money"><b>4~7.3</b>元/m²/天</div>
    </div> -->
    <!-- <div id="addr">
      <i class="el-icon-location-outline"></i>
      <span>浦东-陆家嘴 · 距离「2号线-东昌路站」约115米</span>
    </div>
    <div id="news">
      <i class="el-icon-time"></i>
      <span>2天前更新 · 近30天内共有13人关注</span>
    </div> -->
    <div id="img-box">
      <div id="img-left">
        <el-carousel height="420px">
          <el-carousel-item v-for="(item, index) in details.image" :key="index">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="img-right">
        <div id="img-right-div1">
          <b>{{ details.month_rent | priceF }}</b
          >万元/月
          <!-- <span>单价3.8元/㎡/天</span> -->
        </div>
        <div id="img-right-div2">
          <div class="div2-item">
            <div class="div2-item-top">{{ details.square }}㎡</div>
            <div class="div2-item-bot">建筑面积</div>
          </div>
          <div class="div2-item">
            <div class="div2-item-top">{{ details.floor }}</div>
            <div class="div2-item-bot">房源楼层</div>
          </div>
          <div class="div2-item">
            <div class="div2-item-top">{{ details.renovation }}</div>
            <div class="div2-item-bot">装修程度</div>
          </div>
        </div>
        <div id="img-right-div3">
          <div v-show="details.land_use">
            <span>用地性质：</span>{{ details.land_use }}
          </div>
          <div v-show="details.house_title">
            <span>房源名称：</span>{{ details.house_title }}
          </div>
          <div v-show="details.address">
            <span>房源位置：</span>{{ details.address }}
          </div>
          <div v-show="details.rent_status">
            <span>房屋状态：</span>{{ details.rent_status }}
          </div>
        </div>
        <!-- <div id="img-right-div4" >

          <div id="user-btn">
            <el-button type="primary" icon="el-icon-phone-outline"
              >{{ details.name }}：{{ details.phone }}</el-button
            >
          </div>
        </div> -->
      </div>
    </div>
    <div id="information">
      <div id="left-info-box">
        <div id="jbxx">
          <h3 class="info-title"><i></i>基本信息</h3>
          <div class="base-info-item">
            <div class="base-info-title">房源名称</div>
            <div class="base-info-content">
              {{ details.house_title || "-" }}
            </div>
          </div>
          <div class="base-info-item">
            <div class="base-info-title">所在楼宇</div>
            <div class="base-info-content">{{ details.building || "-" }}</div>
          </div>
          <div class="base-info-item">
            <div class="base-info-title">房源楼层</div>
            <div class="base-info-content">{{ details.floor || "-" }}</div>
          </div>
          <div class="base-info-item">
            <div class="base-info-title">房源房号</div>
            <div class="base-info-content">
              {{ details.house_number || "-" }}
            </div>
          </div>
        </div>
        <div id="jzxx">
          <h3 class="info-title"><i></i>建筑信息</h3>
          <div id="jzxx-content">
            <div>
              <div class="base-info-item">
                <div class="base-info-title">房源朝向</div>
                <div class="base-info-content">
                  {{ details.orientation || "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">装修程度</div>
                <div class="base-info-content">
                  {{ details.renovation || "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">注册</div>
                <div class="base-info-content">{{details.registers || "-"}}</div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">房源面积</div>
                <div class="base-info-content">{{ details.square?details.square+"㎡" : "-" }}</div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">付款方式</div>
                <div class="base-info-content">
                  {{ details.pay_way || "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">性质</div>
                <div class="base-info-content">{{details.natures || "-"}}</div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">看房方式</div>
                <div class="base-info-content">
                  {{ details.look_way || "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">分割</div>
                <div class="base-info-content">{{details.divisions || "-"}}</div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">房屋年限</div>
                <div class="base-info-content">{{ details.years || "-" }}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="jgxx">
          <h3 class="info-title"><i></i>价格信息</h3>
          <div id="jzxx-content">
            <div>
              <div class="base-info-item">
                <div class="base-info-title">月租费用</div>
                <div class="base-info-content">
                  {{ details.month_rent ? details.month_rent + "元/㎡" : "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">得房率</div>
                <div class="base-info-content">
                  {{ details.rate ? details.rate + "%" : "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">车位费</div>
                <div class="base-info-content">{{ details.car || "-" }}</div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">物业费</div>
                <div class="base-info-content">
                  {{ details.property ? details.property + "元/㎡/月" : "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">房屋状态</div>
                <div class="base-info-content">
                  {{ details.rent_status || "-" }}
                </div>
              </div>
            </div>
            <div>
              <div class="base-info-item">
                <div class="base-info-title">起租期</div>
                <div class="base-info-content">
                  {{ details.start_rent ? details.start_rent + "个月" : "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">水电费</div>
                <div class="base-info-content">
                  {{ details.hydropower || "-" }}
                </div>
              </div>
              <div class="base-info-item">
                <div class="base-info-title">用地性质</div>
                <div class="base-info-content">
                  {{ details.land_use || "-" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right-info-box">
        <div id="ljyy">
          <h3><i></i>预约看房</h3>
          <el-input placeholder="请输入您的手机号" v-model="input10" clearable>
          </el-input>
          <el-button type="primary" @click="subscribe(input10)"
            >立即预约</el-button
          >
          <p>巧租承诺仅将你的联系方式用于找房服务</p>
        </div>
        <div id="tjfy">
          <h3><i></i>推荐房源</h3>
          <div id="tjfy-content">
            <div v-for="item in 4" :key="item">
              <p>某某大厦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getResourceDetails,getSubscribe } from "../api/index";
export default {
  data() {
    return {
      swipers: [
        { src: require("../assets/image/swiper1.jpg") },
        { src: require("../assets/image/swiper2.jpg") },
        { src: require("../assets/image/swiper3.jpg") },
      ],
      input10: "",
      details: {},
    };
  },
  created() {
    this.$store.commit("actNav", 3);
    getResourceDetails(this.$route.query.id).then((res) => {
      if (res.code == 20000) {
        this.details = res.data;
      }
    });
  },
  methods: {
    subscribe(val){
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if(!phoneReg.test(val)){
        this.$notify({
            title: "警告",
            message: "请正确填写手机号",
            type: "warning",
          });
          return
      }
      getSubscribe({
        house_id:this.details.id,
        mobile:val,
        house_name:this.details.house_title
      }).then(res=>{
        if (res.code == 20000) {
          this.$notify({
            title: "成功",
            message: "预约成功",
            type: "success",
          });
        } else {
          this.$notify({
            title: "警告",
            message: res.message,
            type: "warning",
          });
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
#houseDetails {
  width: 100%;
  background: #f7f7f7;
  overflow: hidden;
  #title-money {
    padding: 0 calc(50% - 600px);

    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0 15px 0;
    #title {
      color: #000;
      font-size: 28px;
    }
    #money {
      color: #cc2929;
      font-size: 12px;
      b {
        font-size: 28px;
        font-weight: 400;
      }
    }
  }
  #addr {
    padding: 0 calc(50% - 600px);
    margin: 0 0 8px 0;

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
    }
  }
  #news {
    padding: 0 calc(50% - 600px);
    margin: 0 0 26px 0;

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
    }
  }
  #img-box {
    // height: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    // margin: 0 calc(50% - 600px);
    width: 100%;
    padding: 25px calc(50% - 600px);
    border-radius: 5px;
    overflow: hidden;
    background: #3d5a73;
    color: #fff;
    #img-left {
      width: 820px;
      height: 100%;
      overflow: hidden;
      border-radius: 5px;
      .el-carousel__item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #img-right {
      width: 370px;
      height: 420px;
      overflow: hidden;
      border-radius: 5px;
      padding-left: 20px;
      padding-right: 30px;
      #img-right-div1 {
        height: 88px;
        margin-top: 6px;
        border-bottom: solid 1px #ebebeb;
        line-height: 88px;
        font-size: 12px;
        font-weight: 500;

        b {
          font-size: 48px;
          font-weight: 500;
        }
        span {
          margin-left: 25px;
        }
      }
      #img-right-div2 {
        border-bottom: solid 1px #ebebeb;

        height: 88px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .div2-item {
          .div2-item-top {
            height: 33px;
            line-height: 33px;
            font-size: 24px;
            font-weight: 500;
          }
        }
        .div2-item-bot {
          height: 17px;
          line-height: 17px;
          font-size: 12px;
        }
      }
      #img-right-div3 {
        padding: 20px 0;
        border-bottom: solid 1px #ebebeb;
        height: 150px;
        div {
          margin-bottom: 10px;
          height: 17px;
          font-size: 12px;
          span {
            font-size: 12px;
            height: 17px;
          }
        }
      }
      #img-right-div4 {
        padding: 20px 0;
        border-bottom: solid 1px #ebebeb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        #img-right-div4-user {
          margin-left: 10px;

          #div-user-title {
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
          }
          p {
            line-height: 17px;
            font-size: 12px;
          }
        }
        #user-btn {
          font-size: 12px;
          margin: 0 auto;
        }
      }
    }
  }
  #information {
    width: 1200px;
    margin: 30px auto 50px;
    display: flex;
    justify-content: space-between;

    #left-info-box {
      width: 820px;
      height: auto;
      padding: 30px 30px 0 30px;
      background: #fff;
      .base-info-item {
        margin: 10px 0;
        .base-info-title {
          min-width: 78px;
          height: 17px;
          font-size: 12px;
          color: #b2b2b2;
          display: inline-block;
        }
        .base-info-content {
          font-size: 12px;
          color: #4a4a4a;
          height: 17px;
          display: inline-block;
        }
      }
      .info-title {
        height: 19px;
        line-height: 19px;
        font-size: 20px;
        font-weight: 500;
        color: #000;
        margin-bottom: 20px;
        i {
          width: 3px;
          background: #17a1e6;
          height: 19px;
          margin-right: 5px;
          display: inline-block;
          vertical-align: bottom;
        }
      }
      #jbxx {
        padding-bottom: 30px;
        border-bottom: solid 1px #ebebeb;
      }
      #jzxx {
        margin-top: 40px;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;

        #jzxx-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      #jgxx {
        margin-top: 40px;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        #jzxx-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      #jpxx {
        padding: 40px 0 30px;
      }
    }
    #right-info-box {
      background: #fff;
      width: 370px;
      padding: 20px 15px;
      #ljyy {
        text-align: center;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        h3 {
          width: 100%;
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          margin-bottom: 20px;
          text-align: left;
          i {
            width: 3px;
            background: #17a1e6;
            height: 19px;
            margin-right: 5px;
            display: inline-block;
            vertical-align: bottom;
          }
        }
        button {
          margin-top: 30px;
        }
        p {
          margin-top: 5px;
          color: #bebebe;
          font-size: 12px;
        }
      }
      #tjfy {
        text-align: center;
        border-bottom: solid 1px #ebebeb;
        padding-bottom: 30px;
        margin-top: 30px;
        h3 {
          width: 100%;
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          margin-bottom: 20px;
          text-align: left;
          i {
            width: 3px;
            background: #17a1e6;
            height: 19px;
            margin-right: 5px;
            display: inline-block;
            vertical-align: bottom;
          }
        }
        #tjfy-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          div {
            width: 160px;
            height: 160px;
            border: solid 1px #eee;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
            p {
              box-sizing: border-box;
              position: absolute;
              bottom: 0;
              left: 0;
              display: block;
              width: 160px;
              height: 25px;
              line-height: 25px;
              padding: 0 10px;
              font-size: 14px;
              color: #fff;
              background: rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
  }
}
</style>
