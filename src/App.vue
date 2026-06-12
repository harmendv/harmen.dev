<template>
    <div class="min-h-screen bg-background text-foreground">
        <a
            href="#main-content"
            class="sr-only fixed left-4 top-4 z-50 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            Skip to main content
        </a>
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
