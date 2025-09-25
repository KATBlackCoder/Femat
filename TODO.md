# TODO - Application Web FEMAT

## 🎯 Vue d'ensemble
Développement d'une application web complète pour la Fédération Malienne de Taekwondo (FEMAT) avec gestion des membres, événements, et administration.

## 📋 Plan de Développement

### Phase 1: Configuration, Structure & Design
- [ ] **1.1 Setup NuxtUI v4** - Installer @nuxt/ui, configurer Tailwind CSS, tester composants de base
- [x] **1.2 Setup Nuxt Image** - Installer @nuxt/image, configurer IPX, tester optimisation logo FEMAT
- [ ] **1.3 Thème FEMAT** - Configurer couleurs drapeau Mali dans nuxt.config.ts et app.config.ts
- [ ] **1.4 Structure projet** - Créer dossiers app/components/, app/content/, app/pages/
- [ ] **1.5 Layout de base** - Créer app/components/layout/Header.vue, Footer.vue, Navigation.vue
- [x] **1.6 Intégration logo** - Optimiser logo_femat.jpg, créer favicon, intégrer dans Header/Footer
- [ ] **1.7 Design responsive** - Tester sur mobile (320px-768px) et desktop (1024px+)
- [ ] **1.8 Branding complet** - Vérifier logo FEMAT dans header, footer, favicon, pages d'erreur

### Phase 2: Pages de Base (Statiques)
- [ ] **2.1 Page d'accueil** - Créer pages/index.vue avec hero section, présentation FEMAT, logo optimisé
- [ ] **2.2 Page À propos** - Créer pages/about.vue avec historique FEMAT, mission, vision
- [ ] **2.3 Page Contact** - Créer pages/contact.vue avec formulaire, coordonnées, plan
- [ ] **2.4 Page Histoire** - Créer pages/history.vue avec chronologie du Taekwondo au Mali
- [ ] **2.5 Navigation** - Finaliser menu principal, footer, liens internes
- [ ] **2.6 Pages d'erreur** - Créer pages/error.vue et pages/404.vue avec design FEMAT

### Phase 3: Système de Contenu Statique
- [ ] **3.1 Setup Nuxt Content** - Installer @nuxt/content, configurer Nuxt Studio, créer structure content/
- [ ] **3.2 Système de news** - Créer pages/news/index.vue, composants news, filtres par catégorie
- [ ] **3.3 Galerie média** - Créer pages/gallery/index.vue, composants galerie avec Nuxt Image
- [ ] **3.4 Module événements** - Créer pages/events/index.vue, composants EventCard, filtres par type
- [ ] **3.5 Contenu éditorial** - Créer articles de news, événements en Markdown
- [ ] **3.6 Optimisation contenu** - SEO, meta tags, images optimisées, performance

### Phase 4: Déploiement & Mise en ligne
- [ ] **4.1 SEO & Performance** - Configurer meta tags, sitemap, robots.txt, optimisations
- [ ] **4.2 Setup Vercel** - Connecter repo GitHub, configurer déploiement automatique avec zero configuration
- [ ] **4.3 Vercel Edge Functions** - Configurer SERVER_PRESET=vercel_edge pour performance optimale
- [ ] **4.4 Variables d'environnement** - Configurer variables de production Vercel
- [ ] **4.5 Domaine personnalisé** - Configurer domaine FEMAT (ex: femat.ml ou femat-mali.org)
- [ ] **4.6 Vercel KV Storage** - Configurer stockage pour cache et données temporaires si nécessaire

### Phase 5: Fonctionnalités Avancées (Post-déploiement)
- [ ] **5.1 Setup Supabase** - Créer projet Supabase, installer @nuxtjs/supabase, configurer .env
- [ ] **5.2 Setup Pinia** - Installer @pinia/nuxt, créer stores/ (auth, members, events, admin)
- [ ] **5.3 Modèles de données** - Créer tables: members, clubs, events, results, user_profiles
- [ ] **5.4 Authentification Supabase** - Configurer auth providers, créer composables useAuth
- [ ] **5.5 Inscriptions événements** - Créer pages/events/[id]/register.vue, système d'inscription avec validation
- [ ] **5.6 Résultats événements** - Créer pages/events/[id]/results.vue, publication classements et performances
- [ ] **5.7 Système d'adhésion** - Créer pages/members/register.vue, gestion licenciés et clubs
- [ ] **5.8 Profils utilisateurs** - Créer pages/members/profile.vue, espaces selon rôle (membre/admin)
- [ ] **5.9 Dashboard admin** - Créer pages/admin/dashboard.vue, gestion membres, événements, contenu

### Phase 6: Boutique E-commerce FEMAT
- [ ] **6.1 Setup boutique** - Créer pages/shop/index.vue, structure catalogue produits
- [ ] **6.2 Gestion produits** - Créer pages/shop/[id].vue, fiches produits détaillées
- [ ] **6.3 Stores e-commerce** - Créer stores/ (cart, products, orders) avec Pinia
- [ ] **6.4 Panier & commandes** - Créer pages/shop/cart.vue, système panier avec Pinia
- [ ] **6.5 Paiement** - Intégrer Stripe/PayPal, pages/shop/checkout.vue
- [ ] **6.6 Gestion commandes** - Créer pages/admin/orders.vue, suivi commandes
- [ ] **6.7 Produits FEMAT** - Uniformes, ceintures, équipements, goodies
- [ ] **6.8 Stock & inventaire** - Gestion stock, alertes rupture
- [ ] **6.9 Expédition** - Calcul frais de port, suivi colis

## 🛠️ Technologies
- **Frontend**: Nuxt 4 + Vue 3 + NuxtUI v4
- **Design System**: [NuxtUI](https://ui.nuxt.com/) - Framework de composants avec Tailwind CSS
- **Content Management**: [Nuxt Content](https://content.nuxt.com/) + [Nuxt Studio](https://nuxt.studio/) pour l'édition visuelle
- **Image Optimization**: [Nuxt Image](https://image.nuxt.com/) - Optimisation d'images pour logo FEMAT et galerie
- **State Management**: [Pinia](https://pinia.vuejs.org/) avec [@nuxtjs/pinia](https://nuxt.com/modules/pinia)
- **Backend**: Nuxt API Routes
- **Base de données**: [Supabase](https://supabase.com/) - PostgreSQL avec API automatique
- **Authentification**: [Nuxt Supabase](https://supabase.nuxtjs.org/) - Auth intégrée
- **Déploiement**: [Vercel](https://nuxt.com/deploy/vercel) - Zero configuration, Edge Functions, déploiement automatique

## 📁 Structure de Dossiers Proposée
```
app/
├── components/
│   ├── ui/           # Composants NuxtUI personnalisés
│   ├── layout/       # Composants de layout
│   └── features/     # Composants métier FEMAT
├── content/
│   ├── news/         # Articles de news (Markdown)
│   ├── events/       # Événements (Markdown)
│   └── pages/        # Pages statiques
├── pages/
│   ├── index.vue     # Page d'accueil
│   ├── news/         # Actualités
│   ├── events/       # Événements
│   ├── gallery/      # Galerie
│   ├── members/      # Espace membres (Phase 5+)
│   └── admin/        # Administration (Phase 5+)
├── server/
│   └── api/          # API routes (Phase 5+)
├── stores/           # Stores Pinia (Phase 5+)
├── composables/      # Logique réutilisable
├── types/           # Types TypeScript + Types Supabase
└── assets/          # Images, styles
```

## 🎨 Fonctionnalités Clés
- **Gestion des membres** : Licenciés, clubs, grades
- **Événements** : Compétitions, stages, formations
- **Actualités** : Blog avec catégories
- **Galerie** : Photos/vidéos des événements optimisées
- **Administration** : Dashboard complet
- **Responsive** : Mobile-first design
- **Identité visuelle** : Logo FEMAT optimisé avec drapeau Mali et figure Taekwondo
- **Performance** : Images optimisées avec formats modernes (WebP, AVIF)

## 📊 Priorités (Approche Configuration → Pages → Contenu → Déploiement)
1. **Haute** : ✅ 1.2 (Nuxt Image + Logo) → 1.1-1.3 (Setup NuxtUI + Thème) → 1.4-1.5 (Structure + Layout)
2. **Haute** : 1.6-1.8 (Logo + Responsive + Branding) → 2.1-2.6 (Pages statiques complètes)
3. **Haute** : 3.1-3.6 (Système de contenu statique avec Nuxt Content + News + Galerie + Événements)
4. **Haute** : 4.1-4.6 (Déploiement & Mise en ligne - Site FEMAT opérationnel)
5. **Moyenne** : 5.1-5.9 (Fonctionnalités avancées post-déploiement - Supabase + Pinia + Auth + Admin)
6. **Basse** : 6.1-6.9 (Boutique E-commerce FEMAT - Produits, panier, paiement)

## 🔄 Dépendances entre tâches
- ✅ **1.2** (Logo optimisé) → **1.1** → **1.3** (Setup dans l'ordre)
- **1.3** → **1.4** (Thème avant structure)
- **1.5** → **1.6** (Layout avant intégration logo) ✅ Logo prêt
- **1.6-1.8** → **2.1-2.6** (Design avant pages statiques)
- **3.1** → **3.2-3.4** (Nuxt Content avant news/galerie/événements)
- **3.1-3.6** → **4.1-4.6** (Contenu complet avant déploiement)
- **5.1** → **5.2** → **5.3** (Supabase avant Pinia avant modèles)
- **5.2** → **5.4-5.9** (Pinia avant fonctionnalités avancées)
- **5.1-5.2** → **6.1-6.9** (Supabase + Pinia avant boutique e-commerce)

## 🚀 Déploiement Vercel - Configuration Spécifique

### Zero Configuration Setup
1. **Push vers GitHub** - Code source dans repository Git
2. **Import Vercel** - Connecter le projet via l'interface Vercel
3. **Auto-détection** - Vercel détecte automatiquement Nuxt/Nitro
4. **Déploiement automatique** - Application live immédiatement

### Optimisations Performance
```bash
# Vercel Edge Functions (recommandé pour FEMAT)
SERVER_PRESET=vercel_edge
```

### Configuration Variables d'Environnement
```bash
# Variables Supabase pour production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Variables FEMAT spécifiques
NUXT_PUBLIC_SITE_URL=https://femat.ml
NUXT_PUBLIC_CONTACT_EMAIL=contact@femat.ml
```

### Vercel KV Storage (Optionnel)
```typescript
// nuxt.config.ts - Pour cache et données temporaires
export default defineNuxtConfig({
  nitro: {
    storage: {
      data: {
        driver: 'vercelKV'
      }
    }
  }
})
```

## ✅ Progrès Actuel
- **Logo FEMAT** : ✅ Optimisé (WebP, AVIF, favicon, apple-touch-icon)
- **Structure** : Prêt pour création des dossiers (sans stores/ pour l'instant)
- **Prochaine étape** : 1.1 Setup NuxtUI v4
- **Pinia** : Déplacé vers Phase 5 (quand vraiment nécessaire)

---
*Dernière mise à jour : $(date)*
