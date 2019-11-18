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
      prompt="~root@harmen.dev"
      intro="Welcome to harmen.dev"
      show-intro
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
      opened: true,
      commands: {
        // yargs arguments
        help: () => 'Available commands: <br/> help rockbox playalong',
        about: () => 'about time to <a target="_blank" href="https://www.youtube.com/watch?v=oEGL7j2LN84">click here.</a>',
        rockbox: () => {
          setTimeout(() => {
            window.location = 'http://rockbox.harmen.dev';
          }, 2000);
          return 'Redirecting you to rockbox.harmen.dev. Goodbye :-)';
        },
        playalong: ({ _ }) => {
          const list = {
            hotel: 'https://www.youtube.com/watch?v=1p7C1Qa2C2Y',
            blues: 'https://www.youtube.com/watch?v=V6aZZFnZUVk',
            sephora: 'https://www.youtube.com/watch?v=IyXQmi-94Dg',
            minor: 'https://www.youtube.com/watch?v=UGCxrt7Gcb4',
          };
          console.log(_[1]);
          if (_[1] === 'list') {
            return Object.keys(list).toString();
          }
          console.log(Array.from(Object.keys(list)), _[1]);
          if (Array.from(Object.keys(list)).includes(_[1])) {
            window.open(list[_[1]], '_blank');
          }
          return 'Use \'playalong &lt;name&gt;\'. Use \'playalong list\' to see all available play alongs.';
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
    background-color: #1c1d27;
    color: #787d9b;
    cursor: pointer;
  }

  .vue-command {
    .term {
      border: 0;
    }

    .term-std {
      min-height: 300px;
      max-height: 300px;
      overflow-y: scroll;
      border: 0;
      background-color: #17181f;
    }
  }
}
</style>
