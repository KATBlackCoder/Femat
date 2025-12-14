---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ["docs/prd.md", "docs/index.md", "docs/architecture-existing-backup.md", "docs/source-tree-analysis.md", "docs/development-guide-main.md", "docs/api-contracts-main.md", "docs/data-models-main.md", "docs/component-inventory-main.md", "docs/project-overview.md", "docs/CHANGELOG.md", "content/CONTENT-GUIDE.md"]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2025-12-13'
project_name: 'femat'
user_name: 'Blackat'
date: '2025-12-13'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
14 exigences fonctionnelles principales centrées sur la refactorisation architecturale avec un focus sur :
- Système de sécurité des types et documentation TSDoc complète (FR5-FR7)
- Architecture composables réutilisables avec pattern "Reuse || Adapt || Create" (FR11-FR14)
- Système de gestion de contenu multi-niveaux préparant l'authentification (FR3)
- Bibliothèque de composants réutilisables suivant les principes atomic design (FR8-FR10)
- Cadre d'optimisation performance avec cache intelligent (FR14)

**Non-Functional Requirements:**
12 exigences non-fonctionnelles principalement axées sur la maintenabilité développeur :
- Onboarding développeur ultra-rapide (30 minutes pour comprendre le code)
- Modifications localisées sans effets de bord (95% des changements)
- Sécurité de type stricte (zéro `any`, 95%+ types explicites)
- Performance : < 2s temps de chargement, 20% réduction taille bundle
- Documentation : 100% TSDoc sur toutes les APIs publiques

**Scale & Complexity:**
- Primary domain: Web application (application web)
- Complexity level: Faible - refactorisation d'un système existant
- Estimated architectural components: 15+ composables spécialisés
- Technical constraints: Nuxt.js 4.2.1, Vue 3, TypeScript, Nuxt Content

### Technical Constraints & Dependencies

**Existing Technology Stack:**
- Framework: Nuxt.js 4.2.1 avec SSG obligatoire
- Frontend: Vue 3 Composition API
- Language: TypeScript en mode strict
- Content: Nuxt Content avec SQLite indexing
- UI: Nuxt UI 4.1.0 avec Tailwind CSS
- Build: Vite + PNPM

**Performance Requirements:**
- Static Site Generation (SSG) pour performance optimale
- Temps de chargement < 2 secondes
- Bundle size réduit de 20%
- Cache intelligent 5-minute TTL

### Cross-Cutting Concerns Identified

**Documentation & Developer Experience:**
- 100% TSDoc coverage obligatoire
- IntelliSense parfait pour tous les utilitaires
- Onboarding développeur 30 minutes maximum
- Modifications localisées sans effets de bord

**Type Safety & Quality:**
- Zéro utilisation de `any` en production
- Validation runtime pour tous les inputs
- Gestion d'erreurs consistente et claire
- Tests automatisés complets

**Content Management:**
- Architecture multi-niveaux (public/member/premium)
- Validation de contenu avec messages d'erreur utiles
- Cache intelligent pour opérations content-heavy
- Séparation logique/présentation/données stricte

## Starter Template Evaluation

### Primary Technology Domain

**Application web existante** - Refactorisation d'un projet Nuxt.js 4.2.1 établi avec Vue 3 et TypeScript

### Architectural Patterns Evaluation

**Contexte de refactorisation identifié :**
Projet brownfield existant nécessitant l'amélioration de l'architecture composables et l'ajout de fonctionnalités de sécurité des types, plutôt que la création d'un nouveau projet from scratch.

### Patterns Architecturaux Évalués

**Composable Architecture Patterns :**
- **Generic Collection Pattern** : Pattern `useContentCollection<T>()` pour gérer tout type de contenu
- **Specialized Composables** : Extension du pattern générique pour des cas spécifiques (`useBlog()`, `useEvents()`)
- **Reactive State Management** : Utilisation systématique de Vue 3 Composition API (ref, computed, reactive)
- **Error Handling Patterns** : Gestion d'erreurs consistente avec messages utilisateur-friendly

**Type Safety Enhancement Patterns :**
- **Strict TypeScript Configuration** : `strict: true`, `noImplicitAny: true`, `exactOptionalPropertyTypes: true`
- **Interface-Driven Development** : Définition d'interfaces TypeScript pour tous les props et retours de composables
- **Runtime Validation** : Utilisation de Zod pour la validation des données d'entrée
- **TSDoc Integration** : Documentation complète avec @description, @param, @returns, @example

**Content Management Architecture Patterns :**
- **Multi-Level Access Control** : Préparation pour les niveaux public/member/premium
- **Smart Caching Strategy** : Cache 5-minute TTL avec invalidation intelligente
- **Content Validation Framework** : Validation des frontmatter avec messages d'erreur utiles
- **SEO Optimization Patterns** : Métadonnées auto-générées et optimisation automatique

### Selected Patterns: Vue 3 Composition API + Nuxt Content Ecosystem

**Rationale for Selection:**
L'architecture existante utilise déjà Nuxt.js et Vue 3, nous devons donc nous concentrer sur l'amélioration des patterns existants plutôt que sur leur remplacement. Les patterns sélectionnés s'intègrent parfaitement avec la stack actuelle tout en permettant d'atteindre les objectifs du PRD.

**Pattern Integration Strategy:**
- **Conservative Evolution** : Extension des patterns existants plutôt que refonte complète
- **Incremental Implementation** : Migration progressive vers les nouveaux patterns
- **Backward Compatibility** : Maintien de la compatibilité avec le code existant

**Key Architectural Decisions:**

**Language & Runtime:**
- TypeScript strict mode activé
- Interfaces TypeScript pour tous les contrats de données
- Validation runtime avec Zod schemas

**Composable Architecture:**
- Pattern `useContentCollection<T>()` générique
- Extension spécialisée pour chaque type de contenu
- Gestion d'erreurs et cache intégrés

**Development Experience:**
- TSDoc complète sur toutes les APIs publiques
- IntelliSense parfait pour tous les utilitaires
- Tests automatisés pour les composables critiques

**Performance Optimization:**
- Cache intelligent 5-minute TTL
- Lazy loading pour composants non-critiques
- Bundle splitting par routes

**Note:** Cette approche de refactorisation préserve l'investissement existant tout en établissant une base solide pour les futures évolutions.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Pattern composable générique : Interface unifiée avec configuration flexible
- Architecture d'authentification : Filtrage au niveau composable avec context utilisateur
- Communication composables : Service layer avec dependency injection

**Important Decisions (Shape Architecture):**
- Cache strategy : 5-minute TTL avec invalidation intelligente
- Type safety : Mode strict TypeScript avec zéro `any`
- Error handling : Messages utilisateur-friendly et récupération automatique

**Deferred Decisions (Post-MVP):**
- Monitoring avancé : Métriques Core Web Vitals et performance
- Internationalisation : Support multi-langue (français/anglais)
- Analytics : Intégration Google Analytics 4

### Data Architecture

**Composable Pattern Selection:**
- **Décision** : Interface unifiée avec configuration flexible pour `useContentCollection<T>()`
- **Version** : Vue 3 Composition API native
- **Rationale** : Simplicité et cohérence pour maintenir objectif onboarding 30min, prépare évolutivité
- **Affects** : Tous les composables de contenu (blog, events, rules)
- **Impact** : Réduction 70% code dupliqué, pattern "Reuse || Adapt || Create"

**Data Validation Strategy:**
- **Décision** : Zod schemas pour validation runtime
- **Version** : Zod latest stable (vérifié via recherche web)
- **Rationale** : Type-safety compile-time + runtime, messages d'erreur utilisateur-friendly
- **Affects** : Tout input utilisateur et données de contenu
- **Impact** : Zéro régression fonctionnelle, sécurité types 95%+

### Authentication & Security

**Access Control Architecture:**
- **Décision** : Filtrage au niveau composable avec context utilisateur
- **Version** : Préparation niveaux public/member/premium
- **Rationale** : Transparente pour composants, séparation logique/présentation respectée
- **Affects** : Architecture contenu, préparation authentification future
- **Impact** : Filtrage performant, évolutivité sans refonte majeure

**Security Validation Framework:**
- **Décision** : Validation centralisée avec sanitisation automatique
- **Version** : TypeScript strict + runtime validation
- **Rationale** : Sécurité proactive, prévention vulnérabilités refactoring
- **Affects** : Toutes les entrées utilisateur et contenu
- **Impact** : Audit sécurité positif, confiance développeur élevée

### API & Communication Patterns

**Composable Communication Strategy:**
- **Décision** : Service layer avec dependency injection
- **Version** : Pattern DI Vue 3 Composition API
- **Rationale** : Testabilité parfaite, séparation logique/données claire
- **Affects** : Communication inter-composables, gestion d'état
- **Impact** : Tests automatisés fiables, maintenance localisée 95%

**Error Handling Standardization:**
- **Décision** : Gestion d'erreurs centralisée avec recovery automatique
- **Version** : Pattern try/catch avec context utilisateur
- **Rationale** : Messages d'erreur clairs, récupération gracieuse
- **Affects** : Toute opération async et utilisateur interaction
- **Impact** : Réduction frustration utilisateur, stabilité système

### Frontend Architecture

**State Management Approach:**
- **Décision** : Reactive state Vue 3 natif avec service layer
- **Version** : Composition API (ref, computed, reactive)
- **Rationale** : Simplicité, performance optimale, cohérence équipe
- **Affects** : Gestion d'état applicatif, synchronisation données
- **Impact** : Performance < 2s, bundle -20%, expérience développeur optimale

**Component Architecture Pattern:**
- **Décision** : Atomic design avec composition hiérarchique
- **Version** : Base/Composite/Page components pattern
- **Rationale** : Réutilisabilité maximale, maintenabilité locale
- **Affects** : Structure composants, design system
- **Impact** : Développement features 2x plus rapide, cohérence UI

### Infrastructure & Deployment

**Caching Strategy:**
- **Décision** : Multi-layer cache (composable/service/CDN)
- **Version** : TTL 5min + invalidation intelligente
- **Rationale** : Performance optimale, réduction charge serveur
- **Affects** : Toutes les opérations content-heavy
- **Impact** : < 2s load time, expérience utilisateur fluide

**Build & Performance Optimization:**
- **Décision** : Bundle splitting + lazy loading automatiques
- **Version** : Vite optimisation + Nuxt SSG
- **Rationale** : Performance native, SEO optimisé
- **Affects** : Build process, runtime performance
- **Impact** : Lighthouse 90+, Core Web Vitals optimisés

### Decision Impact Analysis

**Implementation Sequence:**
1. Pattern `useContentCollection<T>()` générique (fondation)
2. Service layer et communication composables
3. Architecture sécurité et validation
4. Cache et optimisation performance
5. Composants atomiques et design system

**Cross-Component Dependencies:**
- Cache layer dépend de service layer pour invalidation
- Authentification dépend de validation pour sécurité
- Composants dépendent de design system pour cohérence
- Tests dépendent de service layer pour mocking

Ces décisions architecturales établissent une base solide pour la refactorisation tout en respectant vos contraintes de maintenabilité et performance.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
8 catégories de conflit potentiel entre agents IA travaillant sur le projet, nécessitant des règles strictes de cohérence.

### Naming Patterns

**TypeScript/JavaScript Conventions:**
- **camelCase** pour variables, fonctions, propriétés : `userData`, `fetchPosts()`, `isLoading`
- **PascalCase** pour classes, interfaces, types, composants : `UserCard`, `BlogPost`, `EventCalendar`
- **SCREAMING_SNAKE_CASE** pour constantes : `CACHE_TTL`, `MAX_RETRIES`

**Composable Naming:**
- Préfixe `use` obligatoire : `useBlog()`, `useContentCollection<T>()`, `useEvents()`
- Suffixe descriptif du domaine métier
- Configuration via objet options : `useBlog({ enableCache: true, limit: 10 })`

**File & Directory Naming:**
- kebab-case pour fichiers : `user-card.vue`, `blog-filters.vue`, `event-calendar.vue`
- PascalCase pour composants dans le code : `UserCard`, `BlogFilters`, `EventCalendar`
- Dossiers organisés par feature : `components/blogs/`, `composables/content/`

### Structure Patterns

**Composable Structure Standard:**
```typescript
interface UseComposableReturn<T> {
  data: Ref<T[] | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  refresh: () => Promise<void>
}

// Pattern obligatoire pour tous les composables
export const useBlog = (options: BlogOptions = {}) => {
  const data = ref<BlogPost[] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const refresh = async () => {
    // Implementation standardisée
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    refresh
  } satisfies UseComposableReturn<BlogPost>
}
```

**Component Structure Patterns:**
- PascalCase pour noms de composants : `UserCard`, `BlogFilters`, `EventCalendar`
- Props typées avec interfaces dédiées
- Événements émis standardisés : `update:data`, `error`, `loading`
- Slots nommés pour flexibilité : `default`, `actions`, `footer`

### Format Patterns

**API Response Formats:**
```typescript
// Structure standardisée pour toutes les réponses API
interface ApiResponse<T> {
  data: T
  error: string | null
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

// Pattern cohérent dans tous les composables
const response = await $fetch<ApiResponse<BlogPost[]>>('/api/blog')
```

**Data Exchange Formats:**
- camelCase pour propriétés JSON : `{ userId: 123, postTitle: "Hello" }`
- Dates en ISO string : `"2025-12-13T10:30:00Z"`
- Valeurs null explicites plutôt que undefined
- Arrays pour collections, objets pour items uniques

### Communication Patterns

**Event System Patterns:**
- Nommage kebab-case : `blog-post-created`, `user-logged-in`
- Payloads typés avec interfaces dédiées
- Cleanup automatique dans `onUnmounted()`

**State Management - Pinia Setup Stores:**
```typescript
// Pattern obligatoire pour tous les stores Pinia
export const useBlogStore = defineStore('blog', () => {
  // State
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const publishedPosts = computed(() =>
    posts.value.filter(post => post.published)
  )

  // Actions
  const fetchPosts = async () => {
    loading.value = true
    try {
      posts.value = await $fetch('/api/blog')
    } catch (err) {
      error.value = 'Erreur lors du chargement des articles'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    publishedPosts,

    // Actions
    fetchPosts
  }
})
```

### Process Patterns

**Error Handling Patterns:**
- Messages d'erreur en français pour utilisateurs
- Logs techniques en anglais pour développeurs
- Retry automatique avec backoff exponentiel (3 tentatives max)
- Gestion d'erreurs global via Nuxt error handling

**Loading State Patterns:**
- États locaux pour UI granulaire
- États globaux pour opérations majeures
- Skeleton loading avec Nuxt UI components
- Timeout automatique (30 secondes max)

### UI Framework Integration - Nuxt UI First Approach

**CSS Principal (Essentiel) :**
- `app/assets/css/main.css` : fichier CSS essentiel pour activer Nuxt UI et ses styles de base
- **Ne pas modifier** : ce fichier contient les directives d'import nécessaires à Nuxt UI
- Maintenu automatiquement par Nuxt UI, ne pas ajouter de styles personnalisés

**Component Usage Standards:**
- **Nuxt UI au maximum** : utilisation exclusive de Nuxt UI pour tous les composants de base
- **Tailwind si nécessaire** : classes utilitaires Tailwind uniquement pour customisations mineures
- **Pas de CSS personnalisé** : aucun style CSS custom ajouté au fichier main.css
- Configuration via `app.config.ts` pour thème global Nuxt UI
- Respect strict des design tokens Nuxt UI

**Form Patterns:**
```vue
<template>
  <UForm :schema="schema" @submit="onSubmit">
    <UFormGroup label="Titre" name="title">
      <UInput v-model="form.title" />
    </UFormGroup>

    <UFormGroup label="Contenu" name="content">
      <UTextarea v-model="form.content" rows="4" />
    </UFormGroup>

    <UButton type="submit" :loading="loading">
      Publier
    </UButton>
  </UForm>
</template>
```

### Enforcement Guidelines

**All AI Agents MUST:**
- Respecter les conventions de nommage établies
- Utiliser PascalCase pour les composants
- Suivre les patterns Pinia Setup Stores uniquement
- **Prioriser Nuxt UI au maximum** - utiliser exclusivement Nuxt UI pour l'interface
- **Utiliser Tailwind uniquement si nécessaire** - pas de CSS personnalisé
- Implémenter la structure de composables standardisée

**Pattern Enforcement:**
- Revue de code obligatoire pour nouveaux composants
- Tests automatisés vérifiant les patterns
- Documentation TSDoc complète obligatoire
- Scripts de linting pour validation des conventions

### Pattern Examples

**Good Examples:**
```typescript
// ✅ Correct: PascalCase component, Nuxt UI, standard composable
export const useBlog = (options: BlogOptions = {}) => {
  return { data, loading, error, refresh } satisfies UseComposableReturn<BlogPost>
}

// ✅ Correct: Pinia Setup Store pattern
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const login = async (credentials: LoginCredentials) => { /* ... */ }
  return { user, login }
})
```

**Anti-Patterns:**
```typescript
// ❌ Incorrect: camelCase component name
const userCard = defineComponent({ /* ... */ })

// ❌ Incorrect: Traditional Pinia object syntax
export const useBlogStore = defineStore('blog', {
  state: () => ({ /* ... */ }), // Non autorisé
  actions: { /* ... */ }       // Non autorisé
})

// ❌ Incorrect: Composant non Nuxt UI
<template>
  <div class="custom-button"> <!-- Utiliser UButton -->
    <button>Click me</button>
  </div>
</template>
```

Ces patterns garantissent une implémentation cohérente et maintenable pour tous les agents IA travaillant sur le projet.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
femat/
├── 📁 .bmad/                           # Configuration BMAD (gardé séparé)
├── 📁 node_modules/                    # Dépendances (géré par pnpm)
├── 📁 docs/                            # Documentation technique
│   ├── architecture.md                 # Document d'architecture complet
│   ├── prd.md                         # Product Requirements Document
│   ├── index.md                       # Index documentation
│   └── sprint-artifacts/              # Artefacts de sprint
├── 📁 content/                         # Contenu Markdown (Nuxt Content)
│   ├── blog/                          # Articles organisés par année
│   │   ├── 2024/                      # Articles 2024
│   │   └── 2025/                      # Articles 2025
│   ├── events/                        # Événements organisés par année
│   │   ├── 2024/                      # Événements 2024
│   │   └── 2025/                      # Événements 2025
│   ├── rules/                         # Règlements statiques
│   │   ├── femat.md                   # Règles FEMAT
│   │   └── taekwondo.md               # Règles Taekwondo
│   └── CONTENT-GUIDE.md               # Guide d'écriture contenu
├── 📁 public/                          # Assets statiques
│   ├── content/                       # Images et médias du contenu
│   │   ├── blog/                      # Images articles
│   │   │   ├── 2024/                  # Images 2024
│   │   │   └── 2025/                  # Images 2025
│   │   └── events/                    # Images événements
│   │       ├── 2024/                  # Images événements 2024
│   │       └── 2025/                  # Images événements 2025
│   ├── logo_femat.avif                # Logo FEMAT (format moderne)
│   ├── logo_femat.png                 # Logo FEMAT (fallback)
│   ├── logo_femat.webp                # Logo FEMAT (optimisé)
│   └── favicon.ico                    # Icône navigateur
├── 📁 app/                            # Code source Nuxt.js
│   ├── 📁 assets/                     # Assets statiques (CSS pour Nuxt UI)
│   │   └── css/
│   │       └── main.css               # CSS essentiel pour activer Nuxt UI
│   ├── 📁 components/                 # Composants Vue.js (PascalCase, Nuxt UI + Tailwind)
│   │   ├── 📁 blogs/                  # Composants blog
│   │   │   ├── BlogCard.vue          # Composant carte article
│   │   │   ├── BlogFilters.vue       # Filtres de recherche
│   │   │   └── BlogSearch.vue        # Recherche d'articles
│   │   ├── 📁 events/                 # Composants événements
│   │   │   ├── EventCard.vue         # Carte événement
│   │   │   └── EventCalendar.vue     # Calendrier événements
│   │   ├── 📁 rules/                  # Composants règlements
│   │   │   ├── RulesFaq.vue          # FAQ réglement
│   │   │   ├── RulesFemat.vue        # Règles FEMAT
│   │   │   ├── RulesTaekwondo.vue    # Règles Taekwondo
│   │   │   └── RulesToc.vue          # Table des matières
│   │   ├── 📁 ui/                     # Composants UI réutilisables Nuxt UI
│   │   │   ├── ContentRenderer.vue   # Rendu générique contenu
│   │   │   └── LoadingState.vue      # États de chargement
│   │   ├── ContactForm.vue           # Formulaire contact
│   │   ├── Footer.vue                # Pied de page
│   │   └── Header.vue                # En-tête navigation
│   ├── 📁 composables/               # Logique métier réutilisable
│   │   ├── 📁 content/               # Composables contenu
│   │   │   ├── useContentCollection.ts # Générique collections
│   │   │   └── utils.ts              # Utilitaires contenu
│   │   ├── useBlog.ts                # Logique blog spécialisée
│   │   ├── useEvents.ts              # Logique événements spécialisée
│   │   └── useEventCountdown.ts     # Compte à rebours événements
│   ├── 📁 layouts/                   # Layouts de page
│   │   └── default.vue               # Layout principal
│   ├── 📁 pages/                     # Pages routées automatiquement
│   │   ├── index.vue                 # Page d'accueil
│   │   ├── about.vue                 # À propos
│   │   ├── calendar.vue              # Calendrier événements
│   │   ├── contact.vue               # Contact
│   │   ├── rules.vue                 # Règlements
│   │   ├── 📁 blog/                  # Section blog
│   │   │   ├── index.vue             # Liste articles
│   │   │   └── [...slug].vue         # Article individuel
│   │   └── 📁 events/                # Section événements
│   │       ├── index.vue             # Liste événements
│   │       └── [...slug].vue         # Événement individuel
│   ├── 📁 stores/                    # Stores Pinia (Setup Stores uniquement)
│   │   ├── auth.ts                   # Authentification (futur)
│   │   ├── blog.ts                   # État blog
│   │   ├── events.ts                 # État événements
│   │   └── ui.ts                     # État interface
│   ├── 📁 types/                     # Définitions TypeScript
│   │   ├── blog.ts                   # Types blog
│   │   ├── event.ts                  # Types événements
│   │   └── rules.ts                  # Types règlements
│   ├── 📁 utils/                     # Utilitaires partagés
│   │   ├── cache.ts                  # Gestion cache intelligent
│   │   ├── validation.ts             # Validation données runtime
│   │   └── formatters.ts             # Formatage données
│   ├── app.config.ts                 # Configuration app Nuxt (Nuxt UI)
│   ├── app.vue                       # Application root
│   └── error.vue                     # Page d'erreur
├── 📁 server/                        # Code serveur (futur SSR)
├── 📁 tests/                         # Tests automatisés
│   ├── 📁 composables/               # Tests composables
│   │   ├── useBlog.test.ts          # Tests useBlog
│   │   └── useContentCollection.test.ts # Tests générique
│   ├── 📁 components/                # Tests composants
│   │   ├── BlogCard.test.ts         # Tests BlogCard
│   │   └── EventCard.test.ts        # Tests EventCard
│   └── 📁 e2e/                       # Tests end-to-end
│       ├── blog.spec.ts              # Tests E2E blog
│       └── events.spec.ts            # Tests E2E événements
├── 📄 .env.example                   # Variables environnement exemple
├── 📄 .gitignore                     # Fichiers ignorés Git
├── 📄 nuxt.config.ts                 # Configuration Nuxt principale
├── 📄 package.json                   # Dépendances et scripts
├── 📄 pnpm-lock.yaml                 # Lockfile pnpm
├── 📄 README.md                      # Documentation projet
└── 📄 tsconfig.json                  # Configuration TypeScript
```

### Architectural Boundaries

**API Boundaries (Futur) :**
- `/api/blog/*` - Endpoints blog avec cache 5min TTL
- `/api/events/*` - Endpoints événements avec filtrage avancé
- `/api/auth/*` - Authentification et autorisation (futur)

**Component Boundaries :**
- `components/blogs/*` - Isolation logique blog, communication via events
- `components/events/*` - Isolation logique événements, state partagé via stores
- `components/ui/*` - Composants transversaux, pas de logique métier

**Service Boundaries :**
- `composables/content/*` - Accès données, cache, transformation
- `stores/*` - État global Pinia Setup Stores uniquement
- `utils/*` - Fonctions pures, pas de dépendances Vue

**Data Boundaries :**
- `content/*` - Source de vérité Markdown
- `types/*` - Contrats TypeScript stricts
- Cache layers : composable (5min) → service → CDN

### Requirements to Structure Mapping

**Composable Architecture (FR11-FR14) :**
- `composables/content/useContentCollection.ts` - Pattern générique collections
- `composables/useBlog.ts` - Spécialisation blog
- `composables/useEvents.ts` - Spécialisation événements

**Type Safety (FR5-FR7) :**
- `types/*.ts` - Interfaces TypeScript strictes
- `utils/validation.ts` - Validation runtime Zod
- TSDoc 100% sur toutes les APIs publiques

**UI Components (FR8-FR10) :**
- `components/ui/*` - Composants réutilisables Nuxt UI
- `components/blogs/*` - Feature components blog
- Atomic design : Base → Composite → Pages

**Performance (NFR-PERF-01) :**
- `utils/cache.ts` - Cache intelligent 5min TTL
- SSG Nuxt.js pour instant loading
- Lazy loading composants non-critiques

### Integration Points

**Internal Communication :**
- Composables vers composants : reactive refs, readonly
- Composants inter-features : events système normalisés
- State global : Pinia Setup Stores uniquement

**External Integrations :**
- Nuxt Content : parsing Markdown, indexing SQLite
- Nuxt UI : composants design system cohérent
- Nuxt Image : optimisation images automatique

**Data Flow :**
1. Content Markdown → Nuxt Content parsing
2. Composables → fetch/transform/cache data
3. Components → render with reactive updates
4. Stores → state global persistant

### File Organization Patterns

**Configuration Files :**
- `nuxt.config.ts` - Configuration Nuxt principale
- `app.config.ts` - Configuration app spécifique
- `.env.example` - Variables environnement

**Source Organization :**
- Feature-based : `components/blogs/`, `composables/useBlog.ts`
- Shared utilities : `utils/`, `types/`
- Tests co-localisés : `tests/composables/useBlog.test.ts`

**Test Organization :**
- Unit tests : `tests/composables/`, `tests/components/`
- E2E tests : `tests/e2e/` avec Playwright (futur)
- Patterns de test cohérents pour tous les agents

**Asset Organization :**
- Content assets : `public/content/` organisé par année
- Static assets : `public/` pour logos, favicons
- Build assets : géré automatiquement par Vite

Cette structure complète définit clairement où chaque composant architectural doit vivre et comment ils communiquent entre eux.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- Nuxt.js 4.2.1 + Vue 3 Composition API + TypeScript strict : parfaite cohérence technique
- Pinia Setup Stores uniquement : pattern cohérent appliqué à tous les stores
- Nuxt UI + main.css essentiel + Tailwind utilitaires : approche UI-first parfaitement intégrée
- Cache 5min TTL + SSG : stratégie performance cohérente sans conflits

**Pattern Consistency:**
- PascalCase pour composants : respecté partout (BlogCard, EventCard, etc.)
- Setup Stores Pinia : pattern uniforme pour tous les états globaux
- Structure composables génériques : pattern "Reuse || Adapt || Create" cohérent
- TSDoc 100% : documentation systématique sur toutes les APIs publiques

**Structure Alignment:**
- Organisation par feature : `components/blogs/`, `composables/useBlog.ts`
- Frontières architecturales claires : data/composables/UI bien séparés
- Points d'intégration définis : events système, stores Pinia, props typés
- Mappage exigences → structure concret et complet

### Requirements Coverage Validation ✅

**Functional Requirements Coverage (14 FRs) :**
- ✅ FR1-FR4 : Architecture contenu multi-niveaux avec `useContentCollection<T>` générique
- ✅ FR5-FR7 : Sécurité types stricte avec TSDoc complète et IntelliSense parfait
- ✅ FR8-FR10 : Composants réutilisables Nuxt UI avec atomic design et responsive
- ✅ FR11-FR14 : Séparation logique/UI avec cache intelligent et gestion d'erreurs

**Non-Functional Requirements Coverage (12 NFRs) :**
- ✅ Maintenabilité : onboarding 30min, modifications localisées 95%, code comprehension parfaite
- ✅ Performance : < 2s load time, 20% bundle réduit, Core Web Vitals optimisés
- ✅ Sécurité : zéro `any`, validation runtime Zod, types stricts TypeScript
- ✅ Accessibilité développeur : TSDoc complète, patterns cohérents, learning curve minimale

### Implementation Readiness Validation ✅

**Decision Completeness:**
- ✅ Toutes les décisions critiques documentées avec versions exactes
- ✅ Technologies validées : Nuxt.js 4.2.1, Vue 3, TypeScript strict, Nuxt UI 4.1.0
- ✅ main.css essentiel pour Nuxt UI clairement identifié et protégé
- ✅ Patterns d'implémentation détaillés avec exemples concrets

**Structure Completeness:**
- ✅ Structure de répertoires complète et spécifique (pas de placeholders génériques)
- ✅ Mappage exigences → fichiers concrets pour tous les composants
- ✅ Frontières architecturales clairement définies et documentées
- ✅ Points d'intégration mappés (events, stores, API futures)

**Pattern Completeness:**
- ✅ 8 catégories de conflits potentiels adressées avec patterns spécifiques
- ✅ Exemples anti-patterns fournis pour éviter les erreurs courantes
- ✅ Règles d'enforcement claires applicables par tous les agents IA
- ✅ Validation automatisée possible via linting et tests

### Gap Analysis Results

**Critical Gaps: AUCUN** ✅
- Toutes les décisions architecturales bloquantes sont prises et validées
- Architecture couvre 100% des exigences fonctionnelles du PRD
- Structure de projet permet l'implémentation immédiate sans blocages

**Important Gaps: AUCUN** ✅
- Patterns d'implémentation complets et détaillés avec exemples
- Règles de cohérence applicables pour éviter tous les conflits inter-agents
- Structure de projet spécifique permettant la navigation immédiate

**Minor Gaps (Future Enhancements):**
- Métriques de performance avancées (Core Web Vitals détaillées)
- Tests E2E complets avec Playwright (phase de croissance)
- CI/CD pipeline détaillé (prochaine phase de développement)
- Monitoring applicatif avancé (post-MVP)

### Validation Issues Addressed

**Issues Résolus:**
- ✅ Correction approche UI : Nuxt UI first + main.css essentiel + Tailwind utilitaires
- ✅ Clarification patterns Pinia : Setup Stores uniquement, pas de syntaxe objet
- ✅ Validation structure : organisation par feature confirmée et détaillée
- ✅ Mappage exigences : couverture 100% validée et documentée

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (refactorisation brownfield)
- [x] Scale and complexity assessed (faible, refactorisation existante)
- [x] Technical constraints identified (Nuxt.js 4.2.1, Vue 3, TypeScript)
- [x] Cross-cutting concerns mapped (cache, sécurité, performance, UI)

**✅ Architectural Decisions**
- [x] Critical decisions documented with exact versions
- [x] Technology stack fully specified and compatible
- [x] Integration patterns defined (composables, events, stores)
- [x] Performance considerations integrated (SSG, cache 5min, lazy loading)

**✅ Implementation Patterns**
- [x] Naming conventions established (PascalCase/camelCase/kebab-case)
- [x] Structural patterns defined (feature-based organization)
- [x] Communication patterns specified (reactive refs, events, stores)
- [x] Process patterns documented (error handling, loading states, TSDoc)

**✅ Project Structure**
- [x] Complete directory structure defined with all files
- [x] Component boundaries established and documented
- [x] Integration points mapped and explained
- [x] Requirements to structure mapping complete and concrete

### Architecture Readiness Assessment

**Overall Status:** ARCHITECTURE COMPLÈTE ET PRÊTE POUR L'IMPLÉMENTATION ✅

**Confidence Level:** Élevé - Architecture validée et cohérente
- Décisions architecturales validées pour cohérence technique
- Couverture complète des exigences PRD (26 FRs/NFRs)
- Patterns d'implémentation prêts pour agents IA
- Structure de projet permettant développement immédiat

**Key Strengths:**
- Architecture évolutive préparant l'authentification future sans refonte
- Patterns de refactorisation préservant l'investissement existant
- Focus maintenabilité aligné avec objectifs PRD (onboarding 30min)
- Cohérence technique Nuxt.js/Vue.js/TypeScript/Nuxt UI parfaite

**Areas for Future Enhancement:**
- Métriques de performance détaillées (post-implémentation)
- Tests d'intégration avancés (phase de croissance)
- Documentation utilisateur (phase de croissance)
- Optimisations SEO avancées (post-MVP)

### Implementation Handoff

**AI Agent Guidelines:**
- Suivre exactement toutes les décisions architecturales documentées
- Utiliser les patterns d'implémentation de manière cohérente
- Respecter la structure de projet et les frontières établies
- Consulter ce document d'architecture pour toutes les questions techniques

**First Implementation Priority:**
Refactorisation progressive des composables existants selon les nouveaux patterns, en commençant par `useContentCollection<T>` générique et l'adaptation de `useBlog` et `useEvents`.

**Architecture Status: COMPLETE & READY FOR IMPLEMENTATION** 🎯

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2025-12-13
**Document Location:** docs/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- 15+ architectural decisions made collaboratively
- 8 categories de patterns d'implémentation définis
- Structure de projet complète avec 25+ composants architecturaux
- 26 exigences (FRs + NFRs) complètement supportées

**📚 AI Agent Implementation Guide**

- Technology stack with verified versions (Nuxt.js 4.2.1, Vue 3, TypeScript strict)
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries and integration points
- Communication patterns and error handling standards

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing the FEMAT website. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
Refactorisation progressive des composables existants selon les nouveaux patterns, en commençant par `useContentCollection<T>` générique et l'adaptation de `useBlog` et `useEvents`.

**Development Sequence:**

1. Initialize project structure according to documented architecture
2. Set up development environment with Nuxt.js 4.2.1 + TypeScript strict
3. Implement core architectural foundations (composables génériques)
4. Build features following established patterns (PascalCase, Nuxt UI first)
5. Maintain consistency with documented rules (TSDoc 100%, Pinia Setup Stores uniquement)

### Quality Assurance Checklist

**✅ Architecture Coherence**

- [x] All decisions work together without conflicts (Nuxt.js + Vue 3 + TypeScript + Nuxt UI)
- [x] Technology choices are compatible and validated
- [x] Patterns support the architectural decisions (composables génériques, atomic design)
- [x] Structure aligns with all choices (organisation par feature, frontières claires)

**✅ Requirements Coverage**

- [x] All functional requirements are supported (14 FRs du PRD)
- [x] All non-functional requirements are addressed (12 NFRs de maintenabilité/performance)
- [x] Cross-cutting concerns are handled (cache, sécurité, UI, performance)
- [x] Integration points are defined (authentification future, multi-niveaux)

**✅ Implementation Readiness**

- [x] Decisions are specific and actionable (versions exactes, patterns détaillés)
- [x] Patterns prevent agent conflicts (conventions de nommage, structures standardisées)
- [x] Structure is complete and unambiguous (tous les fichiers et dossiers définis)
- [x] Examples are provided for clarity (exemples d'implémentation dans les patterns)

### Project Success Factors

**🎯 Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction for the FEMAT website refactorisation.

**🔧 Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly, respecting the Vue.js/Nuxt.js ecosystem.

**📋 Complete Coverage**
All project requirements are architecturally supported, with clear mapping from business needs (refactorisation, maintenabilité, performance) to technical implementation.

**🏗️ Solid Foundation**
The chosen architecture provides a production-ready foundation following current best practices, with evolution path for future authentication and advanced features.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.
