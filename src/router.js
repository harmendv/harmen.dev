import Vue from 'vue';
import Router from 'vue-router';

// Routes with code splitting
const Index = () => import(/* webpackChunkName: "view-index" */'@/views/Index.vue');
const GitIgnore = () => import(/* webpackChunkName: "view-gitignore" */'@/views/GitIgnore.vue');
const Eslint = () => import(/* webpackChunkName: "view-eslint" */'@/views/Eslint.vue');

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'is-active-exact',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        label: 'package.json',
      },
    },
    {
      path: '/eslint',
      name: 'eslint',
      component: Eslint,
      meta: {
        label: '.eslintrc.js',
      },
    },
    {
      path: '/gitignore',
      name: 'gitignore',
      component: GitIgnore,
      meta: {
        label: '.gitignore',
      },
    },
    {
      path: '/babel',
      name: 'babel',
      component: Index,
      meta: {
        label: 'babel.config.js',
      },
    },
    {
      path: '/stylelint',
      name: 'stylelint',
      component: Index,
      meta: {
        label: 'stylelint.config.js',
      },
    },
    {
      path: '/valet',
      name: 'valet',
      component: Index,
      meta: {
        label: 'LocalValetDriver.php',
      },
    },
    {
      path: '/readme',
      name: 'readme',
      component: Index,
      meta: {
        label: 'README.md',
      },
    },
  ],
});
