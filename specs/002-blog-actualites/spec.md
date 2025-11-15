# Feature Specification: Blog & Actualités FEMAT

**Feature ID**: `002-blog-actualites`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P2 (après v1.0 du site de base)

## Overview

Création d'un système de blog et d'actualités pour la FEMAT permettant de publier des articles sur les événements, compétitions, résultats, et actualités de la fédération.

## Context

La FEMAT a besoin d'un blog pour :
- Partager les actualités de la fédération
- Publier des articles sur les compétitions et résultats
- Informer sur les événements et activités
- Améliorer le référencement SEO avec du contenu régulier
- Créer une communauté autour du taekwondo au Mali

## Functional Requirements

### FR-1: Liste des articles de blog
**Description**: Page affichant la liste de tous les articles de blog avec pagination.

**Acceptance Criteria**:
- [ ] Affichage des articles en grille ou liste
- [ ] Image de couverture pour chaque article
- [ ] Titre, date de publication, auteur
- [ ] Extrait/description de l'article
- [ ] Pagination ou scroll infini
- [ ] Filtres par catégorie (compétitions, actualités, résultats, etc.)
- [ ] Recherche d'articles

### FR-2: Page d'article individuel
**Description**: Page détaillée pour chaque article de blog.

**Acceptance Criteria**:
- [ ] Contenu complet de l'article
- [ ] Image de couverture
- [ ] Métadonnées (date, auteur, catégorie, tags)
- [ ] Partage sur réseaux sociaux
- [ ] Articles similaires suggérés
- [ ] Commentaires (optionnel pour v1.0)

### FR-3: Catégories et tags
**Description**: Système de catégorisation des articles.

**Acceptance Criteria**:
- [ ] Catégories principales (Compétitions, Actualités, Résultats, Événements)
- [ ] Tags pour classification fine
- [ ] Filtrage par catégorie/tag
- [ ] Pages de catégorie avec liste d'articles

### FR-4: Administration du blog avec Nuxt Studio
**Description**: Interface d'administration visuelle pour créer/modifier/supprimer des articles directement en production.

**Acceptance Criteria**:
- [ ] Accès à Nuxt Studio sur `/_studio` avec authentification GitHub
- [ ] Édition visuelle des articles Markdown
- [ ] Upload d'images vers `/public/blog/`
- [ ] Gestion des catégories et tags dans le frontmatter
- [ ] Prévisualisation en temps réel
- [ ] Système de brouillons via branches Git (futur)
- [ ] Synchronisation automatique avec le repository Git

## Non-Functional Requirements

### NFR-1: Performance
- Chargement rapide de la liste d'articles
- Images optimisées et lazy loading
- Pagination efficace

### NFR-2: SEO
- URLs propres et descriptives (`/blog/article-titre`)
- Meta tags dynamiques par article
- Structure sémantique HTML
- Sitemap incluant tous les articles

## User Stories

### US-1: Visiteur lit les actualités
**As a** visiteur  
**I want** lire les dernières actualités de la FEMAT  
**So that** je puisse rester informé des activités de la fédération

### US-2: Membre cherche un résultat de compétition
**As a** membre  
**I want** trouver les résultats d'une compétition spécifique  
**So that** je puisse voir les performances

## Technical Considerations

### Solution Choisie: Nuxt Content + Nuxt Studio ✅

**Décision**: Utilisation de **Nuxt Content** avec **Nuxt Studio** pour le système de blog.

**Justification**:
- ✅ Intégration native avec Nuxt.js (déjà utilisé dans le projet)
- ✅ SSG compatible (conforme à la constitution - performance maximale)
- ✅ Gratuit et open source (pas de coûts d'hébergement serveur)
- ✅ Type-safe avec TypeScript et collections
- ✅ Nuxt Studio offre interface d'édition visuelle en production
- ✅ Synchronisation Git automatique (tous les changements dans le repo)
- ✅ Pas de serveur séparé à maintenir
- ✅ Performance optimale (fichiers statiques pré-générés)
- ✅ Déploiement simple (même processus que le site)

**Voir**: `comparison-cms.md` pour l'analyse détaillée des options.

### Architecture Technique

**Modules Nuxt requis**:
- `@nuxt/content` - Module de gestion de contenu
- `nuxt-studio@alpha` - Interface d'édition visuelle

**Structure des fichiers**:
```
content/
└── blog/
    ├── 2025-01-27-premier-article.md
    ├── 2025-01-28-competition-bamako.md
    └── ...
```

**Format des articles**:
- Markdown avec frontmatter YAML
- Support des composants Vue (MDC syntax)
- Collections typées avec TypeScript

**Interface d'édition**:
- Nuxt Studio accessible sur `/_studio` en production
- Authentification GitHub OAuth
- Édition visuelle directement sur le site
- Synchronisation automatique avec le repository Git

### Alternatives Considérées (non retenues)

**Strapi**:
- ❌ Nécessite serveur séparé (coûts d'hébergement)
- ❌ Complexité accrue (deux applications à gérer)
- ❌ SSR requis (moins performant que SSG)
- ✅ Avantage: Interface d'administration plus complète (non nécessaire pour ce cas)

**Voir**: `comparison-cms.md` pour l'analyse complète.

## Design Guidelines

- Design cohérent avec le reste du site
- Cartes d'articles avec image, titre, date
- Page d'article avec typographie lisible
- Partage social visible

## Out of Scope (v1.0)

- Système de commentaires
- Administration complète (utiliser Markdown pour v1.0)
- Newsletter intégrée
- Multilingue pour les articles

## Dependencies

- Site web de base (001-site-web-femat) doit être complété
- Module `@nuxt/content` - Gestion de contenu Markdown
- Module `nuxt-studio@alpha` - Interface d'édition visuelle
- Configuration GitHub OAuth pour Nuxt Studio (voir documentation)

## Installation

```bash
# Installer les modules nécessaires
pnpm add @nuxt/content nuxt-studio@alpha

# Configuration dans nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'nuxt-studio'
  ],
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'votre-username',
      repo: 'femat',
      branch: 'main'
    }
  }
})
```

## Open Questions

- [x] ~~Quel système de gestion de contenu utiliser ?~~ → **Nuxt Content + Nuxt Studio**
- [ ] Faut-il un système de commentaires ? (Optionnel pour v1.0)
- [ ] Qui sera responsable de la création de contenu ?
- [ ] Fréquence de publication attendue ?
- [ ] Configuration GitHub OAuth pour Nuxt Studio (à faire lors du déploiement)

