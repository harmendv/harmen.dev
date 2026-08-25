<script setup lang="ts">
import { computed } from "vue";
import { Moon, Sun } from "lucide-vue-next";

import { useTheme } from "@/composables/useTheme";

const { resolvedTheme, toggleTheme } = useTheme();

const label = computed(() =>
    resolvedTheme.value === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme"
);
</script>

<template>
    <button
        type="button"
        class="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary hover:text-primary"
        :aria-label="label"
        :title="label"
        @click="toggleTheme"
    >
        <Moon
            v-if="resolvedTheme === 'light'"
            aria-hidden="true"
            class="size-4"
        />
        <Sun
            v-else
            aria-hidden="true"
            class="size-4"
        />
    </button>
</template>
