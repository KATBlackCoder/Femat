# FEMAT Website Design Document

## 1. Introduction

This document outlines the design and development plan for the official website of the Fédération Malienne de Taekwondo (FEMAT). The goal is to create a modern, informative, and engaging online presence for the federation, its members, and the general public.

## 2. Goals and Objectives

*   **Primary Goal:** To establish an official and professional online hub for FEMAT.
*   **Objectives:**
    *   Promote Taekwondo in Mali.
    *   Provide up-to-date information on news, events, and competitions.
    *   Serve as a resource for athletes, coaches, and clubs.
    *   Increase visibility of Malian Taekwondo on a national and international level.
    *   Facilitate communication between the federation and its stakeholders.

## 3. Target Audience

*   **Primary:**
    *   Taekwondo athletes in Mali (all levels).
    *   Coaches and referees.
    *   Club owners and administrators.
*   **Secondary:**
    *   Parents of athletes.
    *   Sponsors and partners.
    *   Media and journalists.
    *   General public and Taekwondo enthusiasts worldwide.

## 4. Tech Stack

*   **Frontend Framework:** [Nuxt.js](https://nuxtjs.org/) (A Vue.js framework) for its performance, SEO capabilities (Server-Side Rendering), and excellent developer experience.
*   **UI Framework:** [Nuxt UI](https://ui.nuxt.com/) - A free, open-source, and fully-styled customizable UI component library for Nuxt.js, built on top of Tailwind CSS.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework that allows for rapid UI development. Nuxt UI is built on this, allowing for deep customization.
*   **State Management:** [Pinia](https://pinia.vuejs.org/) - The official, intuitive, and type-safe state management library for Vue.
*   **Content Management:** [Nuxt Content](https://content.nuxt.com/) - A git-based headless CMS that allows writing content in Markdown and other file formats directly within the project. It simplifies content management and leverages version control.
*   **Internationalization:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/) - For making the website multilingual, starting with French and English, to cater to both local and international audiences.
*   **Image Optimization:** [@nuxt/image](https://image.nuxt.com/) - To automatically optimize images for performance, delivering high-quality visuals with fast loading times.
*   **Deployment:** [NuxtHub](https://admin.hub.nuxt.com/), Vercel, or Netlify. These platforms offer seamless integration with Nuxt.js for continuous deployment and global distribution.

## 5. Features

The website will be structured into several key sections:

*   **Multilingual Support:**
    *   The website will be available in multiple languages (initially French and English).
    *   Users can easily switch languages.
    *   Language will be auto-detected from the user's browser settings.
    *   Content and UI will be fully translated.

*   **Homepage:**
    *   Hero section with a compelling image/video.
    *   Latest news and upcoming events highlights.
    *   Quick links to important sections.
    *   Introduction to FEMAT.

*   **News & Events:**
    *   A blog-style section for all official announcements, articles, and news.
    *   An event calendar listing national and international competitions, seminars, and training camps.
    *   Filterable by category (e.g., National, International, Seminars).

*   **About FEMAT:**
    *   History of the federation.
    *   Mission and vision.
    *   Structure (board members, commissions).

*   **Athletes:**
    *   Profiles of national team members and prominent athletes.
    *   Achievements and records.

*   **Clubs Directory:**
    *   A searchable and filterable list of affiliated Taekwondo clubs in Mali.
    *   Each club will have a detail page with contact information, location, and training schedule.

*   **Resources:**
    *   Official documents (rules, regulations).
    *   Training materials.

*   **Gallery:**
    *   Photo and video gallery from events and competitions.
    *   All images will be optimized for fast loading on all devices.

*   **Contact Page:**
    *   Contact form.
    *   Address, email, and phone number of the federation.
    *   Map with the location of the headquarters.

## 6. Architecture

The project will be a monolithic Nuxt.js application.

*   **Directory Structure:** The standard Nuxt.js directory structure will be used:
    *   `assets/`: For unscoped assets like images, fonts, and stylesheets.
    *   `components/`: For reusable Vue components.
    *   `content/`: For all website content, managed by Nuxt Content (e.g., articles, club info).
    *   `layouts/`: For defining the main layouts of the application (e.g., default, admin).
    *   `locales/`: For translation files (e.g., `en.json`, `fr.json`) used by the `@nuxtjs/i18n` module.
    *   `pages/`: For the application's views and routing.
    *   `server/`: For backend logic if using Nuxt's server capabilities.
    *   `composables/`: For Vue 3 composables (reusable stateful logic).
    *   `store/`: For Pinia stores to manage global application state.

*   **Data Flow:**
    *   Content for all pages (news, events, static pages, etc.) will be managed using Nuxt Content.
    *   Data will be stored in Markdown (`.md`) files within a `content/` directory.
    *   UI text and labels (e.g., button text, navigation links) will be managed via JSON translation files in the `locales/` directory, powered by the `@nuxtjs/i18n` module.
    *   The application will query these local files using Nuxt Content's built-in, type-safe API. This eliminates the need for external API calls for content fetching.

## 7. UI/UX Design

*   **Component Library**: We will leverage [Nuxt UI](https://ui.nuxt.com/) for a consistent and accessible set of UI components (buttons, forms, modals, etc.), which can be themed according to our color palette.
*   **Color Palette:** The design will be inspired by the Malian flag:
    *   Primary: Green (`#14B8A6`), Yellow (`#FBBF24`), Red (`#EF4444`).
    *   Neutrals: White, grays, and black for text and backgrounds.
*   **Typography:** A clean and modern sans-serif font like `Inter` or `Poppins` will be used for readability.
*   **Layout:** The layout will be responsive, ensuring a great experience on all devices (desktop, tablet, and mobile). It will be clean, with a focus on high-quality imagery from the world of Taekwondo.

## 8. Deployment

The website will be deployed using a CI/CD pipeline.
1.  Code will be hosted on GitHub.
2.  A platform like [NuxtHub](https://admin.hub.nuxt.com/), Vercel, or Netlify will be connected to the GitHub repository.
3.  Every push to the `main` branch will trigger a new deployment.
4.  This setup ensures the website is always up-to-date with the latest changes.
5.  The chosen platform will handle locale-aware routing and redirection to support the multilingual features provided by `@nuxtjs/i18n`. 