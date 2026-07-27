import { animate, onScroll, splitText, stagger, utils } from "animejs";
import type { App, Directive } from "vue";

/**
 * Vue plugin: scroll-driven reveal animations for the site, built on anime.js
 * v4. Install once and it registers `v-reveal` and `v-logo`:
 *
 *   app.use(animePlugin)                  // blur on  (default)
 *   app.use(animePlugin, { blur: false }) // blur off — for perf comparison
 *
 * The aesthetic (per design brief):
 *  - words slide up with a fade + blur          -> `v-reveal:words`
 *  - single elements fade/blur/rise             -> `v-reveal`          (default)
 *  - groups of items reveal staggered           -> `v-reveal:stagger`  (badges)
 *  - whole cards/blocks fade + slide as a unit  -> `v-reveal:block`
 *  - the logo fades in; star rotates on hover   -> `v-logo`
 *
 * Everything slides in ONE direction — upward (from just below its resting
 * spot). Nothing ever drops down, so the whole page reads as coherent.
 *
 * Reveals use anime's `onScroll` observer: `onEnter` plays the animation when
 * the element scrolls into view, and anything already on screen at load is
 * played immediately (anime's observer only fires `onEnter` on *crossing* the
 * threshold, so initially-visible elements need this nudge — otherwise they'd
 * stay hidden). Each reveal plays exactly once.
 */

type RevealOptions = {
    /** Base delay in ms before the reveal starts. */
    delay?: number;
    /** Animation duration in ms. */
    duration?: number;
    /** Per-item stagger step in ms (words / stagger presets). */
    stagger?: number;
    /** Upward slide distance. Number = px, string = any CSS length ("0.5em"). */
    y?: number | string;
    /** Blur amount in px at the start of the reveal. */
    blur?: number;
};

/** anime.js animation handle (loosely typed — the lib's return type). */
type Anim = ReturnType<typeof animate>;

/**
 * Global blur switch. Animating `filter: blur()` is expensive (it repaints
 * instead of compositing on the GPU), so it can be turned off via the plugin
 * option to compare performance. When off, reveals keep their fade + slide.
 */
let blurEnabled = true;

/** Cleanup callbacks keyed by element, run on unmount to avoid leaks. */
const cleanups = new WeakMap<HTMLElement, () => void>();

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const inViewport = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;
    return r.bottom > 0 && r.top < h;
};

/**
 * The scroll line at which a reveal fires: the element's top edge rising to
 * 60px above the viewport bottom (`end-=60`) — a small offset so reveals start
 * a touch after the element first peeks in.
 *
 * The exception is content in the last screenful of the page (e.g. the footer
 * links): the document runs out of scroll before their top can climb that far,
 * so the `-=60` line is never reached and `onEnter` would never fire, leaving
 * them stuck hidden. For those we drop the offset to the plain viewport bottom
 * (`end`), a threshold every scrollable element crosses on its way in.
 */
function enterContainer(el: HTMLElement) {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const maxScroll = document.documentElement.scrollHeight - vh;
    // Where the element's top edge sits (viewport coords) at maximum scroll.
    const topAtBottom =
        el.getBoundingClientRect().top + window.scrollY - maxScroll;
    return topAtBottom <= vh - 60 ? "end-=60" : "end";
}

/**
 * Play `animation` once the element scrolls into view (see `enterContainer` for
 * the trigger line); elements already visible at load are played immediately.
 *
 * Measurement and observer setup wait one frame: during Vue's `mounted` the
 * browser hasn't finished layout, so reading the element's box there can report
 * it as off-screen or misjudge how far it can scroll. `onEnter` only fires when
 * the element *crosses* the line, so initially-visible content is played via
 * the `inViewport` check instead — otherwise it would never animate.
 */
function playOnScroll(el: HTMLElement, animation: Anim) {
    let played = false;
    const play = () => {
        if (played) return;
        played = true;
        animation.play();
    };

    let observer: ReturnType<typeof onScroll> | undefined;

    const raf = requestAnimationFrame(() => {
        if (inViewport(el)) {
            play();
            return;
        }
        observer = onScroll({
            target: el,
            enter: { target: "start", container: enterContainer(el) },
            onEnter: play,
        });
    });

    return () => {
        cancelAnimationFrame(raf);
        observer?.revert();
        animation.revert();
    };
}

/** Blur helpers — no-op when blur is disabled. */
const blurStyle = (px: number): Record<string, string> =>
    blurEnabled ? { filter: `blur(${px}px)` } : {};
const blurTween = (px: number): Record<string, string[]> =>
    blurEnabled ? { filter: [`blur(${px}px)`, "blur(0px)"] } : {};
const willChange = () =>
    blurEnabled ? "transform, filter, opacity" : "transform, opacity";

/**
 * Elements may carry a CSS `transition` (e.g. Tailwind's `transition` on the
 * project cards) covering transform/opacity/filter. Left in place it fights
 * anime — the browser eases toward each frame, producing a down-then-up wobble
 * and a muddy fade. So we suppress it during the reveal…
 */
const noTransition = { transition: "none" };

/** …and once the reveal completes, hand the element back to CSS by removing the
 * inline styles the reveal added. The end state (opacity 1, no transform/filter)
 * equals the element's natural resting styles, so clearing them is seamless —
 * and it lets CSS hover states work again (an inline `opacity: 1` would block a
 * `hover:opacity-…`). NB: we clear specific props rather than anime's
 * `cleanInlineStyles`, which reverts to the pre-animation value (opacity 0). */
function handBackToCss(targets: HTMLElement | HTMLElement[]) {
    return () => {
        const list = Array.isArray(targets) ? targets : [targets];
        for (const el of list) {
            el.style.opacity = "";
            el.style.transform = "";
            el.style.filter = "";
            el.style.transition = "";
            el.style.willChange = "";
        }
    };
}

/* ------------------------------------------------------------------ */
/* Reveal presets. All slide upward (positive y -> 0).                 */
/* ------------------------------------------------------------------ */

/** Words slide up with a fade + blur, staggered. */
function revealWords(el: HTMLElement, opts: RevealOptions) {
    const blur = opts.blur ?? 8;
    // `accessible: true` (anime's default, set explicitly here) keeps a
    // visually-hidden copy of the original text for screen readers and marks
    // every split word `aria-hidden`, so the text is announced once, intact.
    const splitter = splitText(el, {
        words: true,
        chars: false,
        accessible: true,
    });
    const words = splitter.words as HTMLElement[];

    utils.set(words, {
        display: "inline-block",
        opacity: 0,
        willChange: willChange(),
        ...noTransition,
        ...blurStyle(blur),
    });

    const animation = animate(words, {
        opacity: [0, 1],
        y: [opts.y ?? "0.5em", "0em"],
        ...blurTween(blur),
        duration: opts.duration ?? 600,
        delay: stagger(opts.stagger ?? 42, { start: opts.delay ?? 0 }),
        ease: "out(3)",
        autoplay: false,
        onComplete: handBackToCss(words),
    });

    const stop = playOnScroll(el, animation);
    return () => {
        stop();
        splitter.revert();
    };
}

/** A single element fades + blurs + rises into place. */
function revealFade(el: HTMLElement, opts: RevealOptions) {
    const blur = opts.blur ?? 6;

    utils.set(el, {
        opacity: 0,
        willChange: willChange(),
        ...noTransition,
        ...blurStyle(blur),
    });

    const animation = animate(el, {
        opacity: [0, 1],
        y: [opts.y ?? 14, 0],
        ...blurTween(blur),
        duration: opts.duration ?? 560,
        delay: opts.delay ?? 0,
        ease: "out(3)",
        autoplay: false,
        onComplete: handBackToCss(el),
    });

    return playOnScroll(el, animation);
}

/** Direct children reveal one-by-one with a soft pop. Great for badge rows. */
function revealStagger(el: HTMLElement, opts: RevealOptions) {
    const blur = opts.blur ?? 5;
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return () => {};

    utils.set(items, {
        opacity: 0,
        willChange: willChange(),
        ...noTransition,
        ...blurStyle(blur),
    });

    const animation = animate(items, {
        opacity: [0, 1],
        y: [opts.y ?? 10, 0],
        scale: [0.96, 1],
        ...blurTween(blur),
        duration: opts.duration ?? 520,
        delay: stagger(opts.stagger ?? 50, { start: opts.delay ?? 0 }),
        ease: "out(3)",
        autoplay: false,
        onComplete: handBackToCss(items),
    });

    return playOnScroll(el, animation);
}

/**
 * A whole block (card / article) fades and slides up as one unit. Use this on
 * a container instead of revealing its children individually, so it never
 * flashes fully-visible on the first frame.
 */
function revealBlock(el: HTMLElement, opts: RevealOptions) {
    const blur = opts.blur ?? 6;

    utils.set(el, {
        opacity: 0,
        willChange: willChange(),
        ...noTransition,
        ...blurStyle(blur),
    });

    const animation = animate(el, {
        opacity: [0, 1],
        y: [opts.y ?? 24, 0],
        ...blurTween(blur),
        duration: opts.duration ?? 620,
        delay: opts.delay ?? 0,
        ease: "out(3)",
        autoplay: false,
        onComplete: handBackToCss(el),
    });

    return playOnScroll(el, animation);
}

/* ------------------------------------------------------------------ */
/* Directives.                                                         */
/* ------------------------------------------------------------------ */

/**
 * `v-reveal[:preset]` — reveal on entering the viewport.
 *   v-reveal            fade + blur + rise (default)
 *   v-reveal:words      words slide up with fade + blur
 *   v-reveal:stagger    stagger direct children (badges)
 *   v-reveal:block      subtle block slide (transform only)
 * Optional tuning: `v-reveal:words="{ delay: 200, stagger: 40 }"`.
 */
export const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
    mounted(el, binding) {
        if (prefersReducedMotion()) return;

        const opts = binding.value ?? {};
        let cleanup: () => void;

        switch (binding.arg) {
            case "words":
                cleanup = revealWords(el, opts);
                break;
            case "stagger":
                cleanup = revealStagger(el, opts);
                break;
            case "block":
                cleanup = revealBlock(el, opts);
                break;
            default:
                cleanup = revealFade(el, opts);
        }

        cleanups.set(el, cleanup);
    },
    unmounted(el) {
        cleanups.get(el)?.();
        cleanups.delete(el);
    },
};

/**
 * `v-logo` — the logo (name + star). The whole thing fades in gently on load;
 * on hover the star does a subtle rotation and eases back on leave.
 */
export const logo: Directive<HTMLElement> = {
    mounted(el) {
        if (prefersReducedMotion()) return;

        // Subtle fade-in of the entire logo — no slide, no blur.
        utils.set(el, { opacity: 0, willChange: "opacity" });
        animate(el, { opacity: [0, 1], duration: 560, ease: "out(2)" });

        // Hover: the star turns another half-turn and stays put (no revert).
        const starEl = el.querySelector("img");
        if (!starEl) {
            cleanups.set(el, () => {});
            return;
        }

        utils.set(starEl, { willChange: "transform" });
        const spin = () =>
            animate(starEl, { rotate: "+=180", duration: 600, ease: "out(3)" });

        el.addEventListener("mouseenter", spin);
        cleanups.set(el, () => el.removeEventListener("mouseenter", spin));
    },
    unmounted(el) {
        cleanups.get(el)?.();
        cleanups.delete(el);
    },
};

/* ------------------------------------------------------------------ */
/* Plugin.                                                             */
/* ------------------------------------------------------------------ */

type AnimePluginOptions = {
    /** Animate `filter: blur()` on reveals. Default true. Set false to compare perf. */
    blur?: boolean;
};

/** Registers the `v-reveal` and `v-logo` directives globally. */
export const animePlugin = {
    install(app: App, options: AnimePluginOptions = {}) {
        if (options.blur !== undefined) blurEnabled = options.blur;
        app.directive("reveal", reveal);
        app.directive("logo", logo);
    },
};

export default animePlugin;
