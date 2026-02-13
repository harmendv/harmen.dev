# Copilot Instructions (`harmen.dev`)

## Goal
Maintain a lightweight, animation-driven landing page built with Vue + GSAP.

## Tech Context
- Framework: Vue 3 (`<script setup>`).
- Build: Vite.
- Styling: Tailwind CSS v4 + custom CSS in `src/style.css`.
- Motion: GSAP with custom effects in `src/utils/gsap-effects.ts` and background motion in `src/utils/gsap-background.ts`.

## Coding Preferences
- Prefer small, focused changes over broad rewrites.
- Reuse existing GSAP effects before adding new ones.
- Keep class naming and typography/gradient style consistent with current design.
- Preserve accessibility basics (`aria-label`, semantic structure, keyboard-safe links).
- Avoid introducing heavy dependencies for simple UI behavior.

## File-Level Guidance
- `src/App.vue`: keep component structure simple; animation wiring belongs in `onMounted`.
- `src/utils/gsap-effects.ts`: keep effect names stable and defaults sensible.
- `src/utils/gsap-background.ts`: prioritize performance and numerical stability.
- `.github/workflows/main.yml`: keep build/deploy pipeline deterministic.

## Validation
Before finalizing code suggestions, prefer checks in this order:
1. `npm run build`
2. Manual visual check in `npm run dev`

## Notes
If you want GitHub Copilot Chat to apply this automatically in VS Code, duplicate this content into `.github/copilot-instructions.md`.
