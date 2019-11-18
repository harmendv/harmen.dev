<template>
  <div
    class="menu-group"
    :class="{'is-opened': isOpened}"
  >
    <div
      v-if="title"
      class="menu-group-title"
      @click="isOpened = !isOpened"
    >
      <vue-icon name="folder" /> {{ title }}
    </div>
    <div
      v-if="isOpened"
      class="menu-group-items"
    >
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
  data() {
    return {
      isOpened: this.opened,
    };
  },
  methods: {
    toggle() {
      console.log('test');
    },
  },
};
</script>

<style scoped lang="scss">
  .menu-group {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .menu-group-title {
      margin-bottom: 10px;
    }

    .menu-item {
      margin-left: 10px;
    }
  }
</style>
