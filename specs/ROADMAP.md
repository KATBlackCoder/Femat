# Roadmap FEMAT - Plan de Développement

**Date de création**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

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

## Phase 3: E-commerce (v2.1)

**Priorité**: P2 (Important)  
**Statut**: Planifié  
**Spécification**: `003-ecommerce`  
**Dépendances**: Phase 1 complétée, Phase 2 recommandée

### Fonctionnalités

- Catalogue de produits
- Panier d'achat
- Processus de commande
- Gestion des paiements
- Page produit individuelle

### Objectifs

- Vendre des équipements de taekwondo
- Vendre des produits promotionnels
- Générer des revenus pour la fédération

## Phase 4: Authentification & Membres (v3.0)

**Priorité**: P2 (Important)  
**Statut**: Planifié  
**Spécification**: `004-authentification`  
**Dépendances**: Phase 1 complétée

### Fonctionnalités

- Système d'inscription/connexion
- Profils utilisateurs
- Gestion des grades (ceintures)
- Gestion des rôles (maître, élève, admin)
- Récupération de mot de passe

### Objectifs

- Identifier les membres de la fédération
- Gérer les profils avec grades
- Sécuriser l'accès à certaines fonctionnalités
- Base pour gestion des dojos

## Phase 5: Gestion des Dojos & Membres (v3.1)

**Priorité**: P2 (Important)  
**Statut**: Planifié  
**Spécification**: `005-gestion-dojos-membres`  
**Dépendances**: Phase 4 complétée

### Fonctionnalités

- Carte interactive des dojos au Mali
- Liste de tous les dojos
- Page détaillée par dojo
- Annuaire centralisé des membres
- Gestion des grades par dojo
- Filtrage et recherche

### Objectifs

- Centraliser les informations sur tous les dojos
- Faciliter la recherche d'un dojo
- Créer un annuaire des membres
- Améliorer la gestion administrative

## Ordre de Développement Recommandé

1. **Phase 1** (v1.0) - Site web de base
   - Fondation nécessaire pour tout le reste
   - Peut être déployé rapidement

2. **Phase 4** (v3.0) - Authentification
   - Nécessaire pour e-commerce et gestion des membres
   - Peut être développée en parallèle de Phase 2

3. **Phase 2** (v2.0) - Blog
   - Améliore le SEO et l'engagement
   - Peut être développée en parallèle de Phase 4

4. **Phase 5** (v3.1) - Gestion des Dojos & Membres
   - Dépend de l'authentification
   - Fonctionnalité importante pour la fédération

5. **Phase 3** (v2.1) - E-commerce
   - Peut être développée après authentification
   - Génère des revenus

## Dépendances entre Fonctionnalités

```
001-site-web-femat (Phase 1)
    ├── 002-blog-actualites (Phase 2) - Optionnel
    ├── 003-ecommerce (Phase 3) - Optionnel
    └── 004-authentification (Phase 4)
            └── 005-gestion-dojos-membres (Phase 5)
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
- [ ] Boutique en ligne fonctionnelle
- [ ] Paiements sécurisés
- [ ] Gestion des commandes

### Phase 4 (v3.0)
- [ ] Authentification fonctionnelle
- [ ] Gestion des profils
- [ ] Système de grades opérationnel

### Phase 5 (v3.1)
- [ ] Tous les dojos recensés
- [ ] Carte interactive fonctionnelle
- [ ] Annuaire des membres complet

## Notes

- Les phases peuvent être développées en parallèle si les dépendances le permettent
- Chaque phase doit être testée et validée avant de passer à la suivante
- Les spécifications détaillées sont dans les dossiers `specs/00X-*/`
- La constitution du projet (`.specify/memory/constitution.md`) guide toutes les décisions

## Ressources

- Page Facebook FEMAT: https://www.facebook.com/taekwondomali
- Spécifications détaillées dans `specs/`
- Constitution du projet: `.specify/memory/constitution.md`

