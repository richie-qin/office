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
    path: '/building',
    name: 'building',
    component: () => import('../views/building.vue'),
    meta:{
      title: '楼宇'
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('../views/resource.vue'),
    meta:{
      title: '房源'
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
    path: '/houseDetails',
    name: 'houseDetails',
    component: () => import('../views/houseDetails.vue'),
    meta:{
      title: '房子详情'
    }
  },
  {
    path: '/edificeDetails',
    name: 'edificeDetails',
    component: () => import('../views/edificeDetails.vue'),
    meta:{
      title: '大厦详情'
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
