# Feature Specification: Déploiement avec Vercel

**Feature ID**: `007-deploiement-vercel`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P1 (Critique - nécessaire pour mise en ligne)

## Overview

Configuration et déploiement du site web FEMAT sur Vercel avec déploiement automatique, optimisations de performance et configuration des variables d'environnement.

## Context

Le site web FEMAT est prêt pour la mise en production. Vercel a été choisi comme plateforme de déploiement pour :

- Support natif de Nuxt.js et SSG
- Déploiement automatique via Git
- Performance optimale avec CDN global
- Plan gratuit généreux
- Configuration zéro pour Nuxt.js

## Functional Requirements

### FR-1: Configuration Vercel
**Description**: Configurer le projet pour le déploiement sur Vercel.

**Acceptance Criteria**:
- [ ] Projet importé dans Vercel Dashboard
- [ ] Repository Git connecté
- [ ] Build command configuré (automatique ou personnalisé)
- [ ] Output directory configuré (automatique)
- [ ] Variables d'environnement identifiées

### FR-2: Configuration Nuxt pour Production
**Description**: Optimiser la configuration Nuxt pour la production.

**Acceptance Criteria**:
- [ ] Mode SSG configuré (`ssr: false` ou `nitro.prerender`)
- [ ] Routes statiques pré-rendues
- [ ] Optimisations de build activées
- [ ] Source maps désactivées en production
- [ ] Minification activée

### FR-3: Déploiement Automatique
**Description**: Configurer le déploiement automatique via Git.

**Acceptance Criteria**:
- [ ] Déploiement automatique sur push vers `main`
- [ ] Preview deployments pour autres branches
- [ ] Preview deployments pour Pull Requests
- [ ] Notifications de déploiement (optionnel)

### FR-4: Variables d'Environnement
**Description**: Configurer les variables d'environnement nécessaires.

**Acceptance Criteria**:
- [ ] Variables identifiées
- [ ] Variables configurées dans Vercel Dashboard
- [ ] Variables différentes pour preview/production si nécessaire
- [ ] Documentation des variables

### FR-5: Domaine Personnalisé (Optionnel)
**Description**: Configurer un domaine personnalisé pour le site.

**Acceptance Criteria**:
- [ ] Domaine ajouté dans Vercel Dashboard
- [ ] Configuration DNS effectuée
- [ ] HTTPS automatique configuré
- [ ] Redirection www configurée (si nécessaire)

### FR-6: Optimisations de Performance
**Description**: Optimiser les performances pour la production.

**Acceptance Criteria**:
- [ ] Images optimisées (Nuxt Image si utilisé)
- [ ] Assets statiques optimisés
- [ ] Compression activée
- [ ] Cache headers configurés
- [ ] Score Lighthouse > 90

### FR-7: Monitoring et Analytics
**Description**: Configurer le monitoring et les analytics.

**Acceptance Criteria**:
- [ ] Vercel Analytics activé (optionnel)
- [ ] Google Analytics configuré (si nécessaire)
- [ ] Monitoring des erreurs (optionnel)
- [ ] Performance monitoring

## Non-Functional Requirements

### NFR-1: Performance
- Score Lighthouse > 90
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.8s

### NFR-2: Disponibilité
- Uptime > 99.9%
- CDN global pour latence minimale
- Redondance automatique

### NFR-3: Sécurité
- HTTPS obligatoire
- Certificats SSL automatiques
- Headers de sécurité configurés
- Protection contre les attaques courantes

### NFR-4: Scalabilité
- Support du trafic prévu
- Scaling automatique
- Pas de limites strictes sur le plan gratuit

## Technical Considerations

### Configuration Vercel

**Important**: Vercel détecte automatiquement Nuxt.js et configure Nitro. Aucune configuration spéciale n'est nécessaire dans `vercel.json` pour le fonctionnement de base.

**Fichier `vercel.json` (optionnel - uniquement pour headers de sécurité)**:
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

**Note**: Ne pas définir `buildCommand`, `outputDirectory` ou `framework` dans `vercel.json` car Vercel détecte automatiquement Nuxt.js et utilise les valeurs par défaut appropriées.

**Configuration Nuxt** (`nuxt.config.ts`):
```typescript
export default defineNuxtConfig({
  // SSG avec Nuxt Content - utiliser nitro.prerender au lieu de ssr: false
  // ssr: false désactivé car Nuxt Content nécessite un serveur pour accéder aux fichiers Markdown
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true // Pré-rendre toutes les routes trouvées automatiquement
    }
  },
  // Optimisations de production
  sourcemap: {
    server: false,
    client: false // Désactiver les source maps en production
  },
  experimental: {
    payloadExtraction: false // Optimisation pour SSG
  }
})
```

**Détection automatique Vercel**:
- Vercel détecte automatiquement Nuxt.js via `package.json`
- Build command: `pnpm build` (détecté automatiquement)
- Output directory: `.output/public` (détecté automatiquement pour SSG)
- Framework: `nuxtjs` (détecté automatiquement)

### Variables d'Environnement

**Variables nécessaires** (selon besoins):
- Variables d'API si nécessaire
- Clés de service si nécessaire
- Variables pour le formulaire de contact (si API ajoutée)

### Workflow de Déploiement

1. **Push sur `main`** → Déploiement en production automatique
2. **Push sur autres branches** → Preview deployment (URL temporaire)
3. **Pull Request** → Preview deployment automatique avec commentaire

### Commandes Locales (Optionnel)

```bash
# Installer Vercel CLI
pnpm add -D vercel

# Déployer en preview
pnpm vercel

# Déployer en production
pnpm vercel --prod
```

## Design Guidelines

- **Zero Configuration**: Vercel détecte automatiquement Nuxt.js et configure Nitro - pas besoin de `vercel.json` pour le fonctionnement de base
- Optimisations de performance par défaut
- Sécurité par défaut (HTTPS automatique, headers optionnels via `vercel.json`)
- Documentation claire des étapes
- Utiliser `nitro.prerender` avec `crawlLinks: true` pour SSG avec Nuxt Content (au lieu de `ssr: false`)

## Out of Scope (v1.0)

- Configuration de domaines multiples
- Edge Functions avancées
- Vercel KV Storage
- Monitoring avancé avec services tiers
- CI/CD personnalisé (Vercel gère automatiquement)

## Dependencies

- Repository Git (GitHub, GitLab, ou Bitbucket)
- Compte Vercel (gratuit)
- Code Nuxt.js prêt pour production
- Variables d'environnement identifiées

## Open Questions

- [ ] Quel domaine personnalisé utiliser ? (ex: `femat.ml`, `taekwondo-mali.ml`)
- [ ] Faut-il activer Vercel Analytics ?
- [ ] Faut-il configurer Google Analytics ?
- [ ] Quelles variables d'environnement sont nécessaires exactement ?

## Implementation Plan

1. **Étape 1**: Préparer le projet pour la production
   - Vérifier la configuration Nuxt
   - Tester le build local (`pnpm build`)
   - Identifier les variables d'environnement

2. **Étape 2**: Créer le projet sur Vercel
   - Importer le repository Git
   - Configurer le projet
   - Vérifier la détection automatique de Nuxt.js

3. **Étape 3**: Configurer les variables d'environnement
   - Ajouter les variables nécessaires
   - Tester les variables

4. **Étape 4**: Premier déploiement
   - Déployer en preview d'abord
   - Vérifier que tout fonctionne
   - Déployer en production

5. **Étape 5**: Optimisations
   - Vérifier les performances (Lighthouse)
   - Optimiser les images
   - Configurer les headers de sécurité

6. **Étape 6**: Domaine personnalisé (optionnel)
   - Ajouter le domaine dans Vercel
   - Configurer DNS
   - Vérifier HTTPS

7. **Étape 7**: Monitoring
   - Activer Vercel Analytics (optionnel)
   - Configurer Google Analytics (si nécessaire)
   - Vérifier les métriques

## Success Criteria

- [ ] Site déployé et accessible publiquement
- [ ] Déploiement automatique fonctionnel
- [ ] Score Lighthouse > 90
- [ ] HTTPS configuré automatiquement
- [ ] Toutes les pages fonctionnent correctement
- [ ] Images et assets chargent correctement
- [ ] Domaine personnalisé configuré (si applicable)
- [ ] Performance optimale

## Checklist de Déploiement

### Avant le Déploiement
- [ ] Code pushé sur Git repository
- [ ] `nuxt.config.ts` configuré pour SSG
- [ ] Variables d'environnement identifiées
- [ ] Tests locaux réussis (`pnpm build`)
- [ ] Build fonctionne sans erreurs

### Configuration Vercel
- [ ] Projet importé dans Vercel
- [ ] Build command vérifié (automatique)
- [ ] Output directory vérifié (automatique)
- [ ] Variables d'environnement configurées
- [ ] Domaine personnalisé configuré (optionnel)

### Après le Déploiement
- [ ] Site accessible sur URL Vercel
- [ ] Toutes les pages fonctionnent
- [ ] Images et assets chargent correctement
- [ ] Performance vérifiée (Lighthouse)
- [ ] HTTPS fonctionne
- [ ] Déploiement automatique testé

## Ressources

- [Documentation Nuxt Vercel](https://nuxt.com/deploy/vercel)
- [Documentation Vercel](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- Guide existant: `specs/DEPLOYMENT.md`

## Notes

- **Détection automatique**: Vercel détecte automatiquement Nuxt.js via `package.json` et configure Nitro sans configuration supplémentaire
- **Pas besoin de `vercel.json`**: Le fichier `vercel.json` est optionnel et ne doit être utilisé que pour des configurations spécifiques (headers de sécurité, redirects, etc.)
- **Build automatique**: Vercel utilise automatiquement `pnpm build` et détecte `.output/public` pour SSG
- **SSG avec Nuxt Content**: Utiliser `nitro.prerender` avec `crawlLinks: true` au lieu de `ssr: false` pour préserver les fonctionnalités de Nuxt Content
- Les déploiements sont automatiques à chaque push sur `main`
- Les Preview Deployments permettent de tester avant production
- Le plan gratuit est suffisant pour démarrer
- HTTPS est automatique et gratuit
- CDN global inclus automatiquement

