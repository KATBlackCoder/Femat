# Feature Specification: Intégration Nuxt Content Studio

**Feature ID**: `004-nuxt-content-studio`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P2 (Important - amélioration de la gestion de contenu)

## Overview

Intégration de Nuxt Content Studio pour permettre l'édition visuelle du contenu (blog et événements) via une interface d'administration moderne et intuitive. **Approche de développement** : Tester et valider toutes les fonctionnalités en local d'abord, puis déployer en production uniquement si tout fonctionne correctement.

## Context

Le site FEMAT utilise actuellement Nuxt Content v3 avec deux collections (`blog` et `events`) gérées via fichiers Markdown. Le contenu est actuellement édité manuellement dans les fichiers Markdown, ce qui nécessite des connaissances techniques et un accès au repository Git.

**Problèmes actuels** :
- Édition du contenu nécessite des connaissances Git/Markdown
- Workflow de publication complexe pour les non-techniques
- Pas d'interface visuelle pour prévisualiser les modifications
- Upload d'images nécessite manipulation manuelle des fichiers

**Solution proposée** : Nuxt Content Studio offre une interface d'administration visuelle accessible directement sur le site en production, permettant l'édition du contenu sans connaissances techniques approfondies.

## Functional Requirements

### FR-1: Installation et Configuration de Base
**Description**: Installer et configurer Nuxt Content Studio dans le projet.

**Acceptance Criteria**:
- [ ] Module `nuxt-studio` installé via pnpm
- [ ] Configuration dans `nuxt.config.ts` avec route `/studio` (ou `/_studio`)
- [ ] Configuration du repository GitHub (owner, repo, branch)
- [ ] Module fonctionnel en développement local

### FR-2: Configuration OAuth GitHub
**Description**: Configurer l'authentification GitHub OAuth pour sécuriser l'accès à Studio.

**Acceptance Criteria**:
- [ ] Application OAuth GitHub créée
- [ ] Variables d'environnement configurées (`STUDIO_GITHUB_CLIENT_ID`, `STUDIO_GITHUB_CLIENT_SECRET`)
- [ ] Authentification fonctionnelle en développement
- [ ] Authentification fonctionnelle en production
- [ ] Seuls les utilisateurs autorisés peuvent accéder à Studio

### FR-3: Interface d'Édition pour Blog
**Description**: Permettre l'édition visuelle des articles de blog via Studio.

**Acceptance Criteria**:
- [ ] Liste des articles de blog visible dans Studio
- [ ] Création de nouveaux articles via interface
- [ ] Édition des articles existants avec prévisualisation en temps réel
- [ ] Gestion du frontmatter (title, description, date, author, category, tags, image, published)
- [ ] Éditeur Markdown avec syntax highlighting
- [ ] Prévisualisation du rendu final

### FR-4: Interface d'Édition pour Events
**Description**: Permettre l'édition visuelle des événements via Studio.

**Acceptance Criteria**:
- [ ] Liste des événements visible dans Studio
- [ ] Création de nouveaux événements via interface
- [ ] Édition des événements existants avec prévisualisation
- [ ] Gestion du frontmatter (title, date, endDate, startTime, endTime, location, description, type, status, image, published)
- [ ] Éditeur Markdown avec syntax highlighting
- [ ] Prévisualisation du rendu final

### FR-5: Gestion des Images
**Description**: Permettre l'upload et la gestion des images via Studio.

**Acceptance Criteria**:
- [ ] Upload d'images depuis l'interface Studio
- [ ] Images sauvegardées dans `/public/blog/images/` ou `/public/events/images/`
- [ ] Insertion automatique du chemin dans le Markdown
- [ ] Prévisualisation des images uploadées
- [ ] Gestion des images existantes (suppression, remplacement)

### FR-6: Synchronisation Git
**Description**: Synchroniser automatiquement les modifications avec le repository Git.

**Acceptance Criteria**:
- [ ] Modifications créent automatiquement des commits Git
- [ ] Messages de commit descriptifs générés automatiquement
- [ ] Synchronisation avec la branche configurée (`main`)
- [ ] Historique des modifications visible dans Git
- [ ] Pas de conflits avec les modifications manuelles (gestion des conflits)

### FR-7: Déploiement en Production (Conditionnel)
**Description**: Configurer Studio pour fonctionner en production sur cPanel **UNIQUEMENT après validation complète en local**.

**Acceptance Criteria**:
- [ ] ✅ **PRÉREQUIS** : Toutes les fonctionnalités testées et validées en local
- [ ] ✅ **PRÉREQUIS** : Tous les tests passent en développement
- [ ] Route `/studio` accessible en production sur `https://www.femat.ml/studio`
- [ ] Authentification OAuth fonctionnelle en production
- [ ] Variables d'environnement configurées sur cPanel
- [ ] Route SSR configurée pour Studio (nécessaire pour OAuth)
- [ ] Site reste en SSG pour les pages publiques (performance)
- [ ] Documentation de déploiement créée et testée

### FR-8: Sécurité et Permissions
**Description**: Sécuriser l'accès à Studio et gérer les permissions.

**Acceptance Criteria**:
- [ ] Seuls les utilisateurs GitHub autorisés peuvent accéder
- [ ] Permissions GitHub vérifiées (write access au repository)
- [ ] Protection contre les accès non autorisés
- [ ] Logs d'accès et modifications (optionnel)

## Non-Functional Requirements

### NFR-1: Performance
- L'ajout de Studio ne doit pas impacter les performances du site public
- Route Studio en SSR uniquement (pas de pré-rendu)
- Pages publiques restent en SSG (performance optimale)
- Chargement rapide de l'interface Studio

### NFR-2: Compatibilité
- Compatible avec Nuxt Content v3 existant
- Compatible avec les collections `blog` et `events` existantes
- Pas de breaking changes pour le contenu existant
- Rétrocompatibilité avec l'édition manuelle des fichiers Markdown

### NFR-3: Expérience Utilisateur
- Interface intuitive et moderne
- Prévisualisation en temps réel
- Feedback visuel lors des sauvegardes
- Messages d'erreur clairs et utiles

### NFR-4: Maintenance
- Documentation complète pour l'équipe éditoriale
- Guide de dépannage
- Workflow de publication documenté

## Technical Considerations

### Solution Choisie: Nuxt Content Studio ✅

**Décision**: Utilisation de **Nuxt Content Studio** (module officiel de Nuxt Content).

**Justification**:
- ✅ Intégration native avec Nuxt Content (déjà utilisé)
- ✅ Interface moderne et intuitive
- ✅ Synchronisation Git automatique
- ✅ Pas de base de données supplémentaire (utilise Git comme source de vérité)
- ✅ Gratuit et open source
- ✅ Support des collections existantes (`blog` et `events`)
- ✅ Upload d'images intégré
- ✅ Prévisualisation en temps réel

**Documentation**: https://content.nuxt.com/docs/studio/setup

### Architecture Technique

**Modules Nuxt requis**:
- `nuxt-studio` - Module d'interface d'administration (à installer)
- `@nuxt/content` - Déjà installé et configuré

**Configuration `nuxt.config.ts`**:
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'nuxt-studio'  // À ajouter
  ],
  
  studio: {
    route: '/studio',  // Route personnalisée (ou '/_studio' par défaut)
    repository: {
      provider: 'github',
      owner: 'KATBlackCoder',  // À vérifier
      repo: 'Femat',           // À vérifier
      branch: 'main'
    }
  }
})
```

**Variables d'environnement requises**:
```env
STUDIO_GITHUB_CLIENT_ID=your_client_id
STUDIO_GITHUB_CLIENT_SECRET=your_client_secret
```

**Configuration cPanel pour SSR**:
- Studio nécessite une route SSR pour l'authentification OAuth
- Les pages publiques restent en SSG (performance)
- Configuration hybride SSG/SSR nécessaire

### Défis Techniques

1. **SSG vs SSR**:
   - **Problème**: Studio nécessite SSR pour OAuth, mais le site est en SSG
   - **Solution**: Configuration hybride - SSG pour pages publiques, SSR pour route `/studio`
   - **Configuration**: Utiliser `nitro.prerender.exclude` pour exclure `/studio` du pré-rendu

2. **cPanel et SSR**:
   - **Problème**: cPanel est optimisé pour fichiers statiques
   - **Solution**: Vérifier si cPanel supporte Node.js/SSR, sinon considérer déploiement hybride (Vercel pour Studio, cPanel pour site statique)

3. **Authentification OAuth**:
   - **Problème**: Nécessite variables d'environnement sécurisées
   - **Solution**: Configurer variables d'environnement sur cPanel ou utiliser plateforme avec support SSR

### Alternatives Considérées (non retenues)

**Netlify CMS**:
- ❌ Nécessite configuration Git Gateway complexe
- ❌ Interface moins moderne que Studio
- ❌ Pas d'intégration native avec Nuxt Content

**Strapi**:
- ❌ Nécessite serveur séparé (coûts)
- ❌ Complexité accrue (deux applications)
- ❌ Pas d'intégration native avec Nuxt Content

**Édition manuelle Markdown**:
- ✅ Simple et fonctionnel
- ❌ Nécessite connaissances techniques
- ❌ Pas d'interface visuelle
- ❌ Workflow complexe pour non-techniques

## Design Guidelines

- Interface cohérente avec le design du site (si personnalisable)
- Navigation intuitive dans Studio
- Feedback visuel clair lors des actions
- Messages d'erreur utiles et actionnables

## Out of Scope (v1.0)

- Système de brouillons avec branches Git (futur)
- Workflow d'approbation multi-utilisateurs (futur)
- Historique des modifications dans Studio (utiliser Git)
- Édition collaborative en temps réel
- Personnalisation avancée de l'interface Studio

## Dependencies

- Site web de base (001-site-web-femat) - ✅ Complété
- Blog & Actualités (002-blog-actualites) - ✅ Complété
- Restructuration Content (006-restructuration-content) - ✅ Complété
- Déploiement cPanel (003-deploiement-cpanel) - ✅ Complété
- Module `@nuxt/content` - ✅ Déjà installé
- Module `nuxt-studio` - ⏳ À installer
- Compte GitHub avec repository `KATBlackCoder/Femat` - ✅ Existant
- Application OAuth GitHub - ⏳ À créer

## Open Questions

- [ ] Le cPanel supporte-t-il Node.js/SSR pour la route Studio ?
- [ ] Si non, faut-il considérer un déploiement hybride (Vercel pour Studio, cPanel pour site statique) ?
- [ ] Qui seront les utilisateurs autorisés à accéder à Studio ?
- [ ] Faut-il créer une documentation spécifique pour l'équipe éditoriale ?
- [ ] Comment gérer les conflits Git si quelqu'un édite manuellement pendant qu'un autre utilise Studio ?

## Success Criteria

### Critères de Succès - Développement Local (OBLIGATOIRE)
- [ ] Studio accessible sur `/studio` en développement local (`http://localhost:3000/studio`)
- [ ] Authentification GitHub fonctionnelle en local
- [ ] Édition des articles de blog fonctionnelle en local
- [ ] Édition des événements fonctionnelle en local
- [ ] Upload d'images fonctionnel en local
- [ ] Synchronisation Git automatique fonctionnelle en local
- [ ] Tous les tests passent sans erreur
- [ ] Pas de régression sur les fonctionnalités existantes
- [ ] Documentation technique créée

### Critères de Succès - Production (CONDITIONNEL)
- [ ] ✅ **PRÉREQUIS** : Tous les critères de développement local validés
- [ ] Studio accessible en production (si SSR supporté sur cPanel)
- [ ] Authentification GitHub fonctionnelle en production
- [ ] Toutes les fonctionnalités testées en production
- [ ] Documentation complète pour l'équipe éditoriale
- [ ] Équipe éditoriale formée

**Note importante** : Le déploiement en production n'est pas obligatoire. Si cPanel ne supporte pas SSR ou si des problèmes persistent, Studio peut être utilisé uniquement en développement local pour créer/modifier le contenu, puis déployer manuellement via Git.

