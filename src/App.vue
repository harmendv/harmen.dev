<script setup lang="ts">
import { GithubIcon } from 'lucide-vue-next';
</script>

<template>
    <div class="flex flex-col items-center">
        <img src="/images/logo.png" class="w-20 mb-3" alt="harmendv">
        <a href="https://github.com/harmendv" class="text-sm underline inline-flex items-center gap-1"><GithubIcon :size="16"></GithubIcon>harmendv</a>
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

html {
    height: 100%;
    font-family: 'Inter', sans-serif;
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
