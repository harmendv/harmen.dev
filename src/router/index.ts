import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import PrivacyPage from '@/pages/PrivacyPage.vue';
import TermsPage from '@/pages/TermsPage.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    description?: string;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Harmen de Vries | Frontend Developer',
        description:
          'Frontend portfolio of Harmen de Vries, focused on clean web interfaces, design systems, and developer tooling.',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage,
      meta: {
        title: 'Privacy Policy | Harmen de Vries',
        description:
          'Privacy policy for harmen.dev and related subdomains, including analytics, advertising, cookies, and third-party services.',
      },
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsPage,
      meta: {
        title: 'Terms of Use | Harmen de Vries',
        description:
          'Terms of use for harmen.dev covering content ownership, informational use, third-party links, and updates.',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 24,
        behavior: 'smooth',
      };
    }

    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.afterEach((to) => {
  const defaultTitle = 'Harmen de Vries | Frontend Developer';
  const defaultDescription =
    'Frontend portfolio of Harmen de Vries, focused on clean web interfaces, design systems, and developer tooling.';

  document.title = to.meta.title ?? defaultTitle;

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', to.meta.description ?? defaultDescription);
  }
});

export default router;
