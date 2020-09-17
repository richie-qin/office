import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    meta:{
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue'),
    meta:{
      title: 'about'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
