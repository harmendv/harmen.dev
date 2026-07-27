<script setup>
import { computed, useAttrs } from "vue";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
                ghost: "text-foreground hover:bg-secondary",
                outline:
                    "border border-border bg-background hover:bg-secondary",
                link: "h-auto rounded-none px-0 py-0 text-foreground underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-5",
                sm: "h-9 px-4 text-sm",
                lg: "h-12 px-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const props = defineProps({
    as: {
        type: String,
        default: "button",
    },
    variant: {
        type: String,
        default: "default",
    },
    size: {
        type: String,
        default: "default",
    },
});

const attrs = useAttrs();
const classes = computed(() =>
    cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        attrs.class
    )
);
</script>

<template>
    <component
        :is="as"
        :class="classes"
    >
        <slot />
    </component>
</template>
