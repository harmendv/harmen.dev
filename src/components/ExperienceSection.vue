<script setup lang="ts">
import ContentBadge from "@/components/ContentBadge.vue";
import type { ExperienceItem } from "@/types/site";

defineProps<{
    experience: ExperienceItem[];
}>();
</script>

<template>
    <section
        id="experience"
        tabindex="-1"
        aria-labelledby="experience-heading"
        class="scroll-mt-24 px-6 py-4 sm:px-8"
    >
        <div class="mx-auto max-w-4xl">
            <h2
                id="experience-heading"
                class="text-xl font-semibold tracking-[-0.03em] text-foreground"
            >
                Experience
            </h2>

            <div class="mt-6 space-y-11">
                <article
                    v-for="item in experience"
                    :key="`${item.period}-${item.role}`"
                    class="grid gap-3 sm:grid-cols-[5.8rem_minmax(0,1fr)] sm:gap-12 border-b pb-10 last:border-b-0"
                >
                    <p class="text-sm leading-7 text-primary">
                        {{ item.period }}
                    </p>
                    <div>
                        <h3 class="text-md font-semibold text-foreground">
                            {{ item.role }}
                        </h3>
                        <span class="text-sm font-normal text-muted-foreground">{{ item.company }}</span>
                        <p class="mt-3 text-md leading-8 text-muted-foreground">
                            {{ item.summary }}
                        </p>
                        <div class="mt-4 flex flex-wrap gap-2">
                            <ContentBadge
                                v-for="tag in item.tags"
                                :key="
                                    typeof tag === 'string'
                                        ? tag
                                        : `${tag.icon}-${tag.text}`
                                "
                                :item="tag"
                            />
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
