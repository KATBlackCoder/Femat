# FEMAT Website Development Roadmap

> **Phase 1 Complete:** All foundational setup tasks are finished. The project is ready to begin Phase 2.

## Introduction

This document outlines the planned development phases for the FEMAT website. It serves as a high-level guide to track progress, from the initial project setup to the final launch and beyond. Each phase represents a major milestone in the development lifecycle.

---

### **Phase 1: Project Foundation & Setup**

This foundational phase involves setting up the development environment and integrating all the core technologies selected for the project.

*   [x] **Project Scaffolding:** Initialize the Nuxt.js project.
*   [x] **Technology Integration:**
    *   [x] Integrate Nuxt UI & Tailwind CSS for the user interface.
    *   [x] Set up Pinia for state management.
    *   [x] Configure `@nuxtjs/i18n` for internationalization (French/English).
    *   [x] Configure `@nuxt/image` for image optimization.
    *   [x] Prepare for Nuxt Content integration (to be used in Phase 3).
*   [x] **Basic Structure:** Create the initial project directory structure (layouts, components, pages, etc.).
*   [x] **Core Layout:** Develop the main site layout, including a header, footer, and primary navigation bar.
*   [x] **Language Switcher:** Implement a UI component to allow users to switch between French and English.

---

### **Phase 2: Core Content & Static Pages**

With the foundation in place, this phase focuses on building the essential static pages that form the backbone of the site. **Note: These pages are implemented directly as Vue/Nuxt pages/components, not using Nuxt Content or Markdown.**

*   [ ] **Static Pages:** Build the primary static pages:
    *   [ ] About FEMAT (`/about`)
    *   [ ] Contact Us (`/contact`)
*   [x] **Homepage:** Develop the homepage with key sections (hero, news highlights, quick links, and image carousels).
    *   [x] Added `CarouselSection.vue` component in `components/layout/` for modular, reusable image galleries.
    *   [x] Integrated two CarouselSection components side by side on the homepage, supporting dynamic titles and image arrays via props, and using `<NuxtImg>` for optimized images.
*   [ ] **Basic SEO:** Implement initial meta tags (title, description) for all pages created in this phase.

---

### **Phase 3: Dynamic Features - News & Events**

This phase brings the site to life with dynamic content, and is where **Nuxt Content** is introduced for the first time. All news and events will be managed via Markdown files in the `content/` directory.

*   [ ] **Content Modeling:** Define the frontmatter schema and structure for `news` and `events` content types in the `content/` directory.
*   [ ] **List Views:** Create the main listing pages:
    *   [ ] News Feed (`/news`)
    *   [ ] Events List (`/events`)
*   [ ] **Detail Views:** Create the templates for displaying a single news article (`/news/[slug]`) and a single event (`/events/[slug]`).
*   [ ] **Filtering:** Implement controls to filter news and events (e.g., by category or date).
*   [ ] **Event Calendar:** Create a calendar view to visualize upcoming competitions and seminars.

---

### **Phase 4: Community Features - Clubs & Athletes**

This phase focuses on building out the sections dedicated to the core of the federation: its clubs and athletes.

*   [ ] **Content Schema:** Define the schema for `clubs` and `athletes` (using Nuxt Content).
*   [ ] **Clubs Directory:** Develop a searchable and filterable directory of all affiliated clubs (`/clubs`).
*   [ ] **Club Profiles:** Create detailed profile pages for each club (`/clubs/[slug]`).
*   [ ] **Athlete Profiles:** Build the section for national team and prominent athlete profiles (`/athletes`), including a detail page for each (`/athletes/[slug]`).

---

### **Phase 5: Internationalization (i18n) & Localization**

This new phase focuses on implementing, populating, and refining internationalization (i18n) for all content and UI. All translation files will be completed, language switching will be fully tested, and the site will be reviewed for translation coverage and locale-specific SEO.

*   [ ] **Translation Files:** Populate and refine all translation files in `i18n/` for both French and English.
*   [ ] **UI & Content Internationalization:** Ensure all user-facing text and content is internationalized and uses translation keys.
*   [ ] **Language Switching:** Test and refine language switching across the site.
*   [ ] **Locale-specific SEO:** Implement and verify meta tags, titles, and descriptions for each language.
*   [ ] **Accessibility:** Ensure language attributes and accessibility features are correct for all locales.

---

### **Phase 6: Media & Resources**

This phase adds rich media content and important documents to the site.

*   [ ] **Gallery:** Develop the photo and video gallery (`/gallery`), ensuring all images are optimized by `@nuxt/image`.
    *   [ ] Leverage the `CarouselSection.vue` component as the foundation for gallery features and media carousels.
*   [ ] **Resource Hub:** Create a page (`/resources`) to list and provide downloads for official documents (rules, regulations, etc.).

---

### **Phase 7: Finalization & Deployment**

The final phase before launch involves polishing, testing, and preparing for production.

*   [ ] **Responsive Testing:** Conduct a thorough review of the entire site on a wide range of devices (mobile, tablet, desktop).
*   [ ] **Performance Audit:** Run Lighthouse tests and optimize for a score of 90+ across all metrics.
*   [ ] **Accessibility Review:** Ensure the site meets modern accessibility standards (WCAG).
*   [ ] **CI/CD Setup:** Configure the deployment pipeline on the chosen hosting provider (NuxtHub, Vercel, or Netlify) from the GitHub repository.
*   [ ] **Launch!**

---

### **Phase 8: Post-Launch & Maintenance**

*   [ ] **Monitoring:** Monitor the live site for any bugs or user-reported issues.
*   [ ] **Feedback:** Gather feedback from stakeholders and users for future improvements.
*   [ ] **Content Strategy:** Plan for the regular addition of new content to keep the site fresh and engaging. 