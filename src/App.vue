<template>
    <transition name="fade">
        <portfolio-card v-show="visible" @mounted="onMountedPortfolioCard" name="Harmen de Vries" job-title="front-end developer" github-url="https://github.com/harmendv">
            <repository-info
                :image-url="LibvueLogo"
                title="@libvue/core"
                description="Vue3 component library"
                github-url="https://github.com/libvue/core#a-collection-of-vue-3-components"
                docs-url="https://libvue.github.io/core/#/docs/install"
            />
            <repository-info :image-url="LibvueLogo" title="@libvue/laravel-orion-api"
                             description="Laravel Orion Javascript Intergration"
                             github-url="https://github.com/libvue/laravel-orion-api#laravel-orion-api"/>
        </portfolio-card>
    </transition>
</template>

<script>
import PortfolioCard from "./components/PortfolioCard.vue";
import RepositoryInfo from "./components/RepositoryInfo.vue";
import LibvueLogo from './assets/libvue-logo.png';

export default {
    components: {
        PortfolioCard,
        RepositoryInfo
    },
    data() {
        return {
            visible: false,
            LibvueLogo
        };
    },
    methods: {
        onMountedPortfolioCard() {
            setTimeout(() => {
                this.visible = true;
            }, 100)
        }
    }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

html {
    height: 100%;
    font-family: 'Inter', sans-serif;
}

body {
    margin: 0;
    padding: 0;
    background: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;

}

::selection {
    background: #e4eae4;
}
::-moz-selection {
    background: #e4eae4;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateZ(0) perspective(1000px) translate(0, -80px) scale(0.95) rotate3d(1, 0, 0, 20deg);

}
</style>
