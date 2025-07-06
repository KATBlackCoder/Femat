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
- [x] **Basic SEO:** Implement initial meta tags (title, description) for all pages created in this phase.

## 🚧 Phase 2 Summary

This phase focuses on building the essential static content and pages as Vue/Nuxt components only (no Nuxt Content/Markdown):

1. Static pages (about, contact) are complete
2. Homepage features hero, features, carousels, and CTA sections
3. All static pages and homepage are styled with Nuxt UI components
4. Initial SEO for all static pages is implemented

Once these tasks are complete, the site will have a solid content foundation and be ready for dynamic features in Phase 3.

# Phase 3: Dynamic Features - News & Events (IN PROGRESS)

- [ ] **Content Modeling:**
    - [ ] Define frontmatter schema for `news` and `events` (Markdown + frontmatter)
    - [ ] Create sample Markdown files in `content/news/` and `content/events/`
- [ ] **List Views:**
    - [ ] Create `/news` and `/events` pages using Nuxt Content query API
- [ ] **Detail Views:**
    - [ ] Create templates for displaying a single news article (`/news/[slug]`) and a single event (`/events/[slug]`)
- [ ] **Filtering:**
    - [ ] Implement controls to filter news and events (e.g., by category or date)
- [ ] **Event Calendar:**
    - [ ] Create a calendar view to visualize upcoming competitions and seminars

# Phase 4: Community Features - Clubs & Athletes

- [ ] **Content Schema:** Define the schema for `clubs` and `athletes` (using Nuxt Content).
- [ ] **Clubs Directory:** Develop a searchable and filterable directory of all affiliated clubs (`/clubs`).
- [ ] **Club Profiles:** Create detailed profile pages for each club (`/clubs/[slug]`).
- [ ] **Athlete Profiles:** Build the section for national team and prominent athlete profiles (`/athletes`), including a detail page for each (`/athletes/[slug]`).

# Phase 5: Internationalization (i18n) & Localization

- [ ] **Translation Files:** Populate and refine all translation files in `i18n/` for both French and English.
- [ ] **UI & Content Internationalization:** Ensure all user-facing text and content is internationalized and uses translation keys.
- [ ] **Language Switching:** Test and refine language switching across the site.
- [ ] **Locale-specific SEO:** Implement and verify meta tags, titles, and descriptions for each language.
- [ ] **Accessibility:** Ensure language attributes and accessibility features are correct for all locales.

# Phase 6: Media & Resources

- [ ] **Gallery:** Develop the photo and video gallery (`/gallery`), ensuring all images are optimized by `@nuxt/image`.
    - [ ] Leverage the `CarouselSection.vue` component as the foundation for gallery features and media carousels.
- [ ] **Resource Hub:** Create a page (`/resources`) to list and provide downloads for official documents (rules, regulations, etc.).

# Phase 7: Finalization & Deployment

- [ ] **Responsive Testing:** Conduct a thorough review of the entire site on a wide range of devices (mobile, tablet, desktop).
- [ ] **Performance Audit:** Run Lighthouse tests and optimize for a score of 90+ across all metrics.
- [ ] **Accessibility Review:** Ensure the site meets modern accessibility standards (WCAG).
- [ ] **CI/CD Setup:** Configure the deployment pipeline on the chosen hosting provider (NuxtHub, Vercel, or Netlify) from the GitHub repository.
- [ ] **Launch!**

# Phase 8: Post-Launch & Maintenance

- [ ] **Monitoring:** Monitor the live site for any bugs or user-reported issues.
- [ ] **Feedback:** Gather feedback from stakeholders and users for future improvements.
- [ ] **Content Strategy:** Plan for the regular addition of new content to keep the site fresh and engaging.
