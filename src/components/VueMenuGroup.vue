<template>
  <div class="menu-group">
    <div
      v-if="title"
      class="menu-group-title"
    >
      <vue-icon name="folder" /> {{ title }}
    </div>
    <slot />
  </div>
</template>

<script>
import VueIcon from '@/components/VueIcon.vue';

export default {
  components: { VueIcon },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
  .menu-group {
    display: flex;
    flex-direction: column;

    .menu-group-title {
      margin-bottom: 10px;
    }

    .menu-item {
      margin-left: 10px;
    }
  }
</style>
