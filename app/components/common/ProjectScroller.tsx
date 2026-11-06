import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ProjectItem } from "../../types/global.types";
import { ProjectCard } from "./ProjectCard";

type ProjectScrollerProps = {
  id: string;
  title: string;
  projects: ProjectItem[];
  className?: string;
};

/**
 * Heading + a horizontally scrolling, snap-aligned row of project cards.
 * The row bleeds to the viewport edges (see --page-edge in global.css) so
 * cards are never clipped by the content container, and the next card peeks
 * in from the right as a hint that there is more to scroll.
 */
export const ProjectScroller = ({ id, title, projects, className = "" }: ProjectScrollerProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanScroll({ left: el.scrollLeft > 1, right: el.scrollLeft < max - 1 });
    };
    update();

    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const buttonClass =
    "size-9 rounded-full border border-border flex items-center justify-center text-muted-foreground enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-40";

  return (
    <section className={className}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id={id} className="font-semibold text-xl">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => scrollByCard(-1)}
            disabled={!canScroll.left}
            className={buttonClass}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={17} />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => scrollByCard(1)}
            disabled={!canScroll.right}
            className={buttonClass}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={17} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        role="region"
        aria-label={title}
        tabIndex={0}
        className="scrollbar-none mx-[calc(var(--page-edge)*-1)] flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-(--page-edge) px-(--page-edge) pb-2"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            {...project}
            className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-[42%]"
          />
        ))}
      </div>
    </section>
  );
};
