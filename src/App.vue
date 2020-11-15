<template>
  <div id="app">
    <router-view />
    <footer-box></footer-box>
    <div id="contact-box">
      <!-- <div id="contact-kf">
        <img src="./assets/image/kf.png" alt="">
        <div id="phone-icon"></div>
        <div id="wx-icon"></div>
        <div></div>
      </div> -->
      <router-link to="/calculator" id="area-calculation" >面积测算器</router-link>
      <router-link to="/entrust" id="area-calculation" >委托找房</router-link>
      <div id="contact-top" v-show="winScrollTop > 600" @click="backtop">
        ∧返回顶部
      </div>
    </div>
  </div>
</template>

<script>
import footer from "./components/footer.vue";
export default {
  components: { footerBox: footer },
  data() {
    return {
      winScrollTop: 0,
    };
  },
  methods: {
    handleScroll() {
      this.winScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    backtop() {
      var timer = setInterval(function() {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
button,
a {
  outline: none;
  border: none;
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
}
div {
  box-sizing: border-box;
  font-size: 0;
}
#contact-box {
  position: fixed;
  right: 0px;
  bottom: 0px;
  height: 85px;
  z-index: 999;
  display: flex;
  align-items: center;
  width: 198px;
  flex-wrap: wrap;
  justify-content: flex-end;
  #area-calculation{
    display: block;
    height: 40px;
    background: #ffb200;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    padding: 0 15px;
    border-radius: 30px;
    cursor: pointer;
    margin: 0 5px;
  }
  #contact-kf{
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
      width: 120px;
      height: 48px;
      cursor: pointer;
    }
    #phone-icon{
      width: 48px;
      height: 48px;
      background-color: #eee;
      background-image: url("./assets/image/phone.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 5px;
      cursor: pointer;
      &:hover{
        background-color: #eee;
        background-image: url("./assets/image/act-phone.png");
      }
    }
    #wx-icon{
      width: 48px;
      height: 48px;
      background-color: #eee;
      background-image: url("./assets/image/wx.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 5px;
      cursor: pointer;
      &:hover{
        background-color: #eee;
        background-image: url("./assets/image/act-wx.png");
      }
    }
  }
  #contact-top {
    flex: none;
    font-size: 12px;
    color: #fff;
    width: 86px;
    height: 26px;
    line-height: 26px;
    padding-right: 6px;
    margin-top: 11px;
    background: #535353;
    border-radius: 5px 5px 0 0;
    text-align: center;
    cursor: pointer;
  }
}
.BMap_cpyCtrl{
  display: none;
}
.el-button--primary{
  border: none !important;
}
.el-select__caret{
  color: #fff !important;
}
.el-input-group__append, .el-input-group__prepend{
  border: none !important;
}

</style>
