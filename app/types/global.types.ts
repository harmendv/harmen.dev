import type { IconType } from "@icons-pack/react-simple-icons";

export type StackItem = {
  name: string;
  icon: IconType;
};

export type ProjectNote = {
  name: string;
  className?: string;
}

export type ProjectItem = {
  href: string;
  title: string;
  stack: StackItem[];
  description: string;
  releaseDate: string;
  notes: ProjectNote[]
};

export type ExperienceItem = {
  dateRange: string;
  title: string;
  field: string;
  description: string;
  stack: StackItem[];
};
