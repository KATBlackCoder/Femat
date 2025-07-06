# FEMAT Website Architecture Overview

## Tech Stack
- **Framework:** Nuxt.js 3 (Vue 3, TypeScript, Composition API)
- **UI:** Nuxt UI (Tailwind CSS)
- **State Management:** Pinia (Setup Stores)
- **Content Management:** Nuxt Content (Markdown in `content/`)
- **Internationalization:** @nuxtjs/i18n (French/English, JSON in `i18n/`)
- **Image Optimization:** @nuxt/image
- **Deployment:** NuxtHub, Vercel, or Netlify (CI/CD from GitHub)

## Directory Structure
- `assets/` — Images, fonts, stylesheets
- `components/` — Reusable Vue components, organized by feature/domain:
  - *Note: The subfolders under `components/` (such as `layout/`, `home/`, `navigation/`, etc.) are flexible. You can add, change, or remove these subfolders as the project evolves and requirements change.*
  - `layout/` — Global layout (header, footer, nav)
  - `home/` — Homepage sections (hero, features, CTA)
  - `navigation/` — Navigation components (menus, breadcrumbs)
  - `ui/` — Small, reusable UI elements (buttons, cards, icons, alerts)
  - `forms/` — Form components (contact form, fields)
  - `content/` — Content display blocks (news, events, gallery)
  - `error/` — Error pages and alerts
  - `modals/` — Modals and overlays
- `content/` — Markdown content (news, clubs, etc.)
- `layouts/` — Main layouts
- `i18n/` — Translation files (`fr.json`, `en.json`)
- `pages/` — Views and routing (one file per route)
- `server/` — Backend logic (if needed)
- `composables/` — Vue composables (reusable logic)
- `store/` — Pinia stores (one per domain/feature)

## Component Organization
- **By Feature/Domain:** Components are grouped by their purpose (e.g., `home/`, `forms/`, `error/`).
- **Design System:** Common UI elements live in `ui/` for reusability and consistency.
- **Page Composition:** Pages in `pages/` are composed from section/block components, not monolithic code.

## Key Architectural Decisions
- **Composition API & `<script setup lang="ts">`:** All components use the modern Vue 3 syntax for type safety and clarity.
- **Pinia Setup Stores:** All state management uses Pinia with the Setup Stores pattern.
- **Nuxt Content:** All site content is managed in Markdown for easy editing and versioning.
- **i18n:** All user-facing text is internationalized, with translations in `i18n/`.
- **Nuxt UI:** All UI uses Nuxt UI components for consistency, accessibility, and rapid development.
- **CI/CD:** Deployment is automated via GitHub to NuxtHub, Vercel, or Netlify.

## Best Practices
- **Separation of Concerns:** Layout, UI, content, and logic are clearly separated.
- **Scalability:** The structure supports easy addition of new features and pages.
- **Accessibility & Responsiveness:** All UI is mobile-first and accessible.
- **Documentation:** All architectural and technical decisions are documented and kept up-to-date.

---
For more details, see `DESIGN_DOCUMENT.md` and `ROADMAP.md`. 