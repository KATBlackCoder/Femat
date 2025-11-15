# Feature Specification: Site Web FEMAT

**Feature ID**: `001-site-web-femat`  
**Date**: 2025-01-27  
**Status**: Draft

## Overview

Création d'un site web moderne et professionnel pour la Fédération Malienne de Taekwondo (FEMAT) utilisant Nuxt.js et Nuxt UI. Le site doit présenter la fédération, ses activités, événements, et fournir des informations aux membres et au public.

## Context

La FEMAT a besoin d'un site web pour :
- Présenter la fédération et ses valeurs
- Informer sur les événements et compétitions
- Fournir des informations pratiques (horaires, lieux, contacts)
- Améliorer la visibilité du taekwondo au Mali
- Faciliter la communication avec les membres et le public

## Functional Requirements

### FR-1: Page d'accueil
**Description**: Page d'accueil attractive présentant la FEMAT avec le logo, un message de bienvenue, et des sections clés.

**Acceptance Criteria**:
- [ ] Affichage du logo FEMAT
- [ ] Section hero avec message d'accueil
- [ ] Sections pour présenter les activités principales
- [ ] Liens vers les sections importantes
- [ ] Design responsive et moderne

### FR-2: Page À propos
**Description**: Page présentant l'histoire, la mission, et les valeurs de la FEMAT.

**Acceptance Criteria**:
- [ ] Histoire de la fédération
- [ ] Mission et valeurs
- [ ] Informations sur le taekwondo
- [ ] Photos et visuels pertinents

### FR-3: Page Événements
**Description**: Liste des événements, compétitions, et activités de la fédération.

**Acceptance Criteria**:
- [ ] Liste des événements à venir
- [ ] Liste des événements passés
- [ ] Informations détaillées pour chaque événement (date, lieu, description)
- [ ] Design de cartes pour les événements

### FR-4: Page Contact
**Description**: Informations de contact et formulaire de contact.

**Acceptance Criteria**:
- [ ] Adresse de la fédération
- [ ] Numéros de téléphone
- [ ] Adresse email
- [ ] Formulaire de contact fonctionnel
- [ ] Carte Google Maps (optionnel)

### FR-5: Navigation et Layout
**Description**: Navigation claire et layout cohérent sur toutes les pages.

**Acceptance Criteria**:
- [ ] Header avec logo et menu de navigation
- [ ] Footer avec informations de contact et liens utiles
- [ ] Menu responsive (hamburger sur mobile)
- [ ] Navigation cohérente sur toutes les pages
- [ ] Lien vers la page Facebook (https://www.facebook.com/taekwondomali)

### FR-6: Intégration du logo
**Description**: Utilisation appropriée du logo FEMAT dans le design.

**Acceptance Criteria**:
- [ ] Logo dans le header
- [ ] Logo sur la page d'accueil
- [ ] Favicon avec logo
- [ ] Formats optimisés (WebP, AVIF) utilisés

## Non-Functional Requirements

### NFR-1: Performance
- Temps de chargement initial < 3 secondes
- Score Lighthouse > 90
- Images optimisées et lazy loading
- Code splitting automatique

### NFR-2: Accessibility
- Conformité WCAG 2.1 niveau AA
- Navigation au clavier fonctionnelle
- Support des lecteurs d'écran
- Contraste de couleurs suffisant

### NFR-3: SEO
- Meta tags appropriés
- Structure sémantique HTML
- URLs propres et descriptives
- Sitemap XML généré automatiquement

### NFR-4: Responsive Design
- Fonctionne parfaitement sur mobile, tablette, et desktop
- Approche mobile-first
- Images responsives

## User Stories

### US-1: Visiteur découvre la FEMAT
**As a** visiteur  
**I want** comprendre ce qu'est la FEMAT et ses activités  
**So that** je puisse décider si je veux m'impliquer

### US-2: Membre cherche un événement
**As a** membre de la fédération  
**I want** voir les prochains événements et compétitions  
**So that** je puisse m'inscrire à temps

### US-3: Personne veut contacter la fédération
**As a** personne intéressée  
**I want** trouver les informations de contact  
**So that** je puisse poser des questions ou obtenir plus d'informations

## Technical Considerations

- Utilisation de Nuxt.js 4.x avec SSG (Static Site Generation)
- Nuxt UI pour les composants et le styling
- TypeScript pour la sécurité des types
- Utilisation des couleurs du logo (vert, jaune, rouge du drapeau malien)
- Support multilingue (français, bambara) - future amélioration

## Design Guidelines

- **Couleurs principales**: 
  - Vert (#00853F - drapeau malien)
  - Jaune (#FCD116 - drapeau malien)
  - Rouge (#CE1126 - drapeau malien)
  - Noir et blanc pour le texte
- **Typographie**: Moderne, lisible, accessible
- **Style**: Professionnel, sportif, dynamique

## Fonctionnalités Futures Planifiées

Les fonctionnalités suivantes sont planifiées pour les versions futures :

- **002-blog-actualites**: Système de blog et actualités (voir `specs/002-blog-actualites/spec.md`)
- **003-ecommerce**: Boutique en ligne pour équipements et produits promotionnels (voir `specs/003-ecommerce/spec.md`)
- **004-authentification**: Système d'authentification pour membres avec gestion des grades (voir `specs/004-authentification/spec.md`)
- **005-gestion-dojos-membres**: Centralisation des dojos au Mali et annuaire des membres (voir `specs/005-gestion-dojos-membres/spec.md`)

## Out of Scope (v1.0)

- Système d'authentification pour membres (planifié dans 004-authentification)
- Gestionnaire de contenu (CMS) pour blog (planifié dans 002-blog-actualites)
- Paiements en ligne (planifié dans 003-ecommerce)
- Multilingue (sera ajouté plus tard)
- Gestion des dojos et membres (planifié dans 005-gestion-dojos-membres)

## Dependencies

- Logo FEMAT disponible dans `/public/`
- Nuxt.js et Nuxt UI installés et configurés

## Réseaux Sociaux

- **Facebook**: https://www.facebook.com/taekwondomali
  - Lien à intégrer dans le footer et/ou header
  - Peut servir de source pour recenser les membres et dojos existants

## Open Questions

Voir `specs/CLARIFICATIONS-NEEDED.md` pour la liste complète des points à clarifier.

**Priorité pour Phase 1**:
- [ ] Informations de contact complètes (adresse, téléphone, email)
- [ ] Contenu des pages (À propos, message d'accueil)
- [ ] Événements à afficher (au moins 2-3 pour démarrer)
- [ ] Photos disponibles et sources
- [ ] Autres réseaux sociaux à intégrer (Instagram, Twitter, etc.) ?

**Reporté pour plus tard**:
- [ ] Système de gestion de contenu pour événements (données en dur pour v1.0)
- [ ] Système de newsletter (peut être ajouté plus tard)

