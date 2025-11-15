// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image'],
  css: ['~/assets/css/main.css'],

  // SSG Configuration
  ssr: false, // Static Site Generation (SSG)
  nitro: {
    prerender: {
      routes: ['/']
    }
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
})
