<script setup lang="ts">
import { GithubIcon } from 'lucide-vue-next';
</script>

<template>
    <a href="https://github.com/harmendv" class="flex flex-col items-center hover-effect cursor-help" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <img src="/images/logo.png" class="w-24 mb-3" alt="harmendv">
    </a>
</template>

<style lang="scss">
html {
    height: 100%;
}

body {
    margin: 0;
    background: #fde000;
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
</style>
