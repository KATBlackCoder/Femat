<template>
  <!-- État de chargement avec Skeleton -->
  <div v-if="pending" class="space-y-6 py-8">
    <USkeleton class="h-8 w-3/4" />
    <USkeleton class="h-4 w-full" />
    <USkeleton class="h-4 w-5/6" />
    <USkeleton class="h-4 w-4/5" />
    <div class="space-y-4 mt-8">
      <USkeleton class="h-6 w-2/3" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-3/4" />
    </div>
  </div>
  
  <!-- État d'erreur avec Alert -->
  <UAlert
    v-else-if="error"
    color="error"
    variant="soft"
    title="Erreur de chargement"
    description="Impossible de charger les règlementations Taekwondo. Veuillez réessayer plus tard."
    icon="i-lucide-alert-circle"
    class="my-8"
  />
  
  <!-- Contenu -->
  <div v-else-if="content">
    <article class="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="content" />
    </article>
  </div>
  
  <!-- État vide -->
  <UEmpty
    v-else
    icon="i-lucide-book-open"
    title="Aucun contenu disponible"
    description="Les règlementations Taekwondo ne sont pas encore disponibles."
    variant="soft"
    size="md"
    class="my-8"
  />
</template>

<script setup lang="ts">
import type { RuleContent } from '~/types/rules'
import type { ContentTocLink } from './RulesToc.vue'

// queryCollection est auto-importé par Nuxt Content v3
declare const queryCollection: <T = any>(collection: string) => {
  path: (path: string) => any
  where: (field: string, operator: string, value?: any) => any
  first: () => Promise<T | null>
}

const emit = defineEmits<{
  'toc-updated': [links: ContentTocLink[]]
}>()

const { data: content, pending, error } = await useAsyncData<RuleContent | null>('rules-taekwondo', async () => {
  try {
    const result = await queryCollection<RuleContent>('rules')
      .path('/rules/taekwondo')
      .first()
    return result
  } catch (err) {
    console.error('Erreur lors du chargement des règlementations Taekwondo:', err)
    return null
  }
})

// Émettre les liens TOC quand le contenu est chargé
watch(() => content.value?.body?.toc?.links, (links) => {
  if (links && links.length > 0) {
    emit('toc-updated', links as ContentTocLink[])
  }
}, { immediate: true })
</script>

<style scoped>
/* Styles pour améliorer la lisibilité du contenu réglementaire */
</style>

