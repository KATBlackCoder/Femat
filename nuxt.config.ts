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
  // Configuration NuxtUI v4
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary', 
        'success',
        'warning',
        'error',
        'info',
        'mali',
        'mali-yellow',
        'mali-red'
      ]
    }
  },
  // Configuration du mode couleur
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
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
