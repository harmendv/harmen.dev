import type { ExperienceItem } from "../types/global.types";
import {
  SiVuedotjs,
  SiTypescript,
  SiJavascript,
  SiVite,
  SiTailwindcss,
  SiClaudecode,
  SiInertia,
  SiLaravel,
  SiShadcnui,
  SiIonic,
  SiSass,
  SiWebpack,
  SiSketch,
  SiFigma,
  SiHtml5,
  SiCss,
  SiWordpress,
} from "@icons-pack/react-simple-icons";

export const experience: ExperienceItem[] = [
  {
    dateRange: "2022 - present",
    title: "Senior Frontend Developer",
    field: "Travel Agency",
    description:
      "Designing and building digital travel platforms, including booking flows, agent-facing tools, content management systems, reusable UI libraries, and external search widgets. My focus is on making complex travel workflows understandable, maintainable, and pleasant to use.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite.js", icon: SiVite },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Inertia.js", icon: SiInertia },
      { name: "Laravel", icon: SiLaravel },
      { name: "Shadcn", icon: SiShadcnui },
      { name: "Figma", icon: SiFigma },
      { name: "Claude Code", icon: SiClaudecode },
    ],
  },
  {
    dateRange: "2013 - 2022",
    title: "Frontend Developer",
    field: "Digital Media & Technology",
    description:
      "Worked on a wide range of commercial web applications, marketing platforms, mobile payment flows, promotional websites, content-driven platforms, and mobile apps. Involved in both design and frontend development, with a strong focus on Vue.js single-page applications, landing pages, conversion-focused interfaces, and mobile-first user experiences.",
    stack: [
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Laravel", icon: SiLaravel },
      { name: "Ionic", icon: SiIonic },
      { name: "SCSS", icon: SiSass },
      { name: "Webpack", icon: SiWebpack },
      { name: "Sketch", icon: SiSketch },
    ],
  },
  {
    dateRange: "2011 - 2015",
    title: "Frontend Developer & Designer",
    field: "Freelance",
    description:
      "Designed brand identities, visual concepts, and small-scale websites for various clients. Combined graphic design with frontend development to deliver complete digital solutions from concept to implementation.",
    stack: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "WordPress", icon: SiWordpress },
    ],
  },
  {
    dateRange: "2009 - 2011",
    title: "HTML & CSS Developer",
    field: "E-commerce company",
    description:
      "Designed and developed websites for mobile phone and mobile subscription industry. Also contributed to internal business tools, including a stock management system, with a focus on clean HTML, CSS, and practical user interface implementation.",
    stack: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
    ],
  },
];
