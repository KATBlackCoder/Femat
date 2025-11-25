# Roadmap FEMAT - Plan de Développement

**Date de création**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27 (Ajout Phase 5: Nuxt Content Studio)

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

## Phase 4: Déploiement avec cPanel (v2.2)

**Priorité**: P1 (Critique)  
**Statut**: Planifié  
**Spécification**: `003-deploiement-cpanel`  
**Dépendances**: Phase 1 complétée, Phase 2 complétée, Phase 3 recommandée

### Fonctionnalités

- Configuration Nuxt pour SSG (Static Site Generation)
- Génération des fichiers statiques
- Configuration `.htaccess` pour routing
- Upload des fichiers sur cPanel
- Configuration du domaine `femat.ml`
- Optimisations de performance pour production
- Configuration SSL/HTTPS

### Objectifs

- Site web accessible publiquement sur `https://www.femat.ml`
- Déploiement manuel mais documenté
- Performance optimale en production
- Base pour mise en ligne officielle

## Phase 5: Intégration Nuxt Content Studio (v2.3)

**Priorité**: P2 (Important)  
**Statut**: Planifié  
**Spécification**: `004-nuxt-content-studio`  
**Dépendances**: Phase 1 complétée, Phase 2 complétée, Phase 3 complétée, Phase 4 complétée

### Fonctionnalités

- Interface d'administration visuelle pour édition de contenu
- Authentification GitHub OAuth
- Édition des articles de blog via interface
- Édition des événements via interface
- Upload et gestion des images
- Synchronisation automatique avec Git
- Prévisualisation en temps réel

### Objectifs

- Faciliter la gestion de contenu pour l'équipe éditoriale
- Réduire la barrière technique pour publier du contenu
- Améliorer le workflow de publication
- Interface moderne et intuitive

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

4. **Phase 4** (v2.2) - Déploiement avec cPanel
   - Mise en ligne du site sur `femat.ml`
   - Déploiement manuel mais documenté
   - Site accessible publiquement

5. **Phase 5** (v2.3) - Intégration Nuxt Content Studio
   - Interface d'administration pour équipe éditoriale
   - Édition visuelle du contenu
   - Amélioration du workflow de publication

## Dépendances entre Fonctionnalités

```
001-site-web-femat (Phase 1)
    ├── 002-blog-actualites (Phase 2)
    │       └── 006-restructuration-content (Phase 3)
    ├── 003-deploiement-cpanel (Phase 4)
    └── 004-nuxt-content-studio (Phase 5)
            └── (Dépend de Phase 1, 2, 3, 4)
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
- [ ] Site déployé sur cPanel
- [ ] Fichiers statiques générés et uploadés
- [ ] Fichier `.htaccess` configuré
- [ ] Site accessible sur `https://www.femat.ml`
- [ ] Performance optimisée en production
- [ ] SSL/HTTPS configuré
- [ ] Documentation de déploiement créée

### Phase 5 (v2.3)
- [ ] Nuxt Content Studio installé et configuré
- [ ] Authentification GitHub OAuth fonctionnelle
- [ ] Édition blog fonctionnelle via Studio
- [ ] Édition events fonctionnelle via Studio
- [ ] Upload d'images fonctionnel
- [ ] Synchronisation Git automatique fonctionnelle
- [ ] Studio accessible en production (si SSR supporté)
- [ ] Documentation pour équipe éditoriale créée
- [ ] Équipe éditoriale formée

## Notes

- Les phases peuvent être développées en parallèle si les dépendances le permettent
- Chaque phase doit être testée et validée avant de passer à la suivante
- Les spécifications détaillées sont dans les dossiers `specs/00X-*/`
- La constitution du projet (`.specify/memory/constitution.md`) guide toutes les décisions

## Ressources

- Page Facebook FEMAT: https://www.facebook.com/taekwondomali
- Spécifications détaillées dans `specs/`
- Constitution du projet: `.specify/memory/constitution.md`

