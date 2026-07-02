<script setup lang="ts">
import { animate, createSpring, stagger } from "animejs";
import { ExternalLink, Menu, X } from "lucide-vue-next";
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { RouterLink } from "vue-router";

import type { ContactLink } from "@/types/site";

interface NavItem {
    label: string;
    to: {
        path: string;
        hash: string;
    };
}

const props = defineProps<{
    name: string;
    role: string;
    navItems: NavItem[];
    contactLinks: ContactLink[];
}>();

// The mobile menu drops the "Contact" nav item (its links are shown at the
// bottom of the menu instead).
const mobileNavItems = computed(() =>
    props.navItems.filter((item) => item.to.hash !== "#contact")
);

const isOpen = ref(false);
const menuRoot = ref<HTMLElement | null>(null);
const panelPath = ref<SVGPathElement | null>(null);
const closeBtn = ref<HTMLElement | null>(null);

// The panel grows in a 0–100 viewBox. `y` is the bottom edge, driven down with a
// plain ease-out (no bounce). The bottom curve's depth follows sin(progress·π),
// so it starts flat (a rectangle), swells to a convex curve mid-travel, and
// flattens again as it settles. The resting `y` sits just past 100 so the filled
// bottom stays clipped — no white line.
const START_Y = 14; // initial rectangle height (~branding/header area)
const REST_Y = 104;
const MAX_BULGE = 20; // deepest curve, at mid-travel
const morph = { y: 0 };

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyPath() {
    const progress = Math.min(
        1,
        Math.max(0, (morph.y - START_Y) / (REST_Y - START_Y))
    );
    const bulge = MAX_BULGE * Math.sin(progress * Math.PI);
    const y = morph.y.toFixed(2);
    const c = (morph.y + bulge).toFixed(2);
    panelPath.value?.setAttribute(
        "d",
        `M 0 0 L 100 0 L 100 ${y} Q 50 ${c} 0 ${y} Z`
    );
}

function items() {
    return menuRoot.value?.querySelectorAll<HTMLElement>(
        ".mobile-menu__item"
    ) ?? [];
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
        close();
    }
}

async function open() {
    if (isOpen.value) return;
    isOpen.value = true;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeydown);

    await nextTick();

    if (prefersReducedMotion()) {
        morph.y = REST_Y;
        applyPath();
        items().forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
        if (closeBtn.value) closeBtn.value.style.opacity = "1";
        return;
    }

    // Start as a full-width rectangle covering the branding/header area, then
    // grow the curved bottom edge down and past the viewport with a plain
    // ease-out (no bounce); the curve flattens as it settles.
    morph.y = START_Y;
    applyPath();

    // Fade the panel in briefly so the starting rectangle doesn't hard-pop.
    if (panelPath.value) {
        animate(panelPath.value, {
            opacity: [0, 1],
            duration: 110,
            ease: "outQuad",
        });
    }

    animate(morph, {
        y: REST_Y,
        bulge: 0,
        duration: 420,
        ease: "outCubic",
        onUpdate: applyPath,
    });

    animate(items(), {
        opacity: [0, 1],
        translateX: [-18, 0],
        translateY: [28, 0],
        scale: [0.9, 1],
        delay: stagger(45, { start: 110 }),
        ease: createSpring({ stiffness: 180, damping: 12, mass: 1 }),
    });

    // The close button just scales + fades in — no slide.
    if (closeBtn.value) {
        animate(closeBtn.value, {
            opacity: [0, 1],
            scale: [0.6, 1],
            delay: 90,
            duration: 240,
            ease: createSpring({ stiffness: 190, damping: 13, mass: 1 }),
        });
    }
}

function close() {
    if (!isOpen.value) return;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);

    if (prefersReducedMotion()) {
        isOpen.value = false;
        return;
    }

    animate(items(), {
        opacity: 0,
        translateY: 10,
        duration: 150,
        ease: "inQuad",
    });

    if (closeBtn.value) {
        animate(closeBtn.value, {
            opacity: 0,
            scale: 0.6,
            duration: 150,
            ease: "inQuad",
        });
    }

    animate(morph, {
        y: 0,
        duration: 260,
        ease: "inCubic",
        onUpdate: applyPath,
        onComplete: () => {
            isOpen.value = false;
        },
    });
}

onBeforeUnmount(() => {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
    <div class="sm:hidden">
        <button
            type="button"
            class="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-foreground"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu"
            aria-label="Open menu"
            @click="open"
        >
            <Menu
                aria-hidden="true"
                class="size-6"
            />
        </button>

        <Teleport to="body">
            <div
                v-if="isOpen"
                id="mobile-menu"
                ref="menuRoot"
                class="fixed inset-0 z-[60] overflow-hidden"
            >
                <svg
                    class="absolute inset-0 h-full w-full text-foreground"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        ref="panelPath"
                        d="M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
                        fill="currentColor"
                    />
                </svg>

                <RouterLink
                    to="/"
                    class="absolute left-6 top-10 z-10 w-fit"
                    aria-label="Go to home page"
                    @click="close"
                >
                    <div class="flex items-start gap-1.5">
                        <span
                            class="text-xl font-semibold leading-none text-background"
                        >
                            {{ name }}
                        </span>
                        <img
                            src="/star.svg"
                            alt=""
                            aria-hidden="true"
                            class="-mt-1.5 -ml-1.5 h-5 w-5 brightness-0 invert"
                        />
                    </div>
                    <p class="mt-1 text-md leading-none text-background/60">
                        {{ role }}
                    </p>
                </RouterLink>

                <button
                    ref="closeBtn"
                    type="button"
                    class="mobile-menu__close absolute right-6 top-10 z-10 -mr-2 inline-flex size-10 items-center justify-center rounded-full text-background"
                    aria-label="Close menu"
                    @click="close"
                >
                    <X
                        aria-hidden="true"
                        class="size-6"
                    />
                </button>

                <nav
                    aria-label="Mobile"
                    class="relative flex h-full flex-col px-6 pt-28 pb-8"
                >
                    <ul class="flex flex-col gap-5">
                        <li
                            v-for="item in mobileNavItems"
                            :key="item.label"
                            class="mobile-menu__item"
                        >
                            <RouterLink
                                :to="item.to"
                                class="text-xl font-semibold tracking-[-0.03em] text-background transition-opacity hover:opacity-70"
                                @click="close"
                            >
                                {{ item.label }}
                            </RouterLink>
                        </li>
                    </ul>

                    <ul class="mt-auto flex flex-col gap-3">
                        <li
                            v-for="entry in contactLinks"
                            :key="entry.label"
                            class="mobile-menu__item"
                        >
                            <a
                                :href="entry.href"
                                :target="
                                    entry.href.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                "
                                :rel="
                                    entry.href.startsWith('http')
                                        ? 'noreferrer'
                                        : undefined
                                "
                                class="inline-flex items-center gap-2 text-lg text-background/80 transition-opacity hover:opacity-70"
                                @click="close"
                            >
                                <ExternalLink
                                    aria-hidden="true"
                                    class="size-4"
                                />
                                <span>{{ entry.label }}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
/* Entries and the close button start hidden so anime.js can animate them in
   without a flash on the first painted frame. */
.mobile-menu__item,
.mobile-menu__close {
    opacity: 0;
}
</style>
