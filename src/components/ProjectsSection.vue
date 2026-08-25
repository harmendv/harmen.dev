<script setup lang="ts">
import { computed } from "vue";

import ContentBadge from "@/components/ContentBadge.vue";
import { Badge } from "@/components/ui/badge";
import type { Project, ProjectStatus } from "@/types/site";

const props = defineProps<{
    projects: Project[];
}>();

const statusLabels: Record<ProjectStatus, string> = {
    new: "New",
    deprecated: "Deprecated",
};

const statusVariants: Record<ProjectStatus, string> = {
    new: "accentOutline",
    deprecated: "outline",
};

/** Newest release first; projects without a release date go last. */
const sortedProjects = computed(() =>
    [...props.projects].sort((a, b) =>
        (b.released ?? "").localeCompare(a.released ?? "")
    )
);

/** Turns a `YYYY-MM` release marker into e.g. "April 2026". */
function formatReleased(released: string): string {
    const [year, month] = released.split("-").map(Number);

    if (!year) {
        return released;
    }

    if (!month) {
        return String(year);
    }

    return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
}
</script>

<template>
    <section
        id="open-source"
        tabindex="-1"
        aria-labelledby="open-source-heading"
        class="scroll-mt-24 px-6 py-4 sm:px-8"
    >
        <div class="mx-auto max-w-4xl">
            <h2
                id="open-source-heading"
                class="mb-5 text-xl font-semibold tracking-[-0.03em] text-foreground"
            >
                Open Source
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a
                    v-for="project in sortedProjects"
                    :key="project.title"
                    :href="project.href"
                    target="_blank"
                    rel="noreferrer"
                    class="flex flex-col rounded-md border border-border bg-card px-4 py-4 shadow-md shadow-gray-50 dark:shadow-black transition hover:border-primary hover:opacity-85 hover:shadow-gray-200 hover:-translate-y-1 dark:hover:shadow-black sm:px-5"
                    :aria-label="`${project.title} project link${project.href.startsWith('http') ? ', opens in a new tab' : ''}`"
                    :title="`Open ${project.title}`"
                >
                    <div class="flex flex-wrap items-center gap-2">
                        <Badge
                            v-if="project.status"
                            :variant="statusVariants[project.status]"
                            class="shrink-0 text-xs"
                        >
                            {{ statusLabels[project.status] }}
                        </Badge>

                        <h3 class="text-md font-semibold text-foreground">
                            {{ project.title }}
                        </h3>
                    </div>

                    <p class="mt-3 text-md leading-8 text-muted-foreground">
                        {{ project.description }}
                    </p>

                    <div class="mt-auto flex flex-wrap gap-2 pt-4">
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

                    <p
                        v-if="project.released"
                        class="mt-4 text-sm text-muted-foreground"
                    >
                        Released
                        <time :datetime="project.released">
                            {{ formatReleased(project.released) }}
                        </time>
                    </p>
                </a>
            </div>
        </div>
    </section>
</template>
