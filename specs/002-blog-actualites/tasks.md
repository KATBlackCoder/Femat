# Implementation Tasks: Blog & Actualités FEMAT

**Feature**: Blog & Actualités FEMAT  
**Branch**: `002-blog-actualites`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27 (Phase 1, 2, 3, 4, 5, 7, 8 complétées - Phase 6: SEO/Optimisations, Phase 9: Tests/Documentation en attente)

## Task Breakdown

### Phase 1: Setup & Configuration

#### Task 1.1: Installation des modules Nuxt Content
**File**: `package.json`  
**Description**: Installer les modules nécessaires pour le blog  
**Dependencies**: None  
**Status**: ✅ Completed

**Commandes**:
```bash
pnpm add @nuxt/content
```

**Détails**:
- ✅ Installer `@nuxt/content` pour gestion de contenu Markdown (v3.8.2)
- ✅ Installer `better-sqlite3` (requis par Nuxt Content, puis remplacé par connecteur natif)
- ⚠️ **Note** : `nuxt-studio@alpha` installé initialement mais supprimé. Nuxt Studio reporté pour version future.
- ✅ Vérifier que les dépendances sont bien ajoutées dans `package.json`

#### Task 1.2: Configuration Nuxt Content
**File**: `nuxt.config.ts`, `content.config.ts`  
**Description**: Configurer Nuxt Content dans la configuration Nuxt  
**Dependencies**: Task 1.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Ajouter `@nuxt/content` dans `modules`
- ✅ Configurer `content` avec options highlight et markdown dans `nuxt.config.ts`
- ✅ Configurer `content.experimental.sqliteConnector: 'native'` (utilise SQLite natif Node.js v22.5.0+)
- ✅ Créer `content.config.ts` avec collection `blog`
- ⏳ **À faire Phase 7** : Mettre à jour configuration pour structure par années

#### Task 1.3: Créer structure de dossiers pour le contenu
**File**: `content/blog/`, `public/blog/images/`  
**Description**: Créer les dossiers nécessaires pour les articles et images  
**Dependencies**: Task 1.2  
**Status**: ✅ Completed (structure de base créée)

**Détails**:
- ✅ Créer dossier `content/blog/` pour les articles Markdown
- ✅ Créer dossier `public/blog/images/` pour les images d'articles
- ✅ Ajouter fichiers `.gitkeep` pour versionner les dossiers vides
- ⏳ **À faire Phase 7** : Réorganiser en structure par années (`blog/2024/`, `blog/2025/`, etc.)

#### Task 1.4: Créer types TypeScript pour les articles
**File**: `app/types/blog.ts`  
**Description**: Définir l'interface TypeScript pour les articles de blog  
**Dependencies**: Task 1.2  
**Status**: ✅ Completed

**Détails**:
- ✅ Créer interface `BlogPost` avec tous les champs nécessaires
- ✅ Inclure les champs Nuxt Content (`_path`, `_body`, `_id`, `_type`, `createdAt`, `updatedAt`)
- ✅ Définir constantes `BLOG_CATEGORIES` et type `BlogCategory`
- ✅ Exporter l'interface pour utilisation dans les composants

### Phase 2: Composable et Utilitaires

#### Task 2.1: Créer composable useBlog
**File**: `app/composables/useBlog.ts`  
**Description**: Créer le composable pour gérer les requêtes et filtres de blog  
**Dependencies**: Task 1.4  
**Status**: ✅ Completed

**Détails**:
- ✅ Fonction `getAllPosts()`: Récupérer tous les articles publiés triés par date
- ✅ Fonction `getPostBySlug(slug)`: Récupérer un article par slug
- ✅ Fonction `getPostsByCategory(category)`: Filtrer par catégorie
- ✅ Fonction `getPostsByTag(tag)`: Filtrer par tag
- ✅ Fonction `searchPosts(query)`: Rechercher dans titre, description et tags
- ✅ Fonction `getRelatedPosts(post, limit)`: Articles similaires par catégorie/tags (priorité: catégorie > tags > récents)
- ✅ Fonction `getAllTags()`: Récupérer tous les tags uniques (bonus)
- ✅ Fonction `getPostsCountByCategory()`: Compter les articles par catégorie (bonus)
- ✅ Utiliser `queryContent()` de Nuxt Content avec déclaration de type temporaire
- ✅ Utiliser `useAsyncData()` pour cache et performance
- ✅ Gérer les erreurs avec try/catch
- ✅ Gérer les cas limites (query vide, articles non trouvés, etc.)

### Phase 3: Composants

#### Task 3.1: Créer composant BlogCard
**File**: `app/components/blogs/BlogCard.vue`  
**Description**: Créer la carte d'article pour la liste des articles  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Image de couverture avec `NuxtImg` (lazy loading, AVIF avec fallback)
- ✅ Titre avec lien vers article (`NuxtLink`)
- ✅ Date formatée en français avec `<time>`
- ✅ Badge catégorie avec `UBadge` (couleurs selon catégorie)
- ✅ Description/extrait (limité à ~150 caractères avec fonction `truncateText`)
- ✅ Tags affichés avec badges (limité à 3 + compteur)
- ✅ Design responsive avec Nuxt UI (`UCard`)
- ✅ Hover effects et transitions (group-hover, scale)
- ✅ Auteur affiché dans le footer
- ✅ Bouton "Lire la suite" avec icône

#### Task 3.2: Créer composant BlogPost
**File**: `app/components/blogs/BlogPost.vue`  
**Description**: Créer le composant pour afficher un article complet  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Image de couverture avec `NuxtImg` (AVIF avec fallback)
- ✅ Métadonnées: date, auteur, catégorie, tags avec badges
- ✅ Contenu avec `<ContentRenderer>` de Nuxt Content
- ✅ Styles prose personnalisés pour le contenu Markdown
- ✅ Boutons de partage social (Facebook, Twitter, LinkedIn)
- ✅ Bouton copier le lien avec toast de confirmation
- ✅ Articles similaires en bas avec `BlogCard` (grille responsive)
- ✅ Navigation retour vers liste avec bouton
- ✅ Design avec Nuxt UI (`UCard` pour partage)
- ✅ Gestion des URLs de partage dynamiques

#### Task 3.3: Créer composant BlogFilters
**File**: `app/components/blogs/BlogFilters.vue`  
**Description**: Créer les filtres par catégorie et tags  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Boutons filtres par catégorie avec `UButton` (variant solid/outline selon état actif)
- ✅ Liste de tags cliquables avec `UBadge`
- ✅ Compteur d'articles par catégorie (badge avec nombre)
- ✅ État actif visible (couleur différente selon catégorie)
- ✅ Bouton réinitialiser les filtres
- ✅ Design responsive avec Nuxt UI
- ✅ Émission d'événements (`category-change`, `tag-change`, `reset`)
- ✅ Méthodes exposées avec `defineExpose` pour utilisation externe

#### Task 3.4: Créer composant BlogSearch
**File**: `app/components/blogs/BlogSearch.vue`  
**Description**: Créer la barre de recherche d'articles  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Input de recherche avec `UInput` (taille lg, icône dynamique)
- ✅ Debounce pour performance (configurable, défaut 300ms)
- ✅ Icône de recherche/effacement avec `UIcon`
- ✅ Résultats en temps réel (dropdown avec 5 résultats max)
- ✅ État de chargement (`isSearching`)
- ✅ Message "Aucun résultat" si recherche vide
- ✅ Design avec Nuxt UI (dropdown avec z-index élevé)
- ✅ Émission d'événements (`search`, `result-select`, `clear`)
- ✅ Nettoyage du timer à la destruction du composant

### Phase 4: Pages

#### Task 4.1: Créer page liste des articles
**File**: `app/pages/blog/index.vue`  
**Description**: Créer la page principale listant tous les articles  
**Dependencies**: Phase 3  
**Status**: ✅ Completed

**Détails**:
- ✅ Hero section avec `UPageHero` (titre et description)
- ✅ Section avec `UPageSection` pour contenu
- ✅ Intégrer `BlogSearch` et `BlogFilters` (sidebar sticky)
- ✅ Grille d'articles avec `BlogCard` (responsive: 1 col mobile, 2 cols desktop)
- ✅ Pagination avec `UPagination` (12 articles par page)
- ✅ Gestion des états: loading, empty, error
- ✅ Filtres par catégorie et tags fonctionnels
- ✅ Recherche textuelle avec debounce
- ✅ SEO: meta tags dynamiques avec `useSeoMeta()`
- ✅ Design cohérent avec Nuxt UI

#### Task 4.2: Créer page article individuel
**File**: `app/pages/blog/[...slug].vue`  
**Description**: Créer la page pour afficher un article individuel  
**Dependencies**: Task 3.2  
**Status**: ✅ Completed

**Détails**:
- ✅ Catch-all route `[...slug].vue` pour URLs dynamiques
- ✅ Utiliser `getPostBySlug()` du composable pour récupérer article
- ✅ Utiliser `useAsyncData()` pour chargement optimisé
- ✅ Gestion erreur 404 si article non trouvé (avec `createError`)
- ✅ Afficher `BlogPost` avec métadonnées et contenu
- ✅ Articles similaires en bas de page (3 articles max)
- ✅ Navigation retour vers liste
- ✅ SEO: meta tags dynamiques (title, description, og:image, article tags)
- ✅ Design avec Nuxt UI (`UPageHero`, `UPageSection`)
- ✅ États de chargement et erreur gérés

### Phase 5: Contenu Initial

#### Task 5.1: Créer articles d'exemple
**File**: `content/blog/*.md`  
**Description**: Créer 10 articles d'exemple pour tester le blog  
**Dependencies**: Task 4.2  
**Status**: ✅ Completed

**Détails**:
- ✅ 10 articles créés avec formats variés
- ✅ Article de bienvenue (catégorie: actualite)
- ✅ Articles sur événements (catégorie: evenement) - 3 articles
- ✅ Articles sur compétitions (catégorie: competition) - 2 articles
- ✅ Articles résultats (catégorie: resultat) - 2 articles
- ✅ Articles actualités (catégorie: actualite) - 3 articles
- ✅ Format Markdown avec frontmatter YAML correct
- ✅ Dates variées (2024-2025) pour tester le tri
- ✅ Tags variés pour tester les filtres
- ✅ Certains avec images, d'autres sans
- ⚠️ Images de couverture à ajouter dans `/public/blog/images/` (chemins référencés)

### Phase 6: SEO et Optimisations

#### Task 6.1: Optimiser SEO des pages blog
**File**: `app/pages/blog/*.vue`  
**Description**: Ajouter meta tags dynamiques et optimisations SEO  
**Dependencies**: Phase 4  
**Status**: ⏳ Pending

**Détails**:
- Meta tags dynamiques avec `useSeoMeta()` sur chaque page
- Open Graph tags (og:title, og:description, og:image)
- Twitter Cards
- URLs propres et descriptives
- Sitemap automatique avec Nuxt Content (vérifier génération)

#### Task 6.2: Optimiser images et performance
**File**: `app/components/blogs/BlogCard.vue`, `app/components/blogs/BlogPost.vue`  
**Description**: Optimiser les images et performance du blog  
**Dependencies**: Phase 3  
**Status**: ⏳ Pending

**Détails**:
- Utiliser `NuxtImg` pour toutes les images
- Lazy loading pour images non critiques
- Formats modernes (AVIF, WebP) avec fallback
- Pagination pour limiter articles chargés
- Code splitting automatique (vérifier)

### Phase 7: Réorganisation du Contenu par Années

#### Task 7.1: Créer structure de dossiers par années
**File**: `content/blog/`, `content/events/`, `public/blog/images/`, `public/blog/videos/`  
**Description**: Organiser le contenu et les médias par années pour une meilleure gestion  
**Dependencies**: Task 5.1  
**Status**: ✅ Completed

**Structure cible** :
```
content/
├── blog/
│   ├── 2024/
│   │   ├── medaille-bronze-jeux-africains.md
│   │   └── resultats-championnat-2024.md
│   └── 2025/
│       ├── bienvenue-femat.md
│       ├── camp-entrainement-jeunes.md
│       ├── ceremonie-remise-ceintures-noires.md
│       ├── championnat-national-2025.md
│       ├── inauguration-centre-national.md
│       ├── ouverture-nouveau-dojo-kayes.md
│       ├── partenariat-universite.md
│       ├── participation-championnat-afrique.md
│       └── stage-formation-arbitres.md
└── events/
    ├── 2024/
    │   ├── 2024-10-20-gala-femat.md
    │   ├── 2024-11-15-seminaire-technique.md
    │   └── 2024-12-10-championnat-regional.md
    └── 2025/
        ├── 2025-02-10-ceremonie-remise-ceintures.md
        ├── 2025-02-20-stage-perfectionnement.md
        ├── 2025-03-15-championnat-national.md
        └── 2025-04-05-tournoi-inter-dojos.md

public/
└── blog/
    ├── images/
    │   ├── 2024/
    │   │   └── (images 2024)
    │   └── 2025/
    │       └── (images 2025)
    └── videos/
        ├── 2024/
        │   └── (vidéos 2024)
        └── 2025/
            └── (vidéos 2025)
```

**Détails**:
- ✅ Créer dossiers `content/blog/2024/` et `content/blog/2025/`
- ✅ Créer dossiers `content/events/2024/` et `content/events/2025/`
- ✅ Créer dossiers `public/blog/images/2024/` et `public/blog/images/2025/`
- ✅ Créer dossiers `public/blog/videos/2024/` et `public/blog/videos/2025/`
- ✅ Ajouter fichiers `.gitkeep` dans chaque dossier vide

#### Task 7.2: Migrer articles de blog existants
**File**: `content/blog/*.md` → `content/blog/YYYY/*.md`  
**Description**: Déplacer les articles existants dans les dossiers par année selon leur date  
**Dependencies**: Task 7.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Analyser la date de chaque article (champ `date` dans frontmatter)
- ✅ Déplacer articles de 2024 vers `content/blog/2024/` (2 articles)
- ✅ Déplacer articles de 2025 vers `content/blog/2025/` (9 articles)
- ✅ Les chemins d'images restent valides (chemins relatifs depuis `/public/blog/images/`)
- ✅ Vérifier que tous les articles sont bien déplacés

**Articles migrés** :
- Articles 2024 (2) : `medaille-bronze-jeux-africains.md` (2024-11-10), `resultats-championnat-2024.md` (2024-12-20)
- Articles 2025 (9) : Tous les autres articles avec dates 2025

#### Task 7.3: Migrer événements existants
**File**: `content/events/*.md` → `content/events/YYYY/*.md`  
**Description**: Déplacer les événements existants dans les dossiers par année  
**Dependencies**: Task 7.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Analyser la date de chaque événement (année dans le nom de fichier)
- ✅ Déplacer événements de 2024 vers `content/events/2024/` (3 événements)
- ✅ Déplacer événements de 2025 vers `content/events/2025/` (4 événements)
- ✅ Vérifier que tous les événements sont bien déplacés

**Événements migrés** :
- Événements 2024 (3) : `2024-10-20-gala-femat.md`, `2024-11-15-seminaire-technique.md`, `2024-12-10-championnat-regional.md`
- Événements 2025 (4) : `2025-02-10-ceremonie-remise-ceintures.md`, `2025-02-20-stage-perfectionnement.md`, `2025-03-15-championnat-national.md`, `2025-04-05-tournoi-inter-dojos.md`

#### Task 7.4: Mettre à jour configuration Nuxt Content
**File**: `content.config.ts`  
**Description**: Mettre à jour les sources pour prendre en compte la nouvelle structure par années  
**Dependencies**: Task 7.2, Task 7.3  
**Status**: ✅ Completed

**Détails**:
- ✅ La configuration utilise déjà `source: 'blog/**/*.md'` qui inclut automatiquement les sous-dossiers par année
- ✅ La configuration utilise déjà `source: 'events/**/*.md'` qui inclut automatiquement les sous-dossiers par année
- ✅ Nuxt Content trouve automatiquement tous les fichiers dans les sous-dossiers grâce au pattern `**/*.md`
- ✅ Les collections fonctionnent correctement avec la nouvelle structure (pas de changement nécessaire)

#### Task 7.5: Mettre à jour composables et composants
**File**: `app/composables/useBlog.ts`, `app/composables/useEvents.ts`  
**Description**: Vérifier que les composables fonctionnent avec la nouvelle structure  
**Dependencies**: Task 7.4  
**Status**: ✅ Completed

**Détails**:
- ✅ `useBlog` fonctionne avec les articles dans les sous-dossiers (utilise `queryCollection` qui gère automatiquement les sous-dossiers)
- ✅ `useEvents` fonctionne avec les événements dans les sous-dossiers (même logique)
- ✅ Les filtres par date fonctionnent (basés sur le champ `date` du frontmatter, pas sur le chemin)
- ✅ La récupération des articles/événements fonctionne correctement (Nuxt Content gère automatiquement les chemins)

#### Task 7.6: Documenter la nouvelle structure
**File**: `specs/002-blog-actualites/tasks.md`, `README.md` (optionnel)  
**Description**: Documenter l'organisation par années pour l'équipe  
**Dependencies**: Task 7.5  
**Status**: ✅ Completed

**Détails**:
- ✅ Structure de dossiers documentée dans tasks.md avec exemples concrets
- ✅ Logique d'organisation par années expliquée (basée sur le champ `date` du frontmatter)
- ✅ Conventions de nommage documentées (fichiers Markdown dans dossiers `YYYY/`)
- ✅ Guide pour ajouter du nouveau contenu : créer les fichiers dans `content/blog/YYYY/` ou `content/events/YYYY/` selon l'année de publication

### Phase 8: Intégration Navigation

#### Task 8.1: Ajouter lien Blog dans Header
**File**: `app/components/Header.vue`  
**Description**: Ajouter le lien "Blog" dans la navigation principale  
**Dependencies**: Phase 4  
**Status**: ⏳ Pending

**Détails**:
- Ajouter lien "Blog" dans navigation desktop
- Ajouter lien "Blog" dans menu mobile
- Vérifier que le lien actif est mis en évidence
- Positionner après "Événements" ou "Calendrier"

#### Task 8.2: Ajouter lien Blog dans Footer
**File**: `app/components/Footer.vue`  
**Description**: Ajouter le lien "Blog" dans la navigation du footer  
**Dependencies**: Phase 4  
**Status**: ⏳ Pending

**Détails**:
- Ajouter lien "Blog" dans navigation footer
- Vérifier cohérence avec autres liens

### Phase 9: Tests et Documentation

#### Task 9.1: Tests fonctionnels manuels
**File**: N/A  
**Description**: Tester toutes les fonctionnalités du blog  
**Dependencies**: Phase 8  
**Status**: ⏳ Pending

**Détails**:
- Liste des articles s'affiche correctement
- Filtres par catégorie fonctionnent
- Recherche fonctionne
- Page article individuel s'affiche
- Navigation fonctionne
- Partage social fonctionne
- Édition d'articles fonctionne (via fichiers Markdown dans structure par années)
- Images s'affichent correctement
- Responsive design fonctionne
- Accessibilité (navigation clavier, lecteurs d'écran)

#### Task 9.2: Créer guide de démarrage rapide
**File**: `specs/002-blog-actualites/quickstart.md`  
**Description**: Créer guide de démarrage rapide pour développeurs  
**Dependencies**: Phase 9.1  
**Status**: ⏳ Pending

**Détails**:
- Structure du projet
- Comment créer un article (édition directe des fichiers Markdown)
- Format Markdown et frontmatter
- Gestion des images
- Workflow Git pour publication
- Bonnes pratiques

## Checkpoints

### Checkpoint 1: Configuration de Base ✅
**After**: Phase 1  
**Validation**:
- [x] Modules installés et configurés (`@nuxt/content`, `better-sqlite3`)
- [x] Structure de dossiers créée (`content/blog/`, `public/blog/images/`)
- [x] Types TypeScript définis (`app/types/blog.ts` avec interface `BlogPost`)
- [x] Configuration Nuxt Content dans `nuxt.config.ts` et `content.config.ts`
- [ ] Structure de dossiers par années créée (Phase 7)
- [x] Workflow d'édition directe des fichiers Markdown disponible

### Checkpoint 2: Composables et Composants ✅
**After**: Phase 2 & 3  
**Validation**:
- [x] Composable `useBlog` fonctionnel (8 fonctions implémentées)
- [x] Composants `BlogCard`, `BlogPost`, `BlogFilters`, `BlogSearch` créés
- [ ] Composants testés individuellement (à tester avec pages Phase 4)
- [x] Design cohérent avec Nuxt UI (utilise UCard, UButton, UBadge, UInput)

### Checkpoint 3: Pages Fonctionnelles ✅
**After**: Phase 4  
**Validation**:
- [x] Page liste des articles fonctionne (`/blog`)
- [x] Page article individuel fonctionne (`/blog/[...slug]`)
- [x] Navigation entre pages fonctionne (liens dans BlogCard)
- [x] Filtres et recherche fonctionnent (catégorie, tags, recherche textuelle)
- [x] Pagination fonctionne (12 articles par page avec UPagination)

### Checkpoint 4: Contenu et SEO (En cours)
**After**: Phase 5 & 6  
**Validation**:
- [x] Articles d'exemple créés et affichés (10 articles créés)
- [ ] SEO optimisé (meta tags, sitemap) - Phase 6
- [ ] Images optimisées - Phase 6
- [ ] Performance acceptable (Lighthouse > 90) - Phase 6

### Checkpoint 5: Édition de Contenu et Intégration (En cours)
**After**: Phase 7 & 8
**Validation**:
- [x] Structure de dossiers par années créée (blog/YYYY, events/YYYY, images/YYYY, videos/YYYY)
- [x] Articles de blog migrés dans dossiers par années (2 articles 2024, 9 articles 2025)
- [x] Événements migrés dans dossiers par années (3 événements 2024, 4 événements 2025)
- [x] Configuration Nuxt Content mise à jour pour nouvelle structure (déjà compatible avec `**/*.md`)
- [x] Composables testés avec nouvelle structure (fonctionnent automatiquement)
- [x] Workflow d'édition directe des fichiers Markdown disponible
- [x] Prévisualisation locale fonctionne (`pnpm dev`)
- [x] Navigation intégrée (Header et Footer) - Phase 8 ✅

### Checkpoint 6: Tests Finaux
**After**: Phase 9  
**Validation**:
- [ ] Tous les tests fonctionnels passent
- [ ] Documentation complète
- [ ] Guide d'utilisation créé
- [ ] Prêt pour production

## Notes

- ✅ Les événements sont déjà dans Nuxt Content (collection `events` dans `content.config.ts`)
- Le système de commentaires est optionnel pour v1.0
- ⏸️ **Nuxt Studio reporté** : Reporté pour une version future. Pour l'instant, utilisation de l'édition directe des fichiers Markdown.
- ✅ **Organisation par années** : Contenu organisé par années dans des dossiers séparés (`blog/2024/`, `blog/2025/`, `events/2024/`, `events/2025/`). Même logique pour images et vidéos.
- ✅ **Workflow actuel** : Édition directe des fichiers Markdown dans `content/blog/YYYY/*.md` et `content/events/YYYY/*.md`.
- ✅ **Migration complétée** : 2 articles 2024 et 9 articles 2025 migrés dans leurs dossiers respectifs. 3 événements 2024 et 4 événements 2025 migrés.
- Les images doivent être optimisées avant upload (formats WebP/AVIF recommandés)
- **Prochaine étape** : Phase 6 (SEO/Optimisations) ou Phase 9 (Tests/Documentation)

