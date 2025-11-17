import type { BlogPost, BlogCategory } from '~/types/blog'

// queryCollection est auto-importé par Nuxt Content v3
// Les types seront disponibles après la génération des types Nuxt
declare const queryCollection: <T = any>(collection: string) => {
  where: (field: string, operator: string, value?: any) => any
  order: (field: string, direction: 'ASC' | 'DESC') => any
  path: (path: string) => any
  all: () => Promise<T[]>
  first: () => Promise<T | null>
  count: () => Promise<number>
}

/**
 * Composable pour gérer les articles de blog de la FEMAT
 * Utilise Nuxt Content pour récupérer les articles depuis content/blog/
 */
export const useBlog = () => {
  /**
   * Récupère tous les articles publiés, triés par date (plus récent en premier)
   */
  const getAllPosts = async (): Promise<BlogPost[]> => {
    try {
      // Utiliser queryCollection avec la collection 'blog' (Nuxt Content v3)
      const allContent = await queryCollection<BlogPost>('blog')
        .where('published', '=', true)
        .order('date', 'DESC')
        .all()
      
      console.log('Tous les contenus blog trouvés:', allContent?.length || 0)
      if (allContent && allContent.length > 0) {
        const firstPost = allContent[0] as any
        // Normaliser le path pour tous les articles
        allContent.forEach((post: any) => {
          if (post.path && !post._path) {
            post._path = post.path
          }
        })
        console.log('Exemple de premier article:', {
          title: firstPost.title,
          _path: firstPost._path,
          path: firstPost.path,
          hasBody: !!firstPost.body,
          hasBody_: !!firstPost._body,
          keys: Object.keys(firstPost)
        })
      }
      return allContent || []
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
      return []
    }
  }

  /**
   * Récupère un article par son slug (chemin)
   */
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      // Normaliser le slug pour correspondre au format de path
      // Le slug peut être "bienvenue-femat" ou "blog/bienvenue-femat"
      let path = slug
      if (!path.startsWith('/blog/')) {
        path = `/blog/${slug}`
      }
      
      console.log('Recherche de l\'article avec slug:', slug, 'path:', path)
      
      // Essayer d'abord avec le path exact
      let query = await queryCollection<BlogPost>('blog')
        .path(path)
        .where('published', '=', true)
        .first()
      
      // Si pas trouvé, essayer sans le préfixe /blog/
      if (!query && !slug.startsWith('/blog/')) {
        console.log('Tentative avec path alternatif:', slug)
        query = await queryCollection<BlogPost>('blog')
          .path(`/blog/${slug}`)
          .where('published', '=', true)
          .first()
      }
      
      if (query) {
        const queryAny = query as any
        // Normaliser le path (Nuxt Content v3 utilise 'path' au lieu de '_path')
        const normalizedPath = queryAny.path || queryAny._path
        console.log('Article trouvé:', {
          title: query.title,
          path: queryAny.path,
          _path: queryAny._path,
          normalizedPath,
          hasBody: !!queryAny.body,
          hasBody_: !!queryAny._body,
          bodyType: typeof queryAny.body,
          bodyIsObject: queryAny.body && typeof queryAny.body === 'object',
          keys: Object.keys(query),
          allKeys: Object.keys(queryAny)
        })
        
        // Si aucun path n'est trouvé, générer le path à partir du slug
        if (!normalizedPath) {
          const generatedPath = `/blog/${String(slug)}` as string
          console.warn('Path non trouvé, génération depuis slug:', generatedPath)
          ;(query as any)._path = generatedPath
          ;(query as any).path = generatedPath
        } else {
          // Ajouter le path normalisé à l'objet retourné
          (query as any)._path = normalizedPath
          // S'assurer que path existe aussi pour compatibilité
          if (!queryAny.path) {
            (query as any).path = normalizedPath
          }
        }
      } else {
        console.log('Article non trouvé')
      }
      
      return query
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'article ${slug}:`, error)
      return null
    }
  }

  /**
   * Filtre les articles par catégorie
   */
  const getPostsByCategory = async (category: BlogCategory): Promise<BlogPost[]> => {
    try {
      const query = await queryCollection<BlogPost>('blog')
        .where('published', '=', true)
        .where('category', '=', category)
        .order('date', 'DESC')
        .all()
      return query || []
    } catch (error) {
      console.error(`Erreur lors de la récupération des articles de catégorie ${category}:`, error)
      return []
    }
  }

  /**
   * Filtre les articles par tag
   */
  const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    try {
      const query = await queryCollection<BlogPost>('blog')
        .where('published', '=', true)
        .where('tags', 'LIKE', `%${tag}%`)
        .order('date', 'DESC')
        .all()
      return query || []
    } catch (error) {
      console.error(`Erreur lors de la récupération des articles avec le tag ${tag}:`, error)
      return []
    }
  }

  /**
   * Recherche dans les articles (titre et description)
   */
  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    if (!query || query.trim().length === 0) {
      return []
    }

    try {
      const queryResult = await queryCollection<BlogPost>('blog')
        .where('published', '=', true)
        .order('date', 'DESC')
        .all()

      const posts = queryResult || []
      const searchLower = query.toLowerCase().trim()

      return posts.filter((post: BlogPost) => {
        const titleMatch = post.title?.toLowerCase().includes(searchLower) || false
        const descriptionMatch = post.description?.toLowerCase().includes(searchLower) || false
        const tagsMatch = post.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) || false
        return titleMatch || descriptionMatch || tagsMatch
      })
    } catch (error) {
      console.error(`Erreur lors de la recherche "${query}":`, error)
      return []
    }
  }

  /**
   * Helper pour obtenir le path d'un article (compatible avec Nuxt Content v3)
   */
  const getPostPath = (post: BlogPost | any): string | undefined => {
    return post.path || post._path
  }

  /**
   * Récupère des articles similaires basés sur la catégorie et les tags
   */
  const getRelatedPosts = async (post: BlogPost, limit: number = 3): Promise<BlogPost[]> => {
    try {
      const postPath = getPostPath(post)
      if (!postPath) {
        console.warn('Impossible de récupérer les articles similaires: path non défini')
        return []
      }

      // Récupérer tous les articles publiés
      const queryResult = await queryCollection<BlogPost>('blog')
        .where('published', '=', true)
        .order('date', 'DESC')
        .all()

      const allPosts = queryResult || []
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
    } catch (error) {
      console.error(`Erreur lors de la récupération des articles similaires:`, error)
      return []
    }
  }

  /**
   * Récupère tous les tags uniques utilisés dans les articles publiés
   */
  const getAllTags = async (): Promise<string[]> => {
    try {
      const posts = await getAllPosts()
      const tagsSet = new Set<string>()
      
      posts.forEach(post => {
        post.tags?.forEach(tag => tagsSet.add(tag))
      })

      return Array.from(tagsSet).sort()
    } catch (error) {
      console.error('Erreur lors de la récupération des tags:', error)
      return []
    }
  }

  /**
   * Compte le nombre d'articles par catégorie
   */
  const getPostsCountByCategory = async (): Promise<Record<BlogCategory, number>> => {
    try {
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
    } catch (error) {
      console.error('Erreur lors du comptage des articles par catégorie:', error)
      return {
        competition: 0,
        actualite: 0,
        resultat: 0,
        evenement: 0
      }
    }
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

