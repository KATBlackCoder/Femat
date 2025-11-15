# Implementation Tasks: Site Web FEMAT

**Feature**: Site Web FEMAT  
**Branch**: `001-site-web-femat`  
**Generated**: 2025-01-27

## Task Breakdown

### Phase 1: Setup & Configuration

#### Task 1.1: Configuration Nuxt pour SSG
**File**: `nuxt.config.ts`  
**Description**: Configurer Nuxt.js pour la génération de site statique (SSG) et optimiser pour la production  
**Dependencies**: None  
**Status**: Pending

**Détails**:
- Configurer `ssr: false` ou `nitro.prerender` pour SSG
- Configurer les meta tags par défaut
- Configurer le sitemap automatique
- Optimiser les builds de production

#### Task 1.2: Configuration Nuxt UI avec couleurs personnalisées
**File**: `nuxt.config.ts`  
**Description**: Configurer Nuxt UI avec les couleurs du drapeau malien (vert, jaune, rouge)  
**Dependencies**: Task 1.1  
**Status**: Pending

**Détails**:
- Ajouter configuration des couleurs dans `ui.colors`
- Définir vert (#00853F) comme couleur primaire
- Définir jaune (#FCD116) comme couleur secondaire
- Définir rouge (#CE1126) comme couleur accent

#### Task 1.3: Configuration SEO de base
**File**: `nuxt.config.ts`, `app.vue`  
**Description**: Configurer les meta tags SEO de base et le favicon  
**Dependencies**: Task 1.1  
**Status**: Pending

**Détails**:
- Configurer les meta tags par défaut (title, description)
- Configurer Open Graph tags
- Vérifier que le favicon est bien configuré (déjà présent dans `/public/`)

### Phase 2: Layout & Navigation

#### Task 2.1: Créer le composant Header
**File**: `app/components/Header.vue`  
**Description**: Créer le header avec logo FEMAT et menu de navigation responsive  
**Dependencies**: Phase 1  
**Status**: Pending

**Détails**:
- Logo FEMAT (utiliser `/logo_femat.webp`)
- Menu de navigation avec liens vers: Accueil, À propos, Événements, Contact
- Menu hamburger pour mobile
- Navigation accessible au clavier
- Styles avec Nuxt UI

#### Task 2.2: Créer le composant Footer
**File**: `app/components/Footer.vue`  
**Description**: Créer le footer avec informations de contact et liens utiles  
**Dependencies**: Phase 1  
**Status**: Pending

**Détails**:
- Informations de contact (adresse, téléphone, email)
- Liens vers réseaux sociaux (placeholders pour v1.0)
- Copyright
- Design responsive

#### Task 2.3: Mettre à jour le layout principal
**File**: `app/layouts/default.vue`  
**Description**: Intégrer Header et Footer dans le layout principal  
**Dependencies**: Task 2.1, Task 2.2  
**Status**: Pending

**Détails**:
- Intégrer `<Header />` en haut
- Intégrer `<Footer />` en bas
- Structure avec `<UMain>` de Nuxt UI
- Espacement et padding appropriés

### Phase 3: Page d'accueil (FR-1)

#### Task 3.1: Créer la section Hero
**File**: `app/pages/index.vue`  
**Description**: Créer la section hero avec logo et message de bienvenue  
**Dependencies**: Phase 2  
**Status**: Pending

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
**Status**: Pending

**Détails**:
- Texte de présentation court
- Bouton "En savoir plus" vers `/about`
- Design avec UCard de Nuxt UI

#### Task 3.3: Créer la section "Événements à venir"
**File**: `app/pages/index.vue`  
**Description**: Afficher 3-4 événements à venir avec composant EventCard  
**Dependencies**: Task 4.1 (EventCard)  
**Status**: Pending

**Détails**:
- Liste d'événements (données en dur pour v1.0)
- Utiliser le composant EventCard
- Bouton "Voir tous les événements" vers `/events`
- Design responsive

#### Task 3.4: Créer la section "Contact rapide"
**File**: `app/pages/index.vue`  
**Description**: Ajouter une section avec informations de contact essentielles  
**Dependencies**: Task 3.1  
**Status**: Pending

**Détails**:
- Informations de contact principales
- Bouton "Nous contacter" vers `/contact`
- Design avec UCard

### Phase 4: Page À propos (FR-2)

#### Task 4.1: Créer la page À propos
**File**: `app/pages/about.vue`  
**Description**: Créer la page complète avec histoire, mission et valeurs de la FEMAT  
**Dependencies**: Phase 2  
**Status**: Pending

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
**Status**: Pending

**Détails**:
- Props: title, date, location, description, type, status
- Affichage avec UCard de Nuxt UI
- Badge pour type d'événement
- Badge pour statut (à venir/passé)
- Design responsive

#### Task 5.2: Créer la page Événements
**File**: `app/pages/events.vue`  
**Description**: Créer la page avec liste des événements à venir et passés  
**Dependencies**: Task 5.1  
**Status**: Pending

**Détails**:
- Section "Événements à venir" (liste principale)
- Section "Événements passés" (liste secondaire)
- Utiliser EventCard pour chaque événement
- Données en dur pour v1.0 (structure préparée pour migration future)
- Meta tags SEO appropriés
- Design avec filtres préparés (non fonctionnels en v1.0)

### Phase 6: Page Contact (FR-4)

#### Task 6.1: Créer le composant ContactForm
**File**: `app/components/ContactForm.vue`  
**Description**: Créer le formulaire de contact avec validation côté client  
**Dependencies**: Phase 1  
**Status**: Pending

**Détails**:
- Champs: Nom (requis), Email (requis, validation), Sujet (requis), Message (requis)
- Validation avec Nuxt UI (UInput, UTextarea)
- Messages d'erreur appropriés
- Design accessible (labels, aria-labels)
- Soumission préparée (console.log pour v1.0, intégration email future)

#### Task 6.2: Créer la page Contact
**File**: `app/pages/contact.vue`  
**Description**: Créer la page avec informations de contact et formulaire  
**Dependencies**: Task 6.1  
**Status**: Pending

**Détails**:
- Section avec informations de contact (adresse, téléphone, email)
- Intégrer ContactForm
- Espace pour carte Google Maps (commenté pour v1.0)
- Meta tags SEO appropriés
- Design avec UCard et UContainer

### Phase 7: Optimisations & Finalisation

#### Task 7.1: Optimiser les images
**File**: `app/pages/index.vue`, `app/components/Header.vue`  
**Description**: Utiliser les formats optimisés (WebP/AVIF) et lazy loading  
**Dependencies**: Phase 3, Task 2.1  
**Status**: Pending

**Détails**:
- Utiliser `<NuxtImg>` ou `<img>` avec srcset pour WebP/AVIF
- Lazy loading pour images non critiques
- Alt text appropriés pour accessibilité

#### Task 7.2: Ajouter meta tags SEO sur toutes les pages
**File**: `app/pages/*.vue`  
**Description**: Ajouter les meta tags SEO appropriés sur chaque page  
**Dependencies**: Phase 3, 4, 5, 6  
**Status**: Pending

**Détails**:
- Utiliser `useSeoMeta()` sur chaque page
- Title et description uniques par page
- Open Graph tags pour partage social
- Vérifier avec outils SEO

#### Task 7.3: Vérifier et améliorer l'accessibilité
**File**: Tous les fichiers  
**Description**: Vérifier l'accessibilité WCAG 2.1 niveau AA  
**Dependencies**: Toutes les phases précédentes  
**Status**: Pending

**Détails**:
- Tester navigation au clavier
- Vérifier contraste de couleurs
- Vérifier les ARIA labels
- Tester avec lecteur d'écran (si disponible)
- Corriger les problèmes identifiés

#### Task 7.4: Optimiser les performances
**File**: `nuxt.config.ts`, tous les composants  
**Description**: Optimiser pour atteindre Lighthouse score > 90  
**Dependencies**: Toutes les phases précédentes  
**Status**: Pending

**Détails**:
- Vérifier avec Lighthouse
- Optimiser les images
- Vérifier le code splitting
- Minification et compression
- Corriger les problèmes de performance

#### Task 7.5: Test final et validation
**File**: Tous les fichiers  
**Description**: Tests finaux et validation de toutes les fonctionnalités  
**Dependencies**: Toutes les tâches précédentes  
**Status**: Pending

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
**Status**: Pending

**Détails**:
- Vérifier la configuration SSG dans `nuxt.config.ts`
- S'assurer que le build fonctionne (`pnpm build`)
- Vérifier que tous les assets sont dans `/public/`
- Documenter les variables d'environnement nécessaires
- Voir `specs/DEPLOYMENT.md` pour le guide complet

## Checkpoints

### Checkpoint 1: Configuration et Layout
**After**: Phase 2  
**Validation**: 
- [ ] Nuxt configuré pour SSG
- [ ] Nuxt UI configuré avec couleurs personnalisées
- [ ] Header et Footer fonctionnels et responsive
- [ ] Layout principal intégré correctement
- [ ] Navigation accessible au clavier

### Checkpoint 2: Pages principales
**After**: Phase 6  
**Validation**:
- [ ] Page d'accueil complète avec toutes les sections
- [ ] Page À propos avec contenu
- [ ] Page Événements avec liste d'événements
- [ ] Page Contact avec formulaire fonctionnel
- [ ] Toutes les pages responsive
- [ ] Navigation entre pages fonctionnelle

### Checkpoint 3: Optimisations
**After**: Phase 7  
**Validation**:
- [ ] Lighthouse score > 90
- [ ] Accessibilité WCAG 2.1 AA validée
- [ ] SEO optimisé (meta tags sur toutes les pages)
- [ ] Images optimisées
- [ ] Site fonctionne sur tous les navigateurs modernes
- [ ] Site fonctionne sur mobile, tablette et desktop
- [ ] Build réussi localement (`pnpm build`)
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

