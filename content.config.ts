import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      // Pattern qui inclut automatiquement tous les sous-dossiers (2024/, 2025/, etc.)
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(), // Format: YYYY-MM-DD
        author: z.string(),
        category: z.enum(['competition', 'actualite', 'resultat', 'evenement']),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        published: z.boolean().optional().default(true)
      }).catchall(z.any()) // Permettre les champs générés automatiquement (body, path, etc.)
    }),
    events: defineCollection({
      type: 'page',
      // Pattern qui inclut automatiquement tous les sous-dossiers (2024/, 2025/, etc.)
      source: 'events/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(), // Format: YYYY-MM-DD (date de début)
        endDate: z.string().optional(), // Format: YYYY-MM-DD (date de fin, optionnel)
        startTime: z.string().optional(), // Format: HH:mm (heure de début, optionnel)
        endTime: z.string().optional(), // Format: HH:mm (heure de fin, optionnel)
        location: z.string(),
        description: z.string(),
        type: z.enum(['competition', 'training', 'ceremony', 'social']),
        status: z.enum(['upcoming', 'past']),
        image: z.string().optional(),
        published: z.boolean().optional().default(true)
      }).catchall(z.any()) // Permettre les champs générés automatiquement (body, path, etc.)
    })
  }
} as any)
