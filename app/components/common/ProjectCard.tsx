import type { ProjectItem } from "../../types/global.types";
import { Badge } from "./Badge";

type ProjectCardProps = ProjectItem;

export const ProjectCard = ({ href, title, stack, description, releaseDate }: ProjectCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex flex-col rounded-md border border-border bg-card px-4 py-4 shadow-md shadow-shadow  hover:border-primary hover:opacity-85  sm:px-5"
    >
      <h3 className="text-md font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-md leading-8 text-muted-foreground">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {stack.map(({ name, icon: Icon }) => (
          <Badge key={name}>
            <Icon size={12} aria-hidden />
            {name}
          </Badge>
        ))}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">Released {releaseDate}</div>
    </a>
  );
};
