<template>
  <div
    class="terminal"
    :class="{'is-opened': opened}"
  >
    <div
      class="terminal-header"
      @click="opened = !opened"
    >
      <vue-icon
        name="terminal"
        label="terminal"
      />
    </div>
    <vue-command
      v-if="opened"
      :yargs-options="{ alias: { color: ['colour'] } }"
      :commands="commands"
      hide-bar
      prompt="~you@harmen.dev"
    />
  </div>
</template>

<script>
import VueCommand from 'vue-command';
import VueIcon from '@/components/VueIcon.vue';
import 'vue-command/dist/vue-command.css';

export default {
  components: {
    VueIcon,
    VueCommand,
  },
  data() {
    return {
      intro: 'Welcome to harmen.dev<br />Type <em>help</em> to list the available commands.',
      opened: false,
      commands: {
        // yargs arguments
        help: () => 'Available commands: <br/> help rockbox play',
        about: () => 'about time to <a target="_blank" href="https://www.youtube.com/watch?v=oEGL7j2LN84">click here.</a>',
        rockbox: () => {
          setTimeout(() => {
            window.open('http://rockbox.harmen.dev', '_blank');
          }, 2000);
          return 'Opening rockbox.harmen.dev';
        },
        clear: () => {
          this.opened = false; setTimeout(() => { this.opened = true; }, 1);
        },
        play: ({ _ }) => {
          const list = {
            hotel: 'https://www.youtube.com/watch?v=1p7C1Qa2C2Y',
            blues: 'https://www.youtube.com/watch?v=V6aZZFnZUVk',
            sephora: 'https://www.youtube.com/watch?v=IyXQmi-94Dg',
            minor: 'https://www.youtube.com/watch?v=UGCxrt7Gcb4',
          };
          if (_[1] === 'list') {
            return Object.keys(list).toString();
          }
          if (Array.from(Object.keys(list)).includes(_[1])) {
            setTimeout(() => {
              window.open(list[_[1]], '_blank');
            }, 2000);
            return `Opening '${_[1]}' in a new window with uri <a href="${list[_[1]]}">${list[_[1]]}</a>`;
          }
          return 'Use \'play &lt;name&gt;\'. Use \'play list\' to see all available play alongs.';
        },
      },
    };
  },
  methods: {

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
