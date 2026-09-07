import type { IconType } from "@icons-pack/react-simple-icons";

export type StackItem = {
  name: string;
  icon: IconType;
};

export type ProjectItem = {
  href: string;
  title: string;
  stack: StackItem[];
  description: string;
  releaseDate: string;
};

export type ExperienceItem = {
  dateRange: string;
  title: string;
  field: string;
  description: string;
  stack: StackItem[];
};
