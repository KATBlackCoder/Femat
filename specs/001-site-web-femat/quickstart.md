# Quickstart Guide: Site Web FEMAT

**Feature**: 001-site-web-femat  
**Date**: 2025-01-27

## Vue d'ensemble

Ce guide fournit les instructions pour démarrer rapidement le développement du site web FEMAT et tester les fonctionnalités principales.

## Prérequis

- Node.js 18+ installé
- pnpm installé (gestionnaire de paquets utilisé)
- Git configuré

## Installation

```bash
# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev
```

Le site sera accessible sur `http://localhost:3000`

## Structure des Pages

### Page d'accueil (`/`)
- Hero section avec logo FEMAT
- Message de bienvenue
- Sections principales (À propos, Événements, Contact)
- Navigation vers autres pages

### Page À propos (`/about`)
- Histoire de la fédération
- Mission et valeurs
- Informations sur le taekwondo

### Page Événements (`/events`)
- Liste des événements à venir
- Liste des événements passés
- Cartes d'événements avec détails

### Page Contact (`/contact`)
- Informations de contact
- Formulaire de contact

## Composants Principaux

### Header
- Logo FEMAT
- Menu de navigation
- Menu hamburger pour mobile

### Footer
- Informations de contact
- Liens utiles
- Copyright

### EventCard
- Titre de l'événement
- Date et lieu
- Description
- Type d'événement

### ContactForm
- Champs: Nom, Email, Sujet, Message
- Validation côté client
- Soumission (à configurer avec service email)

## Scénarios de Test

### Test 1: Navigation
1. Ouvrir la page d'accueil
2. Cliquer sur chaque lien du menu
3. Vérifier que chaque page se charge correctement
4. Tester la navigation au clavier (Tab, Enter)

### Test 2: Responsive Design
1. Ouvrir le site sur mobile (Chrome DevTools)
2. Vérifier que le menu hamburger fonctionne
3. Vérifier que le contenu s'adapte correctement
4. Tester sur différentes tailles d'écran (mobile, tablette, desktop)

### Test 3: Accessibilité
1. Tester la navigation au clavier uniquement
2. Vérifier les contrastes de couleurs
3. Tester avec un lecteur d'écran (si disponible)
4. Vérifier les alt text des images

### Test 4: Performance
1. Ouvrir Chrome DevTools > Lighthouse
2. Lancer un audit de performance
3. Vérifier que le score est > 90
4. Vérifier les temps de chargement

### Test 5: Formulaire de Contact
1. Aller sur la page Contact
2. Remplir le formulaire
3. Tester la validation (champs vides, email invalide)
4. Soumettre le formulaire (vérifier le comportement)

## Commandes Utiles

```bash
# Développement
pnpm dev              # Serveur de développement

# Build
pnpm build            # Build pour production
pnpm generate         # Générer site statique
pnpm preview          # Prévisualiser le build

# Maintenance
pnpm install          # Installer dépendances
```

## Configuration

### Couleurs Personnalisées

Les couleurs du drapeau malien sont configurées dans `nuxt.config.ts`:

```typescript
ui: {
  colors: {
    primary: '#00853F',  // Vert
    secondary: '#FCD116', // Jaune
    accent: '#CE1126'     // Rouge
  }
}
```

### Meta Tags SEO

Chaque page doit avoir ses meta tags configurés via `useSeoMeta()`:

```typescript
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',
  ogTitle: 'Page Title',
  ogDescription: 'Page description'
})
```

## Prochaines Étapes

1. Implémenter les composants selon le plan
2. Ajouter le contenu réel
3. Tester toutes les fonctionnalités
4. Optimiser les performances
5. Déployer sur plateforme de hosting

## Dépannage

### Problème: Le serveur ne démarre pas
- Vérifier que Node.js 18+ est installé
- Vérifier que les dépendances sont installées (`pnpm install`)
- Vérifier les ports disponibles (3000 par défaut)

### Problème: Les styles ne s'appliquent pas
- Vérifier que Nuxt UI est bien configuré dans `nuxt.config.ts`
- Vérifier que Tailwind CSS est activé (automatique avec Nuxt UI)

### Problème: Les images ne s'affichent pas
- Vérifier que les images sont dans `/public/`
- Utiliser le chemin `/logo_femat.webp` (pas `/public/logo_femat.webp`)

## Ressources

- [Documentation Nuxt.js](https://nuxt.com/docs)
- [Documentation Nuxt UI](https://ui.nuxt.com)
- [Guide Spec-Kit](../SPEC-KIT-GUIDE.md)

