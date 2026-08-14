<script setup lang="ts">
import { Heart } from "lucide-vue-next";
import { RouterLink } from "vue-router";

import ContentBadge from "@/components/ContentBadge.vue";
import ExperienceSection from "@/components/ExperienceSection.vue";
import ProjectsSection from "@/components/ProjectsSection.vue";
import { contactLinks, experience, profile, projects } from "@/content/site";

interface NavItem {
    label: string;
    to: {
        path: string;
        hash: string;
    };
}

const navItems: NavItem[] = [
    { label: "Projects", to: { path: "/", hash: "#projects" } },
    { label: "Experience", to: { path: "/", hash: "#experience" } },
    { label: "Contact", to: { path: "/", hash: "#contact" } },
];
</script>

<template>
    <main
        id="main-content"
        class="px-6 pt-10 sm:px-8 sm:pt-12"
    >
        <div class="mx-auto max-w-4xl">
            <header class="pb-8">
                <div class="flex items-start justify-between gap-6">
                    <RouterLink
                        to="/"
                        class="w-fit"
                        aria-label="Go to home page"
                        title="Go to home page"
                    >
                        <div class="flex items-start gap-1.5">
                            <span
                                class="text-xl font-semibold leading-none text-foreground"
                            >
                                {{ profile.name }}
                            </span>
                        </div>

                    </RouterLink>

                    <nav
                        aria-label="Primary"
                        class="hidden flex-wrap items-center justify-end gap-x-6 gap-y-1 pt-1 text-md text-foreground sm:flex"
                    >
                        <RouterLink
                            v-for="item in navItems"
                            :key="item.label"
                            :to="item.to"
                            class="transition-opacity hover:opacity-70"
                            :title="`Go to ${item.label}`"
                        >
                            {{ item.label }}
                        </RouterLink>
                    </nav>
                </div>

                <section class="pt-14">
                    <h1
                        class="font-mono text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-4xl text-balance"
                    >
                        I build stuff;
                    </h1>
                    <p
                        class="mt-5 text-lg leading-8 text-muted-foreground"
                    >
                        {{ profile.intro }}
                    </p>

                    <div
                        class="mt-6 flex flex-wrap items-center gap-2.5 text-md text-muted-foreground"
                    >
                        <span class="inline-flex items-center gap-2">
                            <Heart
                                aria-hidden="true"
                                class="size-5 fill-pink-600 text-pink-600"
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
            </header>

            <ProjectsSection :projects="projects" />

            <ExperienceSection :experience="experience" />

            <section
                id="contact"
                tabindex="-1"
                aria-labelledby="contact-heading"
                class="scroll-mt-24 py-4 mb-8"
            >
                <h2
                    id="contact-heading"
                    class="text-xl font-semibold tracking-[-0.03em] text-foreground"
                >
                    Contact
                </h2>

                <div
                    class="mt-6 flex max-w-[24rem] flex-col gap-y-5 sm:grid sm:grid-cols-[5.8rem_minmax(0,1fr)] sm:gap-x-12 sm:gap-y-4"
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
            </section>

            <footer
                class="mt-auto flex flex-wrap items-center gap-8 border-t border-border py-7 text-sm text-muted-foreground"
            >
                <div
                    class="flex flex-wrap items-center gap-8"
                >
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
            </footer>
        </div>
    </main>
</template>
