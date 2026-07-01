<script setup lang="ts">
import { animate, createSpring, stagger } from "animejs";
import { Menu, X } from "lucide-vue-next";
import { nextTick, onBeforeUnmount, ref } from "vue";
import { RouterLink } from "vue-router";

import type { ContactLink } from "@/types/site";

interface NavItem {
    label: string;
    to: {
        path: string;
        hash: string;
    };
}

defineProps<{
    name: string;
    role: string;
    navItems: NavItem[];
    contactLinks: ContactLink[];
}>();

const isOpen = ref(false);
const menuRoot = ref<HTMLElement | null>(null);
const panelPath = ref<SVGPathElement | null>(null);

// Bottom-edge morph state, in a 0–100 viewBox. `y` is how far the bottom edge
// has grown down; `bulge` is the convex depth of the curve. A spring drives
// both. The resting `y` is pushed slightly *past* 100 so the settled edge (and
// the small tail oscillations) stay clipped below the viewport — no white line.
const REST_Y = 106;
const morph = { y: 0, bulge: 20 };

// Bottom edge is sampled at these x positions and smoothed, so it can ripple
// (rather than being a single clean curve) during the wobble.
const POINTS_X = [100, 80, 60, 40, 20, 0];
const MAX_WAVE = 6.5; // max ripple amplitude (viewBox units)
const WAVE_GAIN = 0.5; // how strongly the bounce distance drives the ripple

let phases = [0, 0];
let jitter = POINTS_X.map(() => 1);
let waveAmp = 0;
let waveClock = 0;
let filled = false; // ripple only kicks in after the panel first fills
let prevT = 0;

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function randomizeWave() {
    phases = [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2];
    jitter = POINTS_X.map(() => 0.55 + Math.random() * 0.9);
    waveAmp = 0;
    waveClock = 0;
    filled = false;
}

// Bottom-edge points: base convex curve (bulge) + windowed, randomized ripple
// (waveAmp). The window pins the corners so the side walls stay clean.
function bottomPoints() {
    return POINTS_X.map((x, i) => {
        const win = Math.sin((Math.PI * x) / 100); // 0 at edges, 1 at center
        const base = morph.y + morph.bulge * win;
        const ripple =
            waveAmp *
            win *
            (0.7 * jitter[i] * Math.sin(x * 0.11 + phases[0] + waveClock) +
                0.3 * Math.sin(x * 0.05 + phases[1] - waveClock * 0.6));
        return { x, y: base + ripple };
    });
}

// Smooth the sampled points into a filled path via Catmull-Rom → bezier.
function buildPath() {
    const p = bottomPoints();
    let d = `M 0 0 L 100 0 L ${p[0].x} ${p[0].y.toFixed(2)}`;
    for (let i = 0; i < p.length - 1; i++) {
        const p0 = p[i - 1] ?? p[i];
        const p1 = p[i];
        const p2 = p[i + 1];
        const p3 = p[i + 2] ?? p[i + 1];
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x} ${p2.y.toFixed(2)}`;
    }
    return `${d} Z`;
}

function applyPath() {
    panelPath.value?.setAttribute("d", buildPath());
}

// Called every animation frame. Once the panel has filled, the ripple
// amplitude tracks how far the springy edge sits from its resting position —
// so ripples peak exactly at the bounce (when the page shows through) and fade
// to nothing as it settles.
function updateMorph() {
    const now = performance.now();
    const dt = prevT ? now - prevT : 16;
    if (!filled && morph.y >= 100) filled = true;
    const target = filled
        ? Math.min(MAX_WAVE, Math.abs(morph.y - REST_Y) * WAVE_GAIN)
        : 0;
    waveAmp += (target - waveAmp) * 0.5;
    waveClock += dt * 0.014;
    prevT = now;
    applyPath();
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
        morph.bulge = 0;
        waveAmp = 0;
        applyPath();
        items().forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
        return;
    }

    // Start collapsed with a deep curve, then spring the bottom edge down past
    // the viewport so it overshoots, bounces, and ripples before settling.
    randomizeWave();
    morph.y = 0;
    morph.bulge = 20;
    prevT = performance.now();
    applyPath();

    animate(morph, {
        y: REST_Y,
        bulge: 0,
        ease: createSpring({ stiffness: 110, damping: 6, mass: 1 }),
        onUpdate: updateMorph,
    });

    animate(items(), {
        opacity: [0, 1],
        translateX: [-18, 0],
        translateY: [28, 0],
        scale: [0.9, 1],
        delay: stagger(70, { start: 160 }),
        ease: createSpring({ stiffness: 150, damping: 11, mass: 1 }),
    });
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

    filled = false;
    prevT = performance.now();
    animate(morph, {
        y: 0,
        bulge: 16,
        duration: 380,
        ease: "inCubic",
        onUpdate: updateMorph,
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
                    type="button"
                    class="mobile-menu__item absolute right-6 top-10 z-10 -mr-2 inline-flex size-10 items-center justify-center rounded-full text-background"
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
                    class="relative flex h-full flex-col justify-start gap-10 px-6 pt-28 pb-16"
                >
                    <ul class="flex flex-col gap-5">
                        <li
                            v-for="item in navItems"
                            :key="item.label"
                            class="mobile-menu__item"
                        >
                            <RouterLink
                                :to="item.to"
                                class="text-3xl font-semibold tracking-[-0.03em] text-background transition-opacity hover:opacity-70"
                                @click="close"
                            >
                                {{ item.label }}
                            </RouterLink>
                        </li>
                    </ul>

                    <div
                        class="flex flex-col gap-4 border-t border-background/15 pt-8"
                    >
                        <p
                            class="mobile-menu__item text-sm font-medium uppercase tracking-widest text-background/50"
                        >
                            Contact
                        </p>
                        <ul class="flex flex-col gap-3">
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
                                    class="text-lg text-background/80 transition-opacity hover:opacity-70"
                                    @click="close"
                                >
                                    {{ entry.label }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
/* Entries start hidden so anime.js can fade/slide them in without a flash on
   the first painted frame. */
.mobile-menu__item {
    opacity: 0;
}
</style>
