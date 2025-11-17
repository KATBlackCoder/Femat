/**
 * Types TypeScript pour les articles de blog de la FEMAT
 * Compatible avec Nuxt Content
 */

export interface BlogPost {
  /** Chemin de l'article (ex: /blog/mon-article) - Nuxt Content v3 peut utiliser 'path' ou '_path' */
  _path?: string
  path?: string
  /** Titre de l'article */
  title: string
  /** Description/meta description de l'article */
  description: string
  /** Date de publication (format: YYYY-MM-DD) */
  date: string
  /** Auteur de l'article */
  author: string
  /** Catégorie de l'article */
  category: 'competition' | 'actualite' | 'resultat' | 'evenement'
  /** Tags pour classification fine (optionnel) */
  tags?: string[]
  /** Image de couverture (chemin relatif depuis /public) */
  image?: string
  /** Statut de publication */
  published: boolean
  /** Contenu Markdown de l'article (Nuxt Content v3 utilise 'body' au lieu de '_body') */
  _body?: string
  body?: any
  /** ID unique de l'article (Nuxt Content) */
  _id?: string
  /** Type de contenu (Nuxt Content) */
  _type?: string
  /** Date de création (Nuxt Content) */
  createdAt?: string
  /** Date de mise à jour (Nuxt Content) */
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

