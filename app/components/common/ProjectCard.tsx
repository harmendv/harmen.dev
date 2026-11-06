import type { ProjectItem } from "../../types/global.types";
import { Badge } from "./Badge";

type ProjectCardProps = ProjectItem & { className?: string };

export const ProjectCard = ({
  href,
  title,
  logo,
  stack,
  description,
  releaseDate,
  notes,
  className = "",
}: ProjectCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`flex flex-col rounded-md border border-border bg-card px-4 py-4 shadow-md shadow-shadow hover:border-primary hover:opacity-85 sm:px-5 ${className}`}
    >
      <div className="flex items-center gap-3">
        {logo ? (
          <img
            src={logo}
            alt=""
            width="40"
            height="40"
            loading="lazy"
            className="size-10 shrink-0 rounded-md object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="size-10 shrink-0 rounded-md bg-muted flex items-center justify-center font-display text-lg font-semibold text-muted-foreground"
          >
            {title.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-md font-semibold text-foreground leading-tight">{title}</h3>
          {notes.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {notes.map(({ name, className }) => (
                <Badge key={name} className={`text-xs ${className}`}>
                  {name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-md leading-8 text-muted-foreground">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {stack.map(({ name, icon: Icon }) => (
          <Badge key={name}>
            <Icon size={12} aria-hidden />
            {name}
          </Badge>
        ))}
      </div>
      <div className="mt-4 text-sm text-muted-foreground flex items-center">
        Released {releaseDate}
      </div>
    </a>
  );
};
