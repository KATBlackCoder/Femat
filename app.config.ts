export default defineAppConfig({
  ui: {
    primary: 'mali',
    gray: 'slate',
    // Configuration UMain pour hauteur complète
    main: {
      base: 'min-h-[calc(100vh-var(--ui-header-height))]'
    },
    // Configuration des icônes
    icons: {
      collections: {
        heroicons: 'heroicons',
        lucide: 'lucide'
      }
    },
    // Configuration des couleurs sémantiques
    colors: {
      primary: 'mali',
      secondary: 'mali-yellow',
      success: 'mali',
      warning: 'mali-yellow',
      error: 'mali-red',
      info: 'mali'
    }
  }
})
