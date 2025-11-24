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

### Ajouté (Phase 2 - Blog - En cours)

#### Configuration
- Module `@nuxt/content` (v3.8.2) installé et configuré
- Module `nuxt-studio@alpha` (v1.0.0-alpha.1) installé et configuré
- Configuration Nuxt Content avec connecteur SQLite natif (`sqliteConnector: 'native'`)
- Fichier `content.config.ts` avec collection `blog`
- Structure de dossiers `content/blog/` et `public/blog/images/` créée

#### Types
- `app/types/blog.ts`: Interface `BlogPost` avec tous les champs nécessaires
- Constantes `BLOG_CATEGORIES` et type `BlogCategory` définis

#### Composables
- `app/composables/useBlog.ts`: Composable pour gérer les articles de blog
  - `getAllPosts()`: Récupérer tous les articles publiés triés par date
  - `getPostBySlug(slug)`: Récupérer un article par slug
  - `getPostsByCategory(category)`: Filtrer par catégorie
  - `getPostsByTag(tag)`: Filtrer par tag
  - `searchPosts(query)`: Rechercher dans titre, description et tags
  - `getRelatedPosts(post, limit)`: Articles similaires (priorité: catégorie > tags > récents)
  - `getAllTags()`: Récupérer tous les tags uniques (bonus)
  - `getPostsCountByCategory()`: Compter les articles par catégorie (bonus)

#### Composants Blog
- `app/components/blogs/BlogCard.vue`: Carte d'article pour la liste
  - Image de couverture avec NuxtImg (AVIF, lazy loading)
  - Badge catégorie avec couleurs sémantiques Nuxt UI
  - Date formatée en français, tags, auteur
  - Hover effects et transitions fluides
- `app/components/blogs/BlogPost.vue`: Affichage d'un article complet
  - Image de couverture responsive
  - Métadonnées complètes (date, auteur, catégorie, tags)
  - Contenu avec `<ContentRenderer>` de Nuxt Content
  - Styles prose personnalisés pour Markdown
  - Boutons de partage social (Facebook, Twitter, LinkedIn)
  - Bouton copier le lien avec toast de confirmation
  - Articles similaires en bas (grille responsive)
  - Navigation retour vers liste
- `app/components/blogs/BlogFilters.vue`: Filtres par catégorie et tags
  - Filtres par catégorie avec boutons (état actif visible)
  - Filtres par tags avec badges cliquables
  - Compteur d'articles par catégorie
  - Bouton réinitialiser les filtres
  - Émission d'événements pour communication avec parent
- `app/components/blogs/BlogSearch.vue`: Barre de recherche d'articles
  - Input de recherche avec debounce configurable (défaut 300ms)
  - Résultats en temps réel (dropdown avec 5 résultats max)
  - État de chargement et message "Aucun résultat"
  - Émission d'événements (`search`, `result-select`, `clear`)

#### Modifié
- `nuxt.config.ts`: Ajout des modules `@nuxt/content` et `nuxt-studio`
- `nuxt.config.ts`: Configuration Nuxt Content avec options highlight et markdown
- `nuxt.config.ts`: Configuration Nuxt Studio avec route `/_studio` et repository GitHub

#### Corrigé
- Résolution du problème `better-sqlite3` en utilisant le connecteur SQLite natif de Node.js
- Déclaration de type temporaire pour `queryContent` dans `useBlog.ts` (types générés automatiquement par Nuxt)
- Import explicite de `useBlog` dans `BlogSearch.vue` pour résoudre l'erreur TypeScript
- Vérification de `categoryCounts` dans `BlogFilters.vue` pour éviter les erreurs TypeScript
- Correction de la couleur du badge dans `BlogFilters.vue` (remplacement de `'white'` par `'neutral'`)

### Planifié pour v1.1.0

- Tests complets (fonctionnels, accessibilité, performance)
- Déploiement sur Vercel
- Intégration service email pour formulaire de contact

### Planifié pour v2.0.0 (En cours)

- ✅ Système de blog avec Nuxt Content (Phase 1 & 2 complétées)
- ✅ Composants blog (Phase 3 complétée - 4 composants créés)
- ⏳ Pages blog (Phase 4 - En cours)
- ⏳ Contenu initial (Phase 5)
- ⏳ SEO et optimisations (Phase 6)
- ⏳ Administration avec Nuxt Studio (Phase 7)
- ⏳ Migration des événements vers Nuxt Content (Phase future)

### Ajouté (Restructuration Content - En cours)

#### Phase 0: Réorganisation des Composants Events ✅
- Réorganisation de la structure des composants events
- Création du dossier `app/components/events/`
- Déplacement de `EventCalendar.vue` et `EventCard.vue` vers `components/events/`
- Mise à jour des imports dans toutes les pages utilisant ces composants
- Structure cohérente avec `components/blogs/`

#### Phase 1: Analyse et Préparation ✅
- Analyse complète de `useBlog.ts` (8 fonctions, 317 lignes)
- Analyse complète de `useEvents.ts` (4 fonctions, 141 lignes)
- Identification de ~150 lignes de code dupliqué (33% du code total)
- Documentation des patterns dans `analysis-useBlog.md` et `analysis-useEvents.md`
- Analyse comparative des duplications dans `duplications-analysis.md`
- Définition de l'API du composable générique dans `api-useContentCollection.md`

#### Phase 2: Création du Composable Générique ✅
- **Nouveau composable**: `app/composables/useContentCollection.ts`
  - Composable générique réutilisable pour toutes les collections Nuxt Content
  - Méthode `getAll()` avec support filtres, tri et cache
  - Méthode `getBySlug()` avec normalisation et fallback
  - Méthode `getByField()` avec opérateurs avancés (=, LIKE, >, <, etc.)
  - Méthode `invalidateCache()` pour invalidation du cache
  - Méthode `getStats()` pour statistiques de la collection
  - Système de cache intégré avec classe `ContentCache` et TTL
  - Gestion d'erreurs centralisée avec logs différenciés dev/production
  - Normalisation automatique des slugs et paths
  - Documentation JSDoc complète avec exemples

#### Types et Interfaces
- `ContentItem`: Interface de base pour tous les éléments de contenu
- `ContentCollectionOptions`: Options de configuration du composable
- `GetAllOptions`, `GetBySlugOptions`, `GetByFieldOptions`: Options pour chaque méthode
- `Filter`, `CollectionStats`: Types utilitaires

#### Modifié
- `app/components/events/EventCalendar.vue`: Import explicite de `EventCard`
- `app/pages/index.vue`: Import explicite de `EventCard`
- `app/pages/events/index.vue`: Import explicite de `EventCard`
- `app/pages/calendar.vue`: Import explicite de `EventCalendar`

#### Phase 3: Refactorisation de useBlog ✅
- **Refactorisation complète** de `app/composables/useBlog.ts`
  - Toutes les 8 fonctions utilisent maintenant `useContentCollection`
  - Code réduit de ~40% (de 317 lignes à 191 lignes)
  - Suppression de ~50 lignes de logs de debug excessifs
  - Cache intégré pour toutes les requêtes (amélioration performance)
  - Gestion d'erreurs centralisée et améliorée

- **Fonctions refactorisées**:
  - `getAllPosts()` : Réduction ~70% grâce à `blogCollection.getAll()`
  - `getPostBySlug()` : Réduction ~85% grâce à `blogCollection.getBySlug()` avec fallback
  - `getPostsByCategory()` : Réduction ~80% grâce à `blogCollection.getByField()`
  - `getPostsByTag()` : Réduction ~80% grâce à `blogCollection.getByField()` avec opérateur LIKE
  - `searchPosts()` : Simplifié avec cache intégré
  - `getRelatedPosts()` : Simplifié avec cache intégré, logique métier conservée
  - `getAllTags()` : Utilise cache de `getAllPosts()`
  - `getPostsCountByCategory()` : Utilise cache de `getAllPosts()`

- **Rétrocompatibilité**: API publique identique, aucun breaking change

#### Modifié
- `app/composables/useBlog.ts`: Refactorisation complète pour utiliser `useContentCollection`
  - Import de `useContentCollection` ajouté
  - Instance de collection créée avec options spécifiques (pathPrefix, normalizePath, cache)
  - Toutes les fonctions simplifiées et optimisées
  - Suppression des déclarations TypeScript dupliquées (`queryCollection`)

#### Phase 4: Refactorisation de useEvents ✅
- **Refactorisation complète** de `app/composables/useEvents.ts`
  - Toutes les 4 fonctions utilisent maintenant `useContentCollection`
  - Code réduit de ~12% (de 141 lignes à 124 lignes)
  - Suppression des appels directs à `queryCollection`
  - Cache intégré pour toutes les requêtes (amélioration performance)
  - Gestion d'erreurs centralisée et améliorée

- **Fonctions refactorisées**:
  - `getAllEvents()` : Utilise `eventsCollection.getAll()` avec cache et filtres
  - `getEventBySlug()` : Utilise `eventsCollection.getBySlug()` avec fallback et normalisation
  - `getUpcomingEvents()` : Utilise `getAllEvents()` puis filtre avec `isEventPast()` (logique métier conservée)
  - `getPastEvents()` : Utilise `getAllEvents()` puis filtre avec `isEventPast()` (logique métier conservée)

- **Logique métier conservée**:
  - `isEventPast()` conservée telle quelle (gestion événements multi-jours, heures de fin)
  - Computed refs conservés (`upcomingEvents`, `pastEvents`, `allEvents`)
  - Chargement automatique au montage conservé

- **Rétrocompatibilité**: API publique identique, aucun breaking change

#### Modifié
- `app/composables/useEvents.ts`: Refactorisation complète pour utiliser `useContentCollection`
  - Import de `useContentCollection` ajouté
  - Instance de collection créée avec options spécifiques (pathPrefix, normalizePath, cache)
  - Toutes les fonctions simplifiées et optimisées
  - Suppression des déclarations TypeScript dupliquées (`queryCollection`)
  - Suppression des blocs try/catch redondants (gestion d'erreurs centralisée)

#### Corrigé
- Correction de l'utilisation de `process.env` remplacé par `import.meta.env.DEV` pour compatibilité Nuxt 3

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

