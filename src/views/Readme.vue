<template>
  <div>
    <vue-code
      :code="code"
      language="md"
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
      code: `# harmen.dev
[E-mail](mailto:mail@harmen.dev)`,
    };
  },
};
</script>
