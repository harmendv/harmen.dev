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
      code: `module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
};
`,
    };
  },
};
</script>
