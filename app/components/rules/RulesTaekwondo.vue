<template>
  <div v-if="pending" class="flex justify-center items-center py-12">
    <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-600" />
  </div>
  
  <div v-else-if="error" class="text-center py-12">
    <p class="text-error-600 dark:text-error-400">Erreur lors du chargement du contenu.</p>
  </div>
  
  <div v-else-if="content" class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Table des matières - Masquée sur mobile, visible sur desktop -->
    <aside class="hidden lg:block lg:col-span-1">
      <div class="sticky top-24">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">Table des matières</h2>
          </template>
          <UContentToc :links="content?.body?.toc?.links" />
        </UCard>
      </div>
    </aside>
    
    <!-- Contenu principal -->
    <main class="lg:col-span-3 lg:col-start-2">
      <div class="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="content" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { RuleContent } from '~/types/rules'

// queryContent est auto-importé par Nuxt Content
declare const queryContent: (path: string) => {
  findOne: () => Promise<RuleContent | null>
}

const { data: content, pending, error } = await useAsyncData<RuleContent | null>('rules-taekwondo', () => 
  queryContent('/rules/taekwondo').findOne()
)
</script>

<style scoped>
/* Styles pour améliorer la lisibilité du contenu réglementaire */

</style>

