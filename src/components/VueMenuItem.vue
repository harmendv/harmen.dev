<template>
  <div
    class="menu-item"
  >
    <router-link
      :to="to"
      tag="div"
      exact
      :class="{'is-active': active }"
      @click.native="onClickMenuItem"
    >
      <vue-icon
        :name="icon"
        :label="label"
      />
    </router-link>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus';
import VueIcon from '@/components/VueIcon.vue';

export default {
  components: {
    VueIcon,
  },
  props: {
    to: {
      type: String,
      default: '/',
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: true,
    },
    icon: {
      type: String,
      default: 'file',
      required: false,
    },
  },
  methods: {
    onClickMenuItem() {
      eventBus.$emit('click-menu-item', { label: this.label, path: this.to });
    },
  },
};
</script>

<style scoped lang="scss">
.menu-item {
  width: 100%;
  margin-bottom: 5px;
  font-weight: 200;
  cursor: pointer;

  .is-active {
    color: var(--menu-color-active);
  }
}
</style>
