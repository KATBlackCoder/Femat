# Changelog

All notable changes to the FEMAT website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Renamed the `locales` directory to `i18n` for clarity and convention.
- Removed `langDir` from `nuxt.config.ts` to resolve i18n locale file resolution issues with @nuxtjs/i18n.

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
