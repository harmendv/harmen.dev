<template>
  <div>
    <vue-code
      :code="code"
      language="text"
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
      code: `.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

n# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`,
    };
  },
};
</script>
