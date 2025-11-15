# Feature Specification: E-commerce FEMAT

**Feature ID**: `003-ecommerce`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P2 (après v1.0 du site de base)

## Overview

Création d'une boutique en ligne pour la FEMAT permettant de vendre des équipements de taekwondo, uniformes, accessoires, et produits promotionnels de la fédération.

## Context

La FEMAT souhaite créer une boutique en ligne pour :
- Vendre des équipements de taekwondo (dobok, protections, etc.)
- Vendre des produits promotionnels (t-shirts, casquettes, etc.)
- Générer des revenus pour la fédération
- Faciliter l'achat pour les membres et le public

## Functional Requirements

### FR-1: Catalogue de produits
**Description**: Page affichant tous les produits disponibles.

**Acceptance Criteria**:
- [ ] Liste/grille de produits avec images
- [ ] Nom, prix, description de chaque produit
- [ ] Filtres par catégorie (équipements, uniformes, accessoires, promotionnel)
- [ ] Recherche de produits
- [ ] Tri par prix, popularité, nouveauté
- [ ] Pagination

### FR-2: Page produit individuel
**Description**: Page détaillée pour chaque produit.

**Acceptance Criteria**:
- [ ] Galerie d'images du produit
- [ ] Nom, description détaillée, prix
- [ ] Options (taille, couleur, etc.)
- [ ] Stock disponible
- [ ] Bouton "Ajouter au panier"
- [ ] Produits similaires suggérés

### FR-3: Panier d'achat
**Description**: Système de panier pour gérer les produits sélectionnés.

**Acceptance Criteria**:
- [ ] Ajouter des produits au panier
- [ ] Voir le contenu du panier
- [ ] Modifier les quantités
- [ ] Supprimer des produits
- [ ] Calcul automatique du total
- [ ] Persistance du panier (localStorage)

### FR-4: Processus de commande
**Description**: Processus de checkout pour finaliser l'achat.

**Acceptance Criteria**:
- [ ] Formulaire de livraison
- [ ] Formulaire de facturation
- [ ] Choix du mode de paiement
- [ ] Récapitulatif de la commande
- [ ] Confirmation de commande
- [ ] Email de confirmation (futur)

### FR-5: Gestion des paiements
**Description**: Intégration d'un système de paiement sécurisé.

**Acceptance Criteria**:
- [ ] Support de plusieurs méthodes de paiement (carte, mobile money, virement)
- [ ] Paiement sécurisé (HTTPS, conformité PCI)
- [ ] Gestion des transactions
- [ ] Notifications de paiement

## Non-Functional Requirements

### NFR-1: Sécurité
- Conformité PCI DSS pour les paiements
- HTTPS obligatoire
- Protection contre les fraudes
- Validation des données

### NFR-2: Performance
- Chargement rapide des images produits
- Optimisation des requêtes
- Cache des produits populaires

### NFR-3: UX
- Processus de commande simple et intuitif
- Feedback clair à chaque étape
- Gestion des erreurs

## User Stories

### US-1: Membre achète un uniforme
**As a** membre  
**I want** acheter un dobok (uniforme)  
**So that** je puisse participer aux compétitions

### US-2: Visiteur achète un produit promotionnel
**As a** visiteur  
**I want** acheter un t-shirt FEMAT  
**So that** je puisse soutenir la fédération

## Technical Considerations

### Option 1: Solution E-commerce complète
- **Shopify** ou **WooCommerce** (WordPress)
- Intégration via iframe ou API
- Gestion complète des produits, commandes, paiements

### Option 2: Solution headless
- **Medusa.js** ou **Saleor** (open source)
- Backend API + Frontend Nuxt.js
- Plus de contrôle mais plus complexe

### Option 3: Solution custom
- Backend API avec Nuxt Server Routes
- Base de données pour produits/commandes
- Intégration paiement (Stripe, PayPal, etc.)
- Plus de flexibilité mais développement important

**Recommandation**: Commencer avec Option 1 (Shopify) pour v1.0 si budget disponible, sinon Option 3 (custom) avec Stripe pour paiements.

### Intégrations nécessaires
- **Paiement**: Stripe, PayPal, ou solution locale (Orange Money, Moov Money)
- **Livraison**: Intégration avec services de livraison locaux
- **Stock**: Gestion d'inventaire
- **Email**: Envoi de confirmations de commande

## Design Guidelines

- Design cohérent avec le reste du site
- Images produits de haute qualité
- Processus de commande clair et rassurant
- Affichage des prix en FCFA (Franc CFA)

## Out of Scope (v1.0)

- Gestion d'inventaire avancée
- Système de coupons/réductions
- Programme de fidélité
- Gestion des retours/échanges
- Multi-vendeurs

## Dependencies

- Site web de base (001-site-web-femat) doit être complété
- Système d'authentification (004-authentification) recommandé pour commandes

## Open Questions

- [ ] Quels produits seront vendus exactement ?
- [ ] Quel système de paiement utiliser (local vs international) ?
- [ ] Comment gérer les livraisons au Mali ?
- [ ] Qui gérera le stock et les commandes ?
- [ ] Budget disponible pour solution e-commerce ?

