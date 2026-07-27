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
    class="scroll-mt-24 py-4"
  >
    <h2
      v-reveal:words
      id="experience-heading"
      class="text-xl font-semibold tracking-[-0.03em] text-foreground"
    >
      Experience
    </h2>

    <div class="mt-6 space-y-11">
      <article
        v-for="item in experience"
        :key="`${item.period}-${item.role}`"
        v-reveal:block
        class="grid gap-3 sm:grid-cols-[5.8rem_minmax(0,1fr)] sm:gap-12"
      >
        <p class="text-sm leading-7 text-muted-foreground">
          {{ item.period }}
        </p>
        <div>
          <h3 class="text-md font-semibold text-foreground">
            {{ item.role }}
            <span class="text-sm font-normal text-muted-foreground">
              &nbsp;- {{ item.company }}
            </span>
          </h3>
          <p class="mt-3 text-md leading-8 text-muted-foreground">
            {{ item.summary }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <ContentBadge
              v-for="tag in item.tags"
              :key="typeof tag === 'string' ? tag : `${tag.icon}-${tag.text}`"
              :item="tag"
            />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
