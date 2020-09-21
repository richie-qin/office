import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: () => import('../views/index.vue'),
    meta:{
      title: '首页'
    }
  },
  {
    path: '/lookup',
    name: 'lookup',
    component: () => import('../views/lookup.vue'),
    meta:{
      title: '找办公室'
    }
  },
  {
    path: '/entrust',
    name: 'entrust',
    component: () => import('../views/entrust.vue'),
    meta:{
      title: '委托找房'
    }
  },
  {
    path: '/throwIn',
    name: 'throwIn',
    component: () => import('../views/throwIn.vue'),
    meta:{
      title: '投放房源'
    }
  },
  {
    path: '/gift',
    name: 'gift',
    component: () => import('../views/gift.vue'),
    meta:{
      title: '企业礼包'
    }
  },
  {
    path: '/mapLookup',
    name: 'mapLookup',
    component: () => import('../views/mapLookup.vue'),
    meta:{
      title: '地图找房'
    }
  },
  { path: '*', redirect: '/index' }   /*默认跳转路由*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
