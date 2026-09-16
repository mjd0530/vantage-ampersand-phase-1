# Vantage Ampersand Phase 1

A high-fidelity interactive prototype of Lenovo Vantage Home, built from Figma
node [`2076:14773`](https://www.figma.com/design/uqDOuepZ1Dfzaa9xa78njX/Vantage-Ampersand-redesign?node-id=2076-14773&m=dev)
with the released Cake& v4.2.4 Dev Kit.

## Implemented

- Windows 11 title bar and token-driven Mica application shell
- Cake& sidebar navigation and Home command bar
- Device identity, battery, warranty, support, offer, Smart Performance, and
  Smart Lock cards
- Copy feedback, support/offer pagers, navigation panels, update flow, service
  scan modal, and success/error messaging
- Deterministic loading, empty, error, and success review states
- Exact Figma-provided Vantage marks, partner logos, wallpaper, and illustrations

The populated Home screen is the approved visual scope. The linked frame does
not contain CPU, GPU, memory, or destination-page designs, so those views are
not invented; non-Home destinations explicitly identify that Phase 1 boundary.

## Cake& reuse

The app consumes `@cake-admin/cakeand` from its version-pinned public release
tarball and imports all design-system components from the package root. Reused
components include `CakeProvider`, `Sidebar`, `SidebarNav`, `SidebarItem`,
`SidebarContent`, `Card`, `Button`, `IconButton`, `Avatar`, `Modal`,
`ModalContent`, `ModalFooter`, `ProgressBar`, `Spinner`, and `Toast`.

All application styling is built with `styled-components` and Cake& custom
properties for color, spacing, typography, radius, stroke, and elevation.

## Prototype states

The default URL always opens the exact Home review state. Add
`?controls=true` to show the review-only state dropdown:

```text
http://localhost:5173/?controls=true
```

The dropdown exposes Default, Loading, Empty, Error, and Success. A state can
also be linked directly with `?scenario=loading` (or `empty`, `error`,
`success`).

## System gaps

- Cake& documents the Windows `container blur high` recipe but does not export
  an application-window component, so the shell composes the official surface,
  OS stroke, elevation, and blur tokens locally.
- The Figma radial battery/warranty treatment and walkthrough dots have no
  exported Cake& equivalents. They are isolated token-driven composites.
- Windows caption controls are platform chrome rather than Cake& content and
  are isolated in `TitleBar`.
- The root Cake& package marks its entry as side-effectful and ships its full
  token stylesheet. Production chunks are warning-free after vendor splitting,
  but the Cake& JavaScript/CSS payload remains above the aspirational prototype
  bundle budgets.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Validation covers six interaction/accessibility tests, including an axe scan.
The production build is split into app, Cake&, React, and icon chunks with no
Vite size warning. Chrome geometry at a 1440×1080 viewport is:

- sidebar: 232px
- dashboard: x=264px, width=1144px
- top-row cards: 560px / 268px / 268px
- document overflow: none

## Sources and assumptions

- Figma hierarchy, variables, screenshot, downloadable assets, and recursive
  motion data were inspected through the configured Figma MCP server. The frame
  has no authored motion tracks, so only Cake& interaction transitions are used.
- Cake& Storybook, Dev Kit v4.2.4, `cake-admin/cakev2/AGENTS.md`, the canonical
  Figma implementation skill, and generated starter context were followed.
- The requested `cake-admin/ai-lab` repository returned 404 to the authenticated
  GitHub client. The approved canonical Cake& repository guidance was used as
  the documented fallback.
- Device identifiers and asynchronous timing are local mock data. No hardware,
  account, commerce, or update backend is called.

You need [Node.js](https://nodejs.org/) (LTS). That gives you `npm`. Open a
terminal and run the steps below. A slower, plain-language walkthrough is on
the Storybook [Introduction](https://cake.lenovo.com/storybook/?path=/docs/introduction--docs).

## Start as a Windows app

```bash
npm install
npm run start:windows
```

This boots the Vite renderer and opens Lenovo Vantage in a frameless 1440×1080
desktop window (Electron) with a draggable title bar and working minimize,
maximize, and close controls. Use this for local Windows-app review.

On Windows, macOS, and Linux the same command launches the native desktop
window. A browser-only session is still available with `npm run dev`, which
prints a URL, normally [`http://localhost:5173`](http://localhost:5173).

This repository was originally scaffolded from:

```bash
npx degit cake-admin/cakev2/starter vantage-ampersand-phase-1
cd vantage-ampersand-phase-1
npm install
npm run dev
```

If `degit` gives you trouble (it is unmaintained), either of these works:

```bash
npx giget@latest gh:cake-admin/cakev2/starter my-prototype
git clone --depth 1 https://github.com/cake-admin/cakev2 && cp -r cakev2/starter my-prototype
```

## What is already wired up

- **`CakeProvider`** mounted once in `src/App.tsx`, with a working theme toggle.
- **Design tokens** — ~470 CSS custom properties, live, theme-aware.
- **Rookery New** loaded from the package. No font setup.
- **63 components**, imported from one path.
- **Agent context** in `context/` so Claude Code and Cursor know the real API
  instead of guessing at it. See [AGENTS.md](AGENTS.md).

## Working with a coding agent

Point it at this folder and ask for what you want — "build a settings page with
tabs, a table, and a save button". It reads `AGENTS.md` and `context/` and builds
from real cake& components with real tokens.

## Updating cake&

```bash
npm run cake:update
```

This resolves the newest release and pins its exact version. The dependency is a
version-specific URL on purpose — a "always latest" URL would silently fail to
update, then break `npm ci` with an integrity error. `scripts/update-cake.mjs`
explains the full reasoning.

## Adding cake& to an app you already have

```bash
npm install https://github.com/cake-admin/cakev2/releases/download/v4.2.4/cake-admin-cakeand-4.2.4.tgz
npm install react react-dom styled-components radix-ui lucide-react
```

The current kit is
[v4.2.4](https://github.com/cake-admin/cakev2/releases#release-v4.2.4).

Then copy three things from this starter, all of which matter:

1. `resolve.dedupe` from `vite.config.ts`
2. the explicit `import '@cake-admin/cakeand/cakeand.css'` in `src/main.tsx`
3. `data-theme` on `<html>` in `index.html`

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Everything unstyled, every token an empty string | The cake& stylesheet did not load. Check the `@cake-admin/cakeand/cakeand.css` import at the top of `src/main.tsx`. |
| Your CSS cannot override a cake& value | Import order. Your stylesheets must come *after* the cake& one in `src/main.tsx`. |
| Components render but ignore the theme | Two copies of `styled-components`. Check `npm ls styled-components`; `resolve.dedupe` in `vite.config.ts` should prevent it. |
| Flash of the wrong theme on load | `data-theme` in `index.html` disagrees with `mode` in `src/App.tsx`. |
| `npm error EINTEGRITY` | A lockfile pinned to a tarball whose bytes changed. Delete `package-lock.json` and run `npm run cake:update`. |
| npm fails oddly on Windows | An `&` in your folder path breaks npm's `.bin` shims. Rename the folder — `Q3 Concepts & Ideas` will not work. |
| A component you need does not exist | Check `context/cake-components.md`. If it genuinely is not there, raise it against `cake-admin/cakev2` rather than hand-rolling one. |

Use **npm**. pnpm and yarn will resolve the URL dependency, but their layouts
interact differently with `radix-ui`'s peer graph and are not tested here.

## Documentation

Live Storybook — every component, its props, variants, and accessibility
contract: <https://cake.lenovo.com/storybook/>
