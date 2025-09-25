// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/mains.css'],
  // Configuration NuxtUI v4 - couleurs par défaut
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary', 
        'success',
        'warning',
        'error',
        'info',
        'neutral'
      ]
    }
  },
  // Configuration des images
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  }
})
