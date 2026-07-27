<script setup lang="ts">
import { animate, stagger } from "animejs";
import { ExternalLink } from "lucide-vue-next";
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

// `isOpen` gates the overlay's mount; `iconOpen` drives the button's icon
// morph and colour so those flip the instant a close starts, in step with the
// panel sliding out (rather than snapping once it's gone).
const isOpen = ref(false);
const iconOpen = ref(false);
const menuRoot = ref<HTMLElement | null>(null);
const scrim = ref<HTMLElement | null>(null);
const panel = ref<HTMLElement | null>(null);
const toggleBtn = ref<HTMLElement | null>(null);

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const shellEl = () => document.getElementById("app-shell");

function items() {
    return (
        menuRoot.value?.querySelectorAll<HTMLElement>(".mobile-menu__item") ?? []
    );
}

/**
 * Focusable elements for the focus trap: the toggle button (which doubles as
 * the close control) first, then the links inside the panel.
 */
function focusables(): HTMLElement[] {
    const list: HTMLElement[] = [];
    if (toggleBtn.value) list.push(toggleBtn.value);
    if (panel.value) {
        list.push(
            ...panel.value.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        );
    }
    return list;
}

function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
        close();
        return;
    }
    // Trap Tab focus within the dialog (the background page is `inert`, but this
    // keeps focus from escaping to the browser chrome and back into the page).
    if (event.key === "Tab") {
        const list = focusables();
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

/**
 * Remove the background page from the tab order and accessibility tree while
 * the menu is open (it stays fully visible behind the blurred scrim).
 */
function pushShell() {
    shellEl()?.setAttribute("inert", "");
}

function releaseShell() {
    shellEl()?.removeAttribute("inert");
}

function toggle() {
    if (isOpen.value) close();
    else open();
}

async function open() {
    if (isOpen.value) return;
    isOpen.value = true;
    iconOpen.value = true;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeydown);

    await nextTick();

    pushShell();

    if (prefersReducedMotion()) {
        if (scrim.value) scrim.value.style.opacity = "1";
        if (panel.value) panel.value.style.transform = "translateX(0%)";
        items().forEach((el) => (el.style.opacity = "1"));
        return;
    }

    // A blurred scrim dims the page…
    if (scrim.value) {
        animate(scrim.value, { opacity: [0, 1], duration: 420, ease: "out(2)" });
    }

    // …and the panel slides over from the right.
    if (panel.value) {
        animate(panel.value, {
            translateX: ["100%", "0%"],
            duration: 480,
            ease: "out(4)",
        });
    }

    animate(items(), {
        opacity: [0, 1],
        translateX: [24, 0],
        delay: stagger(45, { start: 160 }),
        duration: 440,
        ease: "out(3)",
    });
}

function finishClose() {
    isOpen.value = false;
    releaseShell();
    document.body.style.overflow = "";
    // Keep focus on the toggle button (now back in its "open" state).
    toggleBtn.value?.focus();
}

function close() {
    if (!isOpen.value) return;
    // Morph the icon back to a hamburger immediately, in step with the panel
    // sliding out.
    iconOpen.value = false;
    document.removeEventListener("keydown", onKeydown);

    if (prefersReducedMotion()) {
        finishClose();
        return;
    }

    if (scrim.value) {
        animate(scrim.value, { opacity: 0, duration: 300, ease: "in(2)" });
    }

    animate(items(), {
        opacity: 0,
        translateX: 16,
        duration: 180,
        ease: "in(2)",
    });

    // The panel slides back out and, once gone, we tear everything down.
    animate(panel.value as HTMLElement, {
        translateX: "100%",
        duration: 360,
        ease: "in(3)",
        onComplete: finishClose,
    });
}

onBeforeUnmount(() => {
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";
    releaseShell();
});
</script>

<template>
    <div class="sm:hidden">
        <!--
          Single toggle, teleported out of the (inert, when open) page shell so
          it stays clickable above the panel. Positioned `absolute` (not fixed)
          so it scrolls with the header like a normal element, yet sits over the
          panel at the same spot when the menu opens (at the top, scroll locked).
          Its bars morph between a hamburger and an X, and its colour flips to
          sit on the dark panel.
        -->
        <Teleport to="body">
            <button
                ref="toggleBtn"
                type="button"
                class="mobile-toggle absolute right-4 top-10 z-[70] inline-flex size-10 items-center justify-center rounded-full transition-colors duration-300 sm:hidden"
                :class="iconOpen ? 'text-background' : 'text-foreground'"
                :aria-expanded="isOpen"
                aria-controls="mobile-menu"
                :aria-label="isOpen ? 'Close menu' : 'Open menu'"
                @click="toggle"
            >
                <span
                    class="mobile-toggle__box"
                    :class="{ 'is-open': iconOpen }"
                    aria-hidden="true"
                >
                    <span class="mobile-toggle__bar mobile-toggle__bar--top" />
                    <span class="mobile-toggle__bar mobile-toggle__bar--mid" />
                    <span class="mobile-toggle__bar mobile-toggle__bar--bot" />
                </span>
            </button>
        </Teleport>

        <Teleport to="body">
            <div
                v-if="isOpen"
                id="mobile-menu"
                ref="menuRoot"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                class="fixed inset-0 z-[60]"
            >
                <!-- Blurred, dimmed scrim over the receding page. Tapping it closes. -->
                <div
                    ref="scrim"
                    class="mobile-scrim absolute inset-0 bg-black/25 backdrop-blur-[3px]"
                    @click="close"
                />

                <!-- Slide-over panel (~82% width). -->
                <aside
                    ref="panel"
                    class="mobile-panel absolute right-0 top-0 flex h-full w-[82%] max-w-[22rem] flex-col bg-foreground px-6 pb-8 pt-10 text-background shadow-2xl"
                >
                    <nav
                        aria-label="Mobile"
                        class="flex h-full flex-col pt-6"
                    >
                        <ul class="flex flex-col gap-5">
                            <li
                                v-for="item in mobileNavItems"
                                :key="item.label"
                                class="mobile-menu__item"
                            >
                                <RouterLink
                                    :to="item.to"
                                    class="text-2xl font-semibold tracking-[-0.03em] text-background transition-opacity hover:opacity-70"
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
                </aside>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
/* Start states so anime.js can animate in without a first-frame flash. */
.mobile-panel {
    transform: translateX(100%);
}

.mobile-scrim {
    opacity: 0;
}

.mobile-menu__item {
    opacity: 0;
}

/* Hamburger ⇄ X toggle. Three bars that rotate/collapse into a cross. */
.mobile-toggle__box {
    position: relative;
    width: 24px;
    height: 24px;
}

.mobile-toggle__bar {
    position: absolute;
    left: 2px;
    right: 2px;
    height: 2px;
    border-radius: 9999px;
    background-color: currentColor;
    transform-origin: center;
    transition:
        transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.25s ease;
}

.mobile-toggle__bar--top {
    top: 6px;
}

.mobile-toggle__bar--mid {
    top: 11px;
}

.mobile-toggle__bar--bot {
    top: 16px;
}

.mobile-toggle__box.is-open .mobile-toggle__bar--top {
    transform: translateY(5px) rotate(45deg);
}

.mobile-toggle__box.is-open .mobile-toggle__bar--mid {
    opacity: 0;
    transform: scaleX(0.4);
}

.mobile-toggle__box.is-open .mobile-toggle__bar--bot {
    transform: translateY(-5px) rotate(-45deg);
}

@media (prefers-reduced-motion: reduce) {
    .mobile-toggle__bar {
        transition: none;
    }
}
</style>
