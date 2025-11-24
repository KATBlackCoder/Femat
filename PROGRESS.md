# Progression du Projet FEMAT

**Dernière mise à jour**: 2025-01-27

## Vue d'ensemble

Ce document suit la progression du développement du site web de la Fédération Malienne de Taekwondo (FEMAT).

## Statut Global

- **Phase actuelle**: Phase 2 - Blog et Actualités (v2.0)
- **Statut**: 🚧 En cours (Phase 1, 2 & 3 complétées, Phase 4 en cours)
- **Prochaine étape**: Phase 4 - Pages blog

## Phase 1: Site Web de Base (v1.0) ✅

### Pages implémentées

- [x] **Page d'accueil** (`/`)
  - Hero section avec logo FEMAT
  - Section "À propos" (résumé)
  - Section "Événements à venir" (3-4 événements)
  - Section "Contact rapide"
  - Design avec UPageHero, UPageSection, UPageCTA

- [x] **Page À propos** (`/about`)
  - Histoire de la fédération
  - Mission et valeurs
  - Informations sur le taekwondo
  - Design avec UPageHero et UPageSection

- [x] **Page Événements** (`/events`)
  - Liste des événements à venir
  - Liste des événements passés
  - Cartes d'événements avec composant EventCard
  - Design avec UPageHero et UPageSection

- [x] **Page Calendrier** (`/calendar`) - Bonus
  - Calendrier interactif mensuel
  - Navigation entre mois
  - Jours colorés selon type d'événement
  - Affichage des événements du jour sélectionné
  - Légende des types d'événements

- [x] **Page Contact** (`/contact`)
  - Informations de contact (adresse, téléphone, email)
  - Formulaire de contact avec validation complète
  - Compteur de caractères et barre de progression
  - Protection honeypot anti-spam

- [x] **Page d'erreur** (`/error`)
  - Design avec UError de Nuxt UI
  - Messages personnalisés en français
  - Icônes selon le type d'erreur
  - Boutons d'action (Retour à l'accueil, Nous contacter)

### Composants implémentés

- [x] **Header.vue**
  - Logo FEMAT avec NuxtImg (AVIF/WebP)
  - Navigation responsive avec menu hamburger
  - UColorModeButton pour mode sombre/clair
  - Transitions fluides

- [x] **Footer.vue**
  - Logo FEMAT avec NuxtImg (AVIF/WebP)
  - Informations de contact avec liens cliquables
  - Lien Facebook
  - Navigation du footer
  - Copyright dynamique

- [x] **EventCard.vue**
  - Affichage des événements avec badges
  - Formatage de date en français
  - Couleurs selon type d'événement (Nuxt UI semantic colors)
  - Design responsive

- [x] **EventCalendar.vue**
  - Calendrier mensuel interactif
  - Navigation entre mois
  - Jours colorés selon type d'événement
  - Affichage des événements du jour sélectionné

- [x] **ContactForm.vue**
  - Validation complète côté client
  - Compteur de caractères avec barre de progression
  - Protection honeypot anti-spam
  - Feedback visuel pour les erreurs
  - Design avec sections et icônes

### Configuration et infrastructure

- [x] **Configuration Nuxt.js**
  - SSG configuré (`ssr: false`)
  - Nuxt UI 4.x intégré
  - Nuxt Image configuré
  - Transitions de page et layout
  - SEO optimisé (meta tags, sitemap)

- [x] **Configuration Nuxt UI**
  - Couleurs sémantiques dans `app.config.ts`
  - Primary: green (vert drapeau malien)
  - Secondary: yellow (jaune drapeau malien)
  - Error: red (rouge drapeau malien)
  - Neutral: slate (textes et bordures)

- [x] **Composables**
  - `useEvents.ts`: Centralise les données d'événements
  - Structure préparée pour migration vers Nuxt Content

- [x] **Types TypeScript**
  - `app/types/event.ts`: Interface Event partagée

- [x] **Styles**
  - CSS personnalisé dans `app/assets/css/main.css`
  - Variable CSS `--ui-header-height` pour UError
  - Support mode sombre/clair

### Optimisations

- [x] **Images**
  - Format AVIF avec fallback WebP
  - NuxtImg pour optimisation automatique
  - Lazy loading pour images non critiques
  - Logo avec fond blanc circulaire en mode sombre

- [x] **SEO**
  - Meta tags sur toutes les pages
  - Open Graph tags
  - Twitter Cards
  - Sitemap automatique

- [x] **Accessibilité**
  - ARIA labels sur composants interactifs
  - Navigation au clavier fonctionnelle
  - Éléments sémantiques HTML (`<time>`, `<address>`, `<nav>`)
  - Contraste de couleurs avec Nuxt UI

- [x] **Performance**
  - SSG pour performance maximale
  - Code splitting automatique
  - Transitions optimisées

## Phase 2: Blog et Actualités (v2.0) 🚧

### Statut: En cours (Phase 1 & 2 complétées, Phase 3 en cours)

### Phase 1: Setup & Configuration ✅

- [x] **Installation des modules**
  - `@nuxt/content` (v3.8.2) installé
  - `nuxt-studio@alpha` (v1.0.0-alpha.1) installé
  - `better-sqlite3` installé (remplacé par connecteur natif)

- [x] **Configuration**
  - Modules ajoutés dans `nuxt.config.ts`
  - Configuration Nuxt Content avec connecteur SQLite natif (`sqliteConnector: 'native'`)
  - Configuration Nuxt Studio avec route `/_studio` et repository GitHub
  - Fichier `content.config.ts` créé avec collection `blog`

- [x] **Structure de dossiers**
  - `content/blog/` créé pour les articles Markdown
  - `public/blog/images/` créé pour les images d'articles
  - Fichiers `.gitkeep` ajoutés pour versionner les dossiers vides

- [x] **Types TypeScript**
  - `app/types/blog.ts` créé avec interface `BlogPost`
  - Constantes `BLOG_CATEGORIES` et type `BlogCategory` définis

### Phase 2: Composable et Utilitaires ✅

- [x] **Composable `useBlog.ts`**
  - 8 fonctions implémentées pour gérer les articles
  - Utilise `queryContent()` de Nuxt Content
  - Cache avec `useAsyncData()` pour performance
  - Gestion d'erreurs complète avec try/catch
  - Gestion des cas limites

### Phase 3: Composants ✅

- [x] `components/blogs/BlogCard.vue` - Carte d'article pour la liste
  - Image de couverture avec NuxtImg (AVIF, lazy loading)
  - Badge catégorie avec couleurs sémantiques
  - Date formatée en français, tags, auteur
  - Hover effects et transitions
- [x] `components/blogs/BlogPost.vue` - Affichage d'un article complet
  - Image de couverture responsive
  - Métadonnées complètes (date, auteur, catégorie, tags)
  - Contenu avec ContentRenderer de Nuxt Content
  - Boutons de partage social (Facebook, Twitter, LinkedIn)
  - Articles similaires en bas
- [x] `components/blogs/BlogFilters.vue` - Filtres par catégorie/tag
  - Filtres par catégorie avec boutons
  - Filtres par tags avec badges cliquables
  - Compteur d'articles par catégorie
  - Bouton réinitialiser les filtres
- [x] `components/blogs/BlogSearch.vue` - Barre de recherche
  - Input de recherche avec debounce (300ms)
  - Résultats en temps réel (dropdown, 5 résultats max)
  - État de chargement et message "Aucun résultat"

### Phase 4: Pages ⏳ En attente

- [ ] `pages/blog/index.vue` - Liste des articles
- [ ] `pages/blog/[...slug].vue` - Page d'article individuel

### Phase 5: Contenu Initial ⏳ En attente

- [ ] Créer 3-5 articles d'exemple dans `content/blog/`

### Phase 6: SEO et Optimisations ⏳ En attente

- [ ] Meta tags dynamiques par article
- [ ] Sitemap incluant les articles
- [ ] Images optimisées avec Nuxt Image

### Phase 7: Nuxt Studio ⏳ En attente

- [ ] Vérifier accès `/_studio`
- [ ] Tester édition d'article
- [ ] Tester upload d'images
- [ ] Documenter utilisation pour équipe éditoriale

### Phase 8: Intégration Navigation ⏳ En attente

- [ ] Ajouter lien "Blog" dans Header
- [ ] Ajouter lien "Blog" dans Footer

### Phase 9: Tests et Documentation ⏳ En attente

- [ ] Tests fonctionnels manuels
- [ ] Guide de démarrage rapide
- [ ] Guide d'utilisation Nuxt Studio

Voir `specs/002-blog-actualites/spec.md` pour les détails.

## Phase 2.5: Restructuration des Logiques de Content ✅

### Statut: En cours (Phase 0, 1, 2, 3 & 4 complétées)

### Phase 0: Réorganisation des Composants Events ✅

- [x] **Réorganisation structurelle**
  - Création du dossier `app/components/events/`
  - Déplacement de `EventCalendar.vue` vers `components/events/`
  - Déplacement de `EventCard.vue` vers `components/events/`
  - Structure cohérente avec `components/blogs/`
  - Mise à jour des imports dans toutes les pages utilisant ces composants

### Phase 1: Analyse et Préparation ✅

- [x] **Analyse des composables existants**
  - Analyse complète de `useBlog.ts` (8 fonctions, 317 lignes)
  - Analyse complète de `useEvents.ts` (4 fonctions, 141 lignes)
  - Identification de ~150 lignes de code dupliqué (33% du code total)
  - Documentation des patterns identifiés dans `analysis-useBlog.md` et `analysis-useEvents.md`

- [x] **Identification des duplications**
  - Comparaison ligne par ligne des deux composables
  - Identification de 7 patterns majeurs à extraire
  - Documentation complète dans `duplications-analysis.md`
  - Potentiel de réduction estimé : 30-40% du code total

- [x] **Définition de l'API**
  - API complète du composable générique `useContentCollection` définie
  - 5 méthodes principales + utilitaires documentés
  - Types TypeScript complets pour tous les paramètres
  - Documentation dans `api-useContentCollection.md`

### Phase 2: Création du Composable Générique ✅

- [x] **Implémentation complète**
  - Création de `app/composables/useContentCollection.ts` (605 lignes)
  - Implémentation de `getAll()` avec cache et filtres
  - Implémentation de `getBySlug()` avec normalisation et fallback
  - Implémentation de `getByField()` avec opérateurs avancés
  - Système de cache avec classe `ContentCache` et TTL
  - Gestion d'erreurs centralisée avec logs dev/production
  - Documentation JSDoc complète

- [x] **Fonctionnalités**
  - Support des filtres multiples et opérateurs avancés (LIKE, IN, etc.)
  - Normalisation automatique des slugs et paths
  - Cache intégré avec statistiques (hits/misses)
  - Gestion d'erreurs gracieuse avec fallbacks
  - Types TypeScript stricts pour toutes les interfaces

### Phase 3: Refactorisation de useBlog ✅

- [x] **Refactorisation complète**
  - Refactorisation de toutes les 8 fonctions de `useBlog.ts`
  - Utilisation de `useContentCollection` pour toutes les requêtes
  - Code réduit de ~40% (de 317 lignes à 191 lignes)
  - Suppression de ~50 lignes de logs de debug excessifs
  - Cache intégré pour toutes les requêtes
  - Gestion d'erreurs améliorée et centralisée

- [x] **Fonctions refactorisées**
  - `getAllPosts()` : Réduction ~70% (de 53 à 6 lignes)
  - `getPostBySlug()` : Réduction ~85% (de 67 à 4 lignes)
  - `getPostsByCategory()` : Réduction ~80% (de 13 à 5 lignes)
  - `getPostsByTag()` : Réduction ~80% (de 13 à 6 lignes)
  - `searchPosts()` : Simplifié avec cache intégré
  - `getRelatedPosts()` : Simplifié avec cache intégré
  - `getAllTags()` : Utilise cache de `getAllPosts()`
  - `getPostsCountByCategory()` : Utilise cache de `getAllPosts()`

- [x] **Rétrocompatibilité**
  - API publique identique (pas de breaking changes)
  - Tous les fichiers utilisant useBlog fonctionnent sans modification
  - Performance améliorée grâce au cache intégré

### Phase 4: Refactorisation de useEvents ✅

- [x] **Refactorisation complète**
  - Refactorisation de toutes les 4 fonctions de `useEvents.ts`
  - Utilisation de `useContentCollection` pour toutes les requêtes
  - Code réduit de ~12% (de 141 lignes à 124 lignes)
  - Suppression des appels directs à `queryCollection`
  - Cache intégré pour toutes les requêtes
  - Gestion d'erreurs centralisée et améliorée

- [x] **Fonctions refactorisées**
  - `getAllEvents()` : Utilise `eventsCollection.getAll()` avec cache
  - `getEventBySlug()` : Utilise `eventsCollection.getBySlug()` avec fallback
  - `getUpcomingEvents()` : Utilise `getAllEvents()` puis filtre avec `isEventPast()`
  - `getPastEvents()` : Utilise `getAllEvents()` puis filtre avec `isEventPast()`

- [x] **Logique métier conservée**
  - `isEventPast()` conservée telle quelle (logique métier spécifique)
  - Gestion des événements multi-jours (`endDate`)
  - Gestion des heures (`startTime`, `endTime`)

- [x] **Rétrocompatibilité**
  - API publique identique (pas de breaking changes)
  - Computed refs conservés (`upcomingEvents`, `pastEvents`, `allEvents`)
  - Chargement automatique au montage conservé
  - 4 pages utilisant useEvents fonctionnent sans modification

Voir `specs/006-restructuration-content/` pour les détails complets.

## Phase 3: E-commerce (Planifié)

### Statut: ⏳ En attente

Voir `specs/003-ecommerce/spec.md` pour les détails.

## Phase 4: Authentification (Planifié)

### Statut: ⏳ En attente

Voir `specs/004-authentification/spec.md` pour les détails.

## Phase 5: Gestion Dojos et Membres (Planifié)

### Statut: ⏳ En attente

Voir `specs/005-gestion-dojos-membres/spec.md` pour les détails.

## Métriques

### Pages créées
- Total: 6 pages (accueil, à propos, événements, calendrier, contact, erreur)

### Composants créés
- Phase 1: 5 composants (Header, Footer, EventCard, EventCalendar, ContactForm)
- Phase 2: 1 composable (useBlog - refactorisé)
- Phase 3: 4 composants blog (BlogCard, BlogPost, BlogFilters, BlogSearch)
- Restructuration: 1 composable générique (useContentCollection)
- **Total**: 9 composants + 2 composables

### Réduction de code (Restructuration Content)
- `useBlog.ts`: Réduction de ~40% (317 → 191 lignes)
- `useEvents.ts`: Réduction de ~12% (141 → 124 lignes)
- Code dupliqué éliminé: ~150 lignes
- Cache intégré pour amélioration des performances

### Tests
- Tests fonctionnels: ⚠️ À compléter (voir `specs/001-site-web-femat/tests.md`)
- Tests d'accessibilité: ⚠️ À compléter
- Tests de performance: ⚠️ À compléter (Lighthouse)

### Déploiement
- Plateforme: Vercel (SSG)
- Statut: ⚠️ À déployer (voir `specs/DEPLOYMENT.md`)

## Prochaines étapes

1. ✅ Compléter l'implémentation v1.0
2. ✅ Démarrer Phase 2 - Blog et Actualités (Phase 1, 2 & 3 complétées)
3. ✅ Implémenter composants blog (Phase 3)
4. ⏳ Créer pages blog (Phase 4)
5. ⏳ Ajouter contenu initial (Phase 5)
6. ✅ Restructuration Content (Phase 0, 1, 2, 3 & 4 complétées)
7. ⏳ Amélioration des Types (Phase 5)
8. ⚠️ Effectuer les tests complets (voir `specs/001-site-web-femat/tests.md`)
9. ⚠️ Déployer sur Vercel (voir `specs/DEPLOYMENT.md`)

## Notes

- Toutes les données d'événements sont actuellement en dur dans `useEvents.ts`
- Structure préparée pour migration vers Nuxt Content dans Phase 2 (futur)
- Formulaire de contact affiche les données dans la console (v1.0)
- Intégration avec service email (Formspree, etc.) prévue pour Phase 2
- **Blog**: Phase 1, 2 & 3 complétées (4 composants créés), Phase 4 (pages) en cours
- **Nuxt Content**: Configuration avec connecteur SQLite natif (évite problèmes de compilation)
- **Nuxt Studio**: Configuration GitHub OAuth complétée, à tester au démarrage du serveur
- **Restructuration Content**: Phase 0, 1, 2, 3 & 4 complétées - Composable générique `useContentCollection` créé (605 lignes), `useBlog` refactorisé (réduction ~40%), `useEvents` refactorisé (réduction ~12%)

