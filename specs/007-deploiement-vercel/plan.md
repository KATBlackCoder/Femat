# Plan d'Implémentation: Déploiement avec Vercel

**Feature ID**: `007-deploiement-vercel`  
**Date**: 2025-01-27

## Vue d'ensemble

Ce document détaille le plan d'implémentation pour le déploiement du site sur Vercel.

## Étapes d'Implémentation

### Phase 1: Préparation du Projet
- [ ] Vérifier que le code est prêt pour la production
- [ ] Tester le build local (`pnpm build`)
- [ ] Vérifier la configuration Nuxt (`nuxt.config.ts`)
- [ ] Identifier toutes les variables d'environnement nécessaires
- [ ] Optimiser les images et assets

### Phase 2: Configuration Nuxt pour Production ✅
- [x] Configurer le mode SSG avec `nitro.prerender` (au lieu de `ssr: false` pour préserver Nuxt Content)
- [x] Configurer `crawlLinks: true` pour pré-rendre toutes les routes automatiquement
- [x] Activer les optimisations de build
- [x] Désactiver les source maps en production
- [x] Activer la minification (automatique avec Nuxt)

**Note importante**: Utiliser `nitro.prerender` avec `crawlLinks: true` au lieu de `ssr: false` pour préserver les fonctionnalités de Nuxt Content qui nécessitent un serveur pour accéder aux fichiers Markdown.

### Phase 3: Création du Projet Vercel
- [ ] Créer un compte Vercel (si nécessaire)
- [ ] Importer le repository Git dans Vercel
- [ ] Vérifier la détection automatique de Nuxt.js (automatique via `package.json`)
- [x] Créer `vercel.json` avec headers de sécurité (optionnel)

**Note importante**: 
- Vercel détecte automatiquement Nuxt.js et configure Nitro - pas besoin de configurer manuellement `buildCommand` ou `outputDirectory`
- Le fichier `vercel.json` est optionnel et ne doit être utilisé que pour des configurations spécifiques (headers de sécurité, redirects, etc.)

### Phase 4: Configuration des Variables d'Environnement
- [x] Lister toutes les variables nécessaires
- [ ] Ajouter les variables dans Vercel Dashboard (si nécessaire)
- [ ] Configurer les variables pour preview/production (si nécessaire)
- [x] Documenter les variables

### Phase 5: Premier Déploiement
- [ ] Déployer en preview d'abord
- [ ] Vérifier que le site fonctionne correctement
- [ ] Tester toutes les pages
- [ ] Vérifier les images et assets
- [ ] Déployer en production après validation

### Phase 6: Optimisations de Performance
- [ ] Vérifier le score Lighthouse
- [ ] Optimiser les images (Nuxt Image si utilisé)
- [ ] Configurer les headers de cache
- [ ] Optimiser les assets statiques
- [ ] Vérifier la compression

### Phase 7: Configuration du Domaine (Optionnel)
- [ ] Choisir le domaine personnalisé
- [ ] Ajouter le domaine dans Vercel Dashboard
- [ ] Configurer les enregistrements DNS
- [ ] Vérifier la configuration HTTPS
- [ ] Configurer la redirection www (si nécessaire)

### Phase 8: Monitoring et Analytics
- [ ] Activer Vercel Analytics (optionnel)
- [ ] Configurer Google Analytics (si nécessaire)
- [ ] Vérifier les métriques de performance
- [ ] Configurer les alertes (si nécessaire)

### Phase 9: Tests Finaux
- [ ] Tester le déploiement automatique (push sur `main`)
- [ ] Tester les preview deployments (autres branches)
- [ ] Tester les preview deployments (Pull Requests)
- [ ] Vérifier toutes les fonctionnalités en production
- [ ] Valider les performances finales

## Checklist de Validation

### Configuration
- [ ] Projet configuré dans Vercel
- [x] Build command détecté automatiquement (Vercel détecte `pnpm build`)
- [x] Output directory détecté automatiquement (Vercel détecte `.output/public` pour SSG)
- [ ] Variables d'environnement configurées (si nécessaire)
- [ ] Domaine personnalisé configuré (si applicable)

### Fonctionnalités
- [ ] Site accessible publiquement
- [ ] Toutes les pages fonctionnent
- [ ] Images et assets chargent
- [ ] Navigation fonctionne
- [ ] Blog fonctionne (si applicable)
- [ ] Événements fonctionnent (si applicable)

### Performance
- [ ] Score Lighthouse > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Images optimisées

### Sécurité
- [ ] HTTPS activé automatiquement
- [ ] Certificats SSL valides
- [ ] Headers de sécurité configurés
- [ ] Pas d'erreurs de sécurité

### Déploiement
- [ ] Déploiement automatique fonctionnel
- [ ] Preview deployments fonctionnels
- [ ] Notifications configurées (si nécessaire)

## Notes

- **Détection automatique**: Vercel détecte automatiquement Nuxt.js via `package.json` et configure Nitro sans configuration supplémentaire
- **Pas besoin de `vercel.json`**: Le fichier `vercel.json` est optionnel et ne doit être utilisé que pour des configurations spécifiques (headers de sécurité, redirects, etc.)
- **Build automatique**: Vercel utilise automatiquement `pnpm build` et détecte `.output/public` pour SSG
- **SSG avec Nuxt Content**: Utiliser `nitro.prerender` avec `crawlLinks: true` au lieu de `ssr: false` pour préserver les fonctionnalités de Nuxt Content
- Toujours tester en preview avant production
- Vérifier les logs Vercel en cas d'erreur
- Le plan gratuit Vercel est suffisant pour démarrer
- HTTPS est automatique et gratuit
- CDN global inclus automatiquement

## Ressources

- [Documentation Nuxt Vercel](https://nuxt.com/deploy/vercel)
- [Documentation Vercel](https://vercel.com/docs)
- Guide existant: `specs/DEPLOYMENT.md`

