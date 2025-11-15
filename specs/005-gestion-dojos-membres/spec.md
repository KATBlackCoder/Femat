# Feature Specification: Gestion Centralisée des Dojos et Membres

**Feature ID**: `005-gestion-dojos-membres`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P2 (dépend de 004-authentification)

## Overview

Système centralisé pour gérer et afficher tous les dojos au Mali ainsi que tous les membres (maîtres et élèves) avec leurs grades respectifs.

## Context

La FEMAT a besoin d'un système centralisé pour :
- Recenser tous les dojos de taekwondo au Mali
- Centraliser les informations sur tous les membres
- Faciliter la communication entre dojos
- Suivre la progression des membres
- Améliorer la gestion administrative de la fédération

## Functional Requirements

### FR-1: Carte interactive des dojos
**Description**: Carte du Mali affichant tous les dojos avec leur localisation.

**Acceptance Criteria**:
- [ ] Carte interactive (Google Maps ou OpenStreetMap)
- [ ] Marqueurs pour chaque dojo
- [ ] Cliquer sur un marqueur affiche les infos du dojo
- [ ] Filtrage par région/ville
- [ ] Recherche par nom de dojo
- [ ] Liste des dojos à côté de la carte

### FR-2: Liste des dojos
**Description**: Page listant tous les dojos avec leurs informations.

**Acceptance Criteria**:
- [ ] Liste de tous les dojos
- [ ] Informations: nom, adresse, ville, maître, contact
- [ ] Filtrage par région, ville
- [ ] Recherche par nom
- [ ] Tri par nom, ville, nombre de membres
- [ ] Pagination si nécessaire

### FR-3: Page détaillée d'un dojo
**Description**: Page présentant un dojo en détail.

**Acceptance Criteria**:
- [ ] Informations complètes du dojo
- [ ] Maître responsable avec photo et grade
- [ ] Liste des membres du dojo
- [ ] Horaires d'entraînement
- [ ] Contact (téléphone, email, adresse)
- [ ] Carte avec localisation précise
- [ ] Photos du dojo (optionnel)

### FR-4: Annuaire des membres
**Description**: Annuaire centralisé de tous les membres de la FEMAT.

**Acceptance Criteria**:
- [ ] Liste de tous les membres (maîtres et élèves)
- [ ] Informations affichées: nom, prénom, grade, dojo
- [ ] Filtrage par dojo, grade, rôle (maître/élève)
- [ ] Recherche par nom
- [ ] Tri par nom, grade, dojo
- [ ] Pagination
- [ ] Protection des données personnelles (email/téléphone masqués sauf si autorisé)

### FR-5: Profil membre détaillé
**Description**: Page de profil pour chaque membre.

**Acceptance Criteria**:
- [ ] Informations personnelles (nom, prénom, photo)
- [ ] Grade actuel avec badge visuel
- [ ] Historique des grades (timeline)
- [ ] Dojo d'appartenance
- [ ] Rôle (maître/élève)
- [ ] Date d'inscription
- [ ] Statistiques (années de pratique, compétitions, etc.)

### FR-6: Gestion des grades
**Description**: Système de gestion et affichage des grades.

**Acceptance Criteria**:
- [ ] Liste de tous les grades possibles (ceintures)
- [ ] Badge/icône pour chaque grade
- [ ] Description de chaque grade
- [ ] Filtrage des membres par grade
- [ ] Statistiques par grade (nombre de membres par grade)

### FR-7: Administration des dojos (futur)
**Description**: Interface d'administration pour gérer les dojos.

**Acceptance Criteria**:
- [ ] Ajouter/modifier/supprimer un dojo
- [ ] Assigner un maître à un dojo
- [ ] Gérer les membres d'un dojo
- [ ] Valider les nouvelles inscriptions

### FR-8: Administration des membres (futur)
**Description**: Interface d'administration pour gérer les membres.

**Acceptance Criteria**:
- [ ] Attribuer/modifier les grades
- [ ] Assigner un membre à un dojo
- [ ] Changer le rôle d'un membre
- [ ] Gérer les permissions

## Non-Functional Requirements

### NFR-1: Performance
- Chargement rapide de la carte
- Optimisation des requêtes pour grandes listes
- Cache des données fréquemment accédées

### NFR-2: Confidentialité
- Protection des données personnelles
- Consentement pour affichage public
- Conformité RGPD si applicable

### NFR-3: Accessibilité
- Carte accessible au clavier
- Alternatives textuelles pour la carte
- Navigation claire

## User Stories

### US-1: Visiteur trouve un dojo
**As a** visiteur  
**I want** trouver un dojo près de chez moi sur une carte  
**So that** je puisse commencer le taekwondo

### US-2: Membre consulte l'annuaire
**As a** membre  
**I want** voir tous les membres de la fédération  
**So that** je puisse connaître la communauté

### US-3: Maître gère son dojo
**As a** maître  
**I want** voir la liste de mes élèves et leurs grades  
**So that** je puisse suivre leur progression

### US-4: Administrateur gère les dojos
**As an** administrateur  
**I want** ajouter de nouveaux dojos et gérer les membres  
**So that** la base de données soit à jour

## Technical Considerations

### Carte interactive

**Option 1: Google Maps**
- API Google Maps JavaScript
- Marqueurs personnalisés
- Coût selon usage (gratuit jusqu'à un certain nombre de requêtes)

**Option 2: Leaflet + OpenStreetMap**
- Open source et gratuit
- Plus de contrôle
- Nécessite serveur de tuiles ou utilisation de tuiles publiques

**Recommandation**: Option 2 (Leaflet) pour éviter les coûts, Option 1 si budget disponible.

### Base de données

**Structure nécessaire**:
- Table `dojos` avec coordonnées GPS
- Table `users` avec référence au dojo
- Table `grades` avec hiérarchie
- Relations appropriées

### Intégration

- Dépend de 004-authentification pour l'identification des membres
- Utilise les données des membres authentifiés
- API pour récupérer les données des dojos et membres

## Design Guidelines

- Carte claire et lisible
- Marqueurs visuellement distincts
- Liste des dojos avec design de cartes
- Annuaire avec design de liste/grid
- Badges de grades visuellement attractifs

## Out of Scope (v1.0)

- Application mobile dédiée
- Notifications en temps réel
- Chat entre membres
- Système de réservation de cours

## Dependencies

- 004-authentification doit être complété
- Base de données avec tables dojos, users, grades
- Solution de carte choisie

## Open Questions

- [ ] Combien de dojos au Mali à recenser initialement ?
- [ ] Qui fournira les coordonnées GPS des dojos ?
- [ ] Faut-il une validation manuelle pour ajouter un dojo ?
- [ ] Quels sont les grades exacts à utiliser (système ITF, WTF, etc.) ?
- [ ] Faut-il intégrer avec Facebook pour récupérer les membres existants ?

## Références

- Page Facebook FEMAT: https://www.facebook.com/taekwondomali
- Cette page peut servir de source pour recenser les membres et dojos existants

