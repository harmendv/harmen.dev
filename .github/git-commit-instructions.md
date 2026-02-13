# Codex Context Instructions for `harmen.dev`

## Project Snapshot
- Stack: `Vue 3` + `Vite` + `Tailwind CSS v4` + `GSAP`.
- Entry points: `src/main.js`, `src/App.vue`.
- Animations: custom GSAP effects in `src/utils/gsap-effects.ts` and procedural SVG blob logic in `src/utils/gsap-background.ts`.
- Deploy: GitHub Pages via `.github/workflows/main.yml` (builds `dist/` on push to `main`).

## How To Work In This Repo
- Install: `npm install`
- Dev server: `npm run dev`
- Build check: `npm run build`

## Preferred Editing Rules
- Keep animation behavior smooth on desktop and mobile; avoid layout thrash in `mousemove` and ticker callbacks.
- Keep visual style consistent with the current landing-page identity.
- Keep generated code concise and readable; avoid introducing unnecessary abstractions.
- If touching GSAP effect registration, preserve existing effect names because `App.vue` depends on them.

## Context Files To Keep Updated
- `README.md`: short project purpose + run/build/deploy commands.
- `.github/git-commit-instructions.md` (this file): Codex repo-specific guidance.
- Optional: `AGENTS.md`: strict agent instructions and workflow preferences when you want Codex to follow project policies.

## AGENTS vs Skills
- Use `AGENTS.md` when you want stable, repo-local behavior rules (style, testing expectations, architecture constraints).
- Use `.codex/skills/` when you want reusable, named workflows (for example, “release”, “refactor-vue-component”, “gsap-a11y-pass”) that can be invoked explicitly.
- Recommended setup for this repo: keep a small `AGENTS.md` first; add skills only after you notice repeated multi-step tasks.

## Suggested Next Improvements
- Add linting/format commands to `package.json` and run them in CI.
- Add TypeScript type checking (`vue-tsc`) since `App.vue` and utilities use TypeScript.
- Add minimal smoke tests for rendering and core animations.
