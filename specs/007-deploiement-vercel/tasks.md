# Tâches: Déploiement avec Vercel

**Feature ID**: `007-deploiement-vercel`  
**Date**: 2025-01-27  
**Status**: En cours

## Vue d'ensemble

Ce document liste toutes les tâches nécessaires pour déployer le site FEMAT sur Vercel.

## Tâches Techniques

### Phase 1: Préparation du Projet ✅

- [x] Vérifier que le code est prêt pour la production
- [x] Tester le build local (`pnpm build`)
- [x] Vérifier la configuration Nuxt (`nuxt.config.ts`)
- [x] Identifier toutes les variables d'environnement nécessaires
- [x] Optimiser les images et assets

### Phase 2: Configuration Nuxt pour Production ✅

- [x] Configurer le mode SSG avec `nitro.prerender`
- [x] Configurer `crawlLinks: true` pour pré-rendre toutes les routes
- [x] Activer les optimisations de build (minification, etc.)
- [x] Désactiver les source maps en production
- [x] Configurer les optimisations de performance

**Fichiers modifiés**:
- `nuxt.config.ts` - Optimisations de production ajoutées

**Note importante**: Utiliser `nitro.prerender` avec `crawlLinks: true` au lieu de `ssr: false` pour préserver les fonctionnalités de Nuxt Content.

### Phase 3: Configuration Vercel (Optionnel)

- [x] Créer le fichier `vercel.json` avec headers de sécurité (optionnel)
- [x] Configurer les headers de sécurité (X-Content-Type-Options, X-Frame-Options, etc.)
- [x] Documenter que Vercel détecte automatiquement Nuxt.js

**Fichiers créés**:
- `vercel.json` - Headers de sécurité uniquement (optionnel)

**Note importante**: 
- Vercel détecte automatiquement Nuxt.js et configure Nitro - pas besoin de `buildCommand`, `outputDirectory` ou `framework` dans `vercel.json`
- Le fichier `vercel.json` est optionnel et ne doit être utilisé que pour des configurations spécifiques (headers, redirects, etc.)

### Phase 4: Variables d'Environnement ✅

- [x] Créer `.env.example` pour documenter les variables
- [x] Documenter les variables pour le formulaire de contact (si API ajoutée)

**Variables identifiées**:
- Aucune variable nécessaire pour l'instant (formulaire de contact simule l'envoi)
- Variables pour le formulaire de contact (futur, si API ajoutée):
  - `RESEND_API_KEY` (si Resend utilisé)
  - `CONTACT_EMAIL`
  - `CONTACT_PHONE`

**Fichiers créés**:
- `.env.example` - Template des variables d'environnement

### Phase 5: Documentation

- [ ] Documenter les étapes de déploiement dans `tasks.md`
- [ ] Créer un guide de déploiement rapide
- [ ] Documenter les commandes Vercel CLI (optionnel)

### Phase 6: Tests Locaux

- [ ] Tester le build de production localement (`pnpm build`)
- [ ] Vérifier que toutes les routes sont générées
- [ ] Vérifier que les images et assets sont correctement référencés
- [ ] Tester le preview local (`pnpm preview`)

### Phase 7: Déploiement Vercel (Manuel - à faire sur Vercel Dashboard)

- [ ] Créer un compte Vercel (si nécessaire)
- [ ] Importer le repository Git dans Vercel
- [ ] Vérifier la détection automatique de Nuxt.js
- [ ] Configurer les variables d'environnement (si nécessaire)
- [ ] Déployer en preview d'abord
- [ ] Vérifier que le site fonctionne correctement
- [ ] Tester toutes les pages
- [ ] Vérifier les images et assets
- [ ] Déployer en production après validation

### Phase 8: Optimisations Post-Déploiement

- [ ] Vérifier le score Lighthouse
- [ ] Optimiser les images si nécessaire (Nuxt Image déjà configuré)
- [ ] Vérifier les headers de cache
- [ ] Vérifier la compression
- [ ] Tester les performances

### Phase 9: Configuration Domaine Personnalisé (Optionnel)

- [ ] Choisir le domaine personnalisé
- [ ] Ajouter le domaine dans Vercel Dashboard
- [ ] Configurer les enregistrements DNS
- [ ] Vérifier la configuration HTTPS
- [ ] Configurer la redirection www (si nécessaire)

## Checklist de Validation

### Configuration
- [ ] Projet configuré dans Vercel
- [ ] Build command correct (automatique)
- [ ] Output directory correct (automatique)
- [ ] Variables d'environnement configurées (si nécessaire)
- [ ] Domaine personnalisé configuré (si applicable)

### Fonctionnalités
- [ ] Site accessible publiquement
- [ ] Toutes les pages fonctionnent
- [ ] Images et assets chargent
- [ ] Navigation fonctionne
- [ ] Blog fonctionne
- [ ] Événements fonctionnent
- [ ] Formulaire de contact fonctionne

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
- Les déploiements sont automatiques à chaque push sur `main`
- Les Preview Deployments permettent de tester avant production
- Le plan gratuit Vercel est suffisant pour démarrer
- HTTPS est automatique et gratuit
- CDN global inclus automatiquement

## Commandes Utiles

```bash
# Build local
pnpm build

# Preview local
pnpm preview

# Installer Vercel CLI (optionnel)
pnpm add -D vercel

# Déployer en preview (optionnel)
pnpm vercel

# Déployer en production (optionnel)
pnpm vercel --prod
```

## Ressources

- [Documentation Nuxt Vercel](https://nuxt.com/deploy/vercel)
- [Documentation Vercel](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- Guide existant: `specs/DEPLOYMENT.md`

