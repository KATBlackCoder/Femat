// queryCollection est auto-importé par Nuxt Content v3
declare const queryCollection: <T = any>(collection: string) => {
  where: (field: string, operator: string, value?: any) => any
  order: (field: string, direction: 'ASC' | 'DESC') => any
  path: (path: string) => any
  all: () => Promise<T[]>
  first: () => Promise<T | null>
  count: () => Promise<number>
}

/**
 * Interface de base pour tous les éléments de contenu
 */
export interface ContentItem {
  _path?: string
  path?: string
  published?: boolean
  date?: string
  [key: string]: any
}

/**
 * Options de configuration pour une collection de contenu
 */
export interface ContentCollectionOptions {
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

/**
 * Options pour la méthode getAll()
 */
export interface GetAllOptions {
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

/**
 * Filtre pour les requêtes
 */
export interface Filter {
  field: string
  operator: '=' | '!=' | 'LIKE' | '>' | '<' | '>=' | '<=' | 'IN'
  value: any
}

/**
 * Options pour la méthode getBySlug()
 */
export interface GetBySlugOptions {
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

/**
 * Options pour la méthode getByField()
 */
export interface GetByFieldOptions {
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

/**
 * Statistiques de la collection
 */
export interface CollectionStats {
  total: number
  published: number
  unpublished: number
  cacheSize: number
  cacheHits: number
  cacheMisses: number
}

/**
 * Entrée de cache
 */
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

/**
 * Classe pour gérer le cache des collections
 */
class ContentCache {
  private cache = new Map<string, CacheEntry<any>>()
  private hits = 0
  private misses = 0

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) {
      this.misses++
      return false
    }

    // Vérifier expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      this.misses++
      return false
    }

    this.hits++
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
    this.hits = 0
    this.misses = 0
  }

  size(): number {
    return this.cache.size
  }

  getStats() {
    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses
    }
  }
}

/**
 * Normalise un slug avec le préfixe de la collection
 */
function normalizeSlug(slug: string, prefix: string): string {
  if (slug.startsWith(prefix)) {
    return slug
  }
  return `${prefix}/${slug}`
}

/**
 * Normalise le path d'un élément (path → _path)
 */
function normalizeItemPath<T extends ContentItem>(item: T): void {
  if (item.path && !item._path) {
    item._path = item.path
  }
  if (!item.path && item._path) {
    item.path = item._path
  }
}

/**
 * Génère des variantes de paths pour le fallback
 */
function generateFallbackPaths(slug: string, prefix: string): string[] {
  const paths: string[] = []

  // Path avec préfixe
  if (!slug.startsWith(prefix)) {
    paths.push(`${prefix}/${slug}`)
  }

  // Path sans préfixe
  if (slug.startsWith(prefix)) {
    const withoutPrefix = slug.replace(prefix, '').replace(/^\//, '')
    if (withoutPrefix) {
      paths.push(withoutPrefix)
    }
  }

  // Path avec préfixe et slash initial
  if (!slug.startsWith('/')) {
    paths.push(`/${prefix}/${slug}`)
  }

  return paths
}

/**
 * Gère les erreurs de manière centralisée
 */
function handleContentError(
  error: unknown,
  context: string,
  onError?: (error: Error, context: string) => void
): void {
  const isDev = import.meta.env.DEV
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

/**
 * Interface de retour du composable useContentCollection
 */
export interface ContentCollection<T extends ContentItem> {
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

/**
 * Composable générique pour gérer les collections Nuxt Content
 * 
 * @template T - Type de l'élément de contenu (doit étendre ContentItem)
 * @param collection - Nom de la collection Nuxt Content (ex: 'blog', 'events')
 * @param options - Options de configuration optionnelles
 * @returns Objet ContentCollection avec les méthodes pour interagir avec la collection
 * 
 * @example
 * ```typescript
 * const blogCollection = useContentCollection<BlogPost>('blog', {
 *   pathPrefix: '/blog',
 *   normalizePath: true
 * })
 * 
 * const allPosts = await blogCollection.getAll()
 * const post = await blogCollection.getBySlug('bienvenue-femat')
 * ```
 */
export function useContentCollection<T extends ContentItem>(
  collection: string,
  options?: ContentCollectionOptions
): ContentCollection<T> {
  // Valeurs par défaut
  const pathPrefix = options?.pathPrefix ?? `/${collection}`
  const defaultSortField = options?.defaultSortField ?? 'date'
  const defaultSortDirection = options?.defaultSortDirection ?? 'DESC'
  const normalizePath = options?.normalizePath ?? false
  const enableCache = options?.enableCache ?? true
  const cacheTTL = options?.cacheTTL ?? 300000 // 5 minutes
  const onError = options?.onError

  // Cache par collection
  const cache = enableCache ? new ContentCache() : null

  /**
   * Récupère tous les éléments de la collection avec filtres et tri optionnels
   */
  const getAll = async (options?: GetAllOptions): Promise<T[]> => {
    const cacheKey = `collection:${collection}:all:${JSON.stringify(options)}`

    // Vérifier le cache
    if (cache && !options?.skipCache && cache.has(cacheKey)) {
      return cache.get<T[]>(cacheKey) ?? []
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
      if (normalizePath && results) {
        results.forEach(item => normalizeItemPath(item))
      }

      const finalResults = (results || []) as T[]

      // Mettre en cache
      if (cache && !options?.skipCache) {
        cache.set(cacheKey, finalResults, cacheTTL)
      }

      return finalResults
    } catch (error) {
      handleContentError(error, `getAll(${collection})`, onError)
      return []
    }
  }

  /**
   * Récupère un élément par son slug avec normalisation automatique
   */
  const getBySlug = async (
    slug: string,
    options?: GetBySlugOptions
  ): Promise<T | null> => {
    const cacheKey = `collection:${collection}:slug:${slug}`

    // Vérifier le cache
    if (cache && !options?.skipCache && cache.has(cacheKey)) {
      return cache.get<T>(cacheKey) ?? null
    }

    try {
      // Normaliser le slug
      const normalizedSlug = normalizeSlug(slug, pathPrefix)

      // Essayer avec le slug normalisé
      let query = await queryCollection<T>(collection)
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

        const result = query as T

        // Mettre en cache
        if (cache && !options?.skipCache) {
          cache.set(cacheKey, result, cacheTTL)
        }

        return result
      }

      return null
    } catch (error) {
      handleContentError(error, `getBySlug(${collection}, ${slug})`, onError)
      return null
    }
  }

  /**
   * Récupère des éléments filtrés par un champ avec opérateur
   */
  const getByField = async (
    field: string,
    value: any,
    options?: GetByFieldOptions
  ): Promise<T[]> => {
    const operator = options?.operator || '='
    const cacheKey = `collection:${collection}:field:${field}:${operator}:${JSON.stringify(value)}`

    // Vérifier le cache
    if (cache && !options?.skipCache && cache.has(cacheKey)) {
      return cache.get<T[]>(cacheKey) ?? []
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
      if (normalizePath && results) {
        results.forEach(item => normalizeItemPath(item))
      }

      const finalResults = (results || []) as T[]

      // Mettre en cache
      if (cache && !options?.skipCache) {
        cache.set(cacheKey, finalResults, cacheTTL)
      }

      return finalResults
    } catch (error) {
      handleContentError(
        error,
        `getByField(${collection}, ${field}, ${value})`,
        onError
      )
      return []
    }
  }

  /**
   * Invalide le cache de la collection
   */
  const invalidateCache = (): void => {
    if (cache) {
      cache.clear()
    }
  }

  /**
   * Récupère les statistiques de la collection
   */
  const getStats = async (): Promise<CollectionStats> => {
    try {
      const allItems = await getAll({ skipCache: true })
      const publishedItems = allItems.filter(item => item.published !== false)
      const unpublishedItems = allItems.filter(item => item.published === false)

      const cacheStats = cache ? cache.getStats() : { size: 0, hits: 0, misses: 0 }

      return {
        total: allItems.length,
        published: publishedItems.length,
        unpublished: unpublishedItems.length,
        cacheSize: cacheStats.size,
        cacheHits: cacheStats.hits,
        cacheMisses: cacheStats.misses
      }
    } catch (error) {
      handleContentError(error, `getStats(${collection})`, onError)
      return {
        total: 0,
        published: 0,
        unpublished: 0,
        cacheSize: 0,
        cacheHits: 0,
        cacheMisses: 0
      }
    }
  }

  return {
    getAll,
    getBySlug,
    getByField,
    invalidateCache,
    getStats
  }
}

