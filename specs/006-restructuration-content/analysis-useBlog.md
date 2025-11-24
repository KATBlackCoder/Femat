# Analyse de useBlog.ts

**Date**: 2025-01-27  
**Fichier**: `app/composables/useBlog.ts`  
**Lignes**: 317

## Vue d'ensemble

Le composable `useBlog` gère toutes les opérations liées aux articles de blog en utilisant Nuxt Content v3 avec `queryCollection`. Il expose 8 fonctions publiques pour récupérer, filtrer et rechercher des articles.

## Fonctions analysées

### 1. `getAllPosts()`
**Lignes**: 22-53  
**Pattern identifié**: Requête de base avec filtres et tri

**Structure**:
```typescript
queryCollection<BlogPost>('blog')
  .where('published', '=', true)
  .order('date', 'DESC')
  .all()
```

**Caractéristiques**:
- Filtre par `published = true`
- Tri par `date DESC`
- Normalisation du path (`path` → `_path`)
- Logs de debug excessifs (lignes 30-46)
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Supprimer les logs de debug en production
- Cache des résultats
- Normalisation du path centralisée

### 2. `getPostBySlug(slug: string)`
**Lignes**: 58-124  
**Pattern identifié**: Requête avec normalisation de slug et fallback

**Structure**:
```typescript
queryCollection<BlogPost>('blog')
  .path(path)
  .where('published', '=', true)
  .first()
```

**Caractéristiques**:
- Normalisation du slug (avec/sans préfixe `/blog/`)
- Tentative multiple avec fallback (lignes 70-82)
- Normalisation complexe du path (lignes 84-114)
- Logs de debug excessifs (lignes 67-99)
- Gestion d'erreur: retourne `null`

**Optimisations possibles**:
- Fonction de normalisation de slug réutilisable
- Simplifier la logique de normalisation du path
- Supprimer les logs de debug

### 3. `getPostsByCategory(category: BlogCategory)`
**Lignes**: 129-141  
**Pattern identifié**: Requête avec filtre par champ

**Structure**:
```typescript
queryCollection<BlogPost>('blog')
  .where('published', '=', true)
  .where('category', '=', category)
  .order('date', 'DESC')
  .all()
```

**Caractéristiques**:
- Filtre double (`published` + `category`)
- Tri par date DESC
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Pattern réutilisable pour filtres multiples

### 4. `getPostsByTag(tag: string)`
**Lignes**: 146-158  
**Pattern identifié**: Requête avec opérateur LIKE

**Structure**:
```typescript
queryCollection<BlogPost>('blog')
  .where('published', '=', true)
  .where('tags', 'LIKE', `%${tag}%`)
  .order('date', 'DESC')
  .all()
```

**Caractéristiques**:
- Utilise opérateur `LIKE` pour recherche partielle
- Filtre par `published`
- Tri par date DESC
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Pattern réutilisable pour opérateurs avancés

### 5. `searchPosts(query: string)`
**Lignes**: 163-187  
**Pattern identifié**: Recherche en mémoire après récupération

**Structure**:
```typescript
// Récupère tous les posts
queryCollection<BlogPost>('blog')
  .where('published', '=', true)
  .order('date', 'DESC')
  .all()

// Filtre en mémoire
posts.filter((post) => {
  // Recherche dans title, description, tags
})
```

**Caractéristiques**:
- Récupère tous les posts puis filtre en mémoire
- Recherche dans `title`, `description`, `tags`
- Gestion d'erreur: retourne tableau vide
- Validation: retourne vide si query vide

**Optimisations possibles**:
- Cache des résultats de `getAllPosts()`
- Recherche full-text si supporté par Nuxt Content

### 6. `getRelatedPosts(post: BlogPost, limit: number)`
**Lignes**: 199-253  
**Pattern identifié**: Logique métier complexe avec priorités

**Structure**:
```typescript
// Récupère tous les posts
queryCollection<BlogPost>('blog')
  .where('published', '=', true)
  .order('date', 'DESC')
  .all()

// Filtre avec logique de priorité:
// 1. Même catégorie
// 2. Tags communs
// 3. Articles récents
```

**Caractéristiques**:
- Logique métier spécifique au blog
- Système de priorité (catégorie > tags > récents)
- Utilise `getPostPath()` helper
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Cache des résultats de `getAllPosts()`
- Logique métier à conserver (spécifique au blog)

### 7. `getAllTags()`
**Lignes**: 258-272  
**Pattern identifié**: Utilise `getAllPosts()` puis traitement

**Structure**:
```typescript
const posts = await getAllPosts()
// Extrait tous les tags uniques
```

**Caractéristiques**:
- Réutilise `getAllPosts()`
- Utilise `Set` pour déduplication
- Tri alphabétique
- Gestion d'erreur: retourne tableau vide

**Optimisations possibles**:
- Cache des résultats de `getAllPosts()`

### 8. `getPostsCountByCategory()`
**Lignes**: 277-303  
**Pattern identifié**: Utilise `getAllPosts()` puis comptage

**Structure**:
```typescript
const posts = await getAllPosts()
// Compte par catégorie
```

**Caractéristiques**:
- Réutilise `getAllPosts()`
- Retourne objet avec compteurs par catégorie
- Gestion d'erreur: retourne objet avec zéros

**Optimisations possibles**:
- Cache des résultats de `getAllPosts()`

## Patterns de requête Nuxt Content identifiés

### Pattern 1: Requête de base avec filtres
```typescript
queryCollection<T>('collection')
  .where('published', '=', true)
  .order('field', 'DESC' | 'ASC')
  .all()
```

**Utilisé dans**: `getAllPosts`, `getPostsByCategory`, `getPostsByTag`, `getUpcomingEvents`, `getPastEvents`

### Pattern 2: Requête par slug/path
```typescript
queryCollection<T>('collection')
  .path(path)
  .where('published', '=', true)
  .first()
```

**Utilisé dans**: `getPostBySlug`, `getEventBySlug`

### Pattern 3: Requête avec opérateur avancé
```typescript
queryCollection<T>('collection')
  .where('field', 'LIKE', value)
  .all()
```

**Utilisé dans**: `getPostsByTag`

### Pattern 4: Récupération puis filtrage en mémoire
```typescript
const all = await queryCollection<T>('collection').all()
const filtered = all.filter(...)
```

**Utilisé dans**: `searchPosts`, `getRelatedPosts`, `getUpcomingEvents`, `getPastEvents`

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
- Logs excessifs en production
- Pas de fallback gracieux
- Messages d'erreur non standardisés
- Pas de gestion d'erreurs réseau spécifique

## Normalisation du path

### Pattern actuel
Le code normalise le path de plusieurs façons:
- `path` → `_path` (lignes 34-38, 87-114)
- Génération de path depuis slug (lignes 102-106)
- Helper `getPostPath()` (lignes 192-194)

**Problèmes**:
- Logique dupliquée
- Normalisation complexe dans `getPostBySlug`
- Incohérence entre `path` et `_path`

## Logs de debug

### Problèmes identifiés
- Logs excessifs dans `getAllPosts()` (lignes 30-46)
- Logs excessifs dans `getPostBySlug()` (lignes 67-99)
- Tous les logs utilisent `console.log`/`console.error`
- Pas de différenciation dev/production

## Optimisations possibles

1. **Cache**: Implémenter un cache pour `getAllPosts()` utilisé par plusieurs fonctions
2. **Normalisation**: Centraliser la normalisation du path/slug
3. **Logs**: Supprimer les logs de debug en production
4. **Gestion d'erreurs**: Standardiser et améliorer la gestion d'erreurs
5. **Réutilisation**: Extraire les patterns communs dans un composable générique

## Code dupliqué

### Duplications identifiées
1. **Pattern de requête de base**: Répété dans toutes les fonctions
2. **Gestion d'erreur**: Try/catch identique partout
3. **Normalisation du path**: Logique dupliquée
4. **Filtre `published`**: Répété dans toutes les requêtes

## Métriques

- **Lignes de code**: 317
- **Fonctions publiques**: 8
- **Fonctions privées/helpers**: 1 (`getPostPath`)
- **Logs de debug**: ~50 lignes (15% du code)
- **Gestion d'erreurs**: 8 blocs try/catch similaires
- **Requêtes Nuxt Content**: 8 requêtes directes + réutilisation

