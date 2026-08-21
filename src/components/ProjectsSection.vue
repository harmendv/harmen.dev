<script setup lang="ts">
import ContentBadge from "@/components/ContentBadge.vue";
import type { Project } from "@/types/site";

defineProps<{
    projects: Project[];
}>();
</script>

<template>
    <section
        id="projects"
        tabindex="-1"
        aria-labelledby="projects-heading"
        class="scroll-mt-24 px-6 py-4 sm:px-8"
    >
        <div class="mx-auto max-w-4xl">
            <h2
                id="projects-heading"
                class="mb-5 text-xl font-semibold tracking-[-0.03em] text-foreground"
            >
                Projects
            </h2>

            <div class="space-y-6">
                <a
                    v-for="project in projects"
                    :key="project.title"
                    :href="project.href"
                    target="_blank"
                    rel="noreferrer"
                    class="block rounded-md border border-border bg-card px-4 py-4 shadow-md shadow-gray-50 dark:shadow-black transition hover:border-primary hover:opacity-85 hover:shadow-gray-200 dark:hover:shadow-black sm:px-5"
                    :aria-label="`${project.title} project link${project.href.startsWith('http') ? ', opens in a new tab' : ''}`"
                    :title="`Open ${project.title}`"
                >
                    <h3 class="text-md font-semibold text-foreground">
                        {{ project.title }}
                    </h3>
                    <p class="mt-3 text-md leading-8 text-muted-foreground">
                        {{ project.description }}
                    </p>
                    <div class="mt-4 flex flex-wrap gap-2">
                        <ContentBadge
                            v-for="tag in project.tags"
                            :key="
                                typeof tag === 'string'
                                    ? tag
                                    : `${tag.icon}-${tag.text}`
                            "
                            :item="tag"
                        />
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>
