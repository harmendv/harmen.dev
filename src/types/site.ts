export type ContentBadgeItem =
    | string
    | {
          icon?: IconName | null;
          text: string;
      };

export type IconName =
    | "inertia"
    | "laravel"
    | "shadcn"
    | "tailwind"
    | "vite"
    | "vuejs"
    | "javascript"
    | "typescript"
    | "webpack"
    | "sass"
    | "ionic"
    | "html"
    | "css"
    | "wordpress"
    | "php"
    | "sketch"
    | "figma";

export interface Profile {
    name: string;
    role: string;
    github: string;
    website: string;
    intro: string;
    summary: string;
    stack: ContentBadgeItem[];
}

export interface Project {
    title: string;
    description: string;
    href: string;
    tags: ContentBadgeItem[];
}

export interface ExperienceItem {
    period: string;
    role: string;
    company: string;
    summary: string;
    tags: ContentBadgeItem[];
}

export interface ContactLink {
    label: string;
    value: string;
    href: string;
}
