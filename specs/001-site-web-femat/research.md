# Research: Site Web FEMAT

**Date**: 2025-01-27  
**Feature**: 001-site-web-femat

## Research Objectives

Recherche sur les meilleures pratiques pour créer un site web moderne avec Nuxt.js 4.x et Nuxt UI 4.x, optimisé pour la performance, l'accessibilité et le SEO.

## Technology Stack Research

### Nuxt.js 4.x

**Version utilisée**: 4.2.1

**Caractéristiques clés**:
- Static Site Generation (SSG) pour performance maximale
- Auto-imports pour composants et composables
- File-based routing automatique
- TypeScript support natif
- Vite comme bundler (rapide)

**Best Practices identifiées**:
- Utiliser `nuxt generate` pour générer un site statique
- Optimiser les images avec le module `@nuxt/image` (optionnel)
- Utiliser les composables Nuxt pour la réactivité
- Configurer les meta tags via `useSeoMeta()` ou `useHead()`

**Documentation**: https://nuxt.com/docs

### Nuxt UI 4.x

**Version utilisée**: 4.1.0

**Caractéristiques clés**:
- Composants Vue 3 accessibles par défaut
- Basé sur Tailwind CSS
- Thème personnalisable
- Composants responsive
- Support TypeScript

**Composants pertinents pour le projet**:
- `UCard` - Pour les cartes d'événements
- `UButton` - Boutons avec variantes
- `UInput`, `UTextarea` - Pour le formulaire de contact
- `UAlert` - Pour les messages
- `UContainer` - Pour la mise en page
- `UHeader` - Pour la navigation (ou composant custom)

**Theming**:
- Configuration des couleurs dans `nuxt.config.ts`
- Support des couleurs personnalisées (vert, jaune, rouge du drapeau malien)
- Dark mode support (optionnel pour v1.0)

**Documentation**: https://ui.nuxt.com

### Static Site Generation (SSG)

**Avantages**:
- Performance maximale (fichiers statiques servis rapidement)
- SEO optimal (contenu pré-rendu)
- Coûts d'hébergement réduits
- Sécurité accrue (pas de serveur à maintenir)

**Configuration Nuxt.js**:
```typescript
export default defineNuxtConfig({
  ssr: false, // Pour SPA
  // OU
  nitro: {
    prerender: {
      routes: ['/'] // Routes à pré-rendre pour SSG
    }
  }
})
```

**Recommandation**: Utiliser `nuxt generate` pour générer un site statique complet.

### Accessibilité (WCAG 2.1)

**Standards à respecter**:
- Niveau AA minimum
- Navigation au clavier fonctionnelle
- Support des lecteurs d'écran
- Contraste de couleurs suffisant (4.5:1 pour texte normal)

**Nuxt UI et accessibilité**:
- Composants Nuxt UI respectent les standards ARIA
- Navigation clavier intégrée
- Focus management automatique
- Support des lecteurs d'écran

**Vérifications à faire**:
- Tester avec lecteur d'écran (NVDA, JAWS)
- Tester navigation au clavier uniquement
- Vérifier contraste de couleurs (outil: WebAIM Contrast Checker)
- Valider HTML avec W3C Validator

### SEO Optimization

**Meta Tags**:
- Utiliser `useSeoMeta()` de Nuxt pour meta tags dynamiques
- Open Graph tags pour réseaux sociaux
- Twitter Cards si nécessaire
- Favicon et apple-touch-icon (déjà présents)

**Structure**:
- URLs propres et descriptives (file-based routing de Nuxt)
- Structure HTML sémantique
- Headings hiérarchiques (h1, h2, h3)
- Alt text pour toutes les images

**Sitemap**:
- Nuxt génère automatiquement un sitemap.xml si configuré
- Ou utiliser le module `@nuxtjs/sitemap`

**Performance**:
- Images optimisées (WebP, AVIF)
- Lazy loading des images
- Code splitting automatique
- Minification et compression

### Performance Optimization

**Objectifs**:
- Lighthouse score > 90
- Temps de chargement < 3 secondes
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s

**Techniques**:
- SSG pour contenu statique
- Images optimisées et lazy loading
- Code splitting (automatique avec Nuxt)
- Minification CSS/JS (automatique)
- Compression gzip/brotli (serveur)

**Outils de mesure**:
- Lighthouse (Chrome DevTools)
- WebPageTest
- PageSpeed Insights

### Responsive Design

**Approche Mobile-First**:
- Concevoir d'abord pour mobile
- Utiliser les breakpoints de Tailwind/Nuxt UI
- Tester sur différentes tailles d'écran

**Breakpoints Tailwind**:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

**Nuxt UI Components**:
- Tous les composants sont responsive par défaut
- Utiliser les classes Tailwind pour ajustements

## Design System Research

### Couleurs du Drapeau Malien

**Couleurs identifiées**:
- Vert: #00853F (vert panafricain)
- Jaune: #FCD116 (or)
- Rouge: #CE1126 (rouge)

**Utilisation dans le design**:
- Vert: Couleur principale, liens, accents
- Jaune: Accents, highlights
- Rouge: Accents, call-to-action secondaires
- Noir/Blanc: Texte et contrastes

**Contraste**:
- Vérifier contraste avec fond blanc/noir
- Utiliser des variantes plus foncées pour texte si nécessaire

### Typographie

**Recommandations**:
- Police sans-serif pour lisibilité
- Taille minimale 16px pour texte principal
- Line-height 1.5-1.6 pour lisibilité
- Nuxt UI utilise Inter par défaut (excellente pour accessibilité)

## Décisions Techniques

### 1. Architecture
✅ **Décision**: Site statique avec Nuxt.js SSG  
**Raison**: Performance maximale, SEO optimal, coûts réduits

### 2. UI Framework
✅ **Décision**: Nuxt UI 4.x  
**Raison**: Composants accessibles, responsive, thème personnalisable

### 3. Données
✅ **Décision**: Données en dur pour v1.0  
**Raison**: Simplicité, pas de backend nécessaire, structure préparée pour migration future

### 4. Formulaire de Contact
✅ **Décision**: Validation côté client uniquement pour v1.0  
**Raison**: Pas de backend nécessaire, peut être intégré avec service email externe plus tard

### 5. Images
✅ **Décision**: Utiliser formats WebP/AVIF déjà disponibles  
**Raison**: Performance optimale, formats modernes supportés

## Ressources

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Notes

- Le projet utilise déjà Nuxt.js 4.2.1 et Nuxt UI 4.1.0
- Les logos sont déjà optimisés (WebP, AVIF disponibles)
- TypeScript est configuré
- Structure de base existe déjà

## Implémentation Complétée (v1.0)

### Fonctionnalités Ajoutées
- ✅ Page Calendrier avec composant EventCalendar interactif
- ✅ Composable useEvents pour centraliser les données
- ✅ Types TypeScript partagés (app/types/event.ts)
- ✅ Configuration Nuxt UI avec couleurs sémantiques (app.config.ts)
- ✅ Transitions de page et layout
- ✅ Mode sombre/clair avec UColorModeButton
- ✅ Images optimisées avec AVIF et fallback WebP
- ✅ Utilisation des couleurs Nuxt UI (neutral au lieu de gray)

### Optimisations Appliquées
- Images: Format AVIF avec fallback WebP via NuxtImg
- Couleurs: Configuration sémantique dans app.config.ts
- Accessibilité: ARIA labels, navigation clavier, éléments sémantiques
- SEO: Meta tags sur toutes les pages avec useSeoMeta()
- Performance: SSG configuré, lazy loading, code splitting automatique

