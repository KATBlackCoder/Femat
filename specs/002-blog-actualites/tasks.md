# Implementation Tasks: Blog & Actualités FEMAT

**Feature**: Blog & Actualités FEMAT  
**Branch**: `002-blog-actualites`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27 (Phase 1, 2, 3, 4 & 5 complétées)

## Task Breakdown

### Phase 1: Setup & Configuration

#### Task 1.1: Installation des modules Nuxt Content et Nuxt Studio
**File**: `package.json`  
**Description**: Installer les modules nécessaires pour le blog  
**Dependencies**: None  
**Status**: ✅ Completed

**Commandes**:
```bash
pnpm add @nuxt/content nuxt-studio@alpha
```

**Détails**:
- ✅ Installer `@nuxt/content` pour gestion de contenu Markdown (v3.8.2)
- ✅ Installer `nuxt-studio@alpha` pour interface d'édition visuelle (v1.0.0-alpha.1)
- ✅ Installer `better-sqlite3` (requis par Nuxt Content, puis remplacé par connecteur natif)
- ✅ Vérifier que les dépendances sont bien ajoutées dans `package.json`

#### Task 1.2: Configuration Nuxt Content et Nuxt Studio
**File**: `nuxt.config.ts`, `content.config.ts`  
**Description**: Configurer les modules Nuxt Content et Nuxt Studio dans la configuration Nuxt  
**Dependencies**: Task 1.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Ajouter `@nuxt/content` et `nuxt-studio` dans `modules`
- ✅ Configurer `content` avec options highlight et markdown dans `nuxt.config.ts`
- ✅ Configurer `content.experimental.sqliteConnector: 'native'` (utilise SQLite natif Node.js v22.5.0+)
- ✅ Créer `content.config.ts` avec collection `blog`
- ✅ Configurer `studio` avec route `/_studio` et repository GitHub
- ✅ GitHub OAuth configuré par l'utilisateur

#### Task 1.3: Créer structure de dossiers pour le contenu
**File**: `content/blog/`, `public/blog/images/`  
**Description**: Créer les dossiers nécessaires pour les articles et images  
**Dependencies**: Task 1.2  
**Status**: ✅ Completed

**Détails**:
- ✅ Créer dossier `content/blog/` pour les articles Markdown
- ✅ Créer dossier `public/blog/images/` pour les images d'articles
- ✅ Ajouter fichiers `.gitkeep` pour versionner les dossiers vides

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

### Phase 7: Nuxt Studio

#### Task 7.1: Vérifier accès et configuration Nuxt Studio
**File**: `/_studio` (généré automatiquement)  
**Description**: Vérifier que Nuxt Studio est accessible et fonctionnel  
**Dependencies**: Task 1.2  
**Status**: ⏳ Pending

**Détails**:
- Accéder à `/_studio` en développement
- Vérifier authentification GitHub OAuth
- Tester édition d'article existant
- Tester création nouvel article
- Tester upload d'images vers `/public/blog/images/`
- Vérifier synchronisation Git automatique

#### Task 7.2: Documenter utilisation Nuxt Studio
**File**: `specs/002-blog-actualites/NUXT-STUDIO-GUIDE.md`  
**Description**: Créer guide d'utilisation pour équipe éditoriale  
**Dependencies**: Task 7.1  
**Status**: ⏳ Pending

**Détails**:
- Guide d'accès à Nuxt Studio
- Workflow de création d'article
- Format Markdown et frontmatter
- Gestion des images
- Workflow de publication
- Bonnes pratiques

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
- Nuxt Studio accessible et fonctionnel
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
- Comment créer un article
- Comment utiliser Nuxt Studio
- Format Markdown
- Gestion des images
- Bonnes pratiques

## Checkpoints

### Checkpoint 1: Configuration de Base ✅
**After**: Phase 1  
**Validation**:
- [x] Modules installés et configurés (`@nuxt/content`, `nuxt-studio@alpha`, `better-sqlite3`)
- [x] Structure de dossiers créée (`content/blog/`, `public/blog/images/`)
- [x] Types TypeScript définis (`app/types/blog.ts` avec interface `BlogPost`)
- [x] Configuration Nuxt Content et Nuxt Studio dans `nuxt.config.ts` et `content.config.ts`
- [ ] Nuxt Studio accessible sur `/_studio` (à tester au démarrage du serveur)

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

### Checkpoint 5: Nuxt Studio et Intégration
**After**: Phase 7 & 8  
**Validation**:
- [ ] Nuxt Studio fonctionnel
- [ ] Édition d'articles fonctionne
- [ ] Upload d'images fonctionne
- [ ] Navigation intégrée (Header et Footer)
- [ ] Documentation créée

### Checkpoint 6: Tests Finaux
**After**: Phase 9  
**Validation**:
- [ ] Tous les tests fonctionnels passent
- [ ] Documentation complète
- [ ] Guide d'utilisation créé
- [ ] Prêt pour production

## Notes

- Les événements seront migrés vers Nuxt Content dans une phase future (prévu dans commentaires de `useEvents.ts`)
- Le système de commentaires est optionnel pour v1.0
- Nuxt Studio nécessite GitHub OAuth (déjà configuré selon l'utilisateur)
- Les images doivent être optimisées avant upload (formats WebP/AVIF recommandés)

