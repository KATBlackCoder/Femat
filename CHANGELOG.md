# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-01-27

### Ajouté

#### Pages
- Page d'accueil (`/`) avec sections hero, à propos, événements et contact
- Page À propos (`/about`) avec histoire, mission et valeurs de la FEMAT
- Page Événements (`/events`) avec listes d'événements à venir et passés
- Page Calendrier (`/calendar`) avec calendrier interactif mensuel
- Page Contact (`/contact`) avec formulaire de contact et informations
- Page d'erreur (`/error`) avec design Nuxt UI et messages personnalisés

#### Composants
- `Header.vue`: Navigation principale avec logo, menu responsive et mode sombre/clair
- `Footer.vue`: Footer avec informations de contact, navigation et lien Facebook
- `EventCard.vue`: Carte d'événement réutilisable avec badges et formatage de date
- `EventCalendar.vue`: Calendrier interactif avec navigation mensuelle et jours colorés
- `ContactForm.vue`: Formulaire de contact avec validation, compteur de caractères et honeypot

#### Configuration
- Configuration Nuxt.js pour SSG (Static Site Generation)
- Configuration Nuxt UI avec couleurs sémantiques (vert, jaune, rouge du drapeau malien)
- Configuration Nuxt Image pour optimisation automatique des images
- Transitions de page et layout configurées
- SEO optimisé avec meta tags, Open Graph et Twitter Cards

#### Composables
- `useEvents.ts`: Composable centralisé pour gérer les données d'événements

#### Types
- `app/types/event.ts`: Interface TypeScript partagée pour les événements

#### Styles
- CSS personnalisé avec variable `--ui-header-height` pour UError
- Support mode sombre/clair avec Nuxt UI

#### Images
- Logo FEMAT en format AVIF avec fallback WebP
- Optimisation automatique avec NuxtImg
- Fond blanc circulaire pour logo en mode sombre

#### Documentation
- Spécifications complètes dans `specs/001-site-web-femat/`
- Plan d'implémentation détaillé
- Guide de test complet
- Guide de déploiement Vercel
- Roadmap du projet

### Modifié

- N/A (version initiale)

### Corrigé

- N/A (version initiale)

### Supprimé

- N/A (version initiale)

## [Unreleased]

### Planifié pour v1.1.0

- Tests complets (fonctionnels, accessibilité, performance)
- Déploiement sur Vercel
- Intégration service email pour formulaire de contact

### Planifié pour v2.0.0

- Système de blog avec Nuxt Content
- Administration avec Nuxt Studio
- Migration des événements vers Nuxt Content

### Planifié pour v3.0.0

- Système e-commerce pour équipements et produits promotionnels

### Planifié pour v4.0.0

- Système d'authentification pour membres
- Gestion des grades et profils

### Planifié pour v5.0.0

- Centralisation des dojos au Mali
- Annuaire des membres (maîtres et élèves)
- Gestion des affiliations

---

## Format des versions

- **MAJOR** (x.0.0): Changements incompatibles avec les versions précédentes
- **MINOR** (0.x.0): Nouvelles fonctionnalités rétrocompatibles
- **PATCH** (0.0.x): Corrections de bugs rétrocompatibles

## Types de changements

- **Ajouté**: Nouvelles fonctionnalités
- **Modifié**: Changements dans les fonctionnalités existantes
- **Déprécié**: Fonctionnalités qui seront supprimées dans une version future
- **Supprimé**: Fonctionnalités supprimées
- **Corrigé**: Corrections de bugs
- **Sécurité**: Corrections de vulnérabilités

