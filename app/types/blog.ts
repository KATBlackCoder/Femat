/**
 * Types TypeScript pour les articles de blog de la FEMAT
 * Compatible avec Nuxt Content v3
 * 
 * Les types sont alignés avec les schémas Zod définis dans `content.config.ts`
 */

/**
 * Interface principale pour un article de blog
 * 
 * @example
 * ```typescript
 * const post: BlogPost = {
 *   _path: '/blog/mon-article',
 *   title: 'Titre de l\'article',
 *   description: 'Description de l\'article',
 *   date: '2025-01-27',
 *   author: 'John Doe',
 *   category: 'competition',
 *   tags: ['championnat', '2025'],
 *   published: true
 * }
 * ```
 */
export interface BlogPost {
  /** 
   * Chemin de l'article généré par Nuxt Content (ex: /blog/mon-article)
   * Nuxt Content v3 utilise `_path` pour le chemin
   */
  _path?: string
  
  /** 
   * Chemin alternatif (compatibilité)
   * @deprecated Utiliser `_path` à la place
   */
  path?: string
  
  /** Titre de l'article (obligatoire) */
  title: string
  
  /** Description/meta description de l'article (obligatoire) */
  description: string
  
  /** 
   * Date de publication au format ISO (YYYY-MM-DD)
   * @example '2025-01-27'
   */
  date: string
  
  /** Auteur de l'article (obligatoire) */
  author: string
  
  /** 
   * Catégorie de l'article (obligatoire)
   * @see BlogCategory
   */
  category: BlogCategory
  
  /** 
   * Tags pour classification fine (optionnel)
   * @example ['championnat', 'bamako', '2025']
   */
  tags?: string[]
  
  /** 
   * Image de couverture (chemin relatif depuis /public)
   * @example '/blog/images/championnat-2025.jpg'
   */
  image?: string
  
  /** 
   * Statut de publication (optionnel, défaut: true)
   * @default true
   */
  published?: boolean
  
  /** 
   * Contenu Markdown de l'article (généré par Nuxt Content)
   * Nuxt Content v3 peut utiliser `body` ou `_body`
   */
  _body?: string
  body?: any
  
  /** ID unique de l'article (généré par Nuxt Content) */
  _id?: string
  
  /** Type de contenu (généré par Nuxt Content) */
  _type?: string
  
  /** Date de création (générée par Nuxt Content) */
  createdAt?: string
  
  /** Date de mise à jour (générée par Nuxt Content) */
  updatedAt?: string
}

/**
 * Catégories disponibles pour les articles
 */
export const BLOG_CATEGORIES = {
  competition: 'Compétition',
  actualite: 'Actualité',
  resultat: 'Résultat',
  evenement: 'Événement'
} as const

export type BlogCategory = keyof typeof BLOG_CATEGORIES

