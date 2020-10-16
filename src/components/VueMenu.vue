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
      flex-grow: 0;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 20px;
      margin-left: auto;
      background-color: var(--background);
      cursor: pointer;

      &:hover {
        background-color: #2d2f3c;
      }
    }
  }

  @media (max-width: 600px) {
    .menu {
      $self: &;

      position: fixed;
      top: 0;
      margin-left: calc((var(--menu-width) * -1) + 20px);
      transition: margin-left 0.2s;

      &--open {
        margin-left: 0;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
        #{$self}__mobile-button {
          background-color: #1e1f29;

          &:hover {
            background-color: #2d2f3c;
          }
        }
      }

      &__mobile-button {
        display: flex;
      }
    }
  }
</style>
