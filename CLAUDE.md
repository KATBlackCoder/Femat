# FEMAT - Fédération Malienne de Taekwondo

Ce document sert de référence centrale pour le développement du site web de la Fédération Malienne de Taekwondo (FEMAT).

## Contexte du Projet

Le site web de la FEMAT doit présenter la fédération, ses activités, ses événements, et fournir des informations aux membres et au public. Le projet inclut également des fonctionnalités avancées : blog, e-commerce, authentification, et gestion centralisée des dojos et membres.

## Stack Technique

- **Framework**: Nuxt.js 4.x
- **UI Library**: Nuxt UI 4.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via Nuxt UI)
- **Déploiement**: Vercel (SSG) - https://nuxt.com/deploy/vercel
- **Base de données**: À déterminer (Supabase recommandé pour authentification)
- **E-commerce**: À déterminer (Shopify ou solution custom)

## Structure du Projet

- `app/` - Application Nuxt (pages, composants, layouts)
- `public/` - Assets statiques (logo, favicons)
- `specs/` - Spécifications de fonctionnalités (Spec-Driven Development)
  - `001-site-web-femat/` - Site web de base (v1.0)
  - `002-blog-actualites/` - Blog et actualités (v2.0)
  - `003-ecommerce/` - Boutique en ligne (v2.1)
  - `004-authentification/` - Authentification et membres (v3.0)
  - `005-gestion-dojos-membres/` - Gestion des dojos et membres (v3.1)
- `.specify/` - Configuration spec-kit (constitution, templates, scripts)

## Fonctionnalités Planifiées

### Phase 1: Site Web de Base (v1.0) - EN COURS
- Page d'accueil, À propos, Événements, Contact
- Navigation et layout responsive
- Intégration logo FEMAT
- Lien vers Facebook: https://www.facebook.com/taekwondomali

### Phase 2: Blog & Actualités (v2.0)
- Système de blog avec articles
- Catégories et tags
- Recherche d'articles

### Phase 3: E-commerce (v2.1)
- Catalogue de produits
- Panier d'achat
- Processus de commande
- Gestion des paiements

### Phase 4: Authentification (v3.0)
- Inscription/connexion
- Profils utilisateurs
- Gestion des grades (ceintures)
- Gestion des rôles (maître, élève, admin)

### Phase 5: Gestion des Dojos & Membres (v3.1)
- Carte interactive des dojos au Mali
- Liste de tous les dojos
- Annuaire centralisé des membres
- Gestion des grades par dojo

Voir `specs/ROADMAP.md` pour plus de détails.

## Principes de Développement

Voir `.specify/memory/constitution.md` pour les principes fondamentaux du projet.

## Réseaux Sociaux

- **Facebook**: https://www.facebook.com/taekwondomali
  - Lien à intégrer dans le footer/header
  - Source potentielle pour recenser membres et dojos

## Commandes Spec-Kit Disponibles

- `/speckit.specify` - Créer une nouvelle spécification de fonctionnalité
- `/speckit.plan` - Générer un plan d'implémentation
- `/speckit.tasks` - Générer les tâches d'implémentation
- `/speckit.implement` - Implémenter les fonctionnalités

## Points à Clarifier

Voir `specs/CLARIFICATIONS-NEEDED.md` pour la liste complète des informations nécessaires avant l'implémentation.

**Priorité pour démarrer Phase 1**:
- Informations de contact (adresse, téléphone, email)
- Contenu des pages (À propos, message d'accueil)
- Événements à afficher
- Photos disponibles

