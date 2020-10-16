<template>
  <div class="open-files">
    <div
      v-for="(file, index) in files"
      :key="index"
      class="open-file"
      :class="{'is-active': file.path === $route.path }"
      @click.self="onClickFile(file)"
    >
      <vue-icon
        :name="file.icon"
        :label="file.label"
        class="open-file-title"
      />
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
    onClickFile(file) {
      if (file.path !== this.$route.path) this.$router.push({ path: file.path });
    },
  },
};
</script>

<style lang="scss" scoped>
.open-files {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 41px;
  overflow: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    padding: 4px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar);
  }

  .open-file {
    flex-shrink: 0;
    padding: 10px 20px;
    color: var(--menu-color);
    cursor: pointer;

    .open-file-title {
      pointer-events: none;
      user-select: none;
    }

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
