<template>
  <div id="app">
    <vue-menu>
      <vue-menu-group title="harmen.dev">
        <vue-menu-item
          to="/eslint"
          label=".eslintrc.js"
          icon="settings"
        />
        <vue-menu-item
          to="/gitignore"
          label=".gitignore"
          icon="github"
        />
        <vue-menu-item
          to="/babel"
          label="babel.config.js"
          icon="settings"
        />
        <vue-menu-item
          to="/valet"
          label="LocalValetDriver.php"
          icon="code"
        />
        <vue-menu-item
          to="/"
          label="package.json"
        />
        <vue-menu-item
          to="/readme"
          icon="file-text"
          label="README.md"
        />
        <vue-menu-item
          to="/stylelint"
          label="stylelint.config.js"
          icon="settings"
        />
      </vue-menu-group>
    </vue-menu>
    <main>
      <vue-open-files :files="openFiles" />
      <div class="content">
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </div>
      <vue-terminal />
    </main>
  </div>
</template>

<script>
import '@/assets/sass/app.scss';

import VueMenu from '@/components/VueMenu.vue';
import VueMenuItem from '@/components/VueMenuItem.vue';
import VueMenuGroup from '@/components/VueMenuGroup.vue';
import VueOpenFiles from '@/components/VueOpenFiles.vue';
import VueTerminal from '@/components/VueTerminal.vue';

import eventBus from '@/utils/eventBus';

export default {
  components: {
    VueMenu,
    VueMenuItem,
    VueMenuGroup,
    VueOpenFiles,
    VueTerminal,
  },
  data() {
    return {
      openFiles: [],
    };
  },
  watch: {
    $route: {
      handler(to) {
        // On mount check the path and add it
        let openFilesContainsPathOnLoad = false;
        this.openFiles.forEach((file) => {
          if (file.path === to.path) {
            openFilesContainsPathOnLoad = true;
          }
        });
        // Add files
        if (!openFilesContainsPathOnLoad && to.meta.label) {
          this.openFiles.push({ label: to.meta.label, path: to.path, icon: to.meta.icon });
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // On closing a file
    eventBus.$on('close-file', (data) => {
      // Find the index of the file and remove it
      let index = false;
      this.openFiles.forEach((file, i) => {
        if (file.label === data.label) {
          index = i;
        }
      });
      // Remove the index from the array
      this.openFiles.splice(index, 1);
      // Go to the previous index in the array
      const path = this.openFiles[index - 1]
        ? this.openFiles[index - 1].path : this.openFiles[0].path;
      this.viewPath(path);
    });
  },
  methods: {
    viewPath(p) {
      this.$router.push({
        path: p,
      });
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.03s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
