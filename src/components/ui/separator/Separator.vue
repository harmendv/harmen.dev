<script setup>
import { computed, useAttrs } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps({
    orientation: {
        type: String,
        default: "horizontal",
    },
    decorative: {
        type: Boolean,
        default: true,
    },
});

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        "shrink-0 bg-border/70",
        props.orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        attrs.class
    )
);
</script>

<template>
    <div
        :class="classes"
        :aria-orientation="orientation"
        :role="decorative ? 'none' : 'separator'"
    />
</template>
