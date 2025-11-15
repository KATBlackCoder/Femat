# Guide de Déploiement FEMAT

**Date**: 2025-01-27  
**Plateforme**: Vercel  
**Documentation**: https://nuxt.com/deploy/vercel

## Plateforme de Déploiement: Vercel ✅

**Décision**: Déploiement sur **Vercel** pour le site web FEMAT.

**Justification**:
- ✅ **Zero Configuration** - Détection automatique de Nuxt.js
- ✅ **SSG natif** - Support parfait pour Static Site Generation
- ✅ **Gratuit** - Plan gratuit généreux pour projets open source
- ✅ **Performance** - CDN global pour livraison rapide
- ✅ **Intégration Git** - Déploiement automatique à chaque push
- ✅ **Preview Deployments** - Prévisualisation des branches/PR
- ✅ **HTTPS automatique** - Certificats SSL gratuits
- ✅ **Edge Functions** - Support optionnel pour fonctionnalités avancées

## Configuration Vercel

### Prérequis

1. Compte Vercel (gratuit) : https://vercel.com
2. Repository Git (GitHub, GitLab, ou Bitbucket)
3. Code Nuxt.js prêt pour déploiement

### Étapes de Déploiement

#### 1. Préparer le Projet

**Configuration Nuxt pour SSG** (`nuxt.config.ts`):
```typescript
export default defineNuxtConfig({
  // Configuration existante...
  ssr: false, // Pour site statique (SSG)
  // OU
  nitro: {
    prerender: {
      routes: ['/'] // Routes à pré-rendre
    }
  }
})
```

**Build Command** (automatique, mais peut être personnalisé):
```bash
pnpm build
# ou
pnpm generate  # Pour SSG complet
```

**Output Directory**: `.output/public` (automatique avec Nuxt)

#### 2. Déployer via Git

1. **Push le code** vers votre repository Git (GitHub recommandé)
2. **Importer le projet** dans Vercel :
   - Aller sur https://vercel.com/new
   - Connecter votre repository Git
   - Sélectionner le projet `femat`
3. **Configuration automatique** :
   - Vercel détecte automatiquement Nuxt.js
   - Configure Nitro automatiquement
   - Configure les variables d'environnement si nécessaire
4. **Déploiement** :
   - Vercel build et déploie automatiquement
   - URL de production générée automatiquement

#### 3. Configuration des Variables d'Environnement

Si nécessaire (pour Nuxt Studio, etc.), ajouter dans Vercel Dashboard :
- `STUDIO_GITHUB_CLIENT_ID` (pour Nuxt Studio)
- `STUDIO_GITHUB_CLIENT_SECRET` (pour Nuxt Studio)
- Autres variables selon besoins

#### 4. Domaine Personnalisé (Optionnel)

1. Aller dans **Settings > Domains**
2. Ajouter votre domaine (ex: `femat.ml` ou `taekwondo-mali.ml`)
3. Suivre les instructions DNS
4. Vercel configure automatiquement HTTPS

## Workflow de Déploiement

### Déploiement Automatique

- **Push sur `main`** → Déploiement en production
- **Push sur autres branches** → Preview Deployment (URL temporaire)
- **Pull Request** → Preview Deployment automatique

### Commandes Locales (Optionnel)

```bash
# Installer Vercel CLI
pnpm add -D vercel

# Déployer en preview
pnpm vercel

# Déployer en production
pnpm vercel --prod
```

## Configuration Spécifique pour Nuxt Content + Studio

### Pour Nuxt Studio sur Vercel

**Configuration GitHub OAuth**:
1. Créer OAuth App sur GitHub (voir docs Nuxt Studio)
2. **Homepage URL**: `https://votre-domaine.vercel.app`
3. **Authorization callback URL**: `https://votre-domaine.vercel.app`
4. Ajouter les credentials dans Vercel Environment Variables

**Configuration dans `nuxt.config.ts`**:
```typescript
export default defineNuxtConfig({
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'votre-username',
      repo: 'femat',
      branch: 'main'
    }
  }
})
```

## Optimisations Vercel

### Edge Functions (Optionnel)

Pour utiliser Vercel Edge Functions si besoin :
```bash
# Dans Vercel Dashboard ou via variable d'environnement
SERVER_PRESET=vercel_edge
```

### Vercel KV Storage (Optionnel)

Pour stockage clé-valeur si nécessaire :
```bash
# Installer
pnpm add @vercel/kv

# Configuration dans nuxt.config.ts
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

## Performance sur Vercel

### Avantages

- ✅ **CDN Global** - Contenu servi depuis le serveur le plus proche
- ✅ **Edge Network** - Réseau de distribution mondial
- ✅ **Automatic Optimizations** - Optimisations automatiques
- ✅ **Image Optimization** - Via Nuxt Image (si utilisé)

### Métriques Attendues

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Lighthouse Score**: > 90 (objectif)

## Monitoring et Analytics

### Vercel Analytics (Optionnel)

Vercel offre des analytics intégrés :
- Visiteurs
- Pages vues
- Performance
- Core Web Vitals

**Activation**: Dans Vercel Dashboard > Analytics

### Intégrations Possibles

- **Google Analytics** - Via module Nuxt
- **Plausible** - Alternative privacy-friendly
- **Vercel Analytics** - Intégré

## Sécurité

### HTTPS Automatique

- ✅ Certificats SSL automatiques
- ✅ Renouvellement automatique
- ✅ Support HTTP/2

### Headers de Sécurité

Vercel configure automatiquement :
- HTTPS enforcement
- Security headers de base

**Personnalisation** (si nécessaire) via `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## Coûts

### Plan Gratuit (Hobby)

- ✅ **100 GB bandwidth** par mois
- ✅ **100 builds** par mois
- ✅ **Preview Deployments** illimités
- ✅ **HTTPS** gratuit
- ✅ **CDN** global

**Suffisant pour**:
- Site statique avec trafic modéré
- Blog avec Nuxt Content
- ~1000-10000 visiteurs/mois

### Plan Pro (si nécessaire)

- $20/mois
- Bandwidth illimité
- Builds illimités
- Analytics avancés

## Checklist de Déploiement

### Avant le Déploiement

- [ ] Code pushé sur Git repository
- [ ] `nuxt.config.ts` configuré pour SSG
- [ ] Variables d'environnement identifiées
- [ ] Tests locaux réussis (`pnpm build`)

### Configuration Vercel

- [ ] Projet importé dans Vercel
- [ ] Build command vérifié (automatique)
- [ ] Output directory vérifié (automatique)
- [ ] Variables d'environnement configurées (si nécessaire)
- [ ] Domaine personnalisé configuré (optionnel)

### Après le Déploiement

- [ ] Site accessible sur URL Vercel
- [ ] Toutes les pages fonctionnent
- [ ] Images et assets chargent correctement
- [ ] Performance vérifiée (Lighthouse)
- [ ] HTTPS fonctionne
- [ ] Nuxt Studio accessible (si configuré)

## Dépannage

### Build Échoue

1. Vérifier les logs dans Vercel Dashboard
2. Tester localement : `pnpm build`
3. Vérifier les dépendances dans `package.json`
4. Vérifier la version de Node.js (Vercel utilise Node 18+)

### Variables d'Environnement

- Vérifier qu'elles sont définies dans Vercel Dashboard
- Redéployer après ajout de variables
- Vérifier les noms (case-sensitive)

### Performance

- Vérifier avec Lighthouse
- Optimiser les images
- Vérifier le bundle size
- Utiliser Vercel Analytics pour identifier les problèmes

## Ressources

- [Documentation Nuxt Vercel](https://nuxt.com/deploy/vercel)
- [Documentation Vercel](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)

## Notes

- Vercel détecte automatiquement Nuxt.js et configure Nitro
- Les déploiements sont automatiques à chaque push
- Les Preview Deployments permettent de tester avant production
- Le plan gratuit est suffisant pour démarrer

