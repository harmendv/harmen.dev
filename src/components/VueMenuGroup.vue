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
      <vue-icon :name="isOpened ? 'folder-minus' : 'folder-plus'" /> {{ title }}
    </div>
    <transition name="expand">
      <div
        v-if="isOpened"
        class="menu-group-items"
      >
        <slot />
      </div>
    </transition>
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

    .menu-group-items {
      height: 100%;
      margin-left: 10px;
      overflow: hidden;
    }
  }

  /* TRANSITION */
  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.2s;
  }

  .expand-enter,
  .expand-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
