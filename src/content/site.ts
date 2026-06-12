import type {
  ContactLink,
  ExperienceItem,
  Profile,
  Project,
} from "@/types/site";

export const profile: Profile = {
    name: "Harmen de Vries",
    role: "Frontend Developer",
    email: "hello@harmen.dev",
    github: "https://github.com/harmendv",
    website: "https://harmen.dev",
    intro: "I'm a frontend developer based in the Netherlands. I enjoy building clean, well-considered web experiences, whether that’s a design system, a component library, developer tooling, or a small open-source side project.",
    summary: "",
    stack: [
        { icon: "vuejs", text: "Vue.js" },
        { icon: "tailwind", text: "Tailwind" },
        { icon: "inertia", text: "Inertia.js" },
        { icon: "laravel", text: "Laravel" },
        { icon: "shadcn", text: "Shadcn-vue" },
    ],
};

export const projects: Project[] = [
    {
        title: "Guitar Scales",
        description:
            "A visual tool for guitarists to explore scales, modes, and chord shapes across the fretboard. Built with Vue 3 and a custom SVG rendering engine, no dependencies for the core visualisation.",
        href: "https://guitarscales.harmen.dev",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "vite", text: "Vite.js" },
            { icon: "tailwind", text: "Tailwind" },
        ],
    },
    {
        title: "Libvue Component Library",
        description:
            "A headless, framework-agnostic kit for building image galleries. Handles keyboard navigation, lazy loading, lightbox behaviour, and touch gestures bring your own styles.",
        href: "https://github.com/libvue/core",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "vite", text: "Vite.js" },
        ],
    },
    {
        title: "Libvue Laravel Orion API",
        description:
            "A Laravel Orion compatible repository-based Javascript http-client powered by axios.",
        href: "https://github.com/libvue/laravel-orion-api",
        tags: [
            { icon: "javascript", text: "Javascript" }
        ],
    },
];

export const experience: ExperienceItem[] = [
    {
        period: "2022 - present",
        role: "Senior Frontend Developer",
        company: "Travel Agency",
        summary:
            "Working on the design and development of digital travel platforms, including booking applications, agent-facing tools, content management systems, reusable component libraries, and search widgets for external partners. Responsible for improving existing applications, building scalable frontend solutions, and translating complex travel-related workflows into clear and usable interfaces.",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "inertia", text: "Inertia.js" },
            { icon: "tailwind", text: "Tailwind" },
            { icon: "laravel", text: "Laravel" },
            { icon: "shadcn", text: "Shadcn-vue" },
            { icon: "figma", text: "Figma" },
        ],
    },
    {
        period: "2013 - 2022",
        role: "Frontend Developer",
        company: "Digital media & Technology",
        summary:
            "Worked on a wide range of commercial web applications, marketing platforms, mobile payment flows, promotional websites, content-driven platforms, and mobile apps. Involved in both design and frontend development, with a strong focus on Vue.js single-page applications, landing pages, conversion-focused interfaces, and mobile-first user experiences.",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "javascript", text: "Javascript" },
            { icon: "laravel", text: "Laravel" },
            { icon: "ionic", text: "Ionic" },
            { icon: "sass", text: "Scss" },
            { icon: "webpack", text: "Webpack" },
            { icon: "sketch", text: "Sketch" },
        ],
    },
    {
        period: "2011 - 2015",
        role: "Frontend Developer & Designer",
        company: "Freelance",
        summary:
            "Designed brand identities, visual concepts, and small-scale websites for various clients. Combined graphic design with frontend development to deliver complete digital solutions from concept to implementation.",
        tags: [
            { icon: "html", text: "HTML" },
            { icon: "css", text: "CSS" },
            { icon: "wordpress", text: "Wordpress" },
        ],
    },
    {
        period: "2009 - 2011",
        role: "HTML & CSS Developer",
        company: "E-commerce company",
        summary:
            "Designed and developed websites for mobile phone and mobile subscription industry. Also contributed to internal business tools, including a stock management system, with a focus on clean HTML, CSS, and practical user interface implementation.",
        tags: [
            { icon: "html", text: "HTML" },
            { icon: "css", text: "CSS" },
        ],
    },
];

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    value: "github.com/harmendv",
    href: "https://github.com/harmendv",
  },
  {
    label: "Website",
    value: "harmen.dev",
    href: "https://harmen.dev",
  },
];
