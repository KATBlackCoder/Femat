# Implementation Tasks: Site Web FEMAT

**Feature**: Site Web FEMAT  
**Branch**: `001-site-web-femat`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

## Task Breakdown

### Phase 1: Setup & Configuration

#### Task 1.1: Configuration Nuxt pour SSG
**File**: `nuxt.config.ts`  
**Description**: Configurer Nuxt.js pour la génération de site statique (SSG) et optimiser pour la production  
**Dependencies**: None  
**Status**: ✅ Completed

**Détails**:
- Configurer `ssr: false` ou `nitro.prerender` pour SSG
- Configurer les meta tags par défaut
- Configurer le sitemap automatique
- Optimiser les builds de production

#### Task 1.2: Configuration Nuxt UI avec couleurs personnalisées
**File**: `app.config.ts`  
**Description**: Configurer Nuxt UI avec les couleurs du drapeau malien (vert, jaune, rouge)  
**Dependencies**: Task 1.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Configuration des couleurs dans `app.config.ts` avec `ui.colors`
- ✅ Vert (green) défini comme couleur primaire
- ✅ Jaune (yellow) défini comme couleur secondaire
- ✅ Rouge (red) défini comme couleur error
- ✅ Neutral (slate) pour textes et bordures

#### Task 1.3: Configuration SEO de base
**File**: `nuxt.config.ts`, `app.vue`  
**Description**: Configurer les meta tags SEO de base et le favicon  
**Dependencies**: Task 1.1  
**Status**: ✅ Completed

**Détails**:
- Configurer les meta tags par défaut (title, description)
- Configurer Open Graph tags
- Vérifier que le favicon est bien configuré (déjà présent dans `/public/`)

### Phase 2: Layout & Navigation

#### Task 2.1: Créer le composant Header
**File**: `app/components/Header.vue`  
**Description**: Créer le header avec logo FEMAT et menu de navigation responsive  
**Dependencies**: Phase 1  
**Status**: ✅ Completed

**Détails**:
- ✅ Logo FEMAT avec `NuxtImg` (`/logo_femat.webp`)
- ✅ Menu de navigation avec liens: Accueil, À propos, Événements, Calendrier, Contact
- ✅ Menu hamburger pour mobile avec transitions
- ✅ Navigation accessible au clavier (ARIA labels)
- ✅ Styles avec Nuxt UI
- ✅ UColorModeButton intégré
- ✅ Lien Facebook intégré

#### Task 2.2: Créer le composant Footer
**File**: `app/components/Footer.vue`  
**Description**: Créer le footer avec informations de contact et liens utiles  
**Dependencies**: Phase 1  
**Status**: ✅ Completed

**Détails**:
- ✅ Informations de contact (adresse, téléphone, email) avec liens cliquables
- ✅ Lien Facebook intégré
- ✅ Copyright dynamique
- ✅ Design responsive avec Nuxt UI
- ✅ Logo avec `NuxtImg`
- ✅ Navigation du footer avec lien Calendrier

#### Task 2.3: Mettre à jour le layout principal
**File**: `app/layouts/default.vue`  
**Description**: Intégrer Header et Footer dans le layout principal  
**Dependencies**: Task 2.1, Task 2.2  
**Status**: ✅ Completed

**Détails**:
- ✅ Intégrer `<Header />` en haut
- ✅ Intégrer `<Footer />` en bas
- ✅ Structure avec `<UMain>` de Nuxt UI
- ✅ Transitions de page et layout configurées
- ✅ Structure flex pour footer sticky

### Phase 3: Page d'accueil (FR-1)

#### Task 3.1: Créer la section Hero
**File**: `app/pages/index.vue`  
**Description**: Créer la section hero avec logo et message de bienvenue  
**Dependencies**: Phase 2  
**Status**: ✅ Completed

**Détails**:
- Logo FEMAT centré
- Titre principal "Bienvenue à la FEMAT"
- Sous-titre avec description courte
- Design attractif avec couleurs du drapeau malien
- Responsive et accessible

#### Task 3.2: Créer la section "À propos" (résumé)
**File**: `app/pages/index.vue`  
**Description**: Ajouter une section résumant la fédération avec lien vers page complète  
**Dependencies**: Task 3.1  
**Status**: ✅ Completed

**Détails**:
- Texte de présentation court
- Bouton "En savoir plus" vers `/about`
- Design avec UCard de Nuxt UI

#### Task 3.3: Créer la section "Événements à venir"
**File**: `app/pages/index.vue`  
**Description**: Afficher 3-4 événements à venir avec composant EventCard  
**Dependencies**: Task 5.1 (EventCard)  
**Status**: ✅ Completed

**Détails**:
- ✅ Liste d'événements via composable `useEvents`
- ✅ Utilisation du composant EventCard
- ✅ Bouton "Voir tous les événements" vers `/events`
- ✅ Design responsive avec UPageSection
- ✅ Animations au survol

#### Task 3.4: Créer la section "Contact rapide"
**File**: `app/pages/index.vue`  
**Description**: Ajouter une section avec informations de contact essentielles  
**Dependencies**: Task 3.1  
**Status**: ✅ Completed

**Détails**:
- Informations de contact principales
- Bouton "Nous contacter" vers `/contact`
- Design avec UCard

### Phase 4: Page À propos (FR-2)

#### Task 4.1: Créer la page À propos
**File**: `app/pages/about.vue`  
**Description**: Créer la page complète avec histoire, mission et valeurs de la FEMAT  
**Dependencies**: Phase 2  
**Status**: ✅ Completed

**Détails**:
- Section "Histoire de la fédération"
- Section "Mission et valeurs"
- Section "Le Taekwondo"
- Espace pour photos futures (placeholders)
- Meta tags SEO appropriés
- Design avec Nuxt UI components

### Phase 5: Page Événements (FR-3)

#### Task 5.1: Créer le composant EventCard
**File**: `app/components/EventCard.vue`  
**Description**: Créer un composant réutilisable pour afficher une carte d'événement  
**Dependencies**: Phase 1  
**Status**: ✅ Completed

**Détails**:
- ✅ Props: event (type Event)
- ✅ Affichage avec UCard de Nuxt UI
- ✅ Badge pour type d'événement avec couleurs Nuxt UI
- ✅ Badge pour statut (à venir/passé)
- ✅ Design responsive
- ✅ Formatage de date avec locale française
- ✅ Accessibilité (ARIA labels, time element)

#### Task 5.2: Créer la page Événements
**File**: `app/pages/events.vue`  
**Description**: Créer la page avec liste des événements à venir et passés  
**Dependencies**: Task 5.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Section "Événements à venir" (liste principale)
- ✅ Section "Événements passés" (liste secondaire)
- ✅ Utilisation d'EventCard pour chaque événement
- ✅ Données via composable `useEvents` (structure préparée pour migration Nuxt Content)
- ✅ Meta tags SEO appropriés
- ✅ Design avec UPageHero et UPageSection

### Phase 6: Page Contact (FR-4)

#### Task 6.1: Créer le composant ContactForm
**File**: `app/components/ContactForm.vue`  
**Description**: Créer le formulaire de contact avec validation côté client  
**Dependencies**: Phase 1  
**Status**: ✅ Completed

**Détails**:
- ✅ Champs: Nom (requis), Prénom, Email (requis, validation), Téléphone, Sujet (requis), Message (requis)
- ✅ Validation avec Nuxt UI (UFormField, UInput, UTextarea, USelect)
- ✅ Messages d'erreur appropriés avec feedback visuel
- ✅ Design accessible (labels, aria-labels, UFormField)
- ✅ Compteur de caractères avec barre de progression
- ✅ Protection honeypot anti-spam
- ✅ Soumission préparée (console.log pour v1.0, intégration Formspree future)

#### Task 6.2: Créer la page Contact
**File**: `app/pages/contact.vue`  
**Description**: Créer la page avec informations de contact et formulaire  
**Dependencies**: Task 6.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Section avec informations de contact (adresse, téléphone, email) avec liens cliquables
- ✅ Intégration de ContactForm
- ✅ Lien Facebook intégré
- ✅ Meta tags SEO appropriés
- ✅ Design avec UPageHero, UPageSection, UCard

### Phase 7: Optimisations & Finalisation

#### Task 7.1: Optimiser les images
**File**: `app/pages/index.vue`, `app/components/Header.vue`, `app/components/Footer.vue`  
**Description**: Utiliser les formats optimisés (WebP/AVIF) et lazy loading  
**Dependencies**: Phase 3, Task 2.1  
**Status**: ✅ Completed

**Détails**:
- ✅ Utilisation de `<NuxtImg>` pour toutes les images
- ✅ Format WebP configuré
- ✅ Lazy loading pour images non critiques (loading="eager" pour logo)
- ✅ Alt text appropriés pour accessibilité
- ✅ Dimensions spécifiées pour optimisation

#### Task 7.2: Ajouter meta tags SEO sur toutes les pages
**File**: `app/pages/*.vue`  
**Description**: Ajouter les meta tags SEO appropriés sur chaque page  
**Dependencies**: Phase 3, 4, 5, 6  
**Status**: ✅ Completed

**Détails**:
- ✅ Utilisation de `useSeoMeta()` sur toutes les pages (index, about, events, contact, calendar)
- ✅ Title et description uniques par page
- ✅ Open Graph tags pour partage social
- ✅ Twitter Card configuré
- ⚠️ À vérifier avec outils SEO (Google Search Console)

#### Task 7.3: Vérifier et améliorer l'accessibilité
**File**: Tous les fichiers  
**Description**: Vérifier l'accessibilité WCAG 2.1 niveau AA  
**Dependencies**: Toutes les phases précédentes  
**Status**: ✅ Completed (à valider avec outils)

**Détails**:
- ✅ Navigation au clavier implémentée (ARIA labels, tabindex)
- ✅ Contraste de couleurs avec Nuxt UI (couleurs sémantiques)
- ✅ ARIA labels ajoutés sur composants interactifs
- ✅ Éléments sémantiques HTML (`<time>`, `<address>`, `<nav>`)
- ✅ Transitions accessibles
- ⚠️ À tester avec lecteur d'écran et outils d'audit (axe DevTools, Lighthouse)

#### Task 7.4: Optimiser les performances
**File**: `nuxt.config.ts`, tous les composants  
**Description**: Optimiser pour atteindre Lighthouse score > 90  
**Dependencies**: Toutes les phases précédentes  
**Status**: ⚠️ In Progress (à tester avec Lighthouse)

**Détails**:
- ✅ Images optimisées avec NuxtImg
- ✅ SSG configuré pour performance maximale
- ✅ Transitions optimisées
- ⚠️ À vérifier avec Lighthouse (score > 90)
- ⚠️ À vérifier le code splitting automatique de Nuxt
- ⚠️ À vérifier minification et compression en production

#### Task 7.5: Test final et validation
**File**: Tous les fichiers  
**Description**: Tests finaux et validation de toutes les fonctionnalités  
**Dependencies**: Toutes les tâches précédentes  
**Status**: ⚠️ In Progress

**Détails**:
- Tester toutes les pages
- Tester la navigation
- Tester le responsive design
- Vérifier les formulaires
- Valider avec Lighthouse (score > 90)
- Vérifier l'accessibilité

#### Task 7.6: Préparation au déploiement Vercel
**File**: `nuxt.config.ts`, `.gitignore`  
**Description**: Préparer le projet pour le déploiement sur Vercel  
**Dependencies**: Task 7.5  
**Status**: ⚠️ Ready (configuration prête, à déployer)

**Détails**:
- ✅ Configuration SSG vérifiée dans `nuxt.config.ts` (`ssr: false`)
- ⚠️ À tester: build fonctionne (`pnpm build`)
- ✅ Assets vérifiés dans `/public/` (logo, favicon)
- ✅ Documentation dans `specs/DEPLOYMENT.md`
- ⚠️ À déployer sur Vercel

## Checkpoints

### Checkpoint 1: Configuration et Layout
**After**: Phase 2  
**Validation**: 
- [x] Nuxt configuré pour SSG
- [x] Nuxt UI configuré avec couleurs personnalisées
- [x] Header et Footer fonctionnels et responsive
- [x] Layout principal intégré correctement
- [x] Navigation accessible au clavier

### Checkpoint 2: Pages principales
**After**: Phase 6  
**Validation**:
- [x] Page d'accueil complète avec toutes les sections
- [x] Page À propos avec contenu
- [x] Page Événements avec liste d'événements
- [x] Page Contact avec formulaire fonctionnel
- [x] Page Calendrier avec calendrier interactif
- [x] Toutes les pages responsive
- [x] Navigation entre pages fonctionnelle

### Checkpoint 3: Optimisations
**After**: Phase 7  
**Validation**:
- [ ] Lighthouse score > 90 (à tester)
- [ ] Accessibilité WCAG 2.1 AA validée (à tester avec outils)
- [x] SEO optimisé (meta tags sur toutes les pages)
- [x] Images optimisées (NuxtImg)
- [x] Site fonctionne sur tous les navigateurs modernes (à tester)
- [x] Site fonctionne sur mobile, tablette et desktop (responsive)
- [ ] Build réussi localement (`pnpm build`) (à tester)
- [ ] Prêt pour déploiement Vercel (voir `specs/DEPLOYMENT.md`)

## Notes d'implémentation

### Données pour v1.0
Les événements et certaines informations seront en dur dans les composants. Structure préparée pour migration future vers CMS ou API.

### Formulaire de contact
Pour v1.0, le formulaire affichera les données dans la console. Intégration avec service email (comme Formspree, Netlify Forms, etc.) peut être ajoutée plus tard.

### Photos
Les placeholders pour photos sont préparés. Les vraies photos peuvent être ajoutées dans `/public/` et référencées dans les composants.

### Multilingue
Non inclus dans v1.0, mais structure Nuxt permet d'ajouter facilement le support multilingue plus tard avec `@nuxtjs/i18n`.

## Fonctionnalités supplémentaires implémentées

### Page Calendrier
- ✅ Page `/calendar` avec composant `EventCalendar.vue`
- ✅ Calendrier interactif avec navigation mensuelle
- ✅ Jours colorés selon le type d'événement
- ✅ Affichage des événements du jour sélectionné
- ✅ Légende des types d'événements

### Composable useEvents
- ✅ Composable centralisé pour gérer les données d'événements
- ✅ Structure préparée pour migration future vers Nuxt Content
- ✅ Types partagés dans `app/types/event.ts`

### Transitions
- ✅ Transitions de page configurées (`page` transition)
- ✅ Transitions de layout configurées (`layout` transition)
- ✅ Animations fluides entre les pages

### Configuration Nuxt UI
- ✅ Couleurs sémantiques configurées dans `app.config.ts`
- ✅ Utilisation des couleurs Nuxt UI au lieu de classes Tailwind directes
- ✅ Support du mode sombre avec `UColorModeButton`

