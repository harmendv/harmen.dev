<script setup lang="ts">
import { computed } from "vue";
import {
    siInertia,
    siLaravel,
    siShadcnui,
    siTailwindcss,
    siVite,
    siVuedotjs,
    siJavascript,
    siWebpack,
    siSass,
    siIonic,
    siPhp,
    siHtml5,
    siCss,
    siWordpress,
    siSketch,
    siFigma,
    siTypescript,
} from "simple-icons";

import { Badge } from "@/components/ui/badge";
import type { ContentBadgeItem, IconName } from "@/types/site";

const props = defineProps<{
    item: ContentBadgeItem;
}>();

const iconMap: Record<IconName, typeof siVuedotjs | typeof siTailwindcss> = {
    inertia: siInertia,
    laravel: siLaravel,
    shadcn: siShadcnui,
    tailwind: siTailwindcss,
    vite: siVite,
    vuejs: siVuedotjs,
    javascript: siJavascript,
    webpack: siWebpack,
    sass: siSass,
    ionic: siIonic,
    html: siHtml5,
    css: siCss,
    wordpress: siWordpress,
    php: siPhp,
    sketch: siSketch,
    figma: siFigma,
    typescript: siTypescript,
};

const normalized = computed(() => {
    if (typeof props.item === "string") {
        return {
            icon: null,
            text: props.item,
        };
    }

    return {
        icon: props.item?.icon ?? null,
        text: props.item?.text ?? "",
    };
});

const iconData = computed(() => {
    const iconName = normalized.value.icon;

    if (!iconName) {
        return null;
    }

    return iconMap[iconName] ?? null;
});
</script>

<template>
    <Badge variant="default">
        <span class="inline-flex items-center gap-1.5">
            <svg
                v-if="iconData"
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="size-3"
                fill="currentColor"
            >
                <path :d="iconData.path" />
            </svg>
            <span>{{ normalized.text }}</span>
        </span>
    </Badge>
</template>
