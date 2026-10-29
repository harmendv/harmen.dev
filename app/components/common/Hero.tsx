import { Badge } from "./Badge";
import { TypeAnimation } from 'react-type-animation';
import { stack } from "../../data/stack";

export const Hero = ({ className }: { className: string }) => {
  return (
    <section className={`flex flex-col w-full ${className}`}>
      <h1 className="font-display text-4xl sm:text-7xl font-bold">
        I build <TypeAnimation
              sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'interfaces',
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  'tools',
                  2000,
                  'components',
                  2000,
                  'widgets',
                  2000,
                  'libraries',
                  2000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
              preRenderFirstString={true}
          />
      </h1>
      <h2 className="font-sans text-sm sm:text-lg font-semibold mt-2">Senior Frontend Developer</h2>
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
