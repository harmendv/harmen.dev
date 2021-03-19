<template>
  <div>
    <vue-code
      :code="code"
      language="php"
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
      code: `{
  "compilerOptions": {
    "target": "es2018",
  },
  "include": ["./src/**/*.ts"]
}
`,
    };
  },
};
</script>
