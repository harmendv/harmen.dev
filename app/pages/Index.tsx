import { Hero } from "../components/common/Hero";
import { ProjectScroller } from "../components/common/ProjectScroller";
import { ExperienceBlock } from "../components/common/ExperienceBlock";
import { projects } from "../data/projects";
import { experience } from "../data/experience";

export default function Index() {
  return (
    <>
      <Hero className="mb-12" />
      <ProjectScroller id="projects" title="Projects" projects={projects} className="mb-12" />
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
