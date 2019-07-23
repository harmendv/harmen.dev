import Vue from 'vue';
import Router from 'vue-router';

// Routes with code splitting
const Index = () => import(/* webpackChunkName: "view-index" */'@/views/Index.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
  ],
});
