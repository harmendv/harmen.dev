import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerEffect({
    name: "appearLines",
    defaults: {
        duration: 0.3,
        y: -40,
        autoAlpha: 0,
        stagger: 0.222,
        ease: "back.out(2.7)",
        delay: 0
    },
    effect: (targets, config) => {
        const el = gsap.utils.toArray<HTMLElement>(targets)[0];
        const split = SplitText.create(el, { type: "lines", aria: "auto" });
        return gsap.from(split.lines, config);
    }
});

gsap.registerEffect({
    name: "appearChars",
    defaults: {
        duration: 0.2,
        y: 20,
        autoAlpha: 0,
        rotate: "10deg",
        stagger: 0.01,
        ease: "back.out(2.7)",
        delay: 0,
        mask: true
    },
    effect: (targets, config) => {
        const el = gsap.utils.toArray<HTMLElement>(targets)[0];
        const split = SplitText.create(el, {
            type: "chars",
            mask: config.mask ? "chars" : undefined
        });
        return gsap.from(split.chars, config);
    }
});

gsap.registerEffect({
    name: "rotateWords",
    defaults: {
        slideDuration: 0.4,
        pause: 2,
        easeIn: "back.in(2.7)",
        easeOut: "back.out(2.7)",
        top: 3,
        left: 12,
        startIndex: 0,
        repeat: -1
    },
    effect: (targets, config) => {
        const el = gsap.utils.toArray<HTMLElement>(targets)[0];
        const items = Array.from(el.children) as HTMLElement[];

        gsap.set(el, { position: "relative" });
        gsap.set(items, {
            position: "absolute",
            top: config.top,
            left: config.left,
            opacity: 0,
            yPercent: -100
        });
        gsap.set(items[config.startIndex], { opacity: 1, yPercent: 0 });

        const show = { opacity: 1, yPercent: 0, duration: config.slideDuration, ease: config.easeOut };
        const hide = { opacity: 0, yPercent: 100, duration: config.slideDuration, ease: config.easeIn };

        const tl = gsap.timeline({ repeat: config.repeat });
        for (let i = 0; i < items.length; i++) {
            const curr = (config.startIndex + i) % items.length;
            const next = (curr + 1) % items.length;

            tl.set(items.filter((_, idx) => idx !== curr), { opacity: 0, yPercent: 100 }, 0)
                .to(items[curr], hide)
                .to(items[next], show)
                .to({}, { duration: config.pause });
        }
        return tl;
    }
});

gsap.registerEffect({
    name: "fadeBounce",
    defaults: {
        duration: 0.8,
        delay: 0,
        scaleFrom: 0,
        ease: "bounce.out",
        stagger: 0,
        transformOrigin: "50% 50%",
    },
    effect: (targets, config) => {
        const els = gsap.utils.toArray<HTMLElement | SVGElement>(targets);
        gsap.set(els, {
            autoAlpha: 0,
            scale: config.scaleFrom,
            transformOrigin: config.transformOrigin,
        });
        return gsap.to(els, {
            duration: config.duration,
            autoAlpha: 1,
            scale: 1,
            ease: config.ease,
            delay: config.delay,
            stagger: config.stagger,
        });
    },
});


gsap.registerEffect({
    name: "mouseFollow",
    effect: (targets: gsap.TweenTarget, config: {
        depth?: number;
        strength?: number;
        axis?: "both" | "x" | "y";
        ease?: string;
        duration?: number;
        clamp?: { x?: number; y?: number };
    }) => {
        const opts = {
            depth: 10,
            strength: 1,
            axis: "both" as "both" | "x" | "y",
            ease: "power2.out",
            duration: 0.25,
            clamp: { x: Infinity, y: Infinity },
            ...config,
        };

        const els = gsap.utils.toArray<HTMLElement>(targets);
        if (!els.length) return () => {};

        const onMove = (e: MouseEvent) => {
            const moveX = ((e.pageX - window.innerWidth / 2) / opts.depth) * opts.strength;
            const moveY = ((e.pageY - window.innerHeight / 2) / opts.depth) * opts.strength;

            const tx = Math.max(Math.min(moveX, opts.clamp.x!), -opts.clamp.x!);
            const ty = Math.max(Math.min(moveY, opts.clamp.y!), -opts.clamp.y!);

            els.forEach((el, i) => {
                const idx = i + 1;
                const x = opts.axis !== "y" ? tx * idx : 0;
                const y = opts.axis !== "x" ? ty * idx : 0;
                gsap.to(el, { x, y, ease: opts.ease, duration: opts.duration });
            });
        };

        window.addEventListener("mousemove", onMove, { passive: true });

        // return cleanup
        return () => window.removeEventListener("mousemove", onMove);
    },
    defaults: {
        depth: 10,
        strength: 1,
        axis: "both",
        ease: "power2.out",
        duration: 0.25,
        clamp: { x: Infinity, y: Infinity },
    },
    extendTimeline: false,
});
