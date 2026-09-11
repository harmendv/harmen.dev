import type { ProjectItem } from "../types/global.types";
import {
  SiVuedotjs,
  SiTypescript,
  SiVite,
  SiJavascript,
  SiTailwindcss,
  SiClaudecode,
  SiSass,
} from "@icons-pack/react-simple-icons";

export const projects: ProjectItem[] = [
  {
    href: "https://harmendv.github.io/image-gallery-kit/",
    title: "Image Gallery Kit",
    description:
      "An SSR-safe Vue 3 image gallery with an animated preview grid, a fullscreen dialog carousel, and tiles that fly between views.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite.js", icon: SiVite },
      { name: "Claude Code", icon: SiClaudecode },
    ],
    notes: [
      { name: 'New', className: 'border !text-red-500 bg-transparent border-red-500' },
      { name: 'AI Generated', className: 'border !text-amber-500 bg-transparent border-amber-500' }
    ],
    releaseDate: "April 2026",
  },
  {
    href: "https://github.com/libvue/laravel-orion-api",
    title: "Libvue Laravel Orion API",
    description:
      "A Laravel Orion compatible repository-based JavaScript http-client powered by axios.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "JavaScript", icon: SiJavascript },
    ],
    notes: [
      { name: 'Archived', className: 'border !text-blue-500 bg-transparent border-blue-500' },
    ],
    releaseDate: "December 2022",
  },
  {
    href: "https://guitarscales.harmen.dev/",
    title: "Guitar Scales",
    description:
      "A visual fretboard tool that helps guitarists explore scales, modes, positions, and tunings without getting lost in theory.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Vite.js", icon: SiVite },
    ],
    notes: [],
    releaseDate: "December 2021",
  },
  {
    href: "https://github.com/libvue/core",
    title: "Libvue Component Library",
    description:
      "An opinionated Vue 3 component library focused on accessible, reusable UI patterns for modern web applications.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "JavaScript", icon: SiJavascript },
      { name: "SCSS", icon: SiSass },
      { name: "Vite.js", icon: SiVite },
    ],
    notes: [
      { name: 'Archived', className: 'border !text-blue-500 bg-transparent border-blue-500' },
    ],
    releaseDate: "November 2020",
  },
];
