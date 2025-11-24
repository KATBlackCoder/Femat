import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

/**
 * Validation stricte du format de date ISO (YYYY-MM-DD)
 */
const dateSchema = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  { message: 'La date doit être au format YYYY-MM-DD (ex: 2025-01-27)' }
).refine(
  (date) => {
    const d = new Date(date)
    return d instanceof Date && !isNaN(d.getTime())
  },
  { message: 'La date doit être une date valide' }
)

/**
 * Validation stricte du format d'heure 24h (HH:mm)
 */
const timeSchema = z.string().regex(
  /^([01]\d|2[0-3]):([0-5]\d)$/,
  { message: 'L\'heure doit être au format HH:mm en 24h (ex: 09:00, 18:30)' }
).optional()

/**
 * Validation stricte du format de date de fin (doit être après la date de début)
 */
const endDateSchema = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  { message: 'La date de fin doit être au format YYYY-MM-DD (ex: 2025-01-27)' }
).refine(
  (date) => {
    const d = new Date(date)
    return d instanceof Date && !isNaN(d.getTime())
  },
  { message: 'La date de fin doit être une date valide' }
).optional()

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      // Pattern qui inclut automatiquement tous les sous-dossiers (2024/, 2025/, etc.)
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().min(1, { message: 'Le titre est obligatoire' }),
        description: z.string().min(1, { message: 'La description est obligatoire' }),
        date: dateSchema,
        author: z.string().min(1, { message: 'L\'auteur est obligatoire' }),
        category: z.enum(['competition', 'actualite', 'resultat', 'evenement'], {
          errorMap: () => ({ message: 'La catégorie doit être: competition, actualite, resultat ou evenement' })
        }),
        tags: z.array(z.string().min(1)).optional(),
        image: z.string().url().or(z.string().startsWith('/')).optional().or(z.literal('')),
        published: z.boolean().optional().default(true)
      }).catchall(z.any()) // Permettre les champs générés automatiquement par Nuxt Content (_path, _id, _body, etc.)
    }),
    events: defineCollection({
      type: 'page',
      // Pattern qui inclut automatiquement tous les sous-dossiers (2024/, 2025/, etc.)
      source: 'events/**/*.md',
      schema: z.object({
        title: z.string().min(1, { message: 'Le titre est obligatoire' }),
        date: dateSchema,
        endDate: endDateSchema,
        startTime: timeSchema,
        endTime: timeSchema,
        location: z.string().min(1, { message: 'Le lieu est obligatoire' }),
        description: z.string().min(1, { message: 'La description est obligatoire' }),
        type: z.enum(['competition', 'training', 'ceremony', 'social'], {
          errorMap: () => ({ message: 'Le type doit être: competition, training, ceremony ou social' })
        }),
        status: z.enum(['upcoming', 'ongoing', 'past'], {
          errorMap: () => ({ message: 'Le statut doit être: upcoming, ongoing ou past' })
        }),
        image: z.string().url().or(z.string().startsWith('/')).optional().or(z.literal('')),
        published: z.boolean().optional().default(true)
      }).catchall(z.any()) // Permettre les champs générés automatiquement par Nuxt Content (_path, _id, _body, etc.)
    })
  }
} as any)
