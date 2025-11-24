import type { BlogPost, BlogCategory } from '~/types/blog'
import { useContentCollection } from '~/composables/useContentCollection'

/**
 * Composable pour gérer les articles de blog de la FEMAT
 * Utilise Nuxt Content pour récupérer les articles depuis content/blog/
 * 
 * Refactorisé pour utiliser useContentCollection (générique)
 */
export const useBlog = () => {
  // Créer une instance de la collection blog avec options spécifiques
  const blogCollection = useContentCollection<BlogPost>('blog', {
    pathPrefix: '/blog',
    normalizePath: true, // Normaliser path → _path pour compatibilité
    enableCache: true,
    cacheTTL: 300000 // 5 minutes
  })

  /**
   * Helper pour obtenir le path d'un article (compatible avec Nuxt Content v3)
   */
  const getPostPath = (post: BlogPost | any): string | undefined => {
    return post.path || post._path
  }

  /**
   * Récupère tous les articles publiés, triés par date (plus récent en premier)
   */
  const getAllPosts = async (): Promise<BlogPost[]> => {
    return blogCollection.getAll({
      published: true,
      sortField: 'date',
      sortDirection: 'DESC'
    })
  }

  /**
   * Récupère un article par son slug (chemin)
   */
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    return blogCollection.getBySlug(slug, {
      enableFallback: true // Activer le fallback multiple comme dans l'ancienne version
    })
  }

  /**
   * Filtre les articles par catégorie
   */
  const getPostsByCategory = async (category: BlogCategory): Promise<BlogPost[]> => {
    return blogCollection.getByField('category', category, {
      sortField: 'date',
      sortDirection: 'DESC'
    })
  }

  /**
   * Filtre les articles par tag
   */
  const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    return blogCollection.getByField('tags', `%${tag}%`, {
      operator: 'LIKE',
      sortField: 'date',
      sortDirection: 'DESC'
    })
  }

  /**
   * Recherche dans les articles (titre et description)
   */
  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    if (!query || query.trim().length === 0) {
      return []
    }

    // Récupérer tous les posts puis filtrer en mémoire
    // (la recherche full-text n'est pas supportée directement par Nuxt Content)
    const allPosts = await blogCollection.getAll({
      published: true,
      sortField: 'date',
      sortDirection: 'DESC'
    })

    const searchLower = query.toLowerCase().trim()

    return allPosts.filter((post: BlogPost) => {
      const titleMatch = post.title?.toLowerCase().includes(searchLower) || false
      const descriptionMatch = post.description?.toLowerCase().includes(searchLower) || false
      const tagsMatch = post.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) || false
      return titleMatch || descriptionMatch || tagsMatch
    })
  }

  /**
   * Récupère des articles similaires basés sur la catégorie et les tags
   */
  const getRelatedPosts = async (post: BlogPost, limit: number = 3): Promise<BlogPost[]> => {
    const postPath = getPostPath(post)
    if (!postPath) {
      return []
    }

    // Récupérer tous les articles publiés
    const allPosts = await blogCollection.getAll({
      published: true,
      sortField: 'date',
      sortDirection: 'DESC'
    })

    const related: BlogPost[] = []

    // Priorité 1: Même catégorie
    const sameCategory = allPosts.filter((p: BlogPost | any) => {
      const pPath = getPostPath(p)
      return p.category === post.category && pPath !== postPath
    })
    related.push(...sameCategory.slice(0, limit))

    // Priorité 2: Tags communs (si pas assez d'articles avec même catégorie)
    if (related.length < limit && post.tags && post.tags.length > 0) {
      const withCommonTags = allPosts
        .filter((p: BlogPost | any) => {
          const pPath = getPostPath(p)
          if (pPath === postPath) return false
          if (related.some(r => getPostPath(r) === pPath)) return false
          return p.tags?.some((tag: string) => post.tags?.includes(tag)) || false
        })
        .slice(0, limit - related.length)
      related.push(...withCommonTags)
    }

    // Priorité 3: Articles récents (si pas assez)
    if (related.length < limit) {
      const recent = allPosts
        .filter((p: BlogPost | any) => {
          const pPath = getPostPath(p)
          if (pPath === postPath) return false
          return !related.some(r => getPostPath(r) === pPath)
        })
        .slice(0, limit - related.length)
      related.push(...recent)
    }

    return related.slice(0, limit)
  }

  /**
   * Récupère tous les tags uniques utilisés dans les articles publiés
   */
  const getAllTags = async (): Promise<string[]> => {
    const posts = await getAllPosts()
    const tagsSet = new Set<string>()

    posts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag))
    })

    return Array.from(tagsSet).sort()
  }

  /**
   * Compte le nombre d'articles par catégorie
   */
  const getPostsCountByCategory = async (): Promise<Record<BlogCategory, number>> => {
    const posts = await getAllPosts()
    const counts: Record<BlogCategory, number> = {
      competition: 0,
      actualite: 0,
      resultat: 0,
      evenement: 0
    }

    posts.forEach(post => {
      if (post.category && counts[post.category] !== undefined) {
        counts[post.category]++
      }
    })

    return counts
  }

  return {
    getAllPosts,
    getPostBySlug,
    getPostsByCategory,
    getPostsByTag,
    searchPosts,
    getRelatedPosts,
    getAllTags,
    getPostsCountByCategory
  }
}
