<template>
  <div id="app">
    <router-view />
    <footer-box></footer-box>
    <div id="contact-box">
      <div id="contact-kf"></div>
      <div id="contact-top" v-show="winScrollTop>800">返回顶部</div>
    </div>
  </div>
</template>

<script>
import footer from "./components/footer.vue"
export default {
  components:{"footerBox":footer},
  data() {
    return {
      winScrollTop : 0
    };
  },
  methods: {
    handleScroll(){
      this.winScrollTop = document.documentElement.scrollTop;
    }
  },
  mounted(){
    window.addEventListener("scroll", this.handleScroll,true)
  }
};
</script>

<style>
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
#contact-box{
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 235px;
  height: 85px;
  z-index: 999;
  background: fuchsia;
}
#contact-box #contact-top{
  font-size: 12px;
  color: #fff;
}
</style>
