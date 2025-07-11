# Phase 1: Project Foundation & Setup ✅ COMPLETED

- [x] **Project Scaffolding:** Initialize the Nuxt.js project.
- [x] **Technology Integration:**
    - [x] Integrate Nuxt UI & Tailwind CSS for the user interface.
    - [x] Set up Pinia for state management.
    - [x] Configure `@nuxtjs/i18n` for internationalization (French/English).
    - [x] Configure `@nuxt/image` for image optimization.
    - [x] Prepare for Nuxt Content integration (to be used in Phase 3).
- [x] **Basic Structure:** Create the initial project directory structure (layouts, components, pages, etc.).
- [x] **Core Layout:** Develop the main site layout, including a header, footer, and primary navigation bar.
- [x] **Language Switcher:** Implement a UI component to allow users to switch between French and English.

## 🎉 Phase 1 Summary

All foundational tasks have been completed successfully:

1. ✅ **Project Setup**: Nuxt.js project initialized with all required modules
2. ✅ **Internationalization**: Configured with French (default) and English locales
3. ✅ **UI Components**: Created header with navigation, footer, and language switcher
4. ✅ **Layout System**: Implemented default layout with proper structure
5. ✅ **Homepage**: Created a beautiful homepage with hero section and key features
6. ✅ **Responsive Design**: All components are mobile-friendly using Tailwind CSS
7. ✅ **SEO Ready**: Meta tags and proper structure in place

The FEMAT website foundation is now ready for Phase 2 development!

# Phase 2: Core Content & Static Pages (COMPLETE)

- [x] **Static Pages:** Build the primary static pages as Vue/Nuxt components (not using Nuxt Content or Markdown):
    - [x] About FEMAT (`/about`)
    - [x] Contact Us (`/contact`)
- [x] **Homepage:** Develop the homepage with key sections (hero, features, carousels, and CTA), all styled with Nuxt UI components.
    - **Step-by-step:**
        1. Review the current homepage structure and identify areas for enhancement.
        2. Design and implement a "Hero" section for the main site introduction.
        3. Add a "Features" section to highlight key aspects of FEMAT.
        4. Add two side-by-side carousels (presidents, partners) using `CarouselSection.vue` and Nuxt Image.
        5. Add a call-to-action (CTA) section.
        6. Add or update SEO meta tags for the homepage as needed.
        7. Test the homepage on mobile and desktop for layout and accessibility.
    - [x] Added `CarouselSection.vue` component for modular image galleries, supporting dynamic titles and image arrays via props, and using `<NuxtImg>` for optimized images.
    - [x] Integrated two CarouselSection components side by side on the homepage, displaying images from the assets directory.
    - [x] **CarouselSection now supports per-image custom width/height, allowing flexible image sizing for each carousel item. Homepage carousels (presidents/partners) now use this feature for improved visual consistency.**
- [x] **Basic SEO:** Implement initial meta tags (title, description) for all pages created in this phase.

## 🚧 Phase 2 Summary

This phase focuses on building the essential static content and pages as Vue/Nuxt components only (no Nuxt Content/Markdown):

1. Static pages (about, contact) are complete
2. Homepage features hero, features, carousels, and CTA sections
3. All static pages and homepage are styled with Nuxt UI components
4. Initial SEO for all static pages is implemented

Once these tasks are complete, the site will have a solid content foundation and be ready for dynamic features in Phase 3.

# Phase 3: Dynamic Features - News & Events (COMPLETE)

- [x] **Content Modeling:**
    - [x] Define frontmatter schema for `news` and `events` (Markdown + frontmatter)
    - [x] Create sample Markdown files in `content/news/` and `content/events/`
- [x] **List Views:**
    - [x] Create `/news` page using Nuxt Content query API
    - [x] Create `/events` page using Nuxt Content query API
- [x] **Detail Views:**
    - [x] Create templates for displaying a single news article (`/news/[slug]`) and a single event (`/events/[slug]`)
        - Both detail pages are now fully componentized with reusable detail components.
- [x] **Card Visuals:**
    - [x] All news and event cards now have centered images for visual consistency.
- [x] **CarouselSection technical improvement: per-image custom width/height now supported and used on homepage carousels.**
- [x] **Event Calendar:**
    - [x] Created a calendar-centric event browsing experience on the events page using the EventCalendar component. The old event grid is now replaced by the calendar UI for all event exploration.

# Phase 4: Internationalization (i18n) & Localization (COMPLETE)

- [x] **Home Page Internationalization:**
    - [x] All user-facing text in Hero, Features, and CTA sections now uses translation keys ($t). Both English and French locales are populated for these sections.
- [x] **Footer Internationalization:**
    - [x] Footer fully internationalized (all user-facing text and quick links use translation keys, both locales populated).
- [x] **Navigation Links DRY Refactor:**
    - [x] Refactored navigation links to use a single composable (useNavLinks) for DRYness in nav and footer.
- [x] **Translation Files:**
    - [x] Populate and refine all translation files in `i18n/locales/en.json` and `i18n/locales/fr.json` for all sections.
- [x] **About Page Internationalization:**
    - [x] About page fully internationalized (all user-facing text uses translation keys, both locales populated).
- [x] **Contact Page Internationalization:**
    - [x] Contact page fully internationalized (all user-facing text uses translation keys, both locales populated).
- [x] **Error Page Internationalization:**
    - [x] Error page fully internationalized (all user-facing text uses translation keys, both locales populated).
- [x] **UI & Content Internationalization:**
    - [x] Replace all hardcoded UI text in all components/pages with `$t()` or `t()`.
    - [x] Internationalize content queries to be locale-aware.
- [x] **Language Switching:**
    - [x] Test and refine language switching across the site.
- [x] **Locale-specific SEO:**
    - [x] Implement and verify meta tags, titles, and descriptions for each language using `useSeoMeta`.
- [x] **Accessibility:**
    - [x] Ensure language attributes and accessibility features are correct for all locales (ARIA, alt text, etc.).
- [x] **Review:**
    - [x] Scan for any untranslated or hardcoded strings and fix as needed.

# Phase 5: Media & Resources (IN PROGRESS)

- [x] **Content Modeling:**
    - [x] Define a `galleries` collection in `content.config.ts` with fields for `title`, `description`, and an `images` array (with `src`, `alt`, `caption`).
    - [x] Define a `resources` collection in `content.config.ts` with fields for `title`, `description`, and `file` path.
- [x] **Gallery Feature:**
    - [x] Create `content/galleries/` directory with `en/` and `fr/` subdirectories for Markdown-based galleries.
    - [x] Develop a `pages/gallery/index.vue` page to display a list of all available photo galleries.
    - [x] Create a `GalleryCard.vue` component for the gallery list page (to serve as the summary "poster" for a gallery).
    - [x] Develop a `pages/gallery/[slug].vue` detail page to display a single, complete gallery.
    - [x] Create a new `components/content/GalleryCarousel.vue` component to be used on the gallery detail page.
        - [x] This new component will be specialized for displaying images with captions, separate from the simpler `CarouselSection.vue`.
        - [x] This approach avoids modifying `CarouselSection.vue` and `pages/index.vue`, ensuring the homepage carousels remain unaffected.
    - [x] Internationalize all UI components and content queries for the gallery.
- [x] **Resource Hub Feature:**
    - [x] Create `content/resources/` directory with `en/` and `fr/` subdirectories.
    - [x] Develop a `pages/resources/index.vue` page to list all downloadable documents.
    - [x] Style the resource list using Nuxt UI components for a clean, user-friendly interface.
- [x] **Image Optimization & Asset Unification:**
    - [x] Unified all site images into the `/public` directory to work consistently with `<NuxtImg>`.
    - [x] Removed the `image.dir` configuration from `nuxt.config.ts` and deleted the now-unused `useAssetImages.ts` composable.
    - [x] All images, including those in galleries and carousels, are now processed and optimized by `@nuxt/image`.

# Phase 6: Finalization & Deployment

- [x] **Legal Pages:**
    - [x] Create static content pages for Privacy Policy (`/privacy-policy`) and Terms of Service (`/terms-of-service`).
    - [x] Add placeholder content for both pages.
    - [x] Internationalize both pages (FR/EN).
    - [x] Add links to these pages in the website footer.
- [ ] **Code Quality Refactor:** To improve code robustness and maintainability, separate TypeScript logic from Vue components. Move business logic and state management into dedicated composables (following the `useNavLinks.ts` pattern) or Pinia stores.
- [ ] **Responsive Testing:** Conduct a thorough review of the entire site on a wide range of devices (mobile, tablet, desktop).
- [ ] **Performance Audit:** Run Lighthouse tests and optimize for a score of 90+ across all metrics.
- [ ] **Accessibility Review:** Ensure the site meets modern accessibility standards (WCAG).
- [ ] **CI/CD Setup:** Configure the deployment pipeline on the chosen hosting provider (NuxtHub, Vercel, or Netlify) from the GitHub repository.
- [ ] **Launch!**

# Phase 7: Post-Launch & Maintenance

- [ ] **Monitoring:** Monitor the live site for any bugs or user-reported issues.
- [ ] **Feedback:** Gather feedback from stakeholders and users for future improvements.
- [ ] **Content Strategy:** Plan for the regular addition of new content to keep the site fresh and engaging.
- [ ] **Planned Enhancement:** Implement controls to filter news and events (e.g., by category or date) as a future improvement after deployment.

# Phase 8: Community Features - Clubs & Athletes (Planned Post-Launch)

- [ ] **Content Schema:** Define the schema for `clubs` and `athletes` (using Nuxt Content).
- [ ] **Clubs Directory:** Develop a searchable and filterable directory of all affiliated clubs (`/clubs`).
- [ ] **Club Profiles:** Create detailed profile pages for each club (`/clubs/[slug]`).
- [ ] **Athlete Profiles:** Build the section for national team and prominent athlete profiles (`/athletes`), including a detail page for each (`/athletes/[slug]`).
