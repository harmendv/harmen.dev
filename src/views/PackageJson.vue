<template>
  <div>
    <vue-code
      :code="code"
      language="js"
    />
  </div>
</template>

<script>
import axios from 'axios';
import VueCode from '@/components/VueCode.vue';

export default {
  components: {
    VueCode,
  },
  data() {
    return {
      code: '',
      packageJson: {
        name: 'harmen.dev',
        version: '3.11.1987',
        author: 'Harmen de Vries',
        description: 'Frontend developer',
        repository: {
          type: 'git',
          url: 'https://github.com/harmendv',
        },
        devDependencies: {
          '@babel/core': '@latest',
          '@testing-library/vue': '@latest',
          '@testing-library/jest-dom': '@latest',
          vue: '@latest',
          webpack: '@latest',
          rollup: '@latest',
          eslint: '@latest',
          stylelint: '@latest',
          jest: '@latest',
          'vue-jest': '@latest',
          typescript: '@latest',
          node: '@latest',
          sass: '@latest',
        },
        dependencies: {
          wife: '^v1.0.4-14-g2414721',
          son: '0',
        },
      },
    };
  },
  computed: {
    sonAge() {
      const diff = this.dateDiff('2020-02-05', new Date());
      return `${diff.years}.${diff.months}.${diff.days}.${diff.hours}.${diff.minutes}`;
    },
  },
  watch: {
    packageJson: {
      handler() {
        this.createCode();
      },
      deep: true,
    },
  },
  created() {
    this.createCode();
    this.fetchVersions();
    this.setSonsAge();
  },
  methods: {
    fetchVersions() {
      Object.entries(this.packageJson.devDependencies).forEach((row) => {
        axios.get(`https://cdn.jsdelivr.net/npm/${row[0]}/package.json`)
          .then((response) => {
            this.$set(this.packageJson.devDependencies, row[0], response.data.version);
          });
      });
    },
    createCode() {
      this.code = JSON.stringify(this.packageJson, null, 2);
    },
    setSonsAge() {
      this.$set(this.packageJson.dependencies, 'son', this.sonAge);
    },
    dateDiff(str1, str2) {
      const diff = Date.parse(str2) - Date.parse(str1);
      return Number.isNaN(diff) ? NaN : {
        diff,
        minutes: Math.floor((diff / 60000)),
        hours: Math.floor(((diff / 3600000) + 2)),
        days: Math.floor((diff / 86400000)),
        months: Math.floor((diff / 2.628e9)),
        years: Math.floor((diff / 3.154e10)),
      };
    },
  },
};
</script>
