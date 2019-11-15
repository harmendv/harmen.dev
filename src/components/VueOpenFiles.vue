<template>
  <div class="open-files">
    <div
      v-for="(file, index) in files"
      :key="index"
      class="open-file"
      :class="{'is-active': file.path === $route.path }"
      @click.self="$router.push({ path: file.path })"
    >
      {{ file.label }}
      <vue-icon
        v-if="files.length > 1"
        class="open-file-close"
        name="x"
        @click.native="onClickClose(file)"
      />
    </div>
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
    files: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    onClickClose(file) {
      eventBus.$emit('close-file', { ...file });
    },
  },
};
</script>

<style lang="scss" scoped>
.open-files {
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .open-file {
    flex-shrink: 0;
    margin-right: 1px;
    padding: 10px 20px;
    color: var(--menu-color);
    cursor: pointer;

    .open-file-close {
      opacity: 0.2;

      &:hover {
        opacity: 1;
      }
    }

    &.is-active {
      background-color: var(--file-background);
      color: var(--menu-color-active);
    }
  }
}
</style>
