import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
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
      }).passthrough() // Permettre les champs générés automatiquement (body, path, etc.)
    }),
    events: defineCollection({
      type: 'page',
      source: 'events/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(), // Format: YYYY-MM-DD
        location: z.string(),
        description: z.string(),
        type: z.enum(['competition', 'training', 'ceremony', 'social']),
        status: z.enum(['upcoming', 'past']),
        image: z.string().optional(),
        published: z.boolean().optional().default(true)
      }).passthrough() // Permettre les champs générés automatiquement (body, path, etc.)
    })
  }
} as any)
