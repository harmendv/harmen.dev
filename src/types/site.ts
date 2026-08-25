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
    role: string;
    github: string;
    website: string;
    title: string;
    intro: string;
    summary: string;
    stack: ContentBadgeItem[];
}

/** Optional lifecycle marker shown as a badge on the project card. */
export type ProjectStatus = "new" | "deprecated";

export interface Project {
    title: string;
    description: string;
    href: string;
    /** First public release, as `YYYY-MM`. */
    released?: string;
    status?: ProjectStatus;
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
