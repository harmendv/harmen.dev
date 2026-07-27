<script setup>
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
