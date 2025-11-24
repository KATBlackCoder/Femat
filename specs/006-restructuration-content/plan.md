# Plan d'Implémentation: Restructuration des Logiques de Content

**Feature ID**: `006-restructuration-content`  
**Date**: 2025-01-27

## Vue d'ensemble

Ce document détaille le plan d'implémentation pour la restructuration des logiques de gestion de contenu.

## Étapes d'Implémentation

### Phase 0: Réorganisation des Composants Events

**Objectif**: Organiser les composants events dans un dossier dédié pour cohérence avec `components/blogs/`

**Fichiers à déplacer**:
- `app/components/EventCalendar.vue` → `app/components/events/EventCalendar.vue`
- `app/components/EventCard.vue` → `app/components/events/EventCard.vue`

**Fichiers à mettre à jour** (imports):
- `app/pages/events/index.vue` (utilise `EventCard`)
- `app/pages/calendar.vue` (utilise `EventCalendar`)
- `app/pages/index.vue` (utilise `EventCard`)
- `app/components/events/EventCalendar.vue` (utilise `EventCard` en interne)

**Étapes**:
- [ ] Créer le dossier `app/components/events/`
- [ ] Déplacer `EventCalendar.vue` vers `components/events/EventCalendar.vue`
- [ ] Déplacer `EventCard.vue` vers `components/events/EventCard.vue`
- [ ] Mettre à jour l'import dans `EventCalendar.vue` (si `EventCard` est utilisé)
- [ ] Mettre à jour les imports dans `app/pages/events/index.vue`
- [ ] Mettre à jour les imports dans `app/pages/calendar.vue`
- [ ] Mettre à jour les imports dans `app/pages/index.vue`
- [ ] Vérifier que tous les composants fonctionnent après migration
- [ ] Tester toutes les pages utilisant ces composants
- [ ] Vérifier que Nuxt auto-import fonctionne correctement (les composants doivent être accessibles sans import explicite)

### Phase 1: Analyse et Préparation
- [ ] Analyser le code existant (`useBlog.ts`, `useEvents.ts`)
- [ ] Identifier toutes les duplications
- [ ] Lister les patterns communs
- [ ] Définir l'API du composable générique

### Phase 2: Création du Composable Générique
- [ ] Créer `app/composables/useContentCollection.ts`
- [ ] Implémenter les méthodes de base (`getAll`, `getBySlug`, etc.)
- [ ] Ajouter la gestion d'erreurs centralisée
- [ ] Ajouter le support des filtres et tri
- [ ] Documenter avec JSDoc

### Phase 3: Refactorisation de useBlog
- [ ] Refactoriser `useBlog.ts` pour utiliser `useContentCollection`
- [ ] Conserver l'API publique existante
- [ ] Tester la rétrocompatibilité
- [ ] Optimiser les performances

### Phase 4: Refactorisation de useEvents
- [ ] Refactoriser `useEvents.ts` pour utiliser `useContentCollection`
- [ ] Conserver les logiques métier spécifiques (`isEventPast`, etc.)
- [ ] Conserver l'API publique existante
- [ ] Tester la rétrocompatibilité

### Phase 5: Amélioration des Types
- [ ] Standardiser les types dans `types/blog.ts` et `types/event.ts`
- [ ] Améliorer les schémas Zod dans `content.config.ts`
- [ ] Générer les types depuis les schémas (si possible)
- [ ] Ajouter la validation runtime

### Phase 6: Implémentation du Cache
- [ ] Implémenter le cache avec `useState`
- [ ] Ajouter l'invalidation du cache
- [ ] Optimiser les requêtes redondantes
- [ ] Mesurer les améliorations de performance

### Phase 7: Gestion d'Erreurs
- [ ] Standardiser la gestion d'erreurs
- [ ] Implémenter les logs appropriés (dev vs production)
- [ ] Ajouter les fallbacks gracieux
- [ ] Améliorer les messages d'erreur

### Phase 8: Documentation et Tests
- [ ] Documenter tous les composables avec JSDoc
- [ ] Créer un guide d'utilisation
- [ ] Ajouter des exemples de code
- [ ] Tester toutes les fonctionnalités
- [ ] Valider les performances

### Phase 9: Standardisation des Icônes Iconify
**Objectif**: Standardiser l'utilisation des icônes en utilisant UNIQUEMENT la collection Heroicons comme recommandé dans la documentation Nuxt UI. Aucune exception autorisée.

**Référence**: [Nuxt UI Icons Documentation](https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt#collections)

**Étapes**:
- [ ] Faire un audit complet de toutes les icônes utilisées dans le projet
- [ ] Identifier les collections utilisées (heroicons, simple-icons, etc.)
- [ ] Choisir Heroicons comme collection UNIQUE (déjà majoritairement utilisée)
- [ ] Vérifier que `@iconify-json/heroicons` est installé (déjà dans devDependencies)
- [ ] Configurer Nuxt Icon dans `nuxt.config.ts` si nécessaire
- [ ] Remplacer TOUTES les icônes non-Heroicons (y compris Simple Icons) par des équivalents Heroicons
- [ ] Supprimer toute dépendance à d'autres collections d'icônes dans `package.json`
- [ ] Créer un guide de standardisation dans `specs/006-restructuration-content/icon-standard.md`
- [ ] Documenter les icônes les plus utilisées et les alternatives Heroicons
- [ ] Valider que toutes les icônes fonctionnent correctement après standardisation

**Fichiers concernés**:
- Tous les fichiers Vue utilisant des icônes (`UIcon`, `icon` prop)
- `package.json` (vérification de `@iconify-json/heroicons`, suppression des autres collections)
- `nuxt.config.ts` (configuration si nécessaire)
- `app.config.ts` (configuration des icônes par défaut si souhaité)

**Règle de standardisation**:
- **Heroicons UNIQUEMENT** pour toutes les icônes du projet
- **Aucune exception** : toutes les icônes doivent utiliser la collection Heroicons
- Pour les réseaux sociaux/logos de marques : utiliser des icônes génériques Heroicons (ex: `i-heroicons-share`, `i-heroicons-globe-alt`, `i-heroicons-link`)

## Critères de Validation

- [ ] Composants events réorganisés dans `components/events/`
- [ ] Tous les imports mis à jour et fonctionnels
- [ ] Structure cohérente avec `components/blogs/`
- [ ] Code réduit de 30% minimum (après refactorisation)
- [ ] Performance améliorée de 20% minimum
- [ ] Types stricts partout
- [ ] Gestion d'erreurs standardisée
- [ ] Documentation complète
- [ ] Rétrocompatibilité maintenue
- [ ] Pas de régression fonctionnelle
- [ ] Collection d'icônes standardisée (Heroicons uniquement)
- [ ] Icônes servies localement (pas depuis CDN)
- [ ] Aucune autre collection d'icônes utilisée dans le projet

## Notes

- Prioriser la rétrocompatibilité pour éviter de casser le code existant
- Tester chaque étape avant de passer à la suivante
- Documenter les décisions importantes
- Mesurer les performances avant/après

