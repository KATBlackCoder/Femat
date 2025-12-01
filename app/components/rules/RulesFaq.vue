<template>
  <div class="space-y-8">
    <!-- Section FAQ FEMAT -->
    <div v-if="faqFemat && faqFematItems.length > 0">
      <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        Questions fréquentes - FEMAT
      </h2>
      <UAccordion :items="faqFematItems" :multiple="true" />
    </div>
    
    <div v-else-if="pendingFemat" class="flex justify-center items-center py-8">
      <UIcon name="i-lucide-loader-2" class="w-6 h-6 animate-spin text-primary-600" />
    </div>
    
    <div v-else-if="errorFemat" class="text-center py-8">
      <p class="text-error-600 dark:text-error-400 text-sm">Erreur lors du chargement de la FAQ FEMAT.</p>
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-neutral-500 dark:text-neutral-400 italic">Aucune FAQ disponible pour la section FEMAT.</p>
    </div>

    <!-- Section FAQ Taekwondo -->
    <div v-if="faqTaekwondo && faqTaekwondoItems.length > 0" class="mt-12">
      <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        Questions fréquentes - Taekwondo
      </h2>
      <UAccordion :items="faqTaekwondoItems" :multiple="true" />
    </div>
    
    <div v-else-if="pendingTaekwondo" class="flex justify-center items-center py-8">
      <UIcon name="i-lucide-loader-2" class="w-6 h-6 animate-spin text-primary-600" />
    </div>
    
    <div v-else-if="errorTaekwondo" class="text-center py-8">
      <p class="text-error-600 dark:text-error-400 text-sm">Erreur lors du chargement de la FAQ Taekwondo.</p>
    </div>
    
    <div v-else-if="!pendingTaekwondo" class="text-center py-8">
      <p class="text-neutral-500 dark:text-neutral-400 italic">Aucune FAQ disponible pour la section Taekwondo.</p>
    </div>

    <!-- Message si aucune FAQ disponible -->
    <div v-if="!pendingFemat && !pendingTaekwondo && faqFematItems.length === 0 && faqTaekwondoItems.length === 0" class="text-center py-12">
      <UIcon name="i-lucide-help-circle" class="w-16 h-16 mx-auto mb-4 text-neutral-400" />
      <p class="text-lg text-neutral-600 dark:text-neutral-400">
        Les questions fréquentes seront bientôt disponibles.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RuleContent, FaqItem } from '~/types/rules'

// queryContent est auto-importé par Nuxt Content
declare const queryContent: (path: string) => {
  findOne: () => Promise<RuleContent | null>
}

// Charger les deux fichiers FAQ séparément
const { data: faqFemat, pending: pendingFemat, error: errorFemat } = await useAsyncData<RuleContent | null>('rules-faq-femat', () => 
  queryContent('/rules/faq-femat').findOne().catch(() => null)
)

const { data: faqTaekwondo, pending: pendingTaekwondo, error: errorTaekwondo } = await useAsyncData<RuleContent | null>('rules-faq-taekwondo', () => 
  queryContent('/rules/faq-taekwondo').findOne().catch(() => null)
)

// Extraire les questions/réponses du frontmatter YAML
const faqFematItems = computed(() => {
  if (!faqFemat.value?.faq || !Array.isArray(faqFemat.value.faq)) return []
  
  return faqFemat.value.faq.map((item: FaqItem) => ({
    label: item.question,
    defaultOpen: false,
    content: item.answer
  }))
})

const faqTaekwondoItems = computed(() => {
  if (!faqTaekwondo.value?.faq || !Array.isArray(faqTaekwondo.value.faq)) return []
  
  return faqTaekwondo.value.faq.map((item: FaqItem) => ({
    label: item.question,
    defaultOpen: false,
    content: item.answer
  }))
})
</script>

