# Implementation Plan: Site Web FEMAT

**Branch**: `001-site-web-femat` | **Date**: 2025-01-27 | **Spec**: `specs/001-site-web-femat/spec.md`
**Input**: Feature specification from `/specs/001-site-web-femat/spec.md`

## Summary

Création d'un site web moderne et professionnel pour la Fédération Malienne de Taekwondo (FEMAT) utilisant Nuxt.js 4.x avec Static Site Generation (SSG) et Nuxt UI 4.x pour les composants. Le site présentera la fédération, ses activités, événements, et fournira des informations pratiques aux membres et au public. Approche mobile-first avec optimisation SEO et accessibilité WCAG 2.1 niveau AA.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Nuxt.js 4.2.1, Nuxt UI 4.1.0, Vue 3.5.24  
**Storage**: N/A (static site, données en dur dans les composants pour v1.0)  
**Testing**: Vitest (optionnel pour v1.0, recommandé pour v2.0)  
**Target Platform**: Web (modern browsers - Chrome, Firefox, Safari, Edge)  
**Project Type**: Web (Static Site)  
**Deployment**: Vercel (SSG) - https://nuxt.com/deploy/vercel  
**Performance Goals**: Lighthouse score > 90, temps de chargement < 3s  
**Constraints**: Mobile-first, accessible (WCAG 2.1 AA), SEO-friendly, responsive  
**Scale/Scope**: Site public pour fédération sportive (~1000-5000 visiteurs/mois estimés)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] User-First Design: Feature aligns with user needs - Site conçu pour répondre aux besoins des visiteurs, membres et personnes intéressées
- [x] Performance & SEO: Optimizations planned - SSG pour performance, meta tags, sitemap automatique
- [x] Maintainability: Code structure defined - Composants réutilisables, structure Nuxt claire
- [x] Accessibility: WCAG compliance planned - Navigation clavier, lecteurs d'écran, contraste couleurs
- [x] Mobile-First: Responsive design considered - Approche mobile-first avec Nuxt UI responsive

## Project Structure

### Documentation (this feature)

```text
specs/001-site-web-femat/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
├── tests.md             # Guide de test complet
├── tasks.md             # Tâches d'implémentation détaillées
└── spec.md              # Original specification
```

### Application Structure

```text
app/
├── pages/
│   ├── index.vue           # Page d'accueil (FR-1)
│   ├── about.vue           # Page À propos (FR-2)
│   ├── events.vue          # Page Événements (FR-3)
│   ├── calendar.vue        # Page Calendrier (FR-7 - Bonus)
│   └── contact.vue         # Page Contact (FR-4)
├── components/
│   ├── Header.vue          # Header avec navigation (FR-5)
│   ├── Footer.vue          # Footer avec contacts (FR-5)
│   ├── EventCard.vue       # Carte d'événement (FR-3)
│   ├── EventCalendar.vue   # Calendrier interactif (FR-7)
│   └── ContactForm.vue     # Formulaire de contact (FR-4)
├── composables/
│   └── useEvents.ts        # Composable pour données d'événements
├── types/
│   └── event.ts            # Types TypeScript pour événements
├── layouts/
│   └── default.vue         # Layout principal (FR-5)
├── assets/
│   └── css/
│       └── main.css        # Styles personnalisés
├── app.config.ts           # Configuration Nuxt UI (couleurs)
└── app.vue                 # Root component avec transitions
```

## Phases

### Phase 0: Research & Planning

**Recherches effectuées**:
- Nuxt.js 4.x SSG best practices
- Nuxt UI 4.x composants et theming
- Accessibilité WCAG 2.1 avec Nuxt UI
- SEO optimization pour Nuxt.js
- Performance optimization techniques

**Décisions techniques**:
1. Utilisation de Nuxt.js SSG (`nuxt generate`) pour performance maximale
2. Nuxt UI pour composants accessibles et responsive par défaut
3. Tailwind CSS via Nuxt UI pour styling (couleurs personnalisées pour drapeau malien)
4. TypeScript pour sécurité des types
5. Images optimisées avec formats WebP/AVIF déjà disponibles dans `/public/`

### Phase 1: Design

**Structure des pages**:

1. **Page d'accueil** (`/`):
   - Hero section avec logo et message de bienvenue
   - Section "À propos" (résumé)
   - Section "Événements à venir" (3-4 événements)
   - Section "Contact rapide"
   - Call-to-action vers pages principales

2. **Page À propos** (`/about`):
   - Histoire de la fédération
   - Mission et valeurs
   - Informations sur le taekwondo
   - Galerie photos (placeholder pour v1.0)

3. **Page Événements** (`/events`):
   - Liste des événements à venir (section principale)
   - Liste des événements passés (section secondaire)
   - Filtres par type d'événement (futur)
   - Carte d'événement avec date, lieu, description

4. **Page Contact** (`/contact`):
   - Informations de contact (adresse, téléphone, email)
   - Formulaire de contact avec validation
   - Carte Google Maps (optionnel, peut être ajouté plus tard)

**Composants réutilisables**:
- `Header.vue`: Navigation principale avec logo, menu responsive, UColorModeButton
- `Footer.vue`: Informations de contact, liens utiles, copyright
- `EventCard.vue`: Carte d'événement réutilisable avec badges et formatage de date
- `ContactForm.vue`: Formulaire de contact avec validation, compteur de caractères, honeypot
- `EventCalendar.vue`: Calendrier interactif avec navigation mensuelle et jours colorés

**Composables**:
- `useEvents.ts`: Centralise les données d'événements, prépare la migration vers Nuxt Content

**Types**:
- `event.ts`: Interface TypeScript partagée pour les événements

**Design System**:
- Couleurs: Configurées dans `app.config.ts` avec couleurs sémantiques Nuxt UI
  - Primary: green (vert drapeau malien)
  - Secondary: yellow (jaune drapeau malien)
  - Error: red (rouge drapeau malien)
  - Neutral: slate (pour textes et bordures)
- Typographie: Système de Nuxt UI (Inter par défaut, accessible)
- Espacements: Système de spacing de Tailwind/Nuxt UI (réduit pour meilleure UX)
- Composants: Utilisation des composants Nuxt UI (UPageHero, UPageSection, UPageCTA, UCard, UButton, UInput, etc.)
- Transitions: Page et layout transitions configurées pour navigation fluide

### Phase 2: Implementation

**Ordre d'implémentation**:

1. **Setup & Configuration**:
   - Configuration Nuxt pour SSG
   - Configuration Nuxt UI avec couleurs personnalisées
   - Configuration SEO (meta tags, sitemap)
   - Configuration accessibilité

2. **Layout & Navigation**:
   - Création du layout principal
   - Header avec logo et navigation
   - Footer avec informations
   - Navigation responsive

3. **Page d'accueil**:
   - Hero section
   - Sections de contenu
   - Intégration logo
   - Liens vers autres pages

4. **Page À propos**:
   - Contenu histoire/mission
   - Mise en page avec Nuxt UI
   - Espace pour photos futures

5. **Page Événements**:
   - Composant EventCard
   - Liste d'événements (données en dur pour v1.0)
   - Filtrage futur préparé

6. **Page Contact**:
   - Informations de contact
   - Formulaire de contact (validation côté client)
   - Intégration future avec service email

7. **Optimisations**:
   - Images optimisées
   - Meta tags SEO
   - Accessibilité (ARIA, navigation clavier)
   - Performance (lazy loading, code splitting)

## Implementation Details

### Configuration Nuxt

**nuxt.config.ts**:
- Module Nuxt UI activé
- SSG configuré (`ssr: false` ou `nitro.prerender.routes`)
- SEO module (ou meta tags manuels)
- Configuration des couleurs personnalisées pour Nuxt UI

### Données

Pour v1.0, les données (événements, informations) seront en dur dans les composants ou dans des fichiers TypeScript/JSON. Structure préparée pour migration future vers CMS ou API.

**Structure de données événement**:
```typescript
// Défini dans app/types/event.ts
export type Event = {
  id: number
  title: string
  date: string
  location: string
  description: string
  type: 'competition' | 'training' | 'ceremony' | 'social'
  status: 'upcoming' | 'past'
}
```

**Composable useEvents**:
- Centralise toutes les données d'événements
- Fournit `upcomingEvents`, `pastEvents`, `allEvents`
- Structure préparée pour migration future vers Nuxt Content (Phase 2 - Blog)

### Accessibilité

- Utilisation des composants Nuxt UI (accessibles par défaut)
- Navigation au clavier fonctionnelle
- ARIA labels appropriés
- Contraste de couleurs vérifié
- Support lecteurs d'écran

### SEO

- Meta tags sur chaque page
- URLs propres et descriptives
- Sitemap XML généré automatiquement
- Images avec alt text appropriés
- Structure sémantique HTML

### Performance

- Images optimisées (AVIF avec fallback WebP via NuxtImg)
- Lazy loading des images (loading="eager" pour logo critique)
- Code splitting automatique (Nuxt)
- Minification et compression
- CDN ready (static site)
- Transitions optimisées (CSS transitions)
- Utilisation des couleurs Nuxt UI (pas de classes Tailwind directes pour gray)

## Open Questions Resolved

- ✅ **CMS pour événements**: Non pour v1.0, données en dur. Structure préparée pour migration future
- ✅ **Réseaux sociaux**: Oui, liens dans footer (v1.0)
- ✅ **Photos**: Placeholders préparés, intégration future possible
- ✅ **Newsletter**: Non pour v1.0, peut être ajouté plus tard

## Fonctionnalités Implémentées (v1.0)

✅ **Pages**:
- Page d'accueil avec sections hero, à propos, événements, contact
- Page À propos avec histoire, mission, valeurs
- Page Événements avec listes à venir et passés
- Page Calendrier avec calendrier interactif (bonus)
- Page Contact avec formulaire et informations

✅ **Composants**:
- Header avec navigation responsive et UColorModeButton
- Footer avec informations et liens
- EventCard avec badges et formatage
- EventCalendar avec navigation et jours colorés
- ContactForm avec validation complète

✅ **Configuration**:
- Nuxt UI avec couleurs sémantiques (app.config.ts)
- Transitions de page et layout
- SEO optimisé (meta tags sur toutes les pages)
- Images optimisées (AVIF/WebP)

## Next Steps

1. ✅ Générer les tâches détaillées avec `/speckit.tasks` (déjà fait)
2. ✅ Implémenter selon l'ordre défini dans Phase 2 (complété)
3. ⚠️ Tester accessibilité et performance (voir `tests.md` pour le guide complet)
4. ⚠️ Déployer sur Vercel (voir `specs/DEPLOYMENT.md` pour le guide complet)

## Documentation de Test

Un guide de test complet est disponible dans [`tests.md`](./tests.md) avec :
- Tests fonctionnels pour toutes les pages
- Tests responsive (mobile, tablette, desktop)
- Tests d'accessibilité (WCAG 2.1 AA)
- Tests de performance (Lighthouse)
- Tests de couleurs Nuxt UI
- Checklist finale
- Outils recommandés

