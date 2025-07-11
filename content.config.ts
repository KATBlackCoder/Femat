import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      // Optionally, add schema validation:
      schema: z.object({
        title: z.string(),
        date: z.string(),
        summary: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        author: z.string().optional()
      })
    }),
    events: defineCollection({
      type: 'page',
      source: 'events/**/*.md',
      schema: z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        organizer: z.string().optional()
      })
    }),
    galleries: defineCollection({
      type: 'page',
      source: 'galleries/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        coverImage: z.string(),
        images: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional()
        }))
      })
    }),
    resources: defineCollection({
      type: 'page',
      source: 'resources/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        file: z.string() // Path to the downloadable file in /public
      })
    })
  }
})