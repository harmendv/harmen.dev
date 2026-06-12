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
                <div
                    class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
                >
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
                            <img
                                src="/star.svg"
                                alt=""
                                aria-hidden="true"
                                class="-mt-1.5 -ml-1.5 h-5 w-5"
                            />
                        </div>
                        <p
                            class="mt-1 text-md leading-none text-muted-foreground"
                        >
                            {{ profile.role }}
                        </p>
                    </RouterLink>

                    <nav
                        aria-label="Primary"
                        class="flex flex-wrap items-center gap-8 pt-1 text-md text-foreground"
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
                        class="text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-4xl text-balance"
                    >
                        I build tools and interfaces that people
                        enjoy using.
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
                    class="mt-6 grid max-w-[24rem] grid-cols-[5.8rem_minmax(0,1fr)] gap-x-12 gap-y-4"
                >
                    <template
                        v-for="entry in contactLinks"
                        :key="entry.label"
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
                    </template>
                </div>
            </section>

            <footer
                class="mt-auto flex flex-wrap items-center gap-8 border-t border-border py-7 text-sm text-muted-foreground"
            >
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
            </footer>
        </div>
    </main>
</template>
