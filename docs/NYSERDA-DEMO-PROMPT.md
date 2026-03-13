# NYSERDA Demo: Prompt and Instructions

## 1. Analysis of the NYSERDA Website (https://www.nyserda.ny.gov/)

### Content structure (for reference when adding components later)
- **Hero**: Mission statement (“Working for an Affordable, Sustainable, and Innovative Energy Future”) with CTA to About
- **Intro block**: “We Are The New York State Energy Research and Development Authority (NYSERDA)” with supporting copy
- **Areas We Impact**: Four focus areas (Renewable Energy, Resilient Energy Systems, Energy Efficiency & Building Decarbonization, Clean Energy Economy)
- **What We’re Working Toward**: Four linked cards (e.g. Building an Inclusive Clean Energy Economy)
- **News & Updates**: Case study highlight, “Powering Energy Innovation” CTA
- **EXPRESS NY**: Callout / alert-style block
- **Featured Stories**: List of story links
- **From The Newsroom**: News links
- **Partner with Us**: Two CTAs (Become a Contractor, Guide to Doing Business)

### Visual design (New York State Design System)
NYSERDA follows the [New York State Design System](https://designsystem.ny.gov/). Use these tokens so the demo looks and feels like the NYSERDA site:

**Colors**
- **Primary (theme)**: `#154973` (deep blue) — primary actions, headers, key UI
- **Theme Strong**: `#0e324f` — hover
- **Theme Stronger**: `#081b2b` — pressed
- **Theme Mid**: `#457aa5` — mid blue
- **Theme Weak**: `#cddde9` — light blue
- **Theme Weaker**: `#eff6fb` — very light blue (backgrounds)
- **Theme Faint**: `#f7fafd` — subtle backgrounds
- **Accent**: `#face00` — yellow highlight
- **Success**: `#1e752e` — green
- **Danger**: `#b52c2c` — red
- **Info**: `#004dd1` — blue links/info
- **Neutrals**: Use grays for body text and borders (e.g. dark gray `#222` / `#262626` for headings, medium gray for body)

**Typography**
- Clean, readable sans-serif (the design system uses system-friendly stacks).
- Do not change `src/app/layout.tsx` or `src/app/[site]/layout.tsx`; if you want a NYS-like font, add it only via CSS (e.g. in `src/assets/base/variables.css` or a new file imported from `globals.css` or `main.css`) using `font-family` on `body` or a wrapper class.

**Overall feel**
- Government / institutional: clear hierarchy, ample whitespace, accessible contrast.
- Primary blue for headers and buttons; light blue/white backgrounds; cards and sections with subtle borders or background tints.

---

## 2. Goal

Create a **new frontend application** in this repository that:
1. Is based on **kit-nextjs-skate-park** (copy or create a new example, e.g. `kit-nextjs-nyserda`).
2. Includes a **working carousel component** (authorable, usable in the page editor).
3. Uses **NYSERDA-like styling** (NYS design system colors and typography) so that when you add components to the page, the site looks and feels like the NYSERDA website.
4. **Does not modify** `src/app/layout.tsx` or `src/app/[site]/layout.tsx` in the new app (styling must be done via CSS and existing global imports only).

---

## 3. Step-by-step instructions (prompt to execute)

Use the following as a single, detailed prompt (e.g. for an AI agent or developer) to perform the work.

---

### PROMPT START

**Task:** Create a new Next.js frontend application for a NYSERDA-style Sitecore XM Cloud customer demo, based on kit-nextjs-skate-park, with a working carousel and NYSERDA-like styling. Do not change any Layout file.

**Steps:**

1. **Create the new application**
   - Copy the entire `examples/kit-nextjs-skate-park` directory to a new directory: `examples/kit-nextjs-nyserda`.
   - Update the new app’s `package.json`: set `name` to a unique name (e.g. `content-sdk-nextjs-nyserda-app-router`) and adjust `config.appName` accordingly.
   - In the repository root, add a new rendering host entry in `xmcloud.build.json` for this app (path: `./examples/kit-nextjs-nyserda`, with the same pattern as `nextjsstarter` / kit-nextjs-skate-park: `buildCommand`, `runCommand`, etc.).

2. **Add carousel dependency and UI primitives**
   - In `examples/kit-nextjs-nyserda`, add:
     - `embla-carousel-react` (e.g. `^8.6.0`, to match other kits).
     - `lucide-react` if not present (for carousel arrows).
   - Add a minimal Shadcn-style carousel UI: create `src/components/ui/carousel.tsx` that uses `useEmblaCarousel` and exports `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, and the carousel API type (e.g. for `setApi`). Use the same API and structure as in `examples/kit-nextjs-article-starter/src/components/ui/carousel.tsx` so the carousel is keyboard-accessible and supports prev/next.
   - If the carousel component depends on a Button component, add a minimal `src/components/ui/button.tsx` (or copy from article-starter) and ensure `src/lib/utils.ts` exists with a `cn()` helper. Do not add unnecessary Shadcn/Radix dependencies beyond what the carousel and button need (e.g. only what is required by `carousel.tsx` and `button.tsx`).

3. **Implement a working Sitecore carousel component**
   - Create a new component in `examples/kit-nextjs-nyserda` (e.g. `src/components/content-carousel` or `src/components/promo-carousel`) that:
     - Accepts Sitecore props (e.g. `ComponentProps` from `@/lib/component-props`) and expects a list of items from the datasource (e.g. `fields?.data?.datasource?.items` or `children?.results`).
     - Renders a carousel using the new `Carousel`, `CarouselContent`, `CarouselItem` from `@/components/ui/carousel`.
     - Supports editing mode: when `page.mode.isEditing` is true, render a simplified or non-interactive view so the placeholder and items are visible in the page editor (follow the pattern used in kit-nextjs-article-starter MultiPromo or kit-nextjs-location-finder ImageCarousel).
     - Uses `'use client'` and optional `useState`/`useRef` for the carousel API (e.g. for prev/next or announcements).
     - Handles missing datasource with a fallback (e.g. `NoDataFallback` if that utility exists in the app, or a simple “Content not configured” message).
   - Register this component in the Sitecore component map (`.sitecore/component-map.ts` and, if the project uses a client map, `.sitecore/component-map.client.ts`) so it can be placed in placeholders and used on the page. Do not modify `Layout.tsx` or `[site]/layout.tsx`.

4. **Apply NYSERDA-like styling (without changing any Layout file)**
   - **CSS variables:** In `examples/kit-nextjs-nyserda/src/assets/base/variables.css`, define or replace theme colors to match the New York State Design System:
     - Primary: `#154973` (and optionally Theme Strong `#0e324f`, Theme Mid `#457aa5`, Theme Weak `#cddde9`, Theme Weaker `#eff6fb`, Theme Faint `#f7fafd`).
     - Accent: `#face00`; Success: `#1e752e`; Danger: `#b52c2c`; Info: `#004dd1`.
     - Map these to Tailwind `@theme` variables (e.g. `--color-primary`, `--color-primary-hover`, `--color-bg-light`, etc.) so existing and new components can use them (e.g. `bg-primary`, `text-primary`).
   - **Base styles:** In the same `variables.css` or in `base.css` / `app.css`, ensure body and headings use a clean sans-serif stack and that primary color is used for key elements (e.g. headings, primary buttons) where it makes sense. Do not add or change font imports in `src/app/layout.tsx`; if a different font is desired, add it only via CSS (e.g. `@import` or `@font-face` in a file that is already imported from `globals.css` or `main.css`).
   - **Component-level styling:** Update or add styles so that:
     - Promo/card components use the new primary and background variables (e.g. borders or backgrounds using Theme Weaker/Faint).
     - The new carousel component uses primary blue for next/prev buttons and optional accents (e.g. focus rings) and fits the NYSERDA look (clean, readable, sufficient contrast).
     - Links and buttons that are primary use `#154973` and hover `#0e324f`.
   - **Scope:** All styling changes must be in `src/assets/**`, `src/components/**` (component CSS or Tailwind classes), or new/updated CSS files imported from the existing entry (e.g. `globals.css` → `main.css`). Do not edit `src/app/layout.tsx` or `src/app/[site]/layout.tsx`.

5. **Verify**
   - Ensure the new app builds: from `examples/kit-nextjs-nyserda`, run `npm install` and `npm run build`.
   - Ensure the carousel component is registered and that a page that includes it renders without errors (and that in edit mode the component is visible and editable).
   - Visually confirm that the site uses NYSERDA-like colors and typography (primary blue, light backgrounds, clear hierarchy) and that the carousel works (prev/next, keyboard, optional wheel).

**Constraints**
- Do not modify `src/app/layout.tsx` or `src/app/[site]/layout.tsx` in the new app.
- Follow the repository’s existing patterns (Sitecore Content SDK, component map, safe destructuring of `fields`, editing mode handling) as in kit-nextjs-article-starter and kit-nextjs-skate-park.
- Only add dependencies that are necessary for the carousel and button (e.g. `embla-carousel-react`, `lucide-react`, and any Radix primitives required by the copied carousel/button).

### PROMPT END

---

## 4. Summary

| Item | Action |
|------|--------|
| **New app** | Copy `kit-nextjs-skate-park` → `kit-nextjs-nyserda`, fix package name, add entry in `xmcloud.build.json` |
| **Carousel** | Add `embla-carousel-react` + `src/components/ui/carousel.tsx` (and minimal button/utils if needed); implement one Sitecore carousel component and register it in the component map |
| **NYSERDA styling** | Replace/adjust CSS variables in `variables.css` with NYS design system colors; apply via Tailwind and component styles; no changes to any `Layout.tsx` |
| **Layout** | No edits to `src/app/layout.tsx` or `src/app/[site]/layout.tsx` |

After this, you can add more NYSERDA-like components (hero, link lists, cards, news blocks) and place them on the page; the carousel will be available and the look and feel will align with the NYSERDA website.
