<template>
  <div>
    <vue-code :text="text" />
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
      text: '.DS_Store\nnode_modules\n/dist\n\n# local env files\n.env.local\n.env.*.local\n\n# Log files\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# Editor directories and filesv.idea\n.vscode\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?',
    };
  },
};
</script>
