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
        presets: [
          ['@vue/app', {
            useBuiltIns: 'entry',
          }],
        ],
      },
    };
  },
};
</script>
