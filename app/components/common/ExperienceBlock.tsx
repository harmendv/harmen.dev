import type { ExperienceItem } from "../../types/global.types";
import { Badge } from "./Badge";
type ExperienceBlockProps = ExperienceItem;

export const ExperienceBlock = ({
  dateRange,
  description,
  field,
  stack,
  title,
}: ExperienceBlockProps) => {
  return (
    <article className="grid gap-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-12 border-b border-muted pb-10 last:border-b-0 last:pb-0 w-full">
      <p className="text-sm leading-7 text-primary-strong">{dateRange}</p>
      <div>
        <h3 className="text-md font-semibold text-foreground">{title}</h3>
        <span className="text-sm font-normal text-muted-foreground">{field}</span>
        <p className="mt-3 text-md leading-8 text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map(({ name, icon: Icon }, index) => (
            <Badge key={index}>
              <Icon size={12} aria-hidden />
              {name}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};
