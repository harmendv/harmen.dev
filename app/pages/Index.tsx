import { Hero } from "../components/common/Hero";
import { ProjectCard } from "../components/common/ProjectCard";
import { ExperienceBlock } from "../components/common/ExperienceBlock";
import { projects } from "../data/projects";
import { experience } from "../data/experience";

export default function Index() {
  return (
    <>
      <Hero className="mb-12" />
      <section className="mb-12">
        <h2 id="open-source" className="font-semibold text-xl mb-6">
          Open Source
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {projects.map(({ href, title, description, stack, releaseDate }) => (
            <ProjectCard
              key={title}
              href={href}
              title={title}
              description={description}
              stack={stack}
              releaseDate={releaseDate}
            />
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 id="experience" className="font-semibold text-xl mb-5">
          Experience
        </h2>
        <div className="grid grid-cols-1 gap-6 mb-6">
          {experience.map(({ dateRange, title, field, description, stack }) => (
            <ExperienceBlock
              key={title}
              dateRange={dateRange}
              title={title}
              description={description}
              stack={stack}
              field={field}
            />
          ))}
        </div>
      </section>
    </>
  );
}
