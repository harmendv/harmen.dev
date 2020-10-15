<template>
  <div
    class="menu"
    :class="{'menu--open': isOpened}"
  >
    <div class="menu__content">
      <slot />
    </div>
    <div
      class="menu__mobile-button"
      @click="onToggleMenu"
    >
      <vue-icon
        v-if="isOpened"
        name="chevron-left"
      />
      <vue-icon
        v-else
        name="chevron-right"
      />
    </div>
  </div>
</template>

<script>
import VueIcon from '@/components/VueIcon.vue';

export default {
  components: {
    VueIcon,
  },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    onToggleMenu() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    z-index: 1;
    flex-direction: row;
    width: var(--menu-width);
    min-height: 100vh;
    background-color: var(--menu-background);
    color: var(--menu-color);
    font-size: 14px;
    font-weight: 200;

    &__content {
      flex-direction: column;
      padding: 10px 20px;
    }

    &__mobile-button {
      display: none;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      width: 20px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  @media (max-width: 600px) {
    .menu {
      position: fixed;
      top: 0;
      margin-left: calc((var(--menu-width) * -1) + 16px);

      &--open {
        margin-left: 0;
      }

      &__mobile-button {
        display: flex;
      }
    }
  }
</style>
