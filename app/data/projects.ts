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
    href: "",
    title: "Image Gallery Kit",
    description:
      "An SSR-safe Vue 3 image gallery with an animated preview grid, a fullscreen dialog carousel, and tiles that fly between views.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite.js", icon: SiVite },
      { name: "Claude Code", icon: SiClaudecode },
    ],
    releaseDate: "April 2026",
  },
  {
    href: "",
    title: "@libvue/laravel-orion-api",
    description:
      "A Laravel Orion compatible repository-based JavaScript http-client powered by axios.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "JavaScript", icon: SiJavascript },
    ],
    releaseDate: "December 2022",
  },
  {
    href: "",
    title: "Guitar Scales",
    description:
      "A visual fretboard tool that helps guitarists explore scales, modes, positions, and tunings without getting lost in theory.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Vite.js", icon: SiVite },
    ],
    releaseDate: "December 2021",
  },
  {
    href: "",
    title: "Libvue Component Library",
    description:
      "An opinionated Vue 3 component library focused on accessible, reusable UI patterns for modern web applications.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "JavaScript", icon: SiJavascript },
      { name: "SCSS", icon: SiSass },
      { name: "Vite.js", icon: SiVite },
    ],
    releaseDate: "November 2020",
  },
];
