# Analyse des Duplications: useBlog vs useEvents

**Date**: 2025-01-27  
**Fichiers comparés**: `app/composables/useBlog.ts`, `app/composables/useEvents.ts`

## Vue d'ensemble

Ce document identifie toutes les duplications entre `useBlog` et `useEvents` pour permettre l'extraction de patterns communs dans un composable générique `useContentCollection`.

## 1. Fonctions similaires

### 1.1 Fonctions identiques (100% similaires)

#### `getAllPosts()` vs `getAllEvents()`
**Similarité**: 95%

**useBlog** (lignes 22-53):
```typescript
const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const allContent = await queryCollection<BlogPost>('blog')
      .where('published', '=', true)
      .order('date', 'DESC')
      .all()
    // Normalisation du path
    return allContent || []
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return []
  }
}
```

**useEvents** (lignes 20-31):
```typescript
const getAllEvents = async (): Promise<Event[]> => {
  try {
    const events = await queryCollection<Event>('events')
      .where('published', '=', true)
      .order('date', 'DESC')
      .all()
    return events || []
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error)
    return []
  }
}
```

**Duplications**:
- Structure try/catch identique
- Pattern de requête identique (`queryCollection().where().order().all()`)
- Gestion d'erreur identique
- Retourne tableau vide en cas d'erreur
- Seule différence: normalisation du path dans useBlog (non présente dans useEvents)

**Extraction possible**: ✅ Oui - Pattern de base pour `getAll()`

---

#### `getPostBySlug()` vs `getEventBySlug()`
**Similarité**: 80%

**useBlog** (lignes 58-124):
```typescript
const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    let path = slug
    if (!path.startsWith('/blog/')) {
      path = `/blog/${slug}`
    }
    let query = await queryCollection<BlogPost>('blog')
      .path(path)
      .where('published', '=', true)
      .first()
    // Fallback multiple + normalisation complexe du path
    return query
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${slug}:`, error)
    return null
  }
}
```

**useEvents** (lignes 104-117):
```typescript
const getEventBySlug = async (slug: string): Promise<Event | null> => {
  try {
    const path = slug.startsWith('/events/') ? slug : `/events/${slug}`
    const event = await queryCollection<Event>('events')
      .path(path)
      .where('published', '=', true)
      .first()
    return event
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'événement ${slug}:`, error)
    return null
  }
}
```

**Duplications**:
- Structure try/catch identique
- Pattern de requête identique (`queryCollection().path().where().first()`)
- Normalisation du slug similaire (avec préfixe)
- Gestion d'erreur identique
- Retourne `null` en cas d'erreur

**Différences**:
- useBlog a un fallback multiple (lignes 76-82)
- useBlog a une normalisation complexe du path (lignes 84-114)
- useBlog a des logs de debug excessifs

**Extraction possible**: ✅ Oui - Pattern de base pour `getBySlug()` avec normalisation de slug configurable

---

### 1.2 Fonctions partiellement similaires

#### `getPostsByCategory()` vs (aucune équivalente dans useEvents)
**Similarité**: N/A - Fonction spécifique au blog

**Pattern identifié**:
```typescript
queryCollection<T>('collection')
  .where('published', '=', true)
  .where('field', '=', value)
  .order('date', 'DESC')
  .all()
```

**Extraction possible**: ✅ Oui - Pattern pour `getByField(field, value)`

---

#### `getPostsByTag()` vs (aucune équivalente dans useEvents)
**Similarité**: N/A - Fonction spécifique au blog

**Pattern identifié**:
```typescript
queryCollection<T>('collection')
  .where('published', '=', true)
  .where('field', 'LIKE', value)
  .order('date', 'DESC')
  .all()
```

**Extraction possible**: ✅ Oui - Pattern pour `getByField(field, value, operator)`

---

#### `getUpcomingEvents()` / `getPastEvents()` vs `getRelatedPosts()`
**Similarité**: 60% - Pattern de filtrage en mémoire

**useEvents** (lignes 68-81, 86-99):
```typescript
const getUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const events = await queryCollection<Event>('events')
      .where('published', '=', true)
      .order('date', 'ASC')
      .all()
    return (events || []).filter((event: Event) => !isEventPast(event))
  } catch (error) {
    console.error('Erreur...', error)
    return []
  }
}
```

**useBlog** (lignes 199-253):
```typescript
const getRelatedPosts = async (post: BlogPost, limit: number): Promise<BlogPost[]> => {
  try {
    const queryResult = await queryCollection<BlogPost>('blog')
      .where('published', '=', true)
      .order('date', 'DESC')
      .all()
    const allPosts = queryResult || []
    // Filtre avec logique métier complexe
    return related.slice(0, limit)
  } catch (error) {
    console.error('Erreur...', error)
    return []
  }
}
```

**Duplications**:
- Pattern de récupération puis filtrage en mémoire
- Structure try/catch identique
- Gestion d'erreur identique

**Différences**:
- Logique de filtrage différente (métier spécifique)

**Extraction possible**: ⚠️ Partielle - Pattern de base pour récupération + filtrage, mais logique métier reste spécifique

---

## 2. Patterns de requête dupliqués

### 2.1 Pattern: Requête de base avec filtres et tri

**Occurrences**:
- `useBlog.getAllPosts()` (ligne 25-28)
- `useBlog.getPostsByCategory()` (ligne 131-135)
- `useBlog.getPostsByTag()` (ligne 148-152)
- `useBlog.searchPosts()` (ligne 169-172)
- `useBlog.getRelatedPosts()` (ligne 208-211)
- `useEvents.getAllEvents()` (ligne 22-25)
- `useEvents.getUpcomingEvents()` (ligne 70-73)
- `useEvents.getPastEvents()` (ligne 88-91)

**Code dupliqué**:
```typescript
queryCollection<T>('collection')
  .where('published', '=', true)
  .order('date', 'DESC' | 'ASC')
  .all()
```

**Fréquence**: 8 occurrences  
**Extraction**: ✅ **CRITIQUE** - Pattern principal à extraire

---

### 2.2 Pattern: Requête par slug/path

**Occurrences**:
- `useBlog.getPostBySlug()` (ligne 70-73)
- `useEvents.getEventBySlug()` (ligne 108-111)

**Code dupliqué**:
```typescript
queryCollection<T>('collection')
  .path(path)
  .where('published', '=', true)
  .first()
```

**Fréquence**: 2 occurrences  
**Extraction**: ✅ **IMPORTANT** - Pattern secondaire à extraire

---

### 2.3 Pattern: Requête avec filtre par champ

**Occurrences**:
- `useBlog.getPostsByCategory()` (ligne 131-135)
- `useBlog.getPostsByTag()` (ligne 148-152)

**Code dupliqué**:
```typescript
queryCollection<T>('collection')
  .where('published', '=', true)
  .where('field', 'operator', value)
  .order('date', 'DESC')
  .all()
```

**Fréquence**: 2 occurrences (mais pattern extensible)  
**Extraction**: ✅ **IMPORTANT** - Pattern pour filtres multiples

---

### 2.4 Pattern: Récupération puis filtrage en mémoire

**Occurrences**:
- `useBlog.searchPosts()` (ligne 169-182)
- `useBlog.getRelatedPosts()` (ligne 208-246)
- `useEvents.getUpcomingEvents()` (ligne 70-76)
- `useEvents.getPastEvents()` (ligne 88-94)

**Code dupliqué**:
```typescript
const all = await queryCollection<T>('collection')
  .where('published', '=', true)
  .order('date', 'DESC' | 'ASC')
  .all()

const filtered = (all || []).filter((item) => {
  // Logique de filtrage spécifique
})
```

**Fréquence**: 4 occurrences  
**Extraction**: ✅ **IMPORTANT** - Pattern pour filtrage en mémoire après récupération

---

## 3. Gestion des erreurs dupliquées

### 3.1 Pattern de gestion d'erreur (100% identique)

**Occurrences**: 12 occurrences au total
- useBlog: 8 fonctions
- useEvents: 4 fonctions

**Code dupliqué**:
```typescript
try {
  // Requête Nuxt Content
  return result || []
} catch (error) {
  console.error('Message d\'erreur:', error)
  return [] // ou null pour les requêtes uniques
}
```

**Caractéristiques**:
- Try/catch identique dans toutes les fonctions
- `console.error` avec message personnalisé
- Retourne valeur par défaut (tableau vide ou null)
- Pas de différenciation dev/production
- Pas de gestion d'erreurs réseau spécifique
- Pas de fallback gracieux

**Extraction**: ✅ **CRITIQUE** - Fonction centralisée `handleContentError()`

---

### 3.2 Messages d'erreur non standardisés

**Exemples**:
- `'Erreur lors de la récupération des articles:'`
- `'Erreur lors de la récupération des événements:'`
- `'Erreur lors de la récupération de l'article ${slug}:'`
- `'Erreur lors de la récupération de l'événement ${slug}:'`
- `'Erreur lors de la récupération des articles de catégorie ${category}:'`
- `'Erreur lors de la récupération des articles avec le tag ${tag}:'`
- `'Erreur lors de la recherche "${query}":'`
- `'Erreur lors de la récupération des articles similaires:'`
- `'Erreur lors de la récupération des événements à venir:'`
- `'Erreur lors de la récupération des événements passés:'`

**Problème**: Messages non standardisés, difficile à maintenir  
**Extraction**: ✅ **IMPORTANT** - Système de messages d'erreur standardisé

---

## 4. Normalisation du path/slug dupliquée

### 4.1 Normalisation du slug

**useBlog** (lignes 60-65):
```typescript
let path = slug
if (!path.startsWith('/blog/')) {
  path = `/blog/${slug}`
}
```

**useEvents** (ligne 107):
```typescript
const path = slug.startsWith('/events/') ? slug : `/events/${slug}`
```

**Duplication**: Logique similaire mais avec préfixe différent  
**Extraction**: ✅ **IMPORTANT** - Fonction `normalizeSlug(slug, collection)`

---

### 4.2 Normalisation du path retourné

**useBlog** (lignes 34-38, 87-114):
```typescript
// Normalisation path → _path
allContent.forEach((post: any) => {
  if (post.path && !post._path) {
    post._path = post.path
  }
})
```

**useEvents**: Pas de normalisation du path

**Duplication**: Logique spécifique à useBlog  
**Extraction**: ⚠️ **OPTIONNEL** - Peut être optionnel dans le composable générique

---

## 5. Déclaration TypeScript dupliquée

### 5.1 Déclaration de queryCollection

**useBlog** (lignes 5-12):
```typescript
declare const queryCollection: <T = any>(collection: string) => {
  where: (field: string, operator: string, value?: any) => any
  order: (field: string, direction: 'ASC' | 'DESC') => any
  path: (path: string) => any
  all: () => Promise<T[]>
  first: () => Promise<T | null>
  count: () => Promise<number>
}
```

**useEvents** (lignes 4-10):
```typescript
declare const queryCollection: <T = any>(collection: string) => {
  where: (field: string, operator: string, value?: any) => any
  order: (field: string, direction: 'ASC' | 'DESC') => any
  path: (path: string) => any
  all: () => Promise<T[]>
  first: () => Promise<T | null>
}
```

**Duplication**: Déclaration presque identique (useBlog a `count()` en plus)  
**Extraction**: ✅ **IMPORTANT** - Type centralisé dans le composable générique

---

## 6. Liste des patterns communs à extraire

### 6.1 Patterns CRITIQUES (priorité haute)

1. **Pattern de requête de base**
   - `getAll()`: Récupère tous les éléments avec filtres et tri
   - Code dupliqué: 8 occurrences
   - Impact: Réduction de code ~30%

2. **Gestion d'erreurs centralisée**
   - `handleContentError()`: Fonction centralisée pour gestion d'erreurs
   - Code dupliqué: 12 occurrences
   - Impact: Standardisation et amélioration de la gestion d'erreurs

3. **Pattern de requête par slug**
   - `getBySlug()`: Récupère un élément par slug avec normalisation
   - Code dupliqué: 2 occurrences
   - Impact: Réduction de code et normalisation cohérente

---

### 6.2 Patterns IMPORTANTS (priorité moyenne)

4. **Pattern de requête par champ**
   - `getByField()`: Filtre par champ avec opérateur
   - Code dupliqué: 2 occurrences directes, mais extensible
   - Impact: Réduction de code et flexibilité

5. **Normalisation du slug**
   - `normalizeSlug()`: Normalise le slug avec préfixe de collection
   - Code dupliqué: 2 occurrences
   - Impact: Cohérence et réutilisabilité

6. **Type queryCollection**
   - Type centralisé pour `queryCollection`
   - Code dupliqué: 2 déclarations
   - Impact: Maintenabilité et cohérence des types

7. **Pattern de filtrage en mémoire**
   - Support pour filtrage après récupération
   - Code dupliqué: 4 occurrences
   - Impact: Flexibilité pour logiques métier spécifiques

---

### 6.3 Patterns OPTIONNELS (priorité basse)

8. **Normalisation du path**
   - Normalisation `path` → `_path`
   - Code dupliqué: 1 occurrence (useBlog uniquement)
   - Impact: Faible, peut être optionnel

9. **Cache des résultats**
   - Système de cache pour éviter requêtes redondantes
   - Code dupliqué: 0 (mais optimisation importante)
   - Impact: Performance

---

## 7. Métriques de duplication

### Code dupliqué identifié

- **Lignes de code totales**: 458 (317 + 141)
- **Lignes de code dupliquées estimées**: ~150 lignes (33%)
- **Fonctions similaires**: 2 paires identiques, 1 paire partielle
- **Patterns de requête dupliqués**: 4 patterns majeurs
- **Gestion d'erreurs dupliquées**: 12 occurrences identiques
- **Déclarations TypeScript dupliquées**: 2 occurrences

### Potentiel de réduction

- **Réduction estimée**: 30-40% du code total
- **Patterns à extraire**: 7 patterns majeurs
- **Fonctions à créer**: 3-4 fonctions génériques principales

---

## 8. Recommandations

### Priorité 1: Patterns CRITIQUES
1. Extraire `getAll()` avec support filtres et tri
2. Centraliser la gestion d'erreurs
3. Extraire `getBySlug()` avec normalisation

### Priorité 2: Patterns IMPORTANTS
4. Extraire `getByField()` avec support opérateurs
5. Créer fonction de normalisation de slug
6. Centraliser les types TypeScript

### Priorité 3: Optimisations
7. Implémenter système de cache
8. Améliorer gestion d'erreurs (dev vs production)
9. Support filtrage en mémoire optionnel

---

## 9. Conclusion

L'analyse révèle une duplication significative (~33% du code) entre `useBlog` et `useEvents`. Les patterns identifiés peuvent être extraits dans un composable générique `useContentCollection` qui:

1. Réduira le code de 30-40%
2. Standardisera la gestion d'erreurs
3. Améliorera la maintenabilité
4. Conservera la rétrocompatibilité
5. Permettra l'ajout de nouvelles collections facilement

**Prochaine étape**: Définir l'API du composable générique (Task 1.4)

