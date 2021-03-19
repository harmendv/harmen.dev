import Vue from 'vue';
import Router from 'vue-router';

// Routes with code splitting
const PackageJson = () => import(/* webpackChunkName: "view-package-json" */'@/views/PackageJson.vue');
const GitIgnore = () => import(/* webpackChunkName: "view-gitignore" */'@/views/GitIgnore.vue');
const Eslint = () => import(/* webpackChunkName: "view-eslint" */'@/views/Eslint.vue');
const Babel = () => import(/* webpackChunkName: "view-babel" */'@/views/Babel.vue');
const Stylelint = () => import(/* webpackChunkName: "view-stylelint" */'@/views/Stylelint.vue');
const Tsconfig = () => import(/* webpackChunkName: "view-tsconfig" */'@/views/Tsconfig.vue');
const Readme = () => import(/* webpackChunkName: "view-readme" */'@/views/Readme.vue');

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'is-active-exact',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: PackageJson,
      meta: {
        label: 'package.json',
        icon: 'file',
      },
    },
    {
      path: '/eslint',
      name: 'eslint',
      component: Eslint,
      meta: {
        label: '.eslintrc.js',
        icon: 'settings',
      },
    },
    {
      path: '/gitignore',
      name: 'gitignore',
      component: GitIgnore,
      meta: {
        label: '.gitignore',
        icon: 'github',
      },
    },
    {
      path: '/babel',
      name: 'babel',
      component: Babel,
      meta: {
        label: 'babel.config.js',
        icon: 'settings',
      },
    },
    {
      path: '/stylelint',
      name: 'stylelint',
      component: Stylelint,
      meta: {
        label: 'stylelint.config.js',
        icon: 'settings',
      },
    },
    {
      path: '/tsconfig',
      name: 'tsconfig',
      component: Tsconfig,
      meta: {
        label: 'tsconfig.json',
        icon: 'code',
      },
    },
    {
      path: '/readme',
      name: 'readme',
      component: Readme,
      meta: {
        label: 'README.md',
        icon: 'file-text',
      },
    },
  ],
});
