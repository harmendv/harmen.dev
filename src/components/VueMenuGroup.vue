<template>
  <div
    class="menu-group"
    :class="{'is-opened': opened}"
  >
    <div
      v-if="title"
      class="menu-group-title"
    >
      <vue-icon name="folder" /> {{ title }}
    </div>
    <div class="menu-group-items">
      <slot />
    </div>
  </div>
</template>

<script>
import VueIcon from '@/components/VueIcon.vue';

export default {
  components: { VueIcon },
  props: {
    opened: {
      type: Boolean,
      required: false,
      default: true,
    },
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
