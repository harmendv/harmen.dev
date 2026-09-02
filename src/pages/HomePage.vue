<script setup lang="ts">
import { Heart } from "lucide-vue-next";
import { RouterLink } from "vue-router";

import ContentBadge from "@/components/ContentBadge.vue";
import ExperienceSection from "@/components/ExperienceSection.vue";
import ProjectsSection from "@/components/ProjectsSection.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { contactLinks, experience, profile, projects } from "@/content/site";

interface NavItem {
    label: string;
    to: {
        path: string;
        hash: string;
    };
}

const navItems: NavItem[] = [
    { label: "Open Source", to: { path: "/", hash: "#open-source" } },
    { label: "Experience", to: { path: "/", hash: "#experience" } },
    { label: "Contact", to: { path: "/", hash: "#contact" } },
];

const currentYear = new Date().getFullYear();
</script>

<template>
    <main id="main-content">
        <header class="px-6 pb-8 pt-10 sm:px-8 sm:pt-12">
            <div class="mx-auto max-w-4xl">
                <div class="flex items-center justify-between gap-6">
                    <RouterLink
                        to="/"
                        class="w-fit"
                        aria-label="Go to home page"
                        title="Go to home page"
                    >
                        <div class="flex items-start gap-1.5">
                            <span
                                class="text-xl font-semibold leading-none text-foreground flex items-center gap-2"
                            >
                                <img
                                    src="/logo.svg"
                                    alt=""
                                    width="76"
                                    height="98"
                                    class="h-auto w-5"
                                />
                                harmen.dev
                            </span>
                        </div>
                    </RouterLink>

                    <div class="flex items-center justify-end gap-x-6">
                        <nav
                            aria-label="Primary"
                            class="hidden flex-wrap items-center justify-end gap-x-6 gap-y-1 text-md text-foreground sm:flex"
                        >
                            <RouterLink
                                v-for="item in navItems"
                                :key="item.label"
                                :to="item.to"
                                class="transition-colors hover:text-primary"
                                :title="`Go to ${item.label}`"
                            >
                                {{ item.label }}
                            </RouterLink>
                        </nav>

                        <ThemeToggle />
                    </div>
                </div>

                <section class="pt-14">
                    <h1
                        class="font-hero text-5xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-7xl text-balance"
                    >
                        {{ profile.title }}<span class="text-primary">;</span>
                    </h1>
                    <p class="mt-5 text-lg leading-8 text-muted-foreground">
                        {{ profile.intro }}
                    </p>

                    <div
                        class="mt-6 flex flex-wrap items-center gap-2.5 text-md text-muted-foreground"
                    >
                        <span class="inline-flex items-center gap-2">
                            <Heart
                                aria-hidden="true"
                                class="size-4 text-transparent fill-foreground"
                            />
                            Favorite stack
                        </span>
                        <ContentBadge
                            v-for="item in profile.stack"
                            :key="
                                typeof item === 'string'
                                    ? item
                                    : `${item.icon}-${item.text}`
                            "
                            :item="item"
                        />
                    </div>
                </section>
            </div>
        </header>

        <ProjectsSection :projects="projects" />

        <ExperienceSection :experience="experience" />

        <div class="mt-12 bg-muted">
            <section
                id="contact"
                tabindex="-1"
                aria-labelledby="contact-heading"
                class="scroll-mt-24 px-6 py-16 sm:px-8"
            >
                <div
                    class="mx-auto flex max-w-4xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-16"
                >
                    <h2
                        id="contact-heading"
                        class="font-hero text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl"
                    >
                        Let's talk<span class="text-primary">.</span>
                    </h2>

                    <div
                        class="flex flex-col gap-y-5 sm:grid sm:grid-cols-[auto_auto] sm:justify-end sm:gap-x-12 sm:gap-y-4 sm:text-right"
                    >
                        <div
                            v-for="entry in contactLinks"
                            :key="entry.label"
                            class="flex flex-col gap-y-1 sm:contents"
                        >
                            <p class="text-md text-muted-foreground">
                                {{ entry.label }}
                            </p>
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
                                class="text-md text-foreground transition-opacity hover:opacity-70 underline"
                                :aria-label="`${entry.label}: ${entry.value}`"
                                :title="entry.value"
                            >
                                {{ entry.value }}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="px-6 sm:px-8">
                <div
                    class="mx-auto flex max-w-4xl flex-col gap-4 pt-0 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
                >
                    <p>&copy; {{ currentYear }} harmen.dev</p>

                    <div class="flex flex-wrap items-center gap-8">
                        <RouterLink
                            to="/privacy"
                            class="transition-opacity hover:opacity-70 underline"
                            title="Read the privacy policy"
                        >
                            Privacy
                        </RouterLink>
                        <RouterLink
                            to="/terms"
                            class="transition-opacity hover:opacity-70 underline"
                            title="Read the terms of use"
                        >
                            Terms of Use
                        </RouterLink>
                    </div>
                </div>
            </footer>
        </div>
    </main>
</template>
