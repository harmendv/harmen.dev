import type {
    ContactLink,
    ExperienceItem,
    Profile,
    Project,
} from "@/types/site";

export const profile: Profile = {
    role: "Frontend Developer",
    github: "https://github.com/harmendv",
    website: "https://harmen.dev",
    title: "I build stuff",
    intro: "I like turning complex workflows into clear, maintainable UI — whether that’s a booking flow, internal tool, content management interface, search widget, or component library. My work sits close to the product: structured, usable, and built to last.",
    summary: "",
    stack: [
        { icon: "vuejs", text: "Vue.js" },
        { icon: "tailwind", text: "Tailwind" },
        { icon: "inertia", text: "Inertia.js" },
        { icon: "laravel", text: "Laravel" },
        { icon: "shadcn", text: "Shadcn-vue" },
        { icon: "typescript", text: "TypeScript" },
    ],
};

export const projects: Project[] = [
    {
        title: "Guitar Scales",
        description:
            "A visual fretboard tool that helps guitarists explore scales, modes, positions, and tunings without getting lost in theory.",
        href: "https://guitarscales.harmen.dev",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "typescript", text: "TypeScript" },
            { icon: "tailwind", text: "Tailwind" },
            { icon: "vite", text: "Vite.js" },
        ],
    },
    {
        title: "Libvue Component Library",
        description:
            "An opinionated Vue 3 component library focused on accessible, reusable UI patterns for modern web applications.",
        href: "https://github.com/libvue/core",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "javascript", text: "JavaScript" },
            { icon: "sass", text: "Scss" },
            { icon: "vite", text: "Vite.js" },
        ],
    },
    {
        title: "Libvue Laravel Orion API",
        description:
            "A Laravel Orion compatible repository-based JavaScript http-client powered by axios.",
        href: "https://github.com/libvue/laravel-orion-api",
        tags: [
            { icon: "javascript", text: "JavaScript" },
            { icon: "vite", text: "Vite.js" },
        ],
    },
];

export const experience: ExperienceItem[] = [
    {
        period: "2022 - present",
        role: "Senior Frontend Developer",
        company: "Travel Agency",
        summary:
            "Designing and building digital travel platforms, including booking flows, agent-facing tools, content management systems, reusable UI libraries, and external search widgets. My focus is on making complex travel workflows understandable, maintainable, and pleasant to use.",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "typescript", text: "TypeScript" },
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
        company: "Digital Media & Technology",
        summary:
            "Worked on a wide range of commercial web applications, marketing platforms, mobile payment flows, promotional websites, content-driven platforms, and mobile apps. Involved in both design and frontend development, with a strong focus on Vue.js single-page applications, landing pages, conversion-focused interfaces, and mobile-first user experiences.",
        tags: [
            { icon: "vuejs", text: "Vue.js" },
            { icon: "javascript", text: "JavaScript" },
            { icon: "laravel", text: "Laravel" },
            { icon: "ionic", text: "Ionic" },
            { icon: "sass", text: "SCSS" },
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
            { icon: "javascript", text: "JavaScript" },
            { icon: "wordpress", text: "WordPress" },
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
        label: "LinkedIn",
        value: "linkedin.com/in/harmendv",
        href: "https://www.linkedin.com/in/harmendv",
    },
];
