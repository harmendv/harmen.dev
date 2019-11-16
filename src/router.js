import Vue from 'vue';
import Router from 'vue-router';

// Routes with code splitting
const Index = () => import(/* webpackChunkName: "view-index" */'@/views/Index.vue');
const GitIgnore = () => import(/* webpackChunkName: "view-gitignore" */'@/views/GitIgnore.vue');
const Eslint = () => import(/* webpackChunkName: "view-eslint" */'@/views/Eslint.vue');
const Babel = () => import(/* webpackChunkName: "view-babel" */'@/views/Babel.vue');
const Stylelint = () => import(/* webpackChunkName: "view-stylelint" */'@/views/Stylelint.vue');
const Valet = () => import(/* webpackChunkName: "view-valet" */'@/views/Valet.vue');
const Readme = () => import(/* webpackChunkName: "view-readme" */'@/views/Readme.vue');

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
      component: Babel,
      meta: {
        label: 'babel.config.js',
      },
    },
    {
      path: '/stylelint',
      name: 'stylelint',
      component: Stylelint,
      meta: {
        label: 'stylelint.config.js',
      },
    },
    {
      path: '/valet',
      name: 'valet',
      component: Valet,
      meta: {
        label: 'LocalValetDriver.php',
      },
    },
    {
      path: '/readme',
      name: 'readme',
      component: Readme,
      meta: {
        label: 'README.md',
      },
    },
  ],
});
