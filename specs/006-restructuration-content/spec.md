# Feature Specification: Restructuration des Logiques de Content

**Feature ID**: `006-restructuration-content`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P1 (Critique - nécessaire avant déploiement)

## Overview

Refactorisation et optimisation des logiques de gestion de contenu (blog et événements) pour améliorer la maintenabilité, la performance et la cohérence du code.

## Context

Le projet utilise actuellement Nuxt Content v3 avec deux collections (`blog` et `events`) et deux composables (`useBlog` et `useEvents`). Après développement initial, il est nécessaire de :

- Standardiser les patterns de code
- Réduire la duplication
- Optimiser les performances
- Améliorer la gestion des erreurs
- Documenter les patterns utilisés

## Problèmes Identifiés

### 1. Duplication de Code
- Logiques similaires dans `useBlog` et `useEvents`
- Gestion des paths répétitive
- Patterns de requête Nuxt Content dupliqués

### 2. Organisation des Composants
- Composants events (`EventCalendar`, `EventCard`) à la racine de `components/`
- Incohérence avec l'organisation des composants blogs (dans `components/blogs/`)
- Structure des composants non standardisée

### 3. Gestion des Erreurs
- Gestion d'erreurs inconsistante
- Logs de debug excessifs en production
- Pas de fallback gracieux

### 4. Performance
- Requêtes multiples possibles
- Pas de cache des résultats
- Chargement non optimisé

### 5. Types et Schémas
- Types partiellement définis
- Validation des schémas à améliorer
- Cohérence entre types et schémas Zod


## Functional Requirements

### FR-1: Composable de Base pour Content
**Description**: Créer un composable générique réutilisable pour les collections Nuxt Content.

**Acceptance Criteria**:
- [ ] Composable `useContentCollection<T>` générique
- [ ] Méthodes communes : `getAll`, `getBySlug`, `getByField`
- [ ] Gestion d'erreurs centralisée
- [ ] Support des filtres et tri
- [ ] Types TypeScript stricts

### FR-2: Refactorisation de useBlog
**Description**: Refactoriser `useBlog` pour utiliser le composable de base.

**Acceptance Criteria**:
- [ ] Utilise `useContentCollection<BlogPost>`
- [ ] Code réduit de 30% minimum
- [ ] Même API publique (rétrocompatibilité)
- [ ] Performance améliorée
- [ ] Gestion d'erreurs améliorée

### FR-3: Refactorisation de useEvents
**Description**: Refactoriser `useEvents` pour utiliser le composable de base.

**Acceptance Criteria**:
- [ ] Utilise `useContentCollection<Event>`
- [ ] Code réduit de 30% minimum
- [ ] Même API publique (rétrocompatibilité)
- [ ] Logiques métier spécifiques conservées (isEventPast, etc.)
- [ ] Performance améliorée

### FR-4: Standardisation des Types
**Description**: Améliorer et standardiser les types TypeScript.

**Acceptance Criteria**:
- [ ] Types cohérents entre `types/blog.ts` et `types/event.ts`
- [ ] Types générés depuis les schémas Zod
- [ ] Validation runtime avec Zod
- [ ] Documentation JSDoc complète

### FR-5: Optimisation des Schémas Content
**Description**: Améliorer les schémas Zod dans `content.config.ts`.

**Acceptance Criteria**:
- [ ] Schémas plus stricts et validés
- [ ] Messages d'erreur clairs
- [ ] Support des champs optionnels mieux défini
- [ ] Cohérence avec les types TypeScript

### FR-6: Cache et Performance
**Description**: Implémenter un système de cache pour les requêtes fréquentes.

**Acceptance Criteria**:
- [ ] Cache des résultats de requêtes
- [ ] Invalidation du cache appropriée
- [ ] Réduction des requêtes redondantes
- [ ] Performance mesurable améliorée

### FR-7: Gestion d'Erreurs Améliorée
**Description**: Standardiser et améliorer la gestion des erreurs.

**Acceptance Criteria**:
- [ ] Gestion d'erreurs centralisée
- [ ] Logs appropriés (dev vs production)
- [ ] Fallbacks gracieux
- [ ] Messages d'erreur utilisateur-friendly

### FR-8: Réorganisation des Composants Events
**Description**: Réorganiser les composants events dans un dossier dédié pour cohérence avec la structure des composants blogs.

**Acceptance Criteria**:
- [ ] Créer le dossier `app/components/events/`
- [ ] Déplacer `EventCalendar.vue` vers `components/events/`
- [ ] Déplacer `EventCard.vue` vers `components/events/`
- [ ] Mettre à jour tous les imports dans les pages et composants
- [ ] Vérifier que tous les composants fonctionnent après migration
- [ ] Structure cohérente avec `components/blogs/`

### FR-9: Standardisation des Icônes Iconify
**Description**: Standardiser l'utilisation des icônes en utilisant UNIQUEMENT la collection Heroicons comme recommandé dans la documentation Nuxt UI. Aucune exception autorisée.

**Acceptance Criteria**:
- [ ] Audit complet de toutes les icônes utilisées dans le projet
- [ ] Choix de Heroicons comme collection UNIQUE (déjà majoritairement utilisée)
- [ ] Installation de `@iconify-json/heroicons` comme recommandé dans la documentation
- [ ] Configuration dans `nuxt.config.ts` pour servir les icônes localement
- [ ] Remplacement de TOUTES les icônes non-Heroicons (y compris Simple Icons) par des équivalents Heroicons
- [ ] Suppression de toute dépendance à d'autres collections d'icônes
- [ ] Documentation complète de la standardisation et guide d'utilisation
- [ ] Validation que toutes les icônes fonctionnent correctement après standardisation

### FR-10: Documentation
**Description**: Documenter les patterns et l'utilisation.

**Acceptance Criteria**:
- [ ] Documentation JSDoc complète
- [ ] Guide d'utilisation des composables
- [ ] Exemples de code
- [ ] Patterns documentés

## Non-Functional Requirements

### NFR-1: Rétrocompatibilité
- L'API publique des composables existants doit rester identique
- Pas de breaking changes pour les composants utilisant ces composables
- Migration transparente

### NFR-2: Performance
- Réduction de 20% minimum du temps de chargement
- Réduction des requêtes redondantes
- Cache efficace

### NFR-3: Maintenabilité
- Code DRY (Don't Repeat Yourself)
- Patterns réutilisables
- Tests unitaires (si applicable)

### NFR-4: Type Safety
- Types stricts TypeScript
- Validation runtime avec Zod
- Pas de `any` non documenté

## Technical Considerations

### Architecture Proposée

**Structure des fichiers**:
```
app/
├── composables/
│   ├── useContentCollection.ts  # Composable générique de base
│   ├── useBlog.ts               # Refactorisé, utilise useContentCollection
│   ├── useEvents.ts             # Refactorisé, utilise useContentCollection
│   └── content/
│       ├── types.ts             # Types partagés
│       └── utils.ts             # Utilitaires partagés
└── components/
    ├── blogs/                   # Composants blog (existant)
    │   ├── BlogCard.vue
    │   ├── BlogFilters.vue
    │   ├── BlogPost.vue
    │   └── BlogSearch.vue
    └── events/                  # Composants events (nouveau)
        ├── EventCalendar.vue
        └── EventCard.vue
```

**Composable générique** (`useContentCollection.ts`):
```typescript
export function useContentCollection<T extends ContentItem>(
  collection: string,
  options?: ContentCollectionOptions
) {
  // Méthodes génériques pour toutes les collections
  const getAll = async (): Promise<T[]>
  const getBySlug = async (slug: string): Promise<T | null>
  const getByField = async (field: string, value: any): Promise<T[]>
  // ...
}
```

**Refactorisation**:
- `useBlog` et `useEvents` deviennent des wrappers autour de `useContentCollection`
- Logiques métier spécifiques conservées
- API publique inchangée

### Optimisations

1. **Cache**:
   - Utiliser `useState` de Nuxt pour le cache
   - Invalidation basée sur les routes
   - Cache par collection

2. **Requêtes**:
   - Batch des requêtes similaires
   - Lazy loading où approprié
   - Optimisation des filtres

3. **Types**:
   - Génération automatique depuis Zod schemas
   - Types stricts partout
   - Validation runtime

## Design Guidelines

- Code DRY et réutilisable
- Types stricts TypeScript
- Gestion d'erreurs gracieuse
- Performance optimisée
- Documentation complète

## Out of Scope (v1.0)

- Tests unitaires complets (peut être ajouté plus tard)
- Migration vers Nuxt Content v4 (si disponible)
- Système de cache avancé avec TTL
- Monitoring des performances

## Dependencies

- Nuxt Content v3 (déjà installé)
- Zod (déjà installé)
- TypeScript (déjà configuré)

## Open Questions

- [ ] Faut-il implémenter un système de cache avec TTL ?
- [ ] Doit-on ajouter des tests unitaires maintenant ?
- [ ] Faut-il créer un composable pour les requêtes complexes ?

## Implementation Plan

1. **Étape 1**: Réorganiser les composants events
   - Créer `app/components/events/`
   - Déplacer `EventCalendar.vue` et `EventCard.vue`
   - Mettre à jour les imports dans toutes les pages

2. **Étape 2**: Créer le composable générique `useContentCollection`

3. **Étape 3**: Refactoriser `useBlog` pour utiliser le composable générique

4. **Étape 4**: Refactoriser `useEvents` pour utiliser le composable générique

5. **Étape 5**: Améliorer les types et schémas

6. **Étape 6**: Implémenter le cache

7. **Étape 7**: Améliorer la gestion d'erreurs

8. **Étape 8**: Documenter les patterns

9. **Étape 9**: Standardiser les icônes Iconify
   - Audit des icônes utilisées
   - Installation et configuration de Heroicons
   - Remplacement des icônes non-standard
   - Documentation de la standardisation

10. **Étape 10**: Tests et validation

## Success Criteria

- [ ] Code réduit de 30% minimum
- [ ] Performance améliorée de 20% minimum
- [ ] Types stricts partout
- [ ] Gestion d'erreurs standardisée
- [ ] Documentation complète
- [ ] Rétrocompatibilité maintenue
- [ ] Pas de régression fonctionnelle

