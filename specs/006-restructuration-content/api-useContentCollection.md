# API du Composable Générique: useContentCollection

**Date**: 2025-01-27  
**Fichier**: `app/composables/useContentCollection.ts` (à créer)

## Vue d'ensemble

Ce document définit l'API publique du composable générique `useContentCollection` qui sera utilisé pour remplacer les duplications dans `useBlog` et `useEvents`.

## 1. Signature principale

```typescript
function useContentCollection<T extends ContentItem>(
  collection: string,
  options?: ContentCollectionOptions
): ContentCollection<T>
```

### Paramètres

- **`collection`** (string, requis): Nom de la collection Nuxt Content (ex: `'blog'`, `'events'`)
- **`options`** (ContentCollectionOptions, optionnel): Options de configuration

### Type de retour

Retourne un objet `ContentCollection<T>` avec toutes les méthodes disponibles.

---

## 2. Types et interfaces

### 2.1 ContentItem (interface de base)

```typescript
interface ContentItem {
  _path?: string
  path?: string
  published?: boolean
  date?: string
  [key: string]: any
}
```

**Caractéristiques**:
- Interface minimale pour tous les éléments de contenu
- Champs optionnels pour compatibilité avec différents types
- Permet l'extension avec des types spécifiques (`BlogPost`, `Event`)

---

### 2.2 ContentCollectionOptions

```typescript
interface ContentCollectionOptions {
  /**
   * Préfixe de chemin pour la collection (ex: '/blog', '/events')
   * Utilisé pour la normalisation des slugs
   * @default `/${collection}`
   */
  pathPrefix?: string

  /**
   * Champ par défaut pour le tri
   * @default 'date'
   */
  defaultSortField?: string

  /**
   * Direction de tri par défaut
   * @default 'DESC'
   */
  defaultSortDirection?: 'ASC' | 'DESC'

  /**
   * Activer la normalisation du path (path → _path)
   * @default false
   */
  normalizePath?: boolean

  /**
   * Activer le cache des résultats
   * @default true
   */
  enableCache?: boolean

  /**
   * Durée de vie du cache en millisecondes
   * @default 300000 (5 minutes)
   */
  cacheTTL?: number

  /**
   * Fonction de gestion d'erreurs personnalisée
   */
  onError?: (error: Error, context: string) => void
}
```

---

### 2.3 ContentCollection (interface de retour)

```typescript
interface ContentCollection<T extends ContentItem> {
  /**
   * Récupère tous les éléments de la collection
   */
  getAll: (options?: GetAllOptions) => Promise<T[]>

  /**
   * Récupère un élément par son slug
   */
  getBySlug: (slug: string, options?: GetBySlugOptions) => Promise<T | null>

  /**
   * Récupère des éléments filtrés par champ
   */
  getByField: (
    field: string,
    value: any,
    options?: GetByFieldOptions
  ) => Promise<T[]>

  /**
   * Invalide le cache de la collection
   */
  invalidateCache: () => void

  /**
   * Récupère les statistiques de la collection
   */
  getStats: () => Promise<CollectionStats>
}
```

---

## 3. Méthodes principales

### 3.1 getAll()

Récupère tous les éléments de la collection avec filtres et tri optionnels.

```typescript
getAll(options?: GetAllOptions): Promise<T[]>
```

#### GetAllOptions

```typescript
interface GetAllOptions {
  /**
   * Filtrer uniquement les éléments publiés
   * @default true
   */
  published?: boolean

  /**
   * Champ de tri
   * @default options.defaultSortField ou 'date'
   */
  sortField?: string

  /**
   * Direction de tri
   * @default options.defaultSortDirection ou 'DESC'
   */
  sortDirection?: 'ASC' | 'DESC'

  /**
   * Filtres additionnels
   */
  filters?: Filter[]

  /**
   * Ignorer le cache
   * @default false
   */
  skipCache?: boolean
}
```

#### Filter

```typescript
interface Filter {
  field: string
  operator: '=' | '!=' | 'LIKE' | '>' | '<' | '>=' | '<=' | 'IN'
  value: any
}
```

#### Exemple d'utilisation

```typescript
const blogCollection = useContentCollection<BlogPost>('blog')

// Récupère tous les articles publiés, triés par date DESC
const allPosts = await blogCollection.getAll()

// Récupère avec tri personnalisé
const recentPosts = await blogCollection.getAll({
  sortField: 'date',
  sortDirection: 'ASC'
})

// Récupère avec filtres additionnels
const competitionPosts = await blogCollection.getAll({
  filters: [
    { field: 'category', operator: '=', value: 'competition' }
  ]
})
```

#### Implémentation proposée

```typescript
const getAll = async (options?: GetAllOptions): Promise<T[]> => {
  const cacheKey = `collection:${collection}:all:${JSON.stringify(options)}`
  
  // Vérifier le cache
  if (!options?.skipCache && cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    let query = queryCollection<T>(collection)

    // Filtre published par défaut
    if (options?.published !== false) {
      query = query.where('published', '=', true)
    }

    // Appliquer filtres additionnels
    if (options?.filters) {
      options.filters.forEach(filter => {
        query = query.where(filter.field, filter.operator, filter.value)
      })
    }

    // Tri
    const sortField = options?.sortField || defaultSortField
    const sortDirection = options?.sortDirection || defaultSortDirection
    query = query.order(sortField, sortDirection)

    const results = await query.all()

    // Normaliser les paths si nécessaire
    if (normalizePath) {
      results.forEach(item => normalizeItemPath(item))
    }

    // Mettre en cache
    if (!options?.skipCache) {
      cache.set(cacheKey, results, cacheTTL)
    }

    return results || []
  } catch (error) {
    handleContentError(error, `getAll(${collection})`)
    return []
  }
}
```

---

### 3.2 getBySlug()

Récupère un élément par son slug avec normalisation automatique.

```typescript
getBySlug(slug: string, options?: GetBySlugOptions): Promise<T | null>
```

#### GetBySlugOptions

```typescript
interface GetBySlugOptions {
  /**
   * Activer le fallback multiple (essayer plusieurs variantes du slug)
   * @default false
   */
  enableFallback?: boolean

  /**
   * Ignorer le cache
   * @default false
   */
  skipCache?: boolean
}
```

#### Exemple d'utilisation

```typescript
const blogCollection = useContentCollection<BlogPost>('blog')

// Récupère un article par slug
const post = await blogCollection.getBySlug('bienvenue-femat')

// Avec fallback
const postWithFallback = await blogCollection.getBySlug('bienvenue-femat', {
  enableFallback: true
})
```

#### Implémentation proposée

```typescript
const getBySlug = async (
  slug: string,
  options?: GetBySlugOptions
): Promise<T | null> => {
  const cacheKey = `collection:${collection}:slug:${slug}`
  
  // Vérifier le cache
  if (!options?.skipCache && cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    // Normaliser le slug
    const normalizedSlug = normalizeSlug(slug, pathPrefix)
    
    // Essayer avec le slug normalisé
    let query = queryCollection<T>(collection)
      .path(normalizedSlug)
      .where('published', '=', true)
      .first()

    // Fallback si activé et pas trouvé
    if (!query && options?.enableFallback) {
      const fallbackPaths = generateFallbackPaths(slug, pathPrefix)
      for (const path of fallbackPaths) {
        query = await queryCollection<T>(collection)
          .path(path)
          .where('published', '=', true)
          .first()
        if (query) break
      }
    }

    if (query) {
      // Normaliser le path si nécessaire
      if (normalizePath) {
        normalizeItemPath(query)
      }

      // Mettre en cache
      if (!options?.skipCache) {
        cache.set(cacheKey, query, cacheTTL)
      }

      return query
    }

    return null
  } catch (error) {
    handleContentError(error, `getBySlug(${collection}, ${slug})`)
    return null
  }
}
```

---

### 3.3 getByField()

Récupère des éléments filtrés par un champ avec opérateur.

```typescript
getByField(
  field: string,
  value: any,
  options?: GetByFieldOptions
): Promise<T[]>
```

#### GetByFieldOptions

```typescript
interface GetByFieldOptions {
  /**
   * Opérateur de comparaison
   * @default '='
   */
  operator?: '=' | '!=' | 'LIKE' | '>' | '<' | '>=' | '<=' | 'IN'

  /**
   * Champ de tri
   * @default options.defaultSortField ou 'date'
   */
  sortField?: string

  /**
   * Direction de tri
   * @default options.defaultSortDirection ou 'DESC'
   */
  sortDirection?: 'ASC' | 'DESC'

  /**
   * Filtrer uniquement les éléments publiés
   * @default true
   */
  published?: boolean

  /**
   * Ignorer le cache
   * @default false
   */
  skipCache?: boolean
}
```

#### Exemple d'utilisation

```typescript
const blogCollection = useContentCollection<BlogPost>('blog')

// Récupère par catégorie
const competitionPosts = await blogCollection.getByField('category', 'competition')

// Récupère par tag avec LIKE
const tagPosts = await blogCollection.getByField('tags', 'taekwondo', {
  operator: 'LIKE'
})

// Récupère avec tri personnalisé
const recentCompetitions = await blogCollection.getByField('category', 'competition', {
  sortField: 'date',
  sortDirection: 'ASC'
})
```

#### Implémentation proposée

```typescript
const getByField = async (
  field: string,
  value: any,
  options?: GetByFieldOptions
): Promise<T[]> => {
  const operator = options?.operator || '='
  const cacheKey = `collection:${collection}:field:${field}:${operator}:${value}`

  // Vérifier le cache
  if (!options?.skipCache && cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    let query = queryCollection<T>(collection)

    // Filtre published par défaut
    if (options?.published !== false) {
      query = query.where('published', '=', true)
    }

    // Appliquer le filtre
    query = query.where(field, operator, value)

    // Tri
    const sortField = options?.sortField || defaultSortField
    const sortDirection = options?.sortDirection || defaultSortDirection
    query = query.order(sortField, sortDirection)

    const results = await query.all()

    // Normaliser les paths si nécessaire
    if (normalizePath) {
      results.forEach(item => normalizeItemPath(item))
    }

    // Mettre en cache
    if (!options?.skipCache) {
      cache.set(cacheKey, results, cacheTTL)
    }

    return results || []
  } catch (error) {
    handleContentError(error, `getByField(${collection}, ${field}, ${value})`)
    return []
  }
}
```

---

### 3.4 invalidateCache()

Invalide le cache de la collection.

```typescript
invalidateCache(): void
```

#### Exemple d'utilisation

```typescript
const blogCollection = useContentCollection<BlogPost>('blog')

// Invalider le cache après modification
await updatePost(post)
blogCollection.invalidateCache()
```

---

### 3.5 getStats()

Récupère les statistiques de la collection.

```typescript
getStats(): Promise<CollectionStats>
```

#### CollectionStats

```typescript
interface CollectionStats {
  total: number
  published: number
  unpublished: number
  cacheSize: number
  cacheHits: number
  cacheMisses: number
}
```

---

## 4. Fonctions utilitaires internes

### 4.1 normalizeSlug()

Normalise un slug avec le préfixe de la collection.

```typescript
function normalizeSlug(slug: string, prefix: string): string {
  if (slug.startsWith(prefix)) {
    return slug
  }
  return `${prefix}/${slug}`
}
```

---

### 4.2 normalizeItemPath()

Normalise le path d'un élément (path → _path).

```typescript
function normalizeItemPath<T extends ContentItem>(item: T): void {
  if (item.path && !item._path) {
    item._path = item.path
  }
  if (!item.path && item._path) {
    item.path = item._path
  }
}
```

---

### 4.3 handleContentError()

Gère les erreurs de manière centralisée.

```typescript
function handleContentError(
  error: unknown,
  context: string,
  onError?: (error: Error, context: string) => void
): void {
  const isDev = process.env.NODE_ENV === 'development'
  const errorObj = error instanceof Error ? error : new Error(String(error))

  // Callback personnalisé si fourni
  if (onError) {
    onError(errorObj, context)
    return
  }

  // Logs différenciés dev/production
  if (isDev) {
    console.error(`[ContentCollection] ${context}:`, errorObj)
  } else {
    // En production, logger seulement les erreurs critiques
    console.error(`[ContentCollection] Error in ${context}`)
  }
}
```

---

### 4.4 generateFallbackPaths()

Génère des variantes de paths pour le fallback.

```typescript
function generateFallbackPaths(slug: string, prefix: string): string[] {
  const paths: string[] = []
  
  // Path avec préfixe
  if (!slug.startsWith(prefix)) {
    paths.push(`${prefix}/${slug}`)
  }
  
  // Path sans préfixe
  if (slug.startsWith(prefix)) {
    paths.push(slug.replace(prefix, '').replace(/^\//, ''))
  }
  
  // Path avec préfixe et slash initial
  paths.push(`/${prefix}/${slug}`)
  
  return paths
}
```

---

## 5. Système de cache

### 5.1 Implémentation avec useState

```typescript
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class ContentCache {
  private cache = new Map<string, CacheEntry<any>>()

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    
    // Vérifier expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  get<T>(key: string): T | undefined {
    if (!this.has(key)) return undefined
    return this.cache.get(key)?.data as T
  }

  set<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}
```

---

## 6. Exemples d'utilisation

### 6.1 Refactorisation de useBlog

```typescript
export const useBlog = () => {
  const blogCollection = useContentCollection<BlogPost>('blog', {
    pathPrefix: '/blog',
    normalizePath: true
  })

  const getAllPosts = async (): Promise<BlogPost[]> => {
    return blogCollection.getAll()
  }

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    return blogCollection.getBySlug(slug, { enableFallback: true })
  }

  const getPostsByCategory = async (category: BlogCategory): Promise<BlogPost[]> => {
    return blogCollection.getByField('category', category)
  }

  const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    return blogCollection.getByField('tags', `%${tag}%`, { operator: 'LIKE' })
  }

  // ... autres fonctions utilisant blogCollection
}
```

### 6.2 Refactorisation de useEvents

```typescript
export const useEvents = () => {
  const eventsCollection = useContentCollection<Event>('events', {
    pathPrefix: '/events'
  })

  const getAllEvents = async (): Promise<Event[]> => {
    return eventsCollection.getAll()
  }

  const getEventBySlug = async (slug: string): Promise<Event | null> => {
    return eventsCollection.getBySlug(slug)
  }

  const getUpcomingEvents = async (): Promise<Event[]> => {
    const allEvents = await eventsCollection.getAll({ sortDirection: 'ASC' })
    return allEvents.filter(event => !isEventPast(event))
  }

  const getPastEvents = async (): Promise<Event[]> => {
    const allEvents = await eventsCollection.getAll()
    return allEvents.filter(event => isEventPast(event))
  }

  // Logique métier spécifique conservée
  const isEventPast = (event: Event): boolean => {
    // ... logique existante
  }

  // ... computed refs et chargement automatique
}
```

---

## 7. Rétrocompatibilité

### 7.1 Garanties

- **API publique inchangée**: Toutes les fonctions publiques de `useBlog` et `useEvents` conservent leur signature
- **Comportement identique**: Les résultats retournés sont identiques
- **Performance**: Amélioration grâce au cache
- **Types**: Compatibilité TypeScript complète

### 7.2 Migration

La migration sera transparente:
1. Refactorisation interne uniquement
2. Pas de changement dans les composants utilisant ces composables
3. Tests de régression pour valider

---

## 8. Prochaines étapes

1. **Implémentation**: Créer `useContentCollection.ts` avec cette API
2. **Tests**: Tester avec useBlog et useEvents
3. **Refactorisation**: Refactoriser useBlog puis useEvents
4. **Documentation**: Ajouter JSDoc complet
5. **Optimisation**: Ajuster le cache et les performances

---

## 9. Notes de conception

### 9.1 Principes

- **Généricité**: Support de n'importe quelle collection Nuxt Content
- **Flexibilité**: Options configurables pour différents cas d'usage
- **Performance**: Cache intégré pour éviter requêtes redondantes
- **Maintenabilité**: Code DRY et réutilisable
- **Rétrocompatibilité**: Pas de breaking changes

### 9.2 Limitations connues

- Cache en mémoire uniquement (pas de persistence)
- Pas de support pour requêtes complexes multi-collections
- Normalisation du path optionnelle (peut ne pas être nécessaire pour toutes les collections)

### 9.3 Extensions futures possibles

- Support de la pagination
- Support de la recherche full-text
- Cache persistant (localStorage, IndexedDB)
- Support des relations entre collections
- Webhooks pour invalidation automatique du cache

