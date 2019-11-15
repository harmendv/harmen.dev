<template>
  <div>
    <vue-code :code="code" />
  </div>
</template>

<script>
import VueCode from '@/components/VueCode.vue';

export default {
  components: {
    VueCode,
  },
  data() {
    return {
      code: {
        name: 'harmen.dev',
        version: '3.11.1987',
        author: 'Harmen de Vries',
        description: 'Frontend developer',
        repository: {
          type: 'git',
          url: 'https://github.com/harmendv/harmen.dev',
        },
        devDependencies: {
          vue: '^2.6.10',
          webpack: '^4.41.2',
          eslint: '^6.6.0',
          stylelint: '^11.1.1',
          sass: '^1.23.0',
          moment: '^2.24.0',
          lodash: '^4.17.15',
          axios: '^0.19.0',
          phpstorm: '2019.1.4',
          sketch: '^60.88103',
          figma: '^1.0.0',
          macOs: '^10.15',
          'microsoft-windows': '^1909',
          'elementary-os': '^5.0',
        },
        dependencies: {
          wife: '^v1.0.4-14-g2414721',
        },
      },
    };
  },
};
</script>
