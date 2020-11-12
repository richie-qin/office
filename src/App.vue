<template>
  <div id="app">
    <router-view />
    <footer-box></footer-box>
    <!-- <div id="contact-box">
      <div id="contact-kf">
        <img src="./assets/image/kf.png" alt="">
        <div id="phone-icon"></div>
        <div id="wx-icon"></div>
        <div></div>
      </div>
      <div id="contact-top" v-show="winScrollTop > 600" @click="backtop">
        ∧返回顶部
      </div>
    </div> -->
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
    // window.addEventListener("scroll", this.handleScroll, true);
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
  width: 235px;
  height: 85px;
  z-index: 999;
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
    float: right;
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
