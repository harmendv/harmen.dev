// TypeScript
// 'src/utils/gsap-background.ts'
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Multi-octave looping noise (periodic) with gain and frequency controls
function loopNoise(t: number, seed = 0, T = 8, octaves = 4, baseFreq = 1, gain = 0.6): number {
    const w = (2 * Math.PI) / T;
    let amp = 1;
    let freq = baseFreq;
    let sum = 0;
    for (let i = 0; i < octaves; i++) {
        sum += Math.sin(w * freq * t + seed * (i + 1.123)) * amp;
        amp *= gain;
        freq *= 2.07;
    }
    // normalize by geometric series approx
    const norm = (1 - Math.pow(gain, octaves)) / (1 - gain);
    return sum / Math.max(norm, 1e-6);
}

// Parse M/L/H/V/Z (absolute+relative). Convert H/V to L. Curves ignored.
function parsePathD(d: string): Array<{ x: number; y: number; cmd: string }> {
    const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+/g) || [];
    const pts: Array<{ x: number; y: number; cmd: string }> = [];
    let i = 0, cmd = "", cx = 0, cy = 0;
    while (i < tokens.length) {
        const tok = tokens[i++];
        if (/^[A-Za-z]$/.test(tok)) {
            cmd = tok;
            if (cmd === "Z" || cmd === "z") pts.push({ x: NaN, y: NaN, cmd });
            continue;
        }
        const num = parseFloat(tok);
        if (!Number.isFinite(num)) continue;

        if (cmd === "M" || cmd === "L") {
            const x = num;
            const yTok = tokens[i++]; const y = yTok !== undefined ? parseFloat(yTok) : NaN;
            if (Number.isFinite(y)) { cx = x; cy = y; pts.push({ x, y, cmd }); }
        } else if (cmd === "m" || cmd === "l") {
            const dx = num;
            const dyTok = tokens[i++]; const dy = dyTok !== undefined ? parseFloat(dyTok) : NaN;
            if (Number.isFinite(dy)) { cx += dx; cy += dy; pts.push({ x: cx, y: cy, cmd: "L" }); }
        } else if (cmd === "H") {
            cx = num; pts.push({ x: cx, y: cy, cmd: "L" });
        } else if (cmd === "h") {
            cx += num; pts.push({ x: cx, y: cy, cmd: "L" });
        } else if (cmd === "V") {
            cy = num; pts.push({ x: cx, y: cy, cmd: "L" });
        } else if (cmd === "v") {
            cy += num; pts.push({ x: cx, y: cy, cmd: "L" });
        }
    }
    return pts;
}

// Catmull-Rom to cubic bezier for closed loop
function catmullRomToBezier(points: Array<{ x: number; y: number }>, tension = 0.5): string {
    const n = points.length;
    if (n < 2) return "";
    let d = `M${points[0].x} ${points[0].y}`;
    for (let i = 0; i < n; i++) {
        const p0 = points[(i - 1 + n) % n];
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        const p3 = points[(i + 2) % n];

        const c1x = p1.x + (p2.x - p0.x) * (tension / 6);
        const c1y = p1.y + (p2.y - p0.y) * (tension / 6);
        const c2x = p2.x - (p3.x - p1.x) * (tension / 6);
        const c2y = p2.y - (p3.y - p1.y) * (tension / 6);
        d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
    }
    d += " Z";
    return d;
}

export function initBackground(opts?: {
    blobSelector?: string;
    guideSelector?: string;
    loopPeriod?: number;
    wobbleAmplitude?: number;         // radial wobble strength
    tangentialAmplitude?: number;     // tangential wobble strength
    phasePerVertex?: number;
    duration?: number;
    smoothness?: number;              // spline tension (0..1)
    vertexDensify?: number;           // extra points per edge (>= 0)
    octaves?: number;                 // noise octaves
    noiseGain?: number;               // per-octave amplitude decay
    baseFreq?: number;                // base frequency
    radialScaleAmplitude?: number;    // extra radial scaling
    jitterAmplitude?: number;         // small random jitter
}) {
    const cfg = {
        blobSelector: "#blob",
        guideSelector: "#motionPath",
        loopPeriod: 8,
        wobbleAmplitude: 24,            // extreme wobble
        tangentialAmplitude: 10,        // strong tangential wobble
        phasePerVertex: 0.55,
        duration: 24,
        smoothness: 0.65,
        vertexDensify: 4,               // heavy densification
        octaves: 5,
        noiseGain: 0.55,
        baseFreq: 1.2,
        radialScaleAmplitude: 0.25,     // ±25% local scaling
        jitterAmplitude: 1.5,           // subtle point jitter
        ...opts,
    };

    const blob = document.querySelector(cfg.blobSelector) as SVGPathElement | null;
    const guide = document.querySelector(cfg.guideSelector) as SVGPathElement | null;
    if (!blob || !guide) return;

    const baseD = blob.getAttribute("d") || "";
    const basePts = parsePathD(baseD);
    const edgePts = basePts.filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));
    if (edgePts.length === 0) return;

    // Densify vertices to avoid sharp edges
    const densePts: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < edgePts.length; i++) {
        const a = edgePts[i];
        const b = edgePts[(i + 1) % edgePts.length];
        densePts.push({ x: a.x, y: a.y });
        for (let k = 1; k <= cfg.vertexDensify; k++) {
            const t = k / (cfg.vertexDensify + 1);
            densePts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
        }
    }

    const points = densePts;
    let cx = points.reduce((s, p) => s + p.x, 0) / points.length;
    let cy = points.reduce((s, p) => s + p.y, 0) / points.length;
    if (!Number.isFinite(cx) || !Number.isFinite(cy)) {
        const b = blob.getBBox();
        cx = b.x + b.width / 2;
        cy = b.y + b.height / 2;
    }

    const bases = points.map(p => {
        const a = Math.atan2(p.y - cy, p.x - cx);
        const r = Math.hypot(p.x - cx, p.y - cy);
        return { a, r };
    });
    const seeds = points.map((_, i) => (Math.sin(i * 12.9898) * 43758.5453) % 100);

    const start = performance.now();

    const updateBlob = () => {
        const t = (performance.now() - start) / 1000;
        const next: Array<{ x: number; y: number }> = [];

        for (let i = 0; i < points.length; i++) {
            const a0 = bases[i].a;
            const r0 = bases[i].r;

            const radialNoise = loopNoise(t + i * cfg.phasePerVertex, seeds[i], cfg.loopPeriod, cfg.octaves, cfg.baseFreq, cfg.noiseGain);
            const tangentialNoise = loopNoise(t * 0.9 + i * (cfg.phasePerVertex * 1.27), seeds[i] + 1.01, cfg.loopPeriod, cfg.octaves, cfg.baseFreq * 0.9, cfg.noiseGain);

            const scaleNoise = loopNoise(t * 0.6 + i * (cfg.phasePerVertex * 0.7), seeds[i] + 2.03, cfg.loopPeriod, 3, 0.7, 0.7);
            const jitterX = Math.sin((seeds[i] + t * 13.1) % (2 * Math.PI)) * cfg.jitterAmplitude;
            const jitterY = Math.cos((seeds[i] + t * 10.7) % (2 * Math.PI)) * cfg.jitterAmplitude;

            const rn = r0 * (1 + scaleNoise * cfg.radialScaleAmplitude) + radialNoise * cfg.wobbleAmplitude;
            const tn = tangentialNoise * cfg.tangentialAmplitude;

            const x = cx + Math.cos(a0) * rn - Math.sin(a0) * tn + jitterX;
            const y = cy + Math.sin(a0) * rn + Math.cos(a0) * tn + jitterY;

            if (!Number.isFinite(x) || !Number.isFinite(y)) return; // skip bad frame
            next.push({ x, y });
        }

        const smoothD = catmullRomToBezier(next, cfg.smoothness);
        if (smoothD) blob.setAttribute("d", smoothD);
    };

    gsap.ticker.add(updateBlob);

    gsap.to("#blobGroup", {
        duration: cfg.duration,
        repeat: -1,
        ease: "none",
        motionPath: {
            path: cfg.guideSelector,
            align: cfg.guideSelector,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
        },
    });
}
