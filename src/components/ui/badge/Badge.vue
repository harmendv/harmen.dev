<script setup>
import { computed, useAttrs } from "vue";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-1 text-sm font-normal tracking-normal transition-colors",
    {
        variants: {
            variant: {
                default: "border-border bg-secondary text-secondary-foreground",
                outline: "border border-gray-300 bg-background text-secondary-foreground",
                accent: "border-transparent bg-primary text-primary-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const props = defineProps({
    variant: {
        type: String,
        default: "default",
    },
});

const attrs = useAttrs();
const classes = computed(() =>
    cn(badgeVariants({ variant: props.variant }), attrs.class)
);
</script>

<template>
    <span :class="classes">
        <slot />
    </span>
</template>
