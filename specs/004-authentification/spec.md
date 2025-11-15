# Feature Specification: Authentification & Gestion des Membres

**Feature ID**: `004-authentification`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P2 (nécessaire pour e-commerce et gestion des membres)

## Overview

Création d'un système d'authentification pour les membres de la FEMAT avec gestion des profils, grades, et rôles (maîtres, élèves).

## Context

La FEMAT a besoin d'un système d'authentification pour :
- Identifier les membres de la fédération
- Gérer les profils avec grades et rôles
- Sécuriser l'accès à certaines fonctionnalités
- Permettre la gestion des dojos et membres
- Faciliter la communication avec les membres

## Functional Requirements

### FR-1: Inscription
**Description**: Système d'inscription pour nouveaux membres.

**Acceptance Criteria**:
- [ ] Formulaire d'inscription avec validation
- [ ] Champs: nom, prénom, email, téléphone, date de naissance
- [ ] Choix du dojo d'appartenance
- [ ] Validation de l'email
- [ ] Création du compte avec rôle "élève" par défaut

### FR-2: Connexion
**Description**: Système de connexion pour membres existants.

**Acceptance Criteria**:
- [ ] Formulaire de connexion (email/mot de passe)
- [ ] Gestion des sessions
- [ ] "Se souvenir de moi"
- [ ] Récupération de mot de passe
- [ ] Protection contre les attaques brute force

### FR-3: Profil utilisateur
**Description**: Page de profil pour chaque membre.

**Acceptance Criteria**:
- [ ] Affichage des informations du membre
- [ ] Grade actuel affiché
- [ ] Historique des grades
- [ ] Dojo d'appartenance
- [ ] Édition du profil (informations personnelles)
- [ ] Photo de profil (optionnel)

### FR-4: Gestion des grades
**Description**: Système de gestion des grades (ceintures) pour les membres.

**Acceptance Criteria**:
- [ ] Affichage du grade actuel
- [ ] Historique des passages de grade
- [ ] Badge/icône représentant le grade
- [ ] Filtrage des membres par grade
- [ ] Attribution de grades par les maîtres (futur)

### FR-5: Gestion des rôles
**Description**: Système de rôles (maître, élève, administrateur).

**Acceptance Criteria**:
- [ ] Rôle "Élève" par défaut
- [ ] Rôle "Maître" pour les instructeurs
- [ ] Rôle "Administrateur" pour la gestion
- [ ] Permissions basées sur les rôles
- [ ] Attribution des rôles par les administrateurs

### FR-6: Gestion des dojos
**Description**: Système de gestion et affichage des dojos au Mali.

**Acceptance Criteria**:
- [ ] Liste de tous les dojos au Mali
- [ ] Carte interactive avec localisation des dojos
- [ ] Informations de chaque dojo (nom, adresse, maître, contact)
- [ ] Liste des membres par dojo
- [ ] Filtrage par région/ville
- [ ] Page détaillée pour chaque dojo

### FR-7: Annuaire des membres
**Description**: Annuaire centralisé de tous les membres de la FEMAT.

**Acceptance Criteria**:
- [ ] Liste de tous les membres (maîtres et élèves)
- [ ] Filtrage par dojo, grade, rôle
- [ ] Recherche de membres
- [ ] Affichage des informations publiques (nom, grade, dojo)
- [ ] Protection des données personnelles (email, téléphone privés)

## Non-Functional Requirements

### NFR-1: Sécurité
- Mots de passe hashés (bcrypt/argon2)
- Protection CSRF
- Validation des entrées
- Rate limiting sur les endpoints d'authentification
- HTTPS obligatoire

### NFR-2: Confidentialité
- Conformité RGPD (si applicable)
- Données personnelles protégées
- Consentement pour affichage public

### NFR-3: Performance
- Sessions efficaces
- Cache des données fréquemment accédées

## User Stories

### US-1: Nouveau membre s'inscrit
**As a** nouveau membre  
**I want** créer un compte sur le site  
**So that** je puisse accéder aux fonctionnalités réservées aux membres

### US-2: Membre consulte son profil
**As a** membre  
**I want** voir mon profil et mon grade  
**So that** je puisse suivre ma progression

### US-3: Visiteur trouve un dojo
**As a** visiteur  
**I want** trouver un dojo près de chez moi  
**So that** je puisse commencer le taekwondo

### US-4: Maître gère ses élèves
**As a** maître  
**I want** voir la liste de mes élèves et leurs grades  
**So that** je puisse suivre leur progression

## Technical Considerations

### Solution d'authentification

**Option 1: Nuxt Auth (recommandé)**
- Module `@sidebase/nuxt-auth` ou `nuxt-auth-utils`
- Support OAuth (Google, Facebook) + email/password
- Gestion de sessions intégrée
- Compatible avec Nuxt.js 4

**Option 2: Supabase Auth**
- Solution complète avec base de données
- Authentification intégrée
- Gestion des utilisateurs
- Gratuit jusqu'à un certain usage

**Option 3: Custom avec Nuxt Server Routes**
- Backend API avec Nuxt Server Routes
- Base de données (PostgreSQL/MySQL)
- ORM (Prisma, Drizzle)
- Plus de contrôle mais plus de développement

**Recommandation**: Option 2 (Supabase) pour v1.0 - solution complète avec base de données incluse.

### Structure de données

**Table Users**:
- id, email, password_hash, nom, prénom, téléphone, date_naissance
- role (élève, maître, admin)
- dojo_id (référence au dojo)
- grade_id (référence au grade actuel)
- created_at, updated_at

**Table Dojos**:
- id, nom, adresse, ville, région, coordonnées GPS
- maître_id (référence au maître)
- téléphone, email
- description

**Table Grades**:
- id, nom (blanc, jaune, vert, etc.), niveau (1-10)
- description, badge/icône

**Table Grade_History**:
- id, user_id, grade_id, date_obtention, attribué_par

## Design Guidelines

- Design cohérent avec le reste du site
- Formulaires clairs et accessibles
- Affichage des grades avec badges visuels
- Carte interactive pour les dojos

## Out of Scope (v1.0)

- OAuth avec réseaux sociaux (peut être ajouté plus tard)
- Système de notifications par email
- Application mobile
- Gestion avancée des permissions

## Dependencies

- Site web de base (001-site-web-femat) doit être complété
- Base de données nécessaire
- Solution d'authentification choisie

## Open Questions

- [ ] Quelle solution d'authentification utiliser ?
- [ ] Quelle base de données utiliser ?
- [ ] Qui gérera l'attribution des grades ?
- [ ] Combien de dojos au Mali à recenser ?
- [ ] Faut-il une validation manuelle des inscriptions ?

