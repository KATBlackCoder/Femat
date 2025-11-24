# Roadmap FEMAT - Plan de Développement

**Date de création**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27 (Réorganisation des specs)

## Vue d'ensemble

Ce document présente la roadmap de développement du site web de la Fédération Malienne de Taekwondo (FEMAT), organisée en phases et fonctionnalités.

## Phase 1: Site Web de Base (v1.0) - EN COURS

**Priorité**: P1 (Critique)  
**Statut**: En développement  
**Spécification**: `001-site-web-femat`

### Fonctionnalités

- ✅ Page d'accueil
- ✅ Page À propos
- ✅ Page Événements
- ✅ Page Contact
- ✅ Navigation et Layout
- ✅ Intégration logo FEMAT
- ✅ Lien vers Facebook

### Objectifs

- Site web fonctionnel et accessible
- Présentation de la fédération
- Informations de base pour visiteurs et membres
- Base solide pour fonctionnalités futures

## Phase 2: Blog & Actualités (v2.0)

**Priorité**: P2 (Important)  
**Statut**: Planifié  
**Spécification**: `002-blog-actualites`  
**Dépendances**: Phase 1 complétée

### Fonctionnalités

- Système de blog avec articles
- Catégories et tags
- Page d'article individuel
- Liste des articles avec filtres
- Recherche d'articles

### Objectifs

- Partager les actualités de la fédération
- Améliorer le SEO avec du contenu régulier
- Créer une communauté autour du taekwondo

## Phase 3: Restructuration des Logiques de Content (v2.1)

**Priorité**: P1 (Critique)  
**Statut**: Planifié  
**Spécification**: `006-restructuration-content`  
**Dépendances**: Phase 1 complétée, Phase 2 complétée

### Fonctionnalités

- Refactorisation des composables de content (useBlog, useEvents)
- Optimisation des requêtes Nuxt Content
- Standardisation des types et schémas
- Amélioration de la gestion des erreurs
- Documentation des patterns de content

### Objectifs

- Code plus maintenable et performant
- Réduction de la duplication de code
- Meilleure gestion des erreurs
- Base solide pour futures fonctionnalités

## Phase 4: Déploiement avec Vercel (v2.2)

**Priorité**: P1 (Critique)  
**Statut**: Planifié  
**Spécification**: `007-deploiement-vercel`  
**Dépendances**: Phase 1 complétée, Phase 2 complétée, Phase 3 recommandée

### Fonctionnalités

- Configuration Vercel pour Nuxt.js
- Déploiement automatique via Git
- Configuration des variables d'environnement
- Domaine personnalisé (optionnel)
- Optimisations de performance pour production

### Objectifs

- Site web accessible publiquement
- Déploiement automatisé
- Performance optimale en production
- Base pour mise en ligne officielle

## Ordre de Développement Recommandé

1. **Phase 1** (v1.0) - Site web de base
   - Fondation nécessaire pour tout le reste
   - Peut être déployé rapidement

2. **Phase 2** (v2.0) - Blog & Actualités
   - Améliore le SEO et l'engagement
   - Contenu dynamique pour la fédération

3. **Phase 3** (v2.1) - Restructuration des Logiques de Content
   - Améliore la maintenabilité du code
   - Optimise les performances
   - Préparation pour la mise en production

4. **Phase 4** (v2.2) - Déploiement avec Vercel
   - Mise en ligne du site
   - Déploiement automatisé
   - Site accessible publiquement

## Dépendances entre Fonctionnalités

```
001-site-web-femat (Phase 1)
    ├── 002-blog-actualites (Phase 2)
    │       └── 006-restructuration-content (Phase 3)
    │               └── 007-deploiement-vercel (Phase 4)
```

## Critères de Succès

### Phase 1 (v1.0)
- [ ] Site web déployé et accessible
- [ ] Toutes les pages fonctionnelles
- [ ] Score Lighthouse > 90
- [ ] Accessibilité WCAG 2.1 AA
- [ ] Responsive sur tous les appareils

### Phase 2 (v2.0)
- [ ] Système de blog fonctionnel
- [ ] Articles publiables facilement
- [ ] SEO optimisé pour articles

### Phase 3 (v2.1)
- [ ] Composables refactorisés et optimisés
- [ ] Types et schémas standardisés
- [ ] Gestion d'erreurs améliorée
- [ ] Documentation complète

### Phase 4 (v2.2)
- [ ] Site déployé sur Vercel
- [ ] Déploiement automatique configuré
- [ ] Performance optimisée en production
- [ ] Domaine personnalisé configuré (optionnel)

## Notes

- Les phases peuvent être développées en parallèle si les dépendances le permettent
- Chaque phase doit être testée et validée avant de passer à la suivante
- Les spécifications détaillées sont dans les dossiers `specs/00X-*/`
- La constitution du projet (`.specify/memory/constitution.md`) guide toutes les décisions

## Ressources

- Page Facebook FEMAT: https://www.facebook.com/taekwondomali
- Spécifications détaillées dans `specs/`
- Constitution du projet: `.specify/memory/constitution.md`

