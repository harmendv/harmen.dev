<template>
  <div>
    <!-- eslint-disable -->
    <vue-code># harmen.dev
[E-mail](mailto:mail@harmen.dev)
    </vue-code>
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
      code: '',
    };
  },
};
</script>
