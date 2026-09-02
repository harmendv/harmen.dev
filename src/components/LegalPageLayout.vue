<script setup>
import { ArrowLeft } from "lucide-vue-next";
import { RouterLink } from "vue-router";

defineProps({
    title: {
        type: String,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <main
        id="main-content"
        class="px-6 py-8 sm:px-8 lg:px-10"
    >
        <div class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col">
            <div class="mb-8">
                <RouterLink
                    to="/"
                    class="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    title="Go to home page"
                >
                    <ArrowLeft
                        aria-hidden="true"
                        class="size-4"
                    />
                    Back to harmen.dev
                </RouterLink>
            </div>

            <div class="max-w-4xl">
                <h1
                    class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
                >
                    {{ title }}
                </h1>
                <p
                    class="mt-5 text-base leading-8 text-muted-foreground sm:text-lg"
                >
                    {{ intro }}
                </p>
            </div>

            <div class="prose max-w-none">
                <slot />
            </div>
        </div>
    </main>
</template>
