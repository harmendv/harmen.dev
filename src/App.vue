<template>
    <lv-theme-toggle
        class="theme-toggle"
        v-model="theme"
    ></lv-theme-toggle>
    <transition name="fade">
        <portfolio-card
            v-show="visible"
            @mounted="onMountedPortfolioCard"
            name="Harmen de Vries"
            job-title="front-end developer"
            github-url="https://github.com/harmendv"
        >
            <repository-info
                :image-url="LibvueLogo"
                title="@libvue/core"
                description="Vue3 component library"
                github-url="https://github.com/libvue/core#a-collection-of-vue-3-components"
                docs-url="https://libvue.github.io/core/#/docs/install"
            />
            <repository-info
                :image-url="LibvueLogo"
                title="@libvue/laravel-orion-api"
                description="Laravel Orion JS Intergration"
                github-url="https://github.com/libvue/laravel-orion-api#laravel-orion-api"
            />
            <repository-info
                :image-url="GuitarScalesLogo"
                title="harmendv/guitar-scales"
                description="Visualize your guitar scales"
                github-url="https://github.com/harmendv/guitar-scales"
            />
        </portfolio-card>
    </transition>
</template>

<script>
import { LvThemeToggle } from "@libvue/core";
import PortfolioCard from "./components/PortfolioCard.vue";
import RepositoryInfo from "./components/RepositoryInfo.vue";
import LibvueLogo from "./assets/libvue-logo.png";
import GuitarScalesLogo from "./assets/guitar-scales-logo.png";

export default {
    components: {
        LvThemeToggle,
        PortfolioCard,
        RepositoryInfo,
    },
    data() {
        return {
            theme: this.preferredColorScheme(),
            visible: false,
            LibvueLogo,
            GuitarScalesLogo,
        };
    },
    mounted() {
        if (localStorage.getItem("theme")) {
            this.theme = localStorage.getItem("theme");
            document.body.setAttribute("data-theme", this.theme);
        }
    },
    watch: {
        theme(val) {
            document.body.setAttribute("data-theme", val);
            localStorage.setItem("theme", val);
        },
    },
    methods: {
        preferredColorScheme() {
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                return "dark";
            }
            return "light";
        },
        onMountedPortfolioCard() {
            setTimeout(() => {
                this.visible = true;
            }, 30);
        },
    },
};
</script>

<style lang="scss">
@import "@libvue/core";
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

html {
    height: 100%;
    font-family: "Inter", sans-serif;
}

body {
    margin: 0;
    padding: 2rem;
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    flex-direction: row;
}

#app {
    display: flex;
    align-items: center;
    justify-content: center;
}

::selection {
    background: #e4eae4;
}
::-moz-selection {
    background: #e4eae4;
}

.theme-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateZ(0) perspective(1000px) translate(0, -80px) scale(0.95)
        rotate3d(1, 0, 0, 20deg);
}
</style>
