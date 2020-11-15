import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    component: () => import('../views/index.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/building',
    name: 'building',
    component: () => import('../views/building.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('../views/resource.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/entrust',
    name: 'entrust',
    component: () => import('../views/entrust.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/houseDetails',
    name: 'houseDetails',
    component: () => import('../views/houseDetails.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/edificeDetails',
    name: 'edificeDetails',
    component: () => import('../views/edificeDetails.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/throwIn',
    name: 'throwIn',
    component: () => import('../views/throwIn.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/gift',
    name: 'gift',
    component: () => import('../views/gift.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/mapLookup',
    name: 'mapLookup',
    component: () => import('../views/mapLookup.vue'),
    meta:{
      title: '巧租'
    }
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('../views/calculator.vue'),
    meta:{
      title: '巧租'
    }
  },
  { path: '*', redirect: '/index' }   /*默认跳转路由*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  //切换页面置顶
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});



export default router;
