import { z } from 'zod'
import type { BlogPost } from '~/types/blog'
import type { Event } from '~/types/event'

/**
 * Utilitaires de validation runtime pour les collections de contenu
 * Utilise Zod pour valider les données à l'exécution
 */

/**
 * Schéma Zod pour BlogPost (aligné avec content.config.ts)
 */
const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().min(1),
  category: z.enum(['competition', 'actualite', 'resultat', 'evenement']),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  published: z.boolean().optional().default(true),
  _path: z.string().optional(),
  path: z.string().optional(),
  _body: z.string().optional(),
  body: z.any().optional(),
  _id: z.string().optional(),
  _type: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
}).catchall(z.any()) // Permettre les champs supplémentaires (champs générés par Nuxt Content)

/**
 * Schéma Zod pour Event (aligné avec content.config.ts)
 */
const eventSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  location: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['competition', 'training', 'ceremony', 'social']),
  status: z.enum(['upcoming', 'ongoing', 'past']),
  image: z.string().optional(),
  published: z.boolean().optional().default(true),
  _path: z.string().optional(),
  _body: z.string().optional(),
  body: z.any().optional(),
  _id: z.string().optional(),
  _type: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
}).catchall(z.any()) // Permettre les champs supplémentaires (champs générés par Nuxt Content)

/**
 * Résultat de validation
 */
export interface ValidationResult<T> {
  /** Indique si la validation a réussi */
  success: boolean
  /** Données validées (si success = true) */
  data?: T
  /** Erreurs de validation (si success = false) */
  errors?: z.ZodError
  /** Message d'erreur formaté (si success = false) */
  errorMessage?: string
}

/**
 * Valide un article de blog avec Zod
 * 
 * @param data - Données à valider
 * @returns Résultat de validation avec données typées ou erreurs
 * 
 * @example
 * ```typescript
 * const result = validateBlogPost(rawData)
 * if (result.success) {
 *   const post: BlogPost = result.data
 *   // Utiliser le post validé
 * } else {
 *   console.error('Erreur de validation:', result.errorMessage)
 * }
 * ```
 */
export function validateBlogPost(data: unknown): ValidationResult<BlogPost> {
  try {
    const validated = blogPostSchema.parse(data)
    return {
      success: true,
      data: validated as BlogPost
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ')
      
      return {
        success: false,
        errors: error,
        errorMessage: `Erreur de validation BlogPost: ${errorMessage}`
      }
    }
    
    return {
      success: false,
      errorMessage: `Erreur inattendue lors de la validation: ${String(error)}`
    }
  }
}

/**
 * Valide un événement avec Zod
 * 
 * @param data - Données à valider
 * @returns Résultat de validation avec données typées ou erreurs
 * 
 * @example
 * ```typescript
 * const result = validateEvent(rawData)
 * if (result.success) {
 *   const event: Event = result.data
 *   // Utiliser l'événement validé
 * } else {
 *   console.error('Erreur de validation:', result.errorMessage)
 * }
 * ```
 */
export function validateEvent(data: unknown): ValidationResult<Event> {
  try {
    const validated = eventSchema.parse(data)
    return {
      success: true,
      data: validated as Event
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ')
      
      return {
        success: false,
        errors: error,
        errorMessage: `Erreur de validation Event: ${errorMessage}`
      }
    }
    
    return {
      success: false,
      errorMessage: `Erreur inattendue lors de la validation: ${String(error)}`
    }
  }
}

/**
 * Valide un tableau d'articles de blog
 * 
 * @param data - Tableau de données à valider
 * @returns Tableau de résultats de validation
 */
export function validateBlogPosts(data: unknown[]): ValidationResult<BlogPost[]> {
  const results: BlogPost[] = []
  const errors: string[] = []
  
  for (let i = 0; i < data.length; i++) {
    const result = validateBlogPost(data[i])
    if (result.success && result.data) {
      results.push(result.data)
    } else {
      errors.push(`Article ${i}: ${result.errorMessage || 'Erreur inconnue'}`)
    }
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      errorMessage: `Erreurs de validation sur ${errors.length} article(s):\n${errors.join('\n')}`
    }
  }
  
  return {
    success: true,
    data: results
  }
}

/**
 * Valide un tableau d'événements
 * 
 * @param data - Tableau de données à valider
 * @returns Tableau de résultats de validation
 */
export function validateEvents(data: unknown[]): ValidationResult<Event[]> {
  const results: Event[] = []
  const errors: string[] = []
  
  for (let i = 0; i < data.length; i++) {
    const result = validateEvent(data[i])
    if (result.success && result.data) {
      results.push(result.data)
    } else {
      errors.push(`Événement ${i}: ${result.errorMessage || 'Erreur inconnue'}`)
    }
  }
  
  if (errors.length > 0) {
    return {
      success: false,
      errorMessage: `Erreurs de validation sur ${errors.length} événement(s):\n${errors.join('\n')}`
    }
  }
  
  return {
    success: true,
    data: results
  }
}

