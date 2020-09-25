import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from "./vuex/store";
import "amfe-flexible"
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'hXhdGGHffP9cSWanvqpjycVwrO9y7Itl'
});
Vue.config.productionTip = false;

import blackNav from "./components/blackNav";
import searchNav from "./components/searchNav";
Vue.component("blackNav", blackNav);//全局自定义组件
Vue.component("searchNav", searchNav);//全局自定义组件

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
