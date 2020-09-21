import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from "./vuex/store";
import "amfe-flexible"

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
