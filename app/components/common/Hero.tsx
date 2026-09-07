import { Badge } from "./Badge";
import { stack } from "../../data/stack";

export const Hero = ({ className }: { className: string }) => {
  return (
    <section className={`flex flex-col w-full ${className}`}>
      <h1 className="font-display text-5xl sm:text-7xl font-bold">
        I build stuff<span className="text-primary">;</span>
      </h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground mb-5">
        I like turning complex workflows into clear, maintainable UI — whether that’s a booking
        flow, internal tool, content management interface, search widget, or component library. My
        work sits close to the product: structured, usable, and built to last.
      </p>
      <div className="text-muted-foreground flex gap-2 items-center flex-wrap">
        ❤️ Favorite stack
        <span className="inline-flex gap-2 flex-wrap">
          {stack.map(({ name, icon: Icon }, index) => (
            <Badge key={index}>
              <Icon size={12} aria-hidden />
              {name}
            </Badge>
          ))}
        </span>
      </div>
    </section>
  );
};
