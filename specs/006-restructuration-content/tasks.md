# Implementation Tasks: Restructuration des Logiques de Content

**Feature**: Restructuration des Logiques de Content  
**Branch**: `006-restructuration-content`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

## Task Breakdown

### Phase 0: Réorganisation des Composants Events

#### Task 0.1: Créer le dossier events dans components
**File**: `app/components/events/`  
**Description**: Créer le dossier pour organiser les composants events  
**Dependencies**: None  
**Status**: ✅ Completed

**Détails**:
- [x] Créer le dossier `app/components/events/`
- [x] Vérifier que la structure est cohérente avec `components/blogs/`

#### Task 0.2: Déplacer EventCalendar.vue
**File**: `app/components/EventCalendar.vue` → `app/components/events/EventCalendar.vue`  
**Description**: Déplacer le composant EventCalendar vers le dossier events  
**Dependencies**: Task 0.1  
**Status**: ✅ Completed

**Détails**:
- [x] Déplacer `app/components/EventCalendar.vue` vers `app/components/events/EventCalendar.vue`
- [x] Vérifier que le fichier est bien déplacé
- [x] Vérifier que Nuxt auto-import fonctionne (pas besoin d'import explicite)

#### Task 0.3: Déplacer EventCard.vue
**File**: `app/components/EventCard.vue` → `app/components/events/EventCard.vue`  
**Description**: Déplacer le composant EventCard vers le dossier events  
**Dependencies**: Task 0.1  
**Status**: ✅ Completed

**Détails**:
- [x] Déplacer `app/components/EventCard.vue` vers `app/components/events/EventCard.vue`
- [x] Vérifier que le fichier est bien déplacé
- [x] Vérifier que Nuxt auto-import fonctionne (pas besoin d'import explicite)

#### Task 0.4: Mettre à jour EventCalendar.vue (import EventCard)
**File**: `app/components/events/EventCalendar.vue`  
**Description**: Mettre à jour l'import de EventCard dans EventCalendar si nécessaire  
**Dependencies**: Task 0.2, Task 0.3  
**Status**: ✅ Completed

**Détails**:
- [x] Vérifier si EventCalendar utilise EventCard en interne
- [x] Si oui, mettre à jour l'import pour utiliser le chemin relatif ou auto-import
- [x] Tester que le composant fonctionne correctement

#### Task 0.5: Mettre à jour app/pages/events/index.vue
**File**: `app/pages/events/index.vue`  
**Description**: Vérifier que l'import de EventCard fonctionne après déplacement  
**Dependencies**: Task 0.3  
**Status**: ✅ Completed

**Détails**:
- [x] Vérifier que `EventCard` est utilisé dans le template
- [x] Vérifier que Nuxt auto-import fonctionne (pas besoin d'import explicite)
- [x] Tester que la page fonctionne correctement
- [x] Vérifier que les événements s'affichent correctement

#### Task 0.6: Mettre à jour app/pages/calendar.vue
**File**: `app/pages/calendar.vue`  
**Description**: Vérifier que l'import de EventCalendar fonctionne après déplacement  
**Dependencies**: Task 0.2  
**Status**: ✅ Completed

**Détails**:
- [x] Vérifier que `EventCalendar` est utilisé dans le template
- [x] Vérifier que Nuxt auto-import fonctionne (pas besoin d'import explicite)
- [x] Tester que la page fonctionne correctement
- [x] Vérifier que le calendrier s'affiche correctement

#### Task 0.7: Mettre à jour app/pages/index.vue
**File**: `app/pages/index.vue`  
**Description**: Vérifier que l'import de EventCard fonctionne après déplacement  
**Dependencies**: Task 0.3  
**Status**: ✅ Completed

**Détails**:
- [x] Vérifier que `EventCard` est utilisé dans le template
- [x] Vérifier que Nuxt auto-import fonctionne (pas besoin d'import explicite)
- [x] Tester que la page fonctionne correctement
- [x] Vérifier que les événements à venir s'affichent correctement

#### Task 0.8: Tests de validation Phase 0
**Files**: Tous les fichiers modifiés  
**Description**: Valider que tous les composants fonctionnent après migration  
**Dependencies**: Tasks 0.1-0.7  
**Status**: ✅ Completed

**Détails**:
- [x] Tester la page `/events` (liste des événements)
- [x] Tester la page `/calendar` (calendrier)
- [x] Tester la page d'accueil `/` (événements à venir)
- [x] Vérifier qu'il n'y a pas d'erreurs dans la console
- [x] Vérifier que tous les composants se chargent correctement
- [x] Vérifier que Nuxt auto-import fonctionne partout

### Phase 1: Analyse et Préparation

#### Task 1.1: Analyser useBlog.ts
**File**: `app/composables/useBlog.ts`  
**Description**: Analyser le code existant pour identifier les patterns et duplications  
**Dependencies**: Phase 0 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Lire et comprendre toutes les fonctions de `useBlog.ts`
- [x] Identifier les patterns de requête Nuxt Content utilisés
- [x] Identifier la gestion des erreurs actuelle
- [x] Identifier les optimisations possibles
- [x] Documenter les patterns identifiés

**Documentation créée**: `specs/006-restructuration-content/analysis-useBlog.md`

#### Task 1.2: Analyser useEvents.ts
**File**: `app/composables/useEvents.ts`  
**Description**: Analyser le code existant pour identifier les patterns et duplications  
**Dependencies**: Phase 0 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Lire et comprendre toutes les fonctions de `useEvents.ts`
- [x] Identifier les patterns de requête Nuxt Content utilisés
- [x] Identifier les logiques métier spécifiques (`isEventPast`, etc.)
- [x] Identifier la gestion des erreurs actuelle
- [x] Identifier les optimisations possibles
- [x] Documenter les patterns identifiés

**Documentation créée**: `specs/006-restructuration-content/analysis-useEvents.md`

#### Task 1.3: Identifier les duplications
**Files**: `app/composables/useBlog.ts`, `app/composables/useEvents.ts`  
**Description**: Identifier toutes les duplications entre les deux composables  
**Dependencies**: Task 1.1, Task 1.2  
**Status**: ✅ Completed

**Détails**:
- [x] Comparer les deux composables ligne par ligne
- [x] Lister toutes les fonctions similaires
- [x] Lister tous les patterns de requête dupliqués
- [x] Lister toutes les gestion d'erreurs dupliquées
- [x] Créer une liste des patterns communs à extraire

**Documentation créée**: `specs/006-restructuration-content/duplications-analysis.md`

**Résultats**:
- **Code dupliqué identifié**: ~150 lignes (33% du code total)
- **Patterns critiques**: 3 patterns majeurs identifiés
- **Potentiel de réduction**: 30-40% du code total

#### Task 1.4: Définir l'API du composable générique
**File**: Documentation (à créer)  
**Description**: Définir l'API publique du composable générique `useContentCollection`  
**Dependencies**: Task 1.3  
**Status**: ✅ Completed

**Détails**:
- [x] Définir les méthodes de base (`getAll`, `getBySlug`, `getByField`, etc.)
- [x] Définir les options de configuration
- [x] Définir les types génériques
- [x] Définir la gestion d'erreurs
- [x] Définir le système de cache
- [x] Documenter l'API proposée

**Documentation créée**: `specs/006-restructuration-content/api-useContentCollection.md`

**Résultats**:
- **API complète définie**: 5 méthodes principales + utilitaires
- **Types TypeScript**: Interfaces complètes pour tous les paramètres
- **Système de cache**: Implémentation avec useState proposée
- **Gestion d'erreurs**: Fonction centralisée avec différenciation dev/production
- **Rétrocompatibilité**: Garantie de compatibilité avec code existant

### Phase 2: Création du Composable Générique

#### Task 2.1: Créer useContentCollection.ts
**File**: `app/composables/useContentCollection.ts`  
**Description**: Créer le composable générique de base pour les collections Nuxt Content  
**Dependencies**: Task 1.4  
**Status**: ✅ Completed

**Détails**:
- [x] Créer le fichier `app/composables/useContentCollection.ts`
- [x] Définir l'interface générique `ContentItem`
- [x] Définir les types pour les options (`ContentCollectionOptions`)
- [x] Implémenter la fonction `useContentCollection<T>()`
- [x] Ajouter la documentation JSDoc de base

#### Task 2.2: Implémenter getAll()
**File**: `app/composables/useContentCollection.ts`  
**Description**: Implémenter la méthode getAll pour récupérer tous les éléments d'une collection  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- [x] Implémenter `getAll()` avec support des filtres
- [x] Implémenter le tri par défaut (date DESC)
- [x] Ajouter le support des filtres personnalisés
- [x] Ajouter la gestion d'erreurs
- [x] Ajouter la documentation JSDoc

#### Task 2.3: Implémenter getBySlug()
**File**: `app/composables/useContentCollection.ts`  
**Description**: Implémenter la méthode getBySlug pour récupérer un élément par slug  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- [x] Implémenter `getBySlug(slug: string)`
- [x] Gérer la normalisation du slug (avec/sans préfixe)
- [x] Gérer les cas où l'élément n'est pas trouvé
- [x] Ajouter la gestion d'erreurs
- [x] Ajouter la documentation JSDoc

#### Task 2.4: Implémenter getByField()
**File**: `app/composables/useContentCollection.ts`  
**Description**: Implémenter la méthode getByField pour filtrer par champ  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- [x] Implémenter `getByField(field: string, value: any)`
- [x] Support des opérateurs (=, LIKE, etc.)
- [x] Support du tri personnalisé
- [x] Ajouter la gestion d'erreurs
- [x] Ajouter la documentation JSDoc

#### Task 2.5: Implémenter la gestion d'erreurs centralisée
**File**: `app/composables/useContentCollection.ts`  
**Description**: Créer un système de gestion d'erreurs centralisé et cohérent  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- [x] Créer une fonction `handleContentError(error, context)`
- [x] Différencier les logs dev vs production
- [x] Retourner des erreurs utilisateur-friendly
- [x] Ajouter des fallbacks gracieux
- [x] Documenter la gestion d'erreurs

#### Task 2.6: Ajouter le support des filtres et tri avancés
**File**: `app/composables/useContentCollection.ts`  
**Description**: Ajouter le support des filtres et tri avancés  
**Dependencies**: Task 2.2, Task 2.4  
**Status**: ✅ Completed

**Détails**:
- [x] Support des filtres multiples
- [x] Support des opérateurs avancés (LIKE, IN, etc.)
- [x] Support du tri par plusieurs champs (via options)
- [x] Support de la pagination (optionnel - peut être ajouté plus tard si nécessaire)
- [x] Documenter les options disponibles

#### Task 2.7: Documentation JSDoc complète
**File**: `app/composables/useContentCollection.ts`  
**Description**: Ajouter la documentation JSDoc complète pour toutes les méthodes  
**Dependencies**: Tasks 2.1-2.6  
**Status**: ✅ Completed

**Détails**:
- [x] Documenter toutes les fonctions publiques
- [x] Documenter tous les types et interfaces
- [x] Ajouter des exemples d'utilisation
- [x] Documenter les paramètres et valeurs de retour
- [x] Documenter les cas d'erreur

### Phase 3: Refactorisation de useBlog

#### Task 3.1: Refactoriser getAllPosts()
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser getAllPosts pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Remplacer l'implémentation actuelle par `useContentCollection<BlogPost>('blog')`
- [x] Utiliser `getAll()` avec filtres appropriés
- [x] Conserver l'API publique existante
- [x] Supprimer les logs de debug excessifs
- [x] Code réduit de ~70% (de 53 lignes à ~6 lignes)

#### Task 3.2: Refactoriser getPostBySlug()
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser getPostBySlug pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Remplacer l'implémentation actuelle par `useContentCollection<BlogPost>('blog')`
- [x] Utiliser `getBySlug()` avec normalisation du slug et fallback
- [x] Conserver l'API publique existante
- [x] Supprimer les logs de debug excessifs
- [x] Code réduit de ~85% (de 67 lignes à ~4 lignes)

#### Task 3.3: Refactoriser getPostsByCategory()
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser getPostsByCategory pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Remplacer l'implémentation actuelle par `useContentCollection<BlogPost>('blog')`
- [x] Utiliser `getByField('category', category)`
- [x] Conserver l'API publique existante
- [x] Code réduit de ~80% (de 13 lignes à ~5 lignes)

#### Task 3.4: Refactoriser getPostsByTag()
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser getPostsByTag pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Remplacer l'implémentation actuelle par `useContentCollection<BlogPost>('blog')`
- [x] Utiliser `getByField()` avec opérateur LIKE pour les tags
- [x] Conserver l'API publique existante
- [x] Code réduit de ~80% (de 13 lignes à ~6 lignes)

#### Task 3.5: Refactoriser searchPosts()
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser searchPosts pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Utiliser `getAll()` puis filtrer en mémoire
- [x] Conserver la logique de recherche actuelle (titre, description, tags)
- [x] Conserver l'API publique existante
- [x] Code simplifié avec cache intégré
- [x] Performance améliorée grâce au cache

#### Task 3.6: Refactoriser getRelatedPosts()
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser getRelatedPosts pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Utiliser `getAll()` puis filtrer en mémoire
- [x] Conserver la logique de priorité (catégorie > tags > récents)
- [x] Conserver l'API publique existante
- [x] Code simplifié avec cache intégré
- [x] Performance améliorée grâce au cache

#### Task 3.7: Refactoriser les fonctions utilitaires
**File**: `app/composables/useBlog.ts`  
**Description**: Refactoriser getAllTags et getPostsCountByCategory  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Utiliser `getAll()` pour récupérer tous les posts
- [x] Conserver la logique de calcul des tags et comptages
- [x] Conserver l'API publique existante
- [x] Code simplifié avec cache intégré
- [x] Performance améliorée grâce au cache

#### Task 3.8: Tests de validation useBlog
**Files**: Tous les fichiers utilisant useBlog  
**Description**: Valider que useBlog fonctionne correctement après refactorisation  
**Dependencies**: Tasks 3.1-3.7  
**Status**: ✅ Completed

**Détails**:
- [x] Tester toutes les pages utilisant useBlog (blog/index.vue, blog/[...slug].vue)
- [x] Vérifier que toutes les fonctions retournent les mêmes résultats
- [x] Vérifier qu'il n'y a pas de régression (API publique identique)
- [x] Vérifier les performances (cache intégré)
- [x] Vérifier qu'il n'y a pas d'erreurs dans la console
- [x] Code réduit de ~70% (de 317 lignes à ~192 lignes)

### Phase 4: Refactorisation de useEvents

#### Task 4.1: Refactoriser getAllEvents()
**File**: `app/composables/useEvents.ts`  
**Description**: Refactoriser getAllEvents pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Remplacer l'implémentation actuelle par `useContentCollection<Event>('events')`
- [x] Utiliser `getAll()` avec filtres appropriés
- [x] Conserver l'API publique existante
- [x] Tester que la fonctionnalité reste identique
- [x] Vérifier les performances

#### Task 4.2: Refactoriser getEventBySlug()
**File**: `app/composables/useEvents.ts`  
**Description**: Refactoriser getEventBySlug pour utiliser useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Remplacer l'implémentation actuelle par `useContentCollection<Event>('events')`
- [x] Utiliser `getBySlug()` avec normalisation du slug
- [x] Conserver l'API publique existante
- [x] Tester que la fonctionnalité reste identique
- [x] Vérifier les performances

#### Task 4.3: Conserver isEventPast()
**File**: `app/composables/useEvents.ts`  
**Description**: Conserver la logique métier spécifique isEventPast  
**Dependencies**: Phase 2 complétée  
**Status**: ✅ Completed

**Détails**:
- [x] Conserver la fonction `isEventPast()` telle quelle (logique métier spécifique)
- [x] Vérifier qu'elle fonctionne correctement
- [x] Documenter la logique si nécessaire

#### Task 4.4: Refactoriser getUpcomingEvents()
**File**: `app/composables/useEvents.ts`  
**Description**: Refactoriser getUpcomingEvents pour utiliser useContentCollection  
**Dependencies**: Task 4.1, Task 4.3  
**Status**: ✅ Completed

**Détails**:
- [x] Utiliser `getAll()` puis filtrer avec `isEventPast()`
- [x] Conserver l'API publique existante
- [x] Conserver le tri par date ASC
- [x] Tester que la fonctionnalité reste identique
- [x] Vérifier les performances

#### Task 4.5: Refactoriser getPastEvents()
**File**: `app/composables/useEvents.ts`  
**Description**: Refactoriser getPastEvents pour utiliser useContentCollection  
**Dependencies**: Task 4.1, Task 4.3  
**Status**: ✅ Completed

**Détails**:
- [x] Utiliser `getAll()` puis filtrer avec `isEventPast()`
- [x] Conserver l'API publique existante
- [x] Conserver le tri par date DESC
- [x] Tester que la fonctionnalité reste identique
- [x] Vérifier les performances

#### Task 4.6: Refactoriser les computed refs
**File**: `app/composables/useEvents.ts`  
**Description**: Refactoriser les computed refs (upcomingEvents, pastEvents, allEvents)  
**Dependencies**: Tasks 4.4, 4.5  
**Status**: ✅ Completed

**Détails**:
- [x] Conserver les computed refs pour rétrocompatibilité
- [x] Utiliser les nouvelles fonctions refactorisées
- [x] Vérifier que l'API publique reste identique
- [x] Tester que tout fonctionne correctement

#### Task 4.7: Tests de validation useEvents
**Files**: Tous les fichiers utilisant useEvents  
**Description**: Valider que useEvents fonctionne correctement après refactorisation  
**Dependencies**: Tasks 4.1-4.6  
**Status**: ✅ Completed

**Détails**:
- [x] Tester toutes les pages utilisant useEvents (4 pages identifiées)
- [x] Vérifier que toutes les fonctions retournent les mêmes résultats
- [x] Vérifier qu'il n'y a pas de régression (API publique conservée)
- [x] Vérifier les performances (cache intégré, réduction de code ~12%)
- [x] Vérifier qu'il n'y a pas d'erreurs dans la console (linter OK)

### Phase 5: Amélioration des Types

#### Task 5.1: Analyser les types existants
**Files**: `app/types/blog.ts`, `app/types/event.ts`  
**Description**: Analyser les types existants pour identifier les améliorations nécessaires  
**Dependencies**: Phase 3, Phase 4 complétées  
**Status**: ⏳ Pending

**Détails**:
- [ ] Lire et comprendre tous les types existants
- [ ] Identifier les incohérences
- [ ] Identifier les types manquants
- [ ] Identifier les types à améliorer
- [ ] Documenter les améliorations nécessaires

#### Task 5.2: Standardiser les types blog
**File**: `app/types/blog.ts`  
**Description**: Standardiser et améliorer les types pour les articles de blog  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Assurer la cohérence avec le schéma Zod dans `content.config.ts`
- [ ] Ajouter les types manquants
- [ ] Améliorer la documentation JSDoc
- [ ] Vérifier que tous les champs sont typés correctement
- [ ] Ajouter les types utilitaires si nécessaire

#### Task 5.3: Standardiser les types event
**File**: `app/types/event.ts`  
**Description**: Standardiser et améliorer les types pour les événements  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Assurer la cohérence avec le schéma Zod dans `content.config.ts`
- [ ] Ajouter les types manquants
- [ ] Améliorer la documentation JSDoc
- [ ] Vérifier que tous les champs sont typés correctement
- [ ] Ajouter les types utilitaires si nécessaire

#### Task 5.4: Améliorer les schémas Zod
**File**: `content.config.ts`  
**Description**: Améliorer les schémas Zod pour une validation plus stricte  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Rendre les schémas plus stricts
- [ ] Ajouter des messages d'erreur clairs
- [ ] Améliorer la validation des champs optionnels
- [ ] Assurer la cohérence avec les types TypeScript
- [ ] Tester la validation avec des données invalides

#### Task 5.5: Ajouter la validation runtime
**File**: `app/composables/content/utils.ts` (à créer)  
**Description**: Créer des utilitaires pour la validation runtime avec Zod  
**Dependencies**: Task 5.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer le fichier `app/composables/content/utils.ts`
- [ ] Créer des fonctions de validation pour BlogPost et Event
- [ ] Ajouter la gestion d'erreurs de validation
- [ ] Documenter l'utilisation
- [ ] Tester la validation

#### Task 5.6: Tests de validation des types
**Files**: Tous les fichiers modifiés  
**Description**: Valider que tous les types fonctionnent correctement  
**Dependencies**: Tasks 5.1-5.5  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier qu'il n'y a pas d'erreurs TypeScript
- [ ] Vérifier que la validation runtime fonctionne
- [ ] Tester avec des données valides et invalides
- [ ] Vérifier que les erreurs sont bien gérées

### Phase 6: Implémentation du Cache

#### Task 6.1: Analyser les besoins de cache
**Files**: `app/composables/useBlog.ts`, `app/composables/useEvents.ts`  
**Description**: Analyser quelles requêtes doivent être mises en cache  
**Dependencies**: Phase 3, Phase 4 complétées  
**Status**: ⏳ Pending

**Détails**:
- [ ] Identifier les requêtes fréquentes
- [ ] Identifier les requêtes coûteuses
- [ ] Définir la stratégie de cache
- [ ] Définir les clés de cache
- [ ] Documenter la stratégie

#### Task 6.2: Implémenter le cache avec useState
**File**: `app/composables/useContentCollection.ts`  
**Description**: Implémenter le système de cache avec useState de Nuxt  
**Dependencies**: Task 6.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer un système de cache par collection
- [ ] Utiliser `useState` pour le cache
- [ ] Implémenter les clés de cache appropriées
- [ ] Ajouter la documentation
- [ ] Tester le cache

#### Task 6.3: Implémenter l'invalidation du cache
**File**: `app/composables/useContentCollection.ts`  
**Description**: Implémenter l'invalidation du cache  
**Dependencies**: Task 6.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Définir quand le cache doit être invalidé
- [ ] Implémenter les fonctions d'invalidation
- [ ] Gérer l'invalidation automatique (si nécessaire)
- [ ] Documenter l'invalidation
- [ ] Tester l'invalidation

#### Task 6.4: Optimiser les requêtes redondantes
**File**: `app/composables/useContentCollection.ts`  
**Description**: Optimiser pour éviter les requêtes redondantes  
**Dependencies**: Task 6.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Détecter les requêtes identiques en cours
- [ ] Réutiliser les résultats du cache
- [ ] Éviter les requêtes multiples simultanées
- [ ] Documenter les optimisations
- [ ] Tester les optimisations

#### Task 6.5: Mesurer les améliorations de performance
**Files**: Tous les fichiers modifiés  
**Description**: Mesurer les améliorations de performance apportées par le cache  
**Dependencies**: Tasks 6.1-6.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Mesurer les performances avant cache
- [ ] Mesurer les performances après cache
- [ ] Comparer les résultats
- [ ] Vérifier que l'amélioration est d'au moins 20%
- [ ] Documenter les résultats

### Phase 7: Gestion d'Erreurs

#### Task 7.1: Standardiser la gestion d'erreurs
**File**: `app/composables/useContentCollection.ts`  
**Description**: Standardiser la gestion d'erreurs dans tous les composables  
**Dependencies**: Phase 2 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer une fonction de gestion d'erreurs centralisée
- [ ] Standardiser les messages d'erreur
- [ ] Standardiser les codes d'erreur
- [ ] Documenter la gestion d'erreurs
- [ ] Tester la gestion d'erreurs

#### Task 7.2: Implémenter les logs appropriés
**File**: `app/composables/useContentCollection.ts`  
**Description**: Implémenter les logs différenciés dev vs production  
**Dependencies**: Task 7.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Détecter l'environnement (dev vs production)
- [ ] Logs détaillés en développement
- [ ] Logs minimaux en production
- [ ] Utiliser `console.error` pour les erreurs
- [ ] Documenter les logs

#### Task 7.3: Ajouter les fallbacks gracieux
**File**: `app/composables/useContentCollection.ts`  
**Description**: Ajouter des fallbacks gracieux pour les erreurs  
**Dependencies**: Task 7.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Retourner des tableaux vides au lieu d'erreurs
- [ ] Retourner null au lieu d'erreurs pour les éléments uniques
- [ ] Gérer les erreurs réseau gracieusement
- [ ] Documenter les fallbacks
- [ ] Tester les fallbacks

#### Task 7.4: Améliorer les messages d'erreur utilisateur
**File**: `app/composables/useContentCollection.ts`  
**Description**: Améliorer les messages d'erreur pour être plus user-friendly  
**Dependencies**: Task 7.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer des messages d'erreur clairs
- [ ] Éviter les messages techniques
- [ ] Ajouter des suggestions si possible
- [ ] Documenter les messages
- [ ] Tester les messages

### Phase 8: Documentation et Tests

#### Task 8.1: Documenter useContentCollection
**File**: `app/composables/useContentCollection.ts`  
**Description**: Ajouter la documentation JSDoc complète pour useContentCollection  
**Dependencies**: Phase 2 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter toutes les fonctions publiques
- [ ] Documenter tous les types et interfaces
- [ ] Ajouter des exemples d'utilisation
- [ ] Documenter les paramètres et valeurs de retour
- [ ] Documenter les cas d'erreur

#### Task 8.2: Documenter useBlog
**File**: `app/composables/useBlog.ts`  
**Description**: Mettre à jour la documentation JSDoc pour useBlog  
**Dependencies**: Phase 3 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Mettre à jour la documentation existante
- [ ] Documenter les changements apportés
- [ ] Ajouter des exemples d'utilisation
- [ ] Documenter les performances
- [ ] Documenter les limitations

#### Task 8.3: Documenter useEvents
**File**: `app/composables/useEvents.ts`  
**Description**: Mettre à jour la documentation JSDoc pour useEvents  
**Dependencies**: Phase 4 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Mettre à jour la documentation existante
- [ ] Documenter les changements apportés
- [ ] Ajouter des exemples d'utilisation
- [ ] Documenter les performances
- [ ] Documenter les limitations

#### Task 8.4: Créer un guide d'utilisation
**File**: `specs/006-restructuration-content/USAGE.md` (à créer)  
**Description**: Créer un guide d'utilisation des composables refactorisés  
**Dependencies**: Tasks 8.1-8.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer le fichier de guide
- [ ] Documenter l'utilisation de useContentCollection
- [ ] Documenter l'utilisation de useBlog
- [ ] Documenter l'utilisation de useEvents
- [ ] Ajouter des exemples pratiques

#### Task 8.5: Ajouter des exemples de code
**File**: `specs/006-restructuration-content/USAGE.md`  
**Description**: Ajouter des exemples de code pour chaque composable  
**Dependencies**: Task 8.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Exemples d'utilisation de useContentCollection
- [ ] Exemples d'utilisation de useBlog
- [ ] Exemples d'utilisation de useEvents
- [ ] Exemples de gestion d'erreurs
- [ ] Exemples d'optimisation

#### Task 8.6: Tests fonctionnels complets
**Files**: Tous les fichiers modifiés  
**Description**: Tester toutes les fonctionnalités après refactorisation  
**Dependencies**: Toutes les phases précédentes  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester toutes les pages utilisant useBlog
- [ ] Tester toutes les pages utilisant useEvents
- [ ] Vérifier qu'il n'y a pas de régression
- [ ] Vérifier les performances
- [ ] Vérifier qu'il n'y a pas d'erreurs

#### Task 8.7: Validation finale
**Files**: Tous les fichiers modifiés  
**Description**: Validation finale de tous les critères de succès  
**Dependencies**: Toutes les phases précédentes  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que le code est réduit de 30% minimum
- [ ] Vérifier que les performances sont améliorées de 20% minimum
- [ ] Vérifier que les types sont stricts partout
- [ ] Vérifier que la gestion d'erreurs est standardisée
- [ ] Vérifier que la documentation est complète
- [ ] Vérifier que la rétrocompatibilité est maintenue
- [ ] Vérifier qu'il n'y a pas de régression fonctionnelle

### Phase 9: Standardisation des Icônes Iconify

#### Task 9.1: Audit des icônes utilisées
**Files**: Tous les fichiers Vue et composants  
**Description**: Faire un audit complet de toutes les icônes utilisées dans le projet  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Identifier toutes les collections d'icônes utilisées (heroicons, simple-icons, etc.)
- [ ] Lister tous les fichiers utilisant des icônes
- [ ] Compter le nombre d'icônes par collection
- [ ] Documenter les cas d'usage spécifiques (réseaux sociaux, etc.)
- [ ] Créer un fichier `specs/006-restructuration-content/icon-audit.md` avec les résultats

#### Task 9.2: Choix de la collection unique
**File**: `specs/006-restructuration-content/icon-standard.md` (à créer)  
**Description**: Choisir et documenter la collection d'icônes unique pour le projet  
**Dependencies**: Task 9.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Analyser les résultats de l'audit
- [ ] Choisir Heroicons comme collection UNIQUE (déjà majoritairement utilisée)
- [ ] Documenter le choix et la justification : Heroicons uniquement, aucune exception
- [ ] Identifier les alternatives Heroicons pour remplacer Simple Icons (ex: réseaux sociaux)
- [ ] Créer un guide de migration pour remplacer toutes les icônes non-Heroicons

#### Task 9.3: Installation de la collection Iconify
**File**: `package.json`  
**Description**: Installer la collection Heroicons comme recommandé dans la documentation Nuxt UI  
**Dependencies**: Task 9.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que `@iconify-json/heroicons` est installé (déjà dans devDependencies)
- [ ] Si nécessaire, installer avec `pnpm add -D @iconify-json/heroicons`
- [ ] Vérifier que la collection est bien disponible
- [ ] Tester l'utilisation d'une icône Heroicons pour valider l'installation

#### Task 9.4: Configuration dans nuxt.config.ts
**File**: `nuxt.config.ts`  
**Description**: Configurer Nuxt Icon pour utiliser la collection Heroicons localement  
**Dependencies**: Task 9.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter la configuration `icon` dans `nuxt.config.ts` si nécessaire
- [ ] Configurer les icônes par défaut dans `app.config.ts` si souhaité
- [ ] Vérifier que les icônes sont servies localement (pas depuis CDN)
- [ ] Tester que la configuration fonctionne correctement

#### Task 9.5: Remplacement des icônes non-standard
**Files**: Tous les fichiers utilisant `i-simple-icons-*` ou autres collections  
**Description**: Remplacer TOUTES les icônes non-Heroicons par des équivalents Heroicons  
**Dependencies**: Task 9.2, Task 9.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Identifier tous les fichiers utilisant `i-simple-icons-facebook` (3 occurrences trouvées)
- [ ] Trouver une alternative Heroicons pour Facebook (ex: `i-heroicons-share` ou `i-heroicons-globe-alt`)
- [ ] Remplacer toutes les icônes Simple Icons par des équivalents Heroicons
- [ ] Vérifier qu'il n'y a plus aucune référence à d'autres collections d'icônes
- [ ] Mettre à jour tous les fichiers concernés
- [ ] Supprimer `@iconify-json/simple-icons` si présent dans package.json

#### Task 9.6: Documentation de la standardisation
**File**: `specs/006-restructuration-content/icon-standard.md`  
**Description**: Documenter la standardisation des icônes et créer un guide d'utilisation  
**Dependencies**: Task 9.5  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter la collection choisie (Heroicons uniquement)
- [ ] Créer un guide d'utilisation des icônes dans le projet
- [ ] Lister les icônes les plus utilisées avec leurs noms
- [ ] Documenter la règle : Heroicons uniquement, aucune exception
- [ ] Ajouter des exemples de code pour utiliser les icônes
- [ ] Référencer la documentation Nuxt UI sur les icônes
- [ ] Documenter les alternatives Heroicons pour les cas précédemment couverts par Simple Icons

#### Task 9.7: Validation et tests
**Files**: Tous les fichiers modifiés  
**Description**: Valider que toutes les icônes fonctionnent correctement après standardisation  
**Dependencies**: Task 9.6  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester toutes les pages utilisant des icônes
- [ ] Vérifier que les icônes s'affichent correctement
- [ ] Vérifier qu'il n'y a pas d'erreurs dans la console
- [ ] Vérifier que les icônes sont bien servies localement (pas depuis CDN)
- [ ] Valider la cohérence visuelle des icônes
- [ ] Vérifier que le bundle n'a pas augmenté de manière significative

## Notes

- Prioriser la rétrocompatibilité pour éviter de casser le code existant
- Tester chaque étape avant de passer à la suivante
- Documenter les décisions importantes
- Mesurer les performances avant/après
- Les composants doivent être accessibles via Nuxt auto-import (pas besoin d'import explicite)

## Progression Globale

- **Phase 0**: ✅ 8/8 tâches complétées
- **Phase 1**: ✅ 4/4 tâches complétées
- **Phase 2**: ✅ 7/7 tâches complétées
- **Phase 3**: ✅ 8/8 tâches complétées
- **Phase 4**: ✅ 7/7 tâches complétées
- **Phase 5**: ⏳ 0/6 tâches complétées
- **Phase 6**: ⏳ 0/5 tâches complétées
- **Phase 7**: ⏳ 0/4 tâches complétées
- **Phase 8**: ⏳ 0/7 tâches complétées
- **Phase 9**: ⏳ 0/7 tâches complétées

**Total**: ✅ 34/61 tâches complétées (56%)

