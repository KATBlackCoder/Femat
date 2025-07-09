# Changelog

All notable changes to the FEMAT website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Renamed the `locales` directory to `i18n` for clarity and convention.
- Removed `langDir` from `nuxt.config.ts` to resolve i18n locale file resolution issues with @nuxtjs/i18n.
- **Added a new phase for internationalization (i18n) and localization after the community features phase. All i18n-related tasks are now consolidated in this phase. Roadmap, TODO, and progress documentation updated accordingly.**
- **Phase 2 static pages are now implemented as Vue/Nuxt components only (no Nuxt Content/Markdown). Nuxt Content and content modeling are now introduced in Phase 3. Roadmap, TODO, and progress documentation updated to reflect this change.**
- Phase 2: About and Contact static pages are now complete, implemented as Vue/Nuxt components only (no Nuxt Content/Markdown).
- Phase 2: Homepage now features hero, features, carousels, and CTA sections, all styled with Nuxt UI components.
- Phase 2: Initial SEO meta tags (title, description) are implemented for all static pages.
- Removed references to NewsHighlightsSection and QuickLinksSection from Phase 2 (these components and their markdown content are no longer used; dynamic content will be introduced in Phase 3).
- Updated progress documentation to reflect these changes.
- Phase 3 (Dynamic Features - News & Events) is now in progress: content modeling, list/detail views, filtering, and event calendar implementation have started.
- Phase 2 is now fully complete: all static pages and homepage are done, with initial SEO implemented.
- Content modeling for news and events (frontmatter schema, sample Markdown files) is complete in Phase 3.
- News feed page (`/news`) using Nuxt Content query API is complete in Phase 3.
- Implemented idiomatic detail views for news and events (`/news/[slug]`, `/events/[slug]`) with Nuxt UI back button for navigation.
- Refactored news and event detail pages to use reusable, fully componentized detail components.
- All news and event cards now have centered images for improved visual consistency.
- **CarouselSection.vue now supports per-image custom width/height. Homepage carousels (presidents/partners) use this feature for improved image layout and flexibility.**
- The events page now uses the EventCalendar component as the main event browsing UI, replacing the old event grid. This is a major UX improvement for event discovery and navigation.
- Refactored navigation links to use a single composable (useNavLinks) for both NavigationMenu and AppFooter.
- Content queries are now locale-aware, ensuring the correct language is displayed for news and events by filtering based on the URL path.
- Updated content collection configuration to recursively scan for Markdown files in locale-specific subdirectories.

### Fixed
- Fixed a bug in the i18n locale files where email addresses containing the `@` symbol were causing "Invalid linked format" errors.

### Added
- Home page (Hero, Features, CTA) is now fully internationalized. All user-facing text in these sections uses translation keys, and both English and French locales are populated.
- Footer is now fully internationalized. All user-facing text and quick links use translation keys, and both English and French locales are populated.
- Contact page is now fully internationalized: all user-facing text uses translation keys, and both English and French locales are populated.
- About page is now fully internationalized: all user-facing text uses translation keys, and both English and French locales are populated.
- Error page is now fully internationalized: all user-facing text uses translation keys, and both English and French locales are populated.
- News and Events sections are now fully internationalized, including list pages, detail pages, and all related components (`NewsCard`, `EventCalendar`, etc.).
- Implemented global, locale-specific SEO meta tags (`useSeoMeta`) in `app.vue` and added page-specific titles for all pages.
- Internationalized contact information in the footer and contact page.

## [0.1.0] - 2025-01-27

### Added
- **Project Foundation**: Initial Nuxt.js project setup with TypeScript support
- **Technology Stack**: Integrated all core modules:
  - @nuxt/ui for UI components with Tailwind CSS
  - @nuxt/image for image optimization
  - @nuxt/content for content management
  - @nuxtjs/i18n for internationalization
  - @pinia/nuxt for state management
- **Internationalization**: Complete i18n setup with French (default) and English locales
  - Locale files with navigation and common UI translations
  - Language detection and routing strategy
  - Prefix-except-default routing strategy
- **UI Components**: 
  - `AppHeader` component with responsive navigation and mobile menu
  - `AppFooter` component with quick links and contact information
  - `LanguageSwitcher` component with dropdown interface
- **Layout System**: Default layout with header, main content area, and footer
- **Homepage**: Beautiful landing page with:
  - Hero section with FEMAT branding and call-to-action buttons
  - Mission section with three key features (Formation, Compétitions, Communauté)
  - Call-to-action section encouraging community participation
- **Design System**: 
  - FEMAT brand colors inspired by Malian flag (Green, Yellow, Red)
  - Responsive design with mobile-first approach
  - Dark mode support
  - Consistent typography and spacing
- **SEO Foundation**: Meta tags and proper HTML structure for search engine optimization
- **Development Setup**: 
  - ESLint configuration for code quality
  - TypeScript configuration
  - Project documentation (Design Document, Tech Stack Recommendations, Roadmap)

### Technical Details
- Vue 3 Composition API with `<script setup lang="ts">` syntax
- Tailwind CSS for styling with Nuxt UI component library
- Proper directory structure following Nuxt.js best practices
- Accessibility considerations with proper ARIA attributes
- Performance optimizations with image optimization ready

### Infrastructure
- Git repository initialization
- Package.json with all required dependencies
- Nuxt configuration with all modules properly configured
- Development workflow documentation
