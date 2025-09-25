# Architecture - Application Web FEMAT

## 🏗️ Vue d'ensemble

Application web moderne pour la Fédération Malienne de Taekwondo (FEMAT) construite avec Nuxt 4 et une architecture full-stack optimisée.

## 🎯 Objectifs Architecturaux

- **Performance** : Temps de chargement rapide et expérience utilisateur fluide
- **Scalabilité** : Architecture capable de grandir avec la fédération
- **Maintenabilité** : Code organisé et facile à maintenir
- **Sécurité** : Protection des données et authentification robuste
- **Accessibilité** : Interface accessible à tous les utilisateurs

## 🛠️ Stack Technologique

### Frontend
- **Framework** : Nuxt 4 + Vue 3
- **Design System** : NuxtUI v4 + Tailwind CSS
- **Image Optimization** : Nuxt Image (@nuxt/image)
- **State Management** : Pinia

### Backend & Data
- **API** : Nuxt API Routes (Nitro)
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Nuxt Supabase
- **Content Management** : Nuxt Content + Nuxt Studio

### Infrastructure
- **Déploiement** : Vercel
- **CDN** : Vercel Edge Network
- **Monitoring** : Vercel Analytics
- **Domaines** : Vercel + domaine personnalisé

## 📁 Architecture des Dossiers

```
femat/
├── app/                    # Application Nuxt
│   ├── components/         # Composants Vue
│   │   ├── ui/            # Composants NuxtUI personnalisés [Phase 1]
│   │   ├── layout/        # Header, Footer, Navigation (avec logo FEMAT) [Phase 1]
│   │   └── features/      # Composants métier FEMAT [Phase 3-6]
│   ├── content/           # Contenu Markdown
│   │   ├── news/          # Articles de news [Phase 3]
│   │   ├── events/        # Événements [Phase 3]
│   │   └── pages/         # Pages statiques [Phase 2]
│   ├── pages/             # Routes de l'application
│   │   ├── index.vue      # Page d'accueil [Phase 2]
│   │   ├── news/          # Actualités [Phase 3]
│   │   ├── events/        # Événements [Phase 3]
│   │   ├── gallery/       # Galerie [Phase 3]
│   │   ├── members/       # Espace membres [Phase 5]
│   │   ├── admin/         # Administration [Phase 5]
│   │   └── shop/          # Boutique e-commerce [Phase 6]
│   ├── server/            # Backend
│   │   └── api/           # API Routes [Phase 4-6]
│   ├── stores/            # Stores Pinia [Phase 5-6]
│   ├── composables/       # Logique réutilisable [Phase 1-6]
│   ├── types/             # Types TypeScript [Phase 1-6]
│   └── assets/            # Images, styles, logo FEMAT [Phase 1]
├── public/                # Fichiers statiques (logo FEMAT optimisé, favicon, images)
│   ├── logo_femat.jpg    # Original [Phase 1]
│   ├── logo_femat.webp   # WebP optimisé (22% plus léger) [Phase 1]
│   ├── logo_femat.avif   # AVIF ultra-optimisé [Phase 1]
│   ├── favicon.ico       # Multi-tailles (16x16, 32x32) [Phase 1]
│   ├── favicon-16x16.png # 16x16 [Phase 1]
│   ├── favicon-32x32.png # 32x32 [Phase 1]
│   └── apple-touch-icon.png # iOS 180x180 [Phase 1]
├── nuxt.config.ts         # Configuration Nuxt [Phase 1]
├── package.json           # Dépendances [Phase 1]
└── README.md              # Documentation [Phase 1]
```

## 🚀 Phases de Développement

### **Phase 1: Configuration, Structure & Design**
- Setup NuxtUI v4, Nuxt Image, structure projet
- Layout de base, intégration logo FEMAT
- Thème FEMAT, design responsive, branding complet

### **Phase 2: Pages de Base (Statiques)**
- Page d'accueil, À propos, Contact, Histoire
- Navigation, pages d'erreur
- Design responsive et identité visuelle

### **Phase 3: Système de Contenu Statique**
- Setup Nuxt Content, système de news
- Galerie média, module événements
- Contenu éditorial, optimisation SEO

### **Phase 4: Déploiement & Mise en ligne**
- SEO & Performance, Setup Vercel
- Variables d'environnement, domaine personnalisé
- Site FEMAT opérationnel

### **Phase 5: Fonctionnalités Avancées (Post-déploiement)**
- Setup Supabase, Setup Pinia, modèles de données
- Authentification, inscriptions événements
- Système d'adhésion, profils utilisateurs, dashboard admin

### **Phase 6: Boutique E-commerce FEMAT**
- Setup boutique, gestion produits
- Stores e-commerce (Pinia), panier & commandes, paiement
- Produits FEMAT, stock & inventaire, expédition

## 🔗 Dépendances entre Phases

### **Ordre de Développement**
1. **Phase 1** → **Phase 2** : Configuration avant pages statiques
2. **Phase 2** → **Phase 3** : Pages de base avant contenu dynamique
3. **Phase 3** → **Phase 4** : Contenu complet avant déploiement
4. **Phase 4** → **Phase 5** : Site en ligne avant fonctionnalités avancées
5. **Phase 5** → **Phase 6** : Auth + DB avant e-commerce

### **Dépendances Techniques**
- **Phase 1** : Base technique (NuxtUI, Image, Structure) - Sans Pinia
- **Phase 2** : Dépend de Phase 1 (Layout, Thème) - Sans Pinia
- **Phase 3** : Dépend de Phase 1 (Nuxt Content, Composants) - Sans Pinia
- **Phase 4** : Dépend de Phase 3 (Contenu complet) - Sans Pinia
- **Phase 5** : Dépend de Phase 4 (Site déployé) + Supabase + Pinia
- **Phase 6** : Dépend de Phase 5 (Auth + DB + Pinia)

## 🔄 Flux de Données

### 1. Contenu Statique (Nuxt Content)
```
Markdown Files → Nuxt Content → Vue Components → HTML
```

### 2. Données Dynamiques (Supabase + Pinia) - Phase 5+
```
Supabase DB → API Routes → Pinia Stores → Vue Components
```

### 3. Images Optimisées (Nuxt Image)
```
Images Sources → Nuxt Image → Formats WebP/AVIF → Vue Components
Logo FEMAT → WebP (22% plus léger) + AVIF (ultra-moderne) → Header/Footer
```

### 4. Authentification (Phase 5+)
```
User Login → Supabase Auth → Pinia Store → Protected Routes
```

## 🎨 Architecture UI/UX

### Design System
- **NuxtUI v4** : Composants de base avec système de couleurs sémantiques
- **Tailwind CSS** : Styling et responsive avec configuration CSS-first
- **Thème FEMAT** : Couleurs personnalisées et identité visuelle de la fédération
- **Logo FEMAT** : Cercle avec drapeau Mali (vert, jaune, rouge) + figure Taekwondo stylisée
- **Couleurs sémantiques** : primary (femat), secondary (tkd), success, info, warning, error, neutral
- **Configuration runtime** : Thème dynamique via app.config.ts
- **Couleurs personnalisées** : femat (bleu fédération), tkd (jaune taekwondo)
- **Branding** : Logo intégré dans header, footer, favicon et composants

### Responsive Design
- **Mobile First** : Design optimisé mobile
- **Breakpoints** : sm, md, lg, xl, 2xl
- **Composants adaptatifs** : Navigation, galerie, formulaires

### Palette de Couleurs FEMAT
- **Primary (femat)** : Bleu fédération (#0ea5e9) - Actions principales, navigation
- **Secondary (tkd)** : Jaune taekwondo (#eab308) - Actions secondaires, accents
- **Success** : Vert (#22c55e) - Confirmations, succès
- **Info** : Bleu (#3b82f6) - Informations, liens
- **Warning** : Jaune (#f59e0b) - Avertissements, attention
- **Error** : Rouge (#ef4444) - Erreurs, actions destructives
- **Neutral** : Gris (#64748b) - Texte, bordures, arrière-plans

### Identité Visuelle FEMAT
- **Logo principal** : Cercle avec bande drapeau Mali (vert, jaune, rouge)
- **Figure Taekwondo** : Silhouette stylisée en mouvement
- **Typographie** : "FEMAT" en grandes lettres + "Fédération Malienne de Taekwondo"
- **Couleurs drapeau** : Intégration des couleurs nationales maliennes
- **Swoosh dynamique** : Élément de mouvement et d'énergie

## 🔐 Architecture de Sécurité

### Authentification
- **Supabase Auth** : Gestion des utilisateurs
- **JWT Tokens** : Sessions sécurisées
- **Rôles** : Visiteur, Membre, Club, Admin

### Protection des Routes
- **Middleware** : Vérification des permissions
- **API Routes** : Validation des données
- **CORS** : Configuration sécurisée

## 📊 Architecture de Performance

### Optimisations Frontend
- **SSR/SSG** : Rendu côté serveur/statique
- **Code Splitting** : Chargement à la demande
- **Image Optimization** : Nuxt Image avec formats WebP/AVIF (logo FEMAT, photos compétitions)
- **Caching** : Mise en cache intelligente
- **Logo Optimization** : ✅ Logo FEMAT optimisé (WebP 22% plus léger, AVIF ultra-moderne)
- **Responsive Images** : Adaptation automatique mobile/desktop
- **Favicon Multi-tailles** : 16x16, 32x32, 180x180 (iOS) optimisés

### Optimisations Backend
- **API Routes** : Endpoints optimisés
- **Database Queries** : Requêtes efficaces
- **CDN** : Distribution globale

## 🌐 Architecture de Déploiement

### Vercel Configuration
- **Automatic Deployments** : Git push → déploiement
- **Preview Environments** : Tests avant production
- **Environment Variables** : Configuration sécurisée
- **Custom Domains** : Domaines personnalisés

### CI/CD Pipeline
```
Git Push → Vercel Build → Tests → Deploy → Monitoring
```

## 🔧 Configuration Nuxt

### Modules Principaux
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',           // NuxtUI v4
    '@nuxt/image',        // Optimisation d'images
    '@nuxt/content',      // CMS
    '@pinia/nuxt',        // State Management (Phase 5+)
    '@nuxtjs/supabase'    // Base de données (Phase 5+)
  ],
  css: ['~/assets/css/main.css'],
  image: {
    // Configuration Nuxt Image pour FEMAT
    providers: {
      ipx: {}  // Built-in resizer
    },
    format: ['webp', 'avif'],
    quality: 80
  },
  nitro: {
    preset: 'vercel'      // Optimisation Vercel
  }
})
```

### Configuration du Thème FEMAT

#### Couleurs personnalisées (main.css)
```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  /* Couleurs FEMAT - Identité visuelle de la fédération */
  --color-femat-50: #f0f9ff;
  --color-femat-100: #e0f2fe;
  --color-femat-200: #bae6fd;
  --color-femat-300: #7dd3fc;
  --color-femat-400: #38bdf8;
  --color-femat-500: #0ea5e9;
  --color-femat-600: #0284c7;
  --color-femat-700: #0369a1;
  --color-femat-800: #075985;
  --color-femat-900: #0c4a6e;
  --color-femat-950: #082f49;

  /* Couleurs secondaires - Taekwondo */
  --color-tkd-50: #fefce8;
  --color-tkd-100: #fef9c3;
  --color-tkd-200: #fef08a;
  --color-tkd-300: #fde047;
  --color-tkd-400: #facc15;
  --color-tkd-500: #eab308;
  --color-tkd-600: #ca8a04;
  --color-tkd-700: #a16207;
  --color-tkd-800: #854d0e;
  --color-tkd-900: #713f12;
  --color-tkd-950: #422006;
}
```

#### Configuration des couleurs sémantiques (app.config.ts)
```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'femat',      // Bleu FEMAT - Actions principales
      secondary: 'tkd',      // Jaune Taekwondo - Actions secondaires
      success: 'green',      // Vert - Succès et confirmations
      info: 'blue',          // Bleu - Informations
      warning: 'yellow',     // Jaune - Avertissements
      error: 'red',          // Rouge - Erreurs
      neutral: 'slate'       // Gris - Texte et bordures
    }
  }
})
```

#### Extension des couleurs (nuxt.config.ts)
```typescript
export default defineNuxtConfig({
  ui: {
    theme: {
      colors: [
        'primary',    // femat
        'secondary',  // tkd
        'success',    // green
        'info',       // blue
        'warning',    // yellow
        'error',      // red
        'neutral'     // slate
      ]
    }
  }
})
```

## 📈 Monitoring & Analytics

### Vercel Analytics
- **Performance** : Core Web Vitals
- **Usage** : Statistiques d'utilisation
- **Errors** : Monitoring des erreurs

### Supabase Monitoring
- **Database** : Performance des requêtes
- **Auth** : Statistiques d'authentification
- **API** : Monitoring des endpoints

## 🚀 Évolutivité

### Scalabilité Horizontale
- **CDN Global** : Distribution mondiale
- **Serverless** : Mise à l'échelle automatique
- **Database** : Supabase auto-scaling

### Extensibilité
- **Modules Nuxt** : Ajout de fonctionnalités
- **API Routes** : Nouveaux endpoints
- **Composants** : Réutilisation du code

## 🔄 Maintenance

### Mises à jour
- **Dependencies** : Mises à jour automatiques
- **Security** : Patches de sécurité
- **Features** : Nouvelles fonctionnalités

### Monitoring
- **Health Checks** : Vérification de l'état
- **Error Tracking** : Suivi des erreurs
- **Performance** : Optimisation continue

---

*Architecture conçue pour la Fédération Malienne de Taekwondo (FEMAT)*
