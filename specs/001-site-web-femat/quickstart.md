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
- Formulaire de contact avec validation

### Page Calendrier (`/calendar`)
- Calendrier interactif mensuel
- Navigation entre mois
- Jours colorés selon type d'événement
- Affichage des événements du jour sélectionné

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
- Champs: Nom (requis), Prénom, Email (requis), Téléphone, Sujet (requis), Message (requis)
- Validation côté client avec feedback visuel
- Compteur de caractères avec barre de progression
- Protection honeypot anti-spam
- Soumission (console.log pour v1.0, intégration Formspree future)

### EventCalendar
- Calendrier mensuel interactif
- Navigation entre mois
- Jours colorés selon type d'événement
- Affichage des événements du jour sélectionné
- Légende des types d'événements

## Scénarios de Test

> **Note**: Pour un guide de test complet et détaillé, voir [`tests.md`](./tests.md)

### Tests Rapides

**Test 1: Navigation**
1. Ouvrir la page d'accueil
2. Cliquer sur chaque lien du menu
3. Vérifier que chaque page se charge correctement
4. Tester la navigation au clavier (Tab, Enter)

**Test 2: Responsive Design**
1. Ouvrir le site sur mobile (Chrome DevTools)
2. Vérifier que le menu hamburger fonctionne
3. Vérifier que le contenu s'adapte correctement
4. Tester sur différentes tailles d'écran (mobile, tablette, desktop)

**Test 3: Accessibilité**
1. Tester la navigation au clavier uniquement
2. Vérifier les contrastes de couleurs
3. Tester avec un lecteur d'écran (si disponible)
4. Vérifier les alt text des images

**Test 4: Performance**
1. Ouvrir Chrome DevTools > Lighthouse
2. Lancer un audit de performance
3. Vérifier que le score est > 90
4. Vérifier les temps de chargement

**Test 5: Formulaire de Contact**
1. Aller sur la page Contact
2. Remplir le formulaire
3. Tester la validation (champs vides, email invalide, message trop court/long)
4. Vérifier le compteur de caractères et la barre de progression
5. Soumettre le formulaire (vérifier console.log)

**Test 6: Calendrier**
1. Aller sur la page Calendrier
2. Naviguer entre les mois (boutons précédent/suivant)
3. Cliquer sur un jour avec événement
4. Vérifier que les événements s'affichent
5. Vérifier les couleurs des jours (rouge=compétition, vert=entraînement, jaune=cérémonie)

**Test 7: Mode Sombre/Clair**
1. Cliquer sur le bouton de changement de mode dans le header
2. Vérifier que les couleurs s'adaptent
3. Vérifier le contraste dans les deux modes
4. Vérifier que la préférence est sauvegardée

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

Les couleurs du drapeau malien sont configurées dans `app.config.ts`:

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',    // Vert drapeau malien
      secondary: 'yellow', // Jaune drapeau malien
      error: 'red',        // Rouge drapeau malien
      neutral: 'slate'     // Pour textes et bordures
    }
  }
})
```

**Note**: Les couleurs sont maintenant sémantiques (primary, secondary, error, neutral) au lieu de valeurs hexadécimales directes. Cela permet une meilleure intégration avec Nuxt UI et le support du mode sombre.

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
- Utiliser le chemin `/logo_femat.avif` avec fallback `/logo_femat.webp`
- Utiliser `<NuxtImg>` au lieu de `<img>` pour optimisation automatique
- Vérifier que le module `@nuxt/image` est installé

### Problème: Les couleurs ne s'appliquent pas
- Vérifier que `app.config.ts` existe et contient la configuration `ui.colors`
- Utiliser les couleurs sémantiques (primary, secondary, error, neutral) au lieu de gray
- Vérifier que les classes Tailwind utilisent `neutral` au lieu de `gray`

## Ressources

- [Documentation Nuxt.js](https://nuxt.com/docs)
- [Documentation Nuxt UI](https://ui.nuxt.com)
- [Guide Spec-Kit](../SPEC-KIT-GUIDE.md)

