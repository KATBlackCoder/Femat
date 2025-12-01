<template>
  <div class="space-y-12" role="region" aria-label="Questions fréquentes">
    <!-- Section FAQ FEMAT -->
    <section 
      v-if="faqFemat && faqFematItems.length > 0"
      aria-labelledby="faq-femat-title"
    >
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-lucide-file-text" class="size-6 text-primary" />
        <h2 
          id="faq-femat-title"
          class="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
        >
          Questions fréquentes - FEMAT
        </h2>
      </div>
      <UAccordion 
        :items="faqFematItems" 
        type="multiple"
        aria-label="Questions fréquentes sur les règlements FEMAT"
        :ui="{
          trigger: 'text-base font-medium',
          body: 'text-base text-muted'
        }"
      />
    </section>
    
    <!-- État de chargement FAQ FEMAT -->
    <div v-else-if="pendingFemat" class="space-y-4">
      <USkeleton class="h-7 w-64" />
      <div class="space-y-3">
        <USkeleton class="h-12 w-full" />
        <USkeleton class="h-12 w-full" />
        <USkeleton class="h-12 w-full" />
      </div>
    </div>
    
    <!-- État d'erreur FAQ FEMAT -->
    <UAlert
      v-else-if="errorFemat"
      color="error"
      variant="soft"
      title="Erreur de chargement"
      description="Impossible de charger la FAQ FEMAT."
      icon="i-lucide-alert-circle"
      size="sm"
    />
    
    <!-- État vide FAQ FEMAT -->
    <UEmpty
      v-else
      icon="i-lucide-file-text"
      title="Aucune FAQ disponible"
      description="Les questions fréquentes pour la section FEMAT ne sont pas encore disponibles."
      variant="naked"
      size="sm"
    />

    <!-- Section FAQ Taekwondo -->
    <section 
      v-if="faqTaekwondo && faqTaekwondoItems.length > 0" 
      aria-labelledby="faq-taekwondo-title"
    >
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-lucide-book-open" class="size-6 text-primary" />
        <h2 
          id="faq-taekwondo-title"
          class="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
        >
          Questions fréquentes - Taekwondo
        </h2>
      </div>
      <UAccordion 
        :items="faqTaekwondoItems" 
        type="multiple"
        aria-label="Questions fréquentes sur les règlementations Taekwondo"
        :ui="{
          trigger: 'text-base font-medium',
          body: 'text-base text-muted'
        }"
      />
    </section>
    
    <!-- État de chargement FAQ Taekwondo -->
    <div v-else-if="pendingTaekwondo" class="space-y-4">
      <USkeleton class="h-7 w-64" />
      <div class="space-y-3">
        <USkeleton class="h-12 w-full" />
        <USkeleton class="h-12 w-full" />
        <USkeleton class="h-12 w-full" />
      </div>
    </div>
    
    <!-- État d'erreur FAQ Taekwondo -->
    <UAlert
      v-else-if="errorTaekwondo"
      color="error"
      variant="soft"
      title="Erreur de chargement"
      description="Impossible de charger la FAQ Taekwondo."
      icon="i-lucide-alert-circle"
      size="sm"
    />
    
    <!-- État vide FAQ Taekwondo -->
    <UEmpty
      v-else-if="!pendingTaekwondo"
      icon="i-lucide-book-open"
      title="Aucune FAQ disponible"
      description="Les questions fréquentes pour la section Taekwondo ne sont pas encore disponibles."
      variant="naked"
      size="sm"
    />

    <!-- Message global si aucune FAQ disponible -->
    <UEmpty
      v-if="!pendingFemat && !pendingTaekwondo && faqFematItems.length === 0 && faqTaekwondoItems.length === 0"
      icon="i-lucide-help-circle"
      title="Questions fréquentes"
      description="Les questions fréquentes seront bientôt disponibles. Revenez plus tard pour trouver des réponses à vos questions."
      variant="outline"
      size="lg"
      class="my-12"
    />
  </div>
</template>

<script setup lang="ts">
import type { RuleContent, FaqItem } from '~/types/rules'

// queryCollection est auto-importé par Nuxt Content v3
declare const queryCollection: <T = any>(collection: string) => {
  path: (path: string) => any
  where: (field: string, operator: string, value?: any) => any
  first: () => Promise<T | null>
}

// Charger les deux fichiers FAQ séparément
const { data: faqFemat, pending: pendingFemat, error: errorFemat } = await useAsyncData<RuleContent | null>('rules-faq-femat', async () => {
  try {
    return await queryCollection<RuleContent>('rules')
      .path('/rules/faq-femat')
      .first()
  } catch (err) {
    console.error('Erreur lors du chargement de la FAQ FEMAT:', err)
    return null
  }
})

const { data: faqTaekwondo, pending: pendingTaekwondo, error: errorTaekwondo } = await useAsyncData<RuleContent | null>('rules-faq-taekwondo', async () => {
  try {
    return await queryCollection<RuleContent>('rules')
      .path('/rules/faq-taekwondo')
      .first()
  } catch (err) {
    console.error('Erreur lors du chargement de la FAQ Taekwondo:', err)
    return null
  }
})

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

