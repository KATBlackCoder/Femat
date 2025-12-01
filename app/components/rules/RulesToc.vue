<template>
  <!-- Masquée sur mobile, visible sur desktop -->
  <div class="hidden lg:block">
    <UContentToc 
      v-if="links && links.length > 0"
      :links="links"
      title="Table des matières"
      highlight
      highlight-color="primary"
      color="primary"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Type pour les liens de la table des matières
 * Compatible avec Nuxt Content v3 et UContentToc
 * 
 * @see https://ui.nuxt.com/docs/components/content-toc
 */
export interface ContentTocLink {
  id: string
  text: string
  depth: number
  children?: ContentTocLink[]
  class?: string
  ui?: {
    item?: string
    itemWithChildren?: string
    link?: string
    linkText?: string
  }
}

interface Props {
  /**
   * Les liens de la table des matières générés par Nuxt Content
   * Provenant de `content?.body?.toc?.links`
   */
  links?: ContentTocLink[]
}

withDefaults(defineProps<Props>(), {
  links: () => []
})
</script>

