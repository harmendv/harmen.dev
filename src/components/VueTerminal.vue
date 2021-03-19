<template>
  <div
    class="terminal"
    :class="{'is-opened': opened}"
  >
    <div
      class="terminal-header"
      @click="toggleHeader"
    >
      <vue-icon
        name="terminal"
        label="terminal"
      />
    </div>
    <vue-command
      v-show="opened"
      ref="command"
      :commands="commands"
      prompt="~guest@harmen.dev:"
      intro="Welcome at harmen.dev"
      hide-bar
      show-intro
    />
  </div>
</template>

<script>
import VueCommand, { createStdout } from 'vue-command';
import VueIcon from '@/components/VueIcon.vue';
import 'vue-command/dist/vue-command.css';

export default {
  components: {
    VueIcon,
    VueCommand,
  },
  data() {
    return {
      opened: false,
      commands: {
        cd: (val) => {
          if (val._[1]) return createStdout(`cd: no such file or directory: ${val._[1]}`);
          return createStdout('');
        },
        pwd: () => createStdout('/mnt/domains/harmen.dev'),
        open: (val) => {
          if (val._[1] && this.$router.resolve({ name: val._[1] })) {
            this.$router.push({ name: val._[1] });
          }
          return createStdout('');
        },
        npm: (val) => {
          const firstArgument = val._[1] ?? false;
          const secondArgument = val._[2] ?? false;

          if (firstArgument && !secondArgument) {
            if (firstArgument === 'run') {
              return createStdout('Scripts available in harmen.dev via `npm run-script`:<br/>   lint, lint:js, lint:css');
            }
            return createStdout(`Unknown command: npm ${firstArgument}`);
          }

          if (firstArgument && secondArgument) {
            if (firstArgument === 'run') {
              if (secondArgument === 'lint:css') {
                return createStdout('Stylelint: No problems found.');
              }
              if (secondArgument === 'lint:js') {
                return createStdout('Eslint: No problems found.');
              }
              if (secondArgument === 'lint') {
                return createStdout('Eslint: No problems found.<br/>Stylelint: No problems found.');
              }
              return createStdout(`Unknown command: npm ${firstArgument} ${secondArgument}`);
            }
            return createStdout(`Unknown command: npm ${firstArgument} ${secondArgument}`);
          }

          return createStdout('Usage: npm command<br /><br/> where command is one of<br /> - run<br />');
        },
      },
    };
  },
  watch: {
    opened(state) {
      if (state) {
        this.$nextTick(() => {
          this.$refs.command.focus();
        });
      }
    },
  },
  methods: {
    toggleHeader() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss">
.terminal {
  display: flex;
  flex-direction: column;

  &.is-opened .terminal-header {
    color: #c2cbff;
  }

  .terminal-header {
    padding: 5px 10px;
    background-color: #2d2f3c;
    color: #787d9b;
    cursor: pointer;
  }

  .vue-command {
    .term {
      border: 0;
      font-size: 14px;
    }

    input {
      font-size: 14px;
    }

    .term-cont {
      padding: 5px 10px;
    }

    .term-ps {
      display: inline-flex;
      align-items: center;
      margin-right: 0.5rem;
      line-height: 14px;
    }

    .term-std {
      min-height: 300px;
      max-height: 300px;
      overflow-y: scroll;
      border: 0;
      background-color: #1e1f29;

      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        padding: 4px;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--scrollbar);
      }
    }
  }
}
</style>
