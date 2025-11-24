// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content'
  ],
  css: ['~/assets/css/main.css'],

  // SSG Configuration
  // ssr: false désactivé pour permettre à Nuxt Content de fonctionner
  // Nuxt Content nécessite un serveur pour accéder aux fichiers Markdown
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true // Pré-rendre toutes les routes trouvées automatiquement
    }
  },

  // Optimisations de production
  sourcemap: {
    server: false,
    client: false // Désactiver les source maps en production pour réduire la taille
  },

  // Optimisations de build
  experimental: {
    payloadExtraction: false // Optimisation pour SSG
  },

  // SEO Configuration
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'FEMAT - Fédération Malienne de Taekwondo',
      meta: [
        {
          name: 'description',
          content: 'Site officiel de la Fédération Malienne de Taekwondo (FEMAT). Découvrez nos activités, événements, compétitions et rejoignez la communauté du taekwondo au Mali.'
        },
        {
          property: 'og:title',
          content: 'FEMAT - Fédération Malienne de Taekwondo'
        },
        {
          property: 'og:description',
          content: 'Site officiel de la Fédération Malienne de Taekwondo (FEMAT). Découvrez nos activités, événements et compétitions.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:image',
          content: '/logo_femat.webp'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png'
        }
      ]
    }
  },

  // Nuxt UI Configuration
  // Les couleurs personnalisées sont configurées via Tailwind CSS dans app/assets/css/main.css

  // Configuration Nuxt Content
  content: {
    experimental: {
      // Utiliser le connecteur SQLite natif de Node.js (disponible depuis v22.5.0)
      // Évite les problèmes de compilation avec better-sqlite3
      sqliteConnector: 'native'
    },
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'bash']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  } as any, // Type assertion temporaire - les types seront générés au prochain démarrage
})
