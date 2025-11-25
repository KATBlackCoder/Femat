# Research: Nuxt Content Studio

**Date**: 2025-01-27  
**Feature**: `004-nuxt-content-studio`  
**Status**: Completed

## Overview

Recherche sur Nuxt Content Studio pour comprendre son fonctionnement, ses requirements, et son intégration avec le projet FEMAT existant.

## Sources

- Documentation officielle: https://content.nuxt.com/docs/studio/setup
- Repository GitHub: https://github.com/nuxt/content
- Documentation Nuxt Content: https://content.nuxt.com/

## Key Findings

### 1. Installation et Configuration

**Module**: `nuxt-studio`  
**Installation**: `pnpm add nuxt-studio` ou `npx nuxt module add nuxt-studio`

**Configuration minimale** (`nuxt.config.ts`):
```typescript
export default defineNuxtConfig({
  modules: ['nuxt-studio'],
  studio: {
    route: '/studio',  // Route par défaut: '/_studio'
    repository: {
      provider: 'github',  // ou 'gitlab'
      owner: 'your-username',
      repo: 'your-repo',
      branch: 'main'
    }
  }
})
```

### 2. Authentification OAuth

**Provider supporté**: GitHub, GitLab

**Variables d'environnement requises**:
- `STUDIO_GITHUB_CLIENT_ID` - Client ID de l'application OAuth GitHub
- `STUDIO_GITHUB_CLIENT_SECRET` - Client Secret de l'application OAuth GitHub

**Création application OAuth GitHub**:
1. GitHub → Settings → Developer settings → OAuth Apps
2. New OAuth App
3. Homepage URL: URL du site
4. Authorization callback URL: `https://your-domain.com/studio/auth/callback`

### 3. Architecture SSG/SSR

**Important**: Nuxt Content Studio nécessite une route SSR pour l'authentification OAuth.

**Configuration hybride**:
- Pages publiques: SSG (performance optimale)
- Route Studio: SSR (nécessaire pour OAuth)

**Configuration Nuxt**:
```typescript
nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true,
    exclude: ['/studio', '/studio/**']  // Exclure Studio du pré-rendu
  }
}
```

### 4. Collections Supportées

Studio détecte automatiquement les collections configurées dans `content.config.ts`.

**Collections existantes dans FEMAT**:
- `blog` - Articles de blog dans `/content/blog/`
- `events` - Événements dans `/content/events/`

Studio permettra l'édition de ces deux collections sans configuration supplémentaire.

### 5. Fonctionnalités

**Édition de contenu**:
- Interface visuelle moderne
- Éditeur Markdown avec syntax highlighting
- Prévisualisation en temps réel
- Gestion du frontmatter (YAML)
- Support des composants MDC (Markdown Components)

**Gestion des images**:
- Upload d'images depuis l'interface
- Images sauvegardées dans `/public/`
- Insertion automatique du chemin dans Markdown
- Prévisualisation des images

**Synchronisation Git**:
- Commits automatiques sur GitHub/GitLab
- Messages de commit descriptifs
- Synchronisation avec la branche configurée
- Gestion des conflits (basique)

### 6. Déploiement

**Requirements**:
- Route SSR pour `/studio` (authentification OAuth)
- Variables d'environnement configurées
- Accès write au repository Git

**Plateformes compatibles**:
- ✅ Vercel (SSR natif)
- ✅ Netlify (SSR natif)
- ✅ Cloudflare Pages (SSR natif)
- ⚠️ cPanel (dépend de la configuration Node.js)

**Déploiement hybride possible**:
- Site statique sur cPanel (SSG)
- Studio sur Vercel/Netlify (SSR)
- Configuration domaine pour pointer vers les deux

### 7. Sécurité

**Authentification**:
- OAuth GitHub/GitLab requis
- Seuls les utilisateurs avec write access au repository peuvent accéder
- Tokens OAuth sécurisés (non exposés publiquement)

**Permissions**:
- Vérification des permissions GitHub/GitLab
- Accès basé sur les permissions du repository
- Pas de système de permissions granulaire (tous les utilisateurs autorisés ont accès complet)

### 8. Limitations

**Version actuelle**:
- Pas de système de brouillons avec branches Git (futur)
- Pas de workflow d'approbation multi-utilisateurs (futur)
- Gestion des conflits Git basique
- Pas d'historique des modifications dans Studio (utiliser Git)

**Compatibilité**:
- Nécessite Nuxt Content v3+
- Nécessite route SSR pour OAuth
- Compatible avec SSG pour pages publiques

## Intégration avec FEMAT

### Compatibilité

✅ **Compatible avec l'architecture existante**:
- Nuxt Content v3 déjà installé et configuré
- Collections `blog` et `events` déjà définies
- Structure de fichiers compatible

✅ **Avantages pour FEMAT**:
- Interface intuitive pour équipe éditoriale non-technique
- Pas de base de données supplémentaire (utilise Git)
- Synchronisation automatique avec repository existant
- Pas de breaking changes pour le contenu existant

⚠️ **Défis à résoudre**:
- Compatibilité cPanel avec SSR (à vérifier)
- Configuration OAuth GitHub (à créer)
- Variables d'environnement en production (à configurer)

### Workflow Proposé

**Développement**:
1. Installer `nuxt-studio`
2. Configurer `nuxt.config.ts`
3. Créer application OAuth GitHub
4. Configurer variables d'environnement locales
5. Tester Studio en développement

**Production**:
1. Vérifier compatibilité cPanel avec SSR
2. Si compatible: Configurer variables d'environnement sur cPanel
3. Si non compatible: Considérer déploiement hybride ou workflow manuel
4. Tester Studio en production
5. Former l'équipe éditoriale

## Recommandations

1. **Tester d'abord en développement** avant de déployer en production
2. **Vérifier compatibilité cPanel** avec SSR avant de décider de la stratégie de déploiement
3. **Créer documentation** pour l'équipe éditoriale avant le déploiement
4. **Considérer déploiement hybride** si cPanel ne supporte pas SSR
5. **Documenter le workflow** pour éviter les conflits Git

## Ressources

- Documentation Nuxt Content Studio: https://content.nuxt.com/docs/studio/setup
- Guide OAuth GitHub: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
- Documentation Nuxt SSR: https://nuxt.com/docs/getting-started/deployment#server-side-rendering

## Notes

- Studio est un module relativement récent, vérifier les dernières versions et changelogs
- La configuration OAuth peut être complexe, prévoir du temps pour le debugging
- Le déploiement hybride peut être nécessaire si cPanel ne supporte pas SSR
- Considérer un workflow de backup avant de permettre l'édition en production

