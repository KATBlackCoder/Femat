# Analyse de useEvents.ts

**Date**: 2025-01-27  
**Fichier**: `app/composables/useEvents.ts`  
**Lignes**: 141

## Vue d'ensemble

Le composable `useEvents` gère toutes les opérations liées aux événements en utilisant Nuxt Content v3 avec `queryCollection`. Il expose 4 fonctions publiques et 3 computed refs pour récupérer et filtrer les événements.

## Fonctions analysées

### 1. `getAllEvents()`
**Lignes**: 20-31  
**Pattern identifié**: Requête de base avec filtres et tri

**Structure**:
```typescript
queryCollection<Event>('events')
  .where('published', '=', true)
  .order('date', 'DESC')
  .all()
```

**Caractéristiques**:
- Filtre par `published = true`
- Tri par `date DESC`
- Gestion d'erreur: retourne tableau vide
- Pas de normalisation du path (contrairement à useBlog)

**Optimisations possibles**:
- Cache des résultats
- Normalisation du path si nécessaire

### 2. `isEventPast(event: Event)`
**Lignes**: 37-63  
**Pattern identifié**: Logique métier spécifique aux événements

**Structure**:
```typescript
// Parse la date de fin (ou date de début)
const eventEndDateStr = event.endDate || event.date
// Parse manuellement pour éviter problèmes de fuseau horaire
const dateParts = eventEndDateStr.split('-').map(Number)
// Utilise l'heure de fin si disponible
if (event.endTime) {
  // Parse et applique l'heure
}
// Compare avec maintenant
return eventEndDate.getTime() < now.getTime()
```

**Caractéristiques**:
- **Logique métier spécifique** - à conserver telle quelle
- Gère les événements multi-jours (`endDate`)
- Gère les heures (`endTime`, `endDate`)
- Parse manuel pour éviter problèmes de fuseau horaire
- Utilise fin de journée (23:59:59) par défaut

**Optimisations possibles**:
- Aucune - logique métier spécifique à conserver

### 3. `getUpcomingEvents()`
**Lignes**: 68-81  
**Pattern identifié**: Requête puis filtrage en mémoire

**Structure**:
```typescript
const events = await queryCollection<Event>('events')
  .where('published', '=', true)
  .order('date', 'ASC')
  .all()

return events.filter((event) => !isEventPast(event))
```

**Caractéristiques**:
- Récupère tous les événements
- Filtre avec `isEventPast()` (logique métier)
- Tri par `date ASC` (événements à venir)
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Cache des résultats de `getAllEvents()`
- Réutiliser `getAllEvents()` au lieu de requête directe

### 4. `getPastEvents()`
**Lignes**: 86-99  
**Pattern identifié**: Requête puis filtrage en mémoire

**Structure**:
```typescript
const events = await queryCollection<Event>('events')
  .where('published', '=', true)
  .order('date', 'DESC')
  .all()

return events.filter((event) => isEventPast(event))
```

**Caractéristiques**:
- Récupère tous les événements
- Filtre avec `isEventPast()` (logique métier)
- Tri par `date DESC` (événements passés)
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Cache des résultats de `getAllEvents()`
- Réutiliser `getAllEvents()` au lieu de requête directe

### 5. `getEventBySlug(slug: string)`
**Lignes**: 104-117  
**Pattern identifié**: Requête par slug/path

**Structure**:
```typescript
const path = slug.startsWith('/events/') ? slug : `/events/${slug}`
queryCollection<Event>('events')
  .path(path)
  .where('published', '=', true)
  .first()
```

**Caractéristiques**:
- Normalisation simple du slug
- Pas de fallback multiple (contrairement à useBlog)
- Pas de normalisation du path retourné
- Gestion d'erreur: retourne `null`

**Optimisations possibles**:
- Fonction de normalisation de slug réutilisable
- Normalisation du path si nécessaire

### 6. Computed refs et chargement automatique
**Lignes**: 120-128  
**Pattern identifié**: Computed refs avec chargement au montage

**Structure**:
```typescript
const upcomingEvents = ref<Event[]>([])
const pastEvents = ref<Event[]>([])
const allEvents = computed(() => [...upcomingEvents.value, ...pastEvents.value])

onMounted(async () => {
  upcomingEvents.value = await getUpcomingEvents()
  pastEvents.value = await getPastEvents()
})
```

**Caractéristiques**:
- Computed refs pour rétrocompatibilité
- Chargement automatique au montage
- `allEvents` est un computed qui combine les deux listes
- Pattern spécifique à useEvents (pas dans useBlog)

**Optimisations possibles**:
- Utiliser `useAsyncData` pour meilleure gestion du loading/error
- Cache des résultats

## Patterns de requête Nuxt Content identifiés

### Pattern 1: Requête de base avec filtres
```typescript
queryCollection<T>('collection')
  .where('published', '=', true)
  .order('field', 'DESC' | 'ASC')
  .all()
```

**Utilisé dans**: `getAllEvents`, `getUpcomingEvents`, `getPastEvents`

### Pattern 2: Requête par slug/path
```typescript
queryCollection<T>('collection')
  .path(path)
  .where('published', '=', true)
  .first()
```

**Utilisé dans**: `getEventBySlug`

### Pattern 3: Récupération puis filtrage en mémoire
```typescript
const all = await queryCollection<T>('collection').all()
const filtered = all.filter((event) => !isEventPast(event))
```

**Utilisé dans**: `getUpcomingEvents`, `getPastEvents`

## Gestion des erreurs

### Pattern actuel
```typescript
try {
  // Requête
  return result || []
} catch (error) {
  console.error('Message d\'erreur:', error)
  return [] // ou null pour les requêtes uniques
}
```

**Caractéristiques**:
- Try/catch dans chaque fonction
- Logs avec `console.error`
- Retourne valeur par défaut (tableau vide ou null)
- Pas de différenciation dev/production

**Problèmes identifiés**:
- Logs en production (mais moins excessifs que useBlog)
- Pas de fallback gracieux
- Messages d'erreur non standardisés
- Pas de gestion d'erreurs réseau spécifique

## Logique métier spécifique

### `isEventPast(event: Event)`
**Lignes**: 37-63

Cette fonction contient la logique métier spécifique aux événements:
- Gère les événements multi-jours (`endDate`)
- Gère les heures de début/fin (`startTime`, `endTime`)
- Parse manuel pour éviter problèmes de fuseau horaire
- Utilise fin de journée par défaut

**Décision**: Cette logique doit être **conservée** dans useEvents car elle est spécifique au domaine métier des événements.

## Normalisation du path

### Pattern actuel
- Normalisation simple du slug dans `getEventBySlug` (ligne 107)
- Pas de normalisation du path retourné (contrairement à useBlog)

**Problèmes**:
- Normalisation du slug non réutilisable
- Pas de cohérence avec useBlog

## Logs de debug

### Caractéristiques
- Logs uniquement en cas d'erreur (`console.error`)
- Pas de logs de debug excessifs (contrairement à useBlog)
- Tous les logs utilisent `console.error`
- Pas de différenciation dev/production

## Optimisations possibles

1. **Cache**: Implémenter un cache pour `getAllEvents()` utilisé par plusieurs fonctions
2. **Réutilisation**: `getUpcomingEvents` et `getPastEvents` pourraient réutiliser `getAllEvents()`
3. **Normalisation**: Centraliser la normalisation du path/slug
4. **Gestion d'erreurs**: Standardiser et améliorer la gestion d'erreurs
5. **Computed refs**: Utiliser `useAsyncData` pour meilleure gestion du loading/error

## Code dupliqué

### Duplications identifiées
1. **Pattern de requête de base**: Répété dans `getAllEvents`, `getUpcomingEvents`, `getPastEvents`
2. **Gestion d'erreur**: Try/catch identique partout
3. **Filtre `published`**: Répété dans toutes les requêtes
4. **Requête complète dans `getUpcomingEvents` et `getPastEvents`**: Pourrait réutiliser `getAllEvents()`

## Différences avec useBlog

1. **Pas de normalisation complexe du path**: useEvents est plus simple
2. **Logique métier spécifique**: `isEventPast()` n'existe pas dans useBlog
3. **Computed refs**: useEvents expose des computed refs, useBlog non
4. **Chargement automatique**: useEvents charge au montage, useBlog non
5. **Moins de fonctions**: useEvents a 4 fonctions vs 8 pour useBlog
6. **Pas de recherche**: useEvents n'a pas de fonction de recherche
7. **Pas de tags/catégories**: useEvents n'a pas de système de tags

## Métriques

- **Lignes de code**: 141
- **Fonctions publiques**: 4
- **Fonctions privées/helpers**: 1 (`isEventPast`)
- **Logs de debug**: 0 (seulement logs d'erreur)
- **Gestion d'erreurs**: 4 blocs try/catch similaires
- **Requêtes Nuxt Content**: 4 requêtes directes
- **Computed refs**: 3 (upcomingEvents, pastEvents, allEvents)

