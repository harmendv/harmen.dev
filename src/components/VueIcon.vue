<template>
  <div
    class="icon"
    :class="classObject"
    :style="'line-height: ' + size + 'px'"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="rawSvg"
      class="icon-icon"
      :style="'width: ' + size + 'px; height: ' + size + 'px'"
      v-html="svg"
    />
    <!-- eslint-enable vue/no-v-html -->
    <div
      v-if="label"
      class="icon-label"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    set: {
      type: String,
      default: 'feather',
      required: false,
      validator(val) {
        // Sets:
        // feather: npm install feather-icons
        // custom: @/assets/icons/custom
        return ['feather', 'custom'].includes(val);
      },
    },
    name: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 16,
    },
    stroke: {
      type: Number,
      default: 2,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    animate: {
      type: String,
      default: null,
      validator(value) {
        // The value must match one of these strings
        return ['rotate'].indexOf(value) !== -1;
      },
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rawSvg: null,
    };
  },
  computed: {
    animateClassName() {
      return (this.animate ? `is-animate-${this.animate}` : '');
    },
    classObject() {
      return {
        [this.animateClassName]: this.animate,
        'is-labeled': this.label,
      };
    },
    svg() {
      return this.rawSvg
        ? this.rawSvg
          .replace('height="24"', `height="${this.size}"`)
          .replace('width="24"', `width="${this.size}"`)
        : null;
    },
  },
  watch: {
    name() {
      this.getIcon();
    },
    set() {
      this.getIcon();
    },
  },
  mounted() {
    this.getIcon();
  },
  methods: {
    getIcon() {
      if (!this.name) return;

      if (this.set === 'feather') {
        import(/* webpackChunkName: "icon-feather-[request]" */`!raw-loader!feather-icons/dist/icons/${this.name}.svg`).then((data) => {
          this.rawSvg = data.default;
        }).catch(() => { this.rawSvg = null; });
      } else if (this.set === 'custom') {
        import(/* webpackChunkName: "icon-custom-[request]" */`!raw-loader!@/assets/images/icons/${this.name}.svg`).then((data) => {
          this.rawSvg = data.default;
        }).catch(() => { this.rawSvg = null; });
      }
    },
  },
};
</script>

<style lang="scss">
.icon {
  display: inline-flex;
  align-items: center;

  &.is-rounded {
    .icon-icon,
    .icon-icon::after {
      border-radius: var(--border-radius);
    }
  }

  &.is-outlined {
    .icon-icon::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: solid 1px rgba(0, 0, 0, 0.1);
    }
  }

  &.is-animate-rotate {
    .icon-icon {
      animation: rotate 700ms infinite linear;
    }
  }

  &.is-labeled .icon-icon {
    margin-right: 5px;
  }
}

.icon-icon {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  line-height: 0;

  svg {
    width: 100%;
    height: 100%;
  }

  .feather {
    stroke-linecap: round;
    stroke: currentColor;
    fill: none;
    stroke-linejoin: round;
  }
}

.icon-label {
  margin-right: 5px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}
</style>
