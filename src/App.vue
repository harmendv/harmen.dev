<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { Github } from "lucide-vue-next";
import { initBackground } from "./utils/gsap-background";

const title = ref<HTMLElement | null>(null);
const nav = ref<HTMLElement | null>(null);
const stack = ref<HTMLElement | null>(null);
const icon = ref<HTMLElement | null>(null);
const link = ref<HTMLElement | null>(null);

onMounted(() => {
    gsap.effects.appearLines(title.value, { delay: 0.1 });
    gsap.effects.appearChars(nav.value, { delay: 1 });
    gsap.effects.fadeBounce(icon.value, { delay: 1.2, duration: 0.8 });
    gsap.effects.rotateWords(stack.value, {
        pause: 2,
        slideDuration: 0.4,
        repeat: -1,
    });
    gsap.effects.mouseFollow(title.value, { depth: 12, strength: 0.6 });
    gsap.effects.mouseFollow(link.value, { depth: 12, strength: 0.2 });
    initBackground({
        blobSelector: "#blob",
        guideSelector: "#motionPath",
        loopPeriod: 8,
        wobbleAmplitude: 6,
        tangentialAmplitude: 2,
        phasePerVertex: 0.35,
        duration: 124,
    });
});
</script>

<template>
    <nav
        class="absolute top-0 right-0 z-20 p-10 flex items-center text-xl gap-4 text-zinc-500"
    >
        <a
            ref="link"
            href="https://github.com/harmendv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Harmen's GitHub"
            class="flex items-center gap-2 text-zinc-500 hover:text-white transition"
        >
            <span ref="nav">Check my GitHub</span>
            <Github ref="icon" />
        </a>
    </nav>
    <section
        class="h-screen w-full flex items-center justify-center flex-col relative shrink grow z-10"
    >
        <h1
            ref="title"
            class="clamp font-display mb-2"
        >
            Hi, I am <br />
            <span class="gradient">Harmen</span> and <br />
            I like
            <span
                ref="stack"
                class="mt-3"
            >
                <span class="gradient-blue">TypeScript</span>
                <span class="gradient-blue">Vue.js</span>
                <span class="gradient-blue">Laravel</span>
                <span class="gradient-blue">Inertia.js</span>
            </span>
        </h1>
    </section>
    <svg
        viewBox="0 0 736 709"
        class="h-screen w-screen fixed"
    >
        <!-- motion guide -->
        <path
            id="motionPath"
            fill="transparent"
            stroke="transparent"
            d="M50 566C16 455 -7.00001 233.4 61 171C146 93 220 210 399 153C578 96 544 -11 630 61C716 133 977 411 711 506C445 601 617 246 483 220C349 194 115.787 478.555 235 506C374 538 722.751 345.726 750 584C793 960 80.018 664 50 566Z"
        />

        <!-- blob group (translated along the motionPath) -->
        <g id="blobGroup">
            <path
                id="blob"
                fill="var(--color-zinc-950)"
                class="scale-[4]"
                d="M174 20L190.717 20.9737L207.209 23.8815L223.251 28.6843L238.627 35.3169L253.129 43.6898L266.561 53.6896L278.742 65.1812L289.506 78.0092L298.708 92L306.223 106.965L311.951 122.7L315.812 138.995L317.756 155.627V172.373L315.812 189.005L311.951 205.3L306.223 221.035L298.708 236L289.506 249.991L278.742 262.819L266.561 274.31L253.129 284.31L238.627 292.683L223.251 299.316L207.209 304.118L190.717 307.026L174 308L157.283 307.026L140.791 304.118L124.749 299.316L109.373 292.683L94.8707 284.31L81.4386 274.31L69.2582 262.819L58.4943 249.991L49.2923 236L41.7769 221.035L36.0495 205.3L32.1877 189.005L30.2436 172.373V155.627L32.1877 138.995L36.0495 122.7L41.7769 106.965L49.2923 92L58.4943 78.0092L69.2582 65.1812L81.4386 53.6896L94.8707 43.6898L109.373 35.3169L124.749 28.6843L140.791 23.8815L157.283 20.9737L174 20Z"
            />
        </g>
    </svg>
</template>
