// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],
  css: ['~/assets/css/main.css'],
  i18n: {
    defaultLocale: 'fr',
    locales: [
      {
        code: 'fr',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  content: {
  },
  image: {
    dir: 'assets/images'
  }
})
