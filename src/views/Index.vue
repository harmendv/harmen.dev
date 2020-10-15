<template>
  <div>
    <vue-code
      :code="code"
      language="js"
    />
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
      devDependencies: [
        'vue',
        'webpack',
        'eslint',
        'stylelint',
        'jest',
        'sass',
        'moment',
        'lodash',
        'axios',
      ],
    };
  },
  computed: {
    sonAge() {
      const diff = this.dateDiff('2020-02-05', new Date());
      return `${diff.years}.${diff.months}.${diff.days}.${diff.hours}.${diff.minutes}`;
    },
    code() {
      return `{
  "name": "harmen.dev",
  "version": "3.11.1987",
  "author": "Harmen de Vries",
  "description": "Frontend developer",
  "repository": {
    "type": "git",
    "url": "https://github.com/harmendv",
  },
  "devDependencies": {
    "vue": "^2.6.10",
    "webpack": "^4.41.2",
    "eslint": "^6.6.0",
    "stylelint": "^11.1.1",
    "sass": "^1.23.0",
    "moment": "^2.24.0",
    "lodash": "^4.17.15",
    "axios": "^0.19.0",
    "phpstorm": "2019.1.4",
    "sketch": "^60.88103",
    "figma": "^1.0.0",
    "macOs": "^10.15",
    "elementary-os": "^5.0",
  },
  "dependencies": {
    "wife": "^v1.0.4-14-g2414721",
    "son": "${this.sonAge}",
  },
},`;
    },
  },
  methods: {
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
