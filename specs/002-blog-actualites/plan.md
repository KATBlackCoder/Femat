# Implementation Plan: Blog & Actualités FEMAT

**Branch**: `002-blog-actualites` | **Date**: 2025-01-27 | **Spec**: `specs/002-blog-actualites/spec.md`
**Input**: Feature specification from `/specs/002-blog-actualites/spec.md`

## Summary

Implémentation d'un système de blog et d'actualités pour la FEMAT utilisant **Nuxt Content** pour la gestion de contenu Markdown et **Nuxt Studio** pour l'interface d'édition visuelle en production. Le blog permettra de publier des articles sur les événements, compétitions, résultats et actualités de la fédération. Approche SSG pour performance maximale, avec pagination, filtres par catégorie, recherche, et intégration native avec Nuxt.js.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Nuxt.js 4.2.1, Nuxt UI 4.1.0, @nuxt/content, nuxt-studio@alpha  
**Storage**: Fichiers Markdown dans `/content/blog/` (versionnés avec Git)  
**Testing**: Tests manuels pour v1.0, tests automatisés optionnels pour v2.0  
**Target Platform**: Web (modern browsers)  
**Project Type**: Web (Static Site avec SSG)  
**Deployment**: Vercel (SSG) - GitHub OAuth configuré pour Nuxt Studio  
**Performance Goals**: Lighthouse score > 90, chargement rapide avec lazy loading  
**Constraints**: Mobile-first, accessible (WCAG 2.1 AA), SEO-friendly, responsive  
**Scale/Scope**: Blog public pour fédération sportive (~10-50 articles/mois estimés)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] User-First Design: Feature aligns with user needs - Blog conçu pour informer les visiteurs et membres sur les actualités
- [x] Performance & SEO: Optimizations planned - SSG pour performance, meta tags dynamiques, sitemap automatique
- [x] Maintainability: Code structure defined - Nuxt Content pour structure claire, Markdown pour facilité d'édition
- [x] Accessibility: WCAG compliance planned - Navigation clavier, lecteurs d'écran, contraste couleurs avec Nuxt UI
- [x] Mobile-First: Responsive design considered - Approche mobile-first avec Nuxt UI responsive

## Project Structure

### Documentation (this feature)

```text
specs/002-blog-actualites/
├── plan.md              # This file
├── spec.md              # Original specification
└── comparison-cms.md    # Comparaison CMS (Nuxt Content vs Strapi)
```

### Application Structure

```text
app/
├── pages/
│   ├── blog/
│   │   ├── index.vue           # Liste des articles (FR-1)
│   │   └── [...slug].vue        # Page d'article individuel (FR-2)
│   └── _studio/                 # Nuxt Studio (FR-4) - généré automatiquement
├── components/
│   └── blogs/
│       ├── BlogCard.vue            # Carte d'article pour la liste
│       ├── BlogPost.vue            # Composant pour afficher un article
│       ├── BlogFilters.vue         # Filtres par catégorie/tag (FR-1, FR-3)
│       └── BlogSearch.vue          # Barre de recherche (FR-1)
├── composables/
│   ├── useBlog.ts              # Composable pour requêtes blog
│   └── useEvents.ts            # Migré vers Nuxt Content (futur)
├── types/
│   └── blog.ts                 # Types TypeScript pour articles
└── content/
    └── blog/
        ├── 2025-01-27-premier-article.md
        ├── 2025-02-10-ceremonie-remise-ceintures.md
        └── ...
```

## Phases

### Phase 0: Research & Planning ✅

**Recherches effectuées**:
- Comparaison Nuxt Content + Nuxt Studio vs Strapi (voir `comparison-cms.md`)
- Documentation Nuxt Content pour SSG
- Documentation Nuxt Studio pour édition visuelle
- Best practices pour blogs statiques

**Décisions techniques**:
1. ✅ **Nuxt Content + Nuxt Studio** choisi (conforme à la constitution, gratuit, SSG)
2. ✅ Structure Markdown avec frontmatter YAML pour métadonnées
3. ✅ Collections typées avec TypeScript pour sécurité des types
4. ✅ Nuxt Studio pour édition visuelle en production avec GitHub OAuth
5. ✅ Migration future des événements vers Nuxt Content (prévu dans Phase 2)

### Phase 1: Design

**Structure des données**:

**Article de blog** (`BlogPost`):
```typescript
interface BlogPost {
  _path: string              // URL de l'article (/blog/slug)
  title: string              // Titre de l'article
  description: string        // Description/meta description
  date: string               // Date de publication (YYYY-MM-DD)
  author: string             // Auteur de l'article
  category: 'competition' | 'actualite' | 'resultat' | 'evenement'
  tags?: string[]            // Tags pour classification fine
  image?: string             // Image de couverture (chemin relatif)
  published: boolean         // Statut de publication
  _body?: string             // Contenu Markdown (Nuxt Content)
}
```

**Format Markdown**:
```markdown
---
title: "Titre de l'article"
description: "Description de l'article"
date: 2025-01-27
author: "Nom de l'auteur"
category: competition
tags: [championnat, bamako, 2025]
image: /blog/images/championnat-2025.jpg
published: true
---

# Contenu de l'article

Contenu en Markdown avec support MDC (composants Vue).
```

**Structure des pages**:

1. **Page liste des articles** (`/blog`):
   - Hero section avec titre et description
   - Barre de recherche (FR-1)
   - Filtres par catégorie (FR-1, FR-3)
   - Grille/liste d'articles avec `BlogCard`
   - Pagination ou scroll infini
   - Design cohérent avec Nuxt UI

2. **Page article individuel** (`/blog/[slug]`):
   - Image de couverture
   - Titre et métadonnées (date, auteur, catégorie, tags)
   - Contenu de l'article avec typographie lisible
   - Boutons de partage social (FR-2)
   - Articles similaires suggérés (FR-2)
   - Navigation retour vers liste

3. **Nuxt Studio** (`/_studio`):
   - Interface d'édition visuelle
   - Authentification GitHub OAuth
   - Édition Markdown avec prévisualisation
   - Upload d'images vers `/public/blog/`
   - Gestion des métadonnées (frontmatter)

**Composants**:

- `components/blogs/BlogCard.vue`: Carte d'article avec image, titre, date, description, catégorie
- `components/blogs/BlogPost.vue`: Affichage complet d'un article avec métadonnées et contenu
- `components/blogs/BlogFilters.vue`: Filtres par catégorie et tags avec badges Nuxt UI
- `components/blogs/BlogSearch.vue`: Barre de recherche avec debounce

### Phase 2: Implementation

**Ordre d'implémentation**:

1. **Installation et configuration** (Étape 1)
   - Installer `@nuxt/content` et `nuxt-studio@alpha`
   - Configurer `nuxt.config.ts` avec modules et options
   - Créer structure de dossiers `/content/blog/`

2. **Types TypeScript** (Étape 2)
   - Créer `app/types/blog.ts` avec interface `BlogPost`
   - Configurer collections Nuxt Content si nécessaire

3. **Composable useBlog** (Étape 3)
   - Créer `app/composables/useBlog.ts`
   - Fonctions pour récupérer articles, filtrer, rechercher
   - Utiliser `queryContent()` de Nuxt Content

4. **Composants** (Étape 4)
   - `components/blogs/BlogCard.vue`: Carte d'article réutilisable
   - `components/blogs/BlogFilters.vue`: Filtres par catégorie/tag
   - `components/blogs/BlogSearch.vue`: Barre de recherche
   - `components/blogs/BlogPost.vue`: Affichage article complet

5. **Pages** (Étape 5)
   - `/app/pages/blog/index.vue`: Liste des articles avec filtres et recherche
   - `/app/pages/blog/[...slug].vue`: Page d'article individuel avec catch-all route

6. **Contenu initial** (Étape 6)
   - Créer 3-5 articles d'exemple dans `/content/blog/`
   - Tester l'affichage et la navigation

7. **SEO et optimisations** (Étape 7)
   - Meta tags dynamiques par article
   - Sitemap incluant les articles
   - Images optimisées avec Nuxt Image
   - Lazy loading pour images

8. **Nuxt Studio** (Étape 8)
   - Vérifier accès `/_studio`
   - Tester édition d'article
   - Tester upload d'images
   - Documenter utilisation pour équipe éditoriale

9. **Intégration navigation** (Étape 9)
   - Ajouter lien "Blog" dans Header
   - Ajouter lien "Blog" dans Footer
   - Mettre à jour navigation

10. **Tests et documentation** (Étape 10)
    - Tests manuels de toutes les fonctionnalités
    - Documentation pour équipe éditoriale
    - Guide d'utilisation Nuxt Studio

## Implementation Details

### Étape 1: Installation et Configuration ✅

**Commandes** (Exécutées):
```bash
pnpm add @nuxt/content nuxt-studio@alpha
pnpm add better-sqlite3  # Installé puis remplacé par connecteur natif
```

**Configuration `nuxt.config.ts`**:
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',  // Ajouté
    'nuxt-studio'     // Ajouté
  ],
  
  // Configuration Nuxt Content
  content: {
    experimental: {
      // Utiliser le connecteur SQLite natif de Node.js (disponible depuis v22.5.0)
      // Évite les problèmes de compilation avec better-sqlite3
      sqliteConnector: 'native'
    },
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'bash']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  } as any, // Type assertion temporaire - les types seront générés au prochain démarrage

  // Configuration Nuxt Studio
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'votre-username',  // À remplacer avec le vrai owner GitHub
      repo: 'femat',
      branch: 'main'
    }
  },
  
  // ... reste de la config
})
```

**Note**: La configuration `content.experimental.sqliteConnector: 'native'` utilise le module SQLite intégré à Node.js v22.5.0+ au lieu de `better-sqlite3`, évitant ainsi les problèmes de compilation native avec pnpm.

**Structure de dossiers** (Créée):
```bash
mkdir -p content/blog
mkdir -p public/blog/images
touch content/blog/.gitkeep
touch public/blog/images/.gitkeep
```

### Étape 2: Types TypeScript ✅

**Fichier `app/types/blog.ts`** (Créé):
```typescript
export interface BlogPost {
  _path: string
  title: string
  description: string
  date: string
  author: string
  category: 'competition' | 'actualite' | 'resultat' | 'evenement'
  tags?: string[]
  image?: string
  published: boolean
  _body?: string
  _id?: string
  _type?: string
  createdAt?: string
  updatedAt?: string
}
```

### Étape 3: Composable useBlog ✅

**Fichier `app/composables/useBlog.ts`** (Implémenté):
- ✅ `getAllPosts()`: Récupérer tous les articles publiés triés par date
- ✅ `getPostBySlug(slug)`: Récupérer un article par slug
- ✅ `getPostsByCategory(category)`: Filtrer par catégorie
- ✅ `getPostsByTag(tag)`: Filtrer par tag
- ✅ `searchPosts(query)`: Rechercher dans titre, description et tags
- ✅ `getRelatedPosts(post, limit)`: Articles similaires (priorité: catégorie > tags > récents)
- ✅ `getAllTags()`: Récupérer tous les tags uniques (bonus)
- ✅ `getPostsCountByCategory()`: Compter les articles par catégorie (bonus)

**Caractéristiques**:
- Utilise `queryContent()` de Nuxt Content avec déclaration de type temporaire
- Cache avec `useAsyncData()` pour performance
- Gestion d'erreurs complète avec try/catch
- Gestion des cas limites (query vide, articles non trouvés)

### Étape 4: Composants

**`components/blogs/BlogCard.vue`**:
- Image de couverture avec NuxtImg
- Titre avec lien vers article
- Date formatée en français
- Badge catégorie
- Description/extrait
- Tags (optionnel)

**`components/blogs/BlogPost.vue`**:
- Image de couverture
- Métadonnées (date, auteur, catégorie, tags)
- Contenu avec `<ContentRenderer>`
- Boutons de partage social
- Articles similaires

**`components/blogs/BlogFilters.vue`**:
- Boutons filtres par catégorie (UBadge)
- Liste de tags cliquables
- Compteur d'articles par filtre

**`components/blogs/BlogSearch.vue`**:
- Input de recherche (UInput)
- Debounce pour performance
- Résultats en temps réel

### Étape 5: Pages

**`/app/pages/blog/index.vue`**:
- Utilise `UPageHero` pour hero section
- Utilise `UPageSection` pour contenu
- Intègre `components/blogs/BlogSearch` et `components/blogs/BlogFilters`
- Grille d'articles avec `components/blogs/BlogCard`
- Pagination avec `UPagination` ou scroll infini

**`/app/pages/blog/[...slug].vue`**:
- Catch-all route pour articles individuels
- Utilise `queryContent()` pour récupérer article
- Affiche `components/blogs/BlogPost` avec métadonnées
- Articles similaires en bas
- Navigation retour vers liste

### Étape 6: Contenu Initial

**Articles d'exemple**:
1. Article de bienvenue
2. Article sur événement récent
3. Article sur compétition
4. Article résultat
5. Article actualité

**Format**:
```markdown
---
title: "Titre"
description: "Description"
date: 2025-01-27
author: "FEMAT"
category: actualite
tags: [bienvenue, actualite]
image: /blog/images/image.jpg
published: true
---

# Contenu
```

### Étape 7: SEO et Optimisations

**Meta tags dynamiques**:
- `useSeoMeta()` dans chaque page article
- Open Graph et Twitter Cards
- Images optimisées avec Nuxt Image
- Sitemap automatique avec Nuxt Content

**Performance**:
- Lazy loading images
- Code splitting automatique
- Pagination pour limiter articles chargés

### Étape 8: Nuxt Studio

**Vérifications**:
- Accès `/_studio` fonctionne
- Authentification GitHub OAuth
- Édition Markdown avec prévisualisation
- Upload images vers `/public/blog/images/`
- Synchronisation Git automatique

**Documentation**:
- Guide d'utilisation pour équipe éditoriale
- Workflow de publication
- Gestion des images

### Étape 9: Intégration Navigation

**Header.vue**:
- Ajouter lien "Blog" dans navigation desktop
- Ajouter lien "Blog" dans menu mobile

**Footer.vue**:
- Ajouter lien "Blog" dans navigation footer

### Étape 10: Tests et Documentation

**Tests manuels**:
- Liste des articles s'affiche correctement
- Filtres par catégorie fonctionnent
- Recherche fonctionne
- Page article individuel s'affiche
- Navigation fonctionne
- Partage social fonctionne
- Nuxt Studio accessible et fonctionnel

**Documentation**:
- Guide d'utilisation Nuxt Studio
- Format Markdown pour articles
- Workflow de publication
- Gestion des images

## Migration Future: Événements vers Nuxt Content

**Prévu pour Phase 2** (après blog v1.0):
- Migrer événements de `useEvents.ts` vers Nuxt Content
- Créer collection `content/events/`
- Articles de blog avec type "event" pour événements
- Intégration avec calendrier existant

## Dependencies

- ✅ Site web de base (001-site-web-femat) complété
- ✅ GitHub OAuth configuré pour Nuxt Studio
- ✅ Module `@nuxt/content` - Installé (v3.8.2)
- ✅ Module `nuxt-studio@alpha` - Installé (v1.0.0-alpha.1)
- ✅ Module `better-sqlite3` - Installé (remplacé par connecteur natif Node.js)

## Open Questions

- [x] ~~Quel système de gestion de contenu utiliser ?~~ → **Nuxt Content + Nuxt Studio**
- [x] ~~Configuration GitHub OAuth pour Nuxt Studio~~ → **Configuré**
- [ ] Faut-il un système de commentaires ? (Optionnel pour v1.0)
- [ ] Qui sera responsable de la création de contenu ?
- [ ] Fréquence de publication attendue ?

## Next Steps

1. ✅ Installer les modules Nuxt Content et Nuxt Studio
2. ✅ Configurer `nuxt.config.ts` et `content.config.ts`
3. ✅ Créer structure de dossiers et types TypeScript
4. ✅ Implémenter composable `useBlog` (Phase 2 complétée)
5. ⏳ Implémenter composants (Phase 3 - En cours)
6. ⏳ Créer pages blog (Phase 4)
7. ⏳ Ajouter contenu initial (Phase 5)
8. ⏳ Tester et documenter (Phase 9)

## Progression Actuelle

**Phase 1: Setup & Configuration** ✅ Complétée
- Modules installés et configurés
- Structure de dossiers créée
- Types TypeScript définis
- Configuration Nuxt Content avec connecteur SQLite natif

**Phase 2: Composable et Utilitaires** ✅ Complétée
- Composable `useBlog` créé avec 8 fonctions
- Gestion d'erreurs et cas limites
- Cache avec `useAsyncData()`

**Phase 3: Composants** ⏳ En attente
- `BlogCard.vue`
- `BlogPost.vue`
- `BlogFilters.vue`
- `BlogSearch.vue`

