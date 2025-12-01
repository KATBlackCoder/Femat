<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      aria-label="En-tête de la page Règlements"
      headline="Règlements et Règlementations"
      title="Règlements FEMAT et Taekwondo"
      description="Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo. Trouvez les réponses à vos questions dans notre FAQ."
      :ui="{
        root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
        container: 'py-16 sm:py-20 lg:py-24'
      }"
    >
      <template #headline>
        <UBadge color="primary" variant="subtle" size="lg">
          Règlements
        </UBadge>
      </template>
    </UPageHero>

    <!-- Section principale avec tabs et table des matières -->
    <UPageSection
      :ui="{
        container: 'py-8 sm:py-12'
      }"
    >
      <UPage>
        <!-- Table des matières dans la colonne de droite - Toujours visible -->
        <template #right>
          <RulesToc :links="currentTocLinks" />
        </template>

        <!-- Contenu principal avec tabs -->
        <UPageBody>
          <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <UTabs 
              :items="tabs" 
              :default-value="'femat'"
              v-model="activeTab"
              variant="pill"
              size="lg"
              color="primary"
              :ui="{
                root: 'w-full',
                list: 'flex-nowrap sm:flex-wrap gap-2',
                trigger: 'whitespace-nowrap',
                label: 'hidden sm:inline'
              }"
              aria-label="Navigation entre les sections de règlements"
            >
              <template #femat>
                <div class="mt-8">
                  <RulesFemat @toc-updated="handleTocUpdate('femat', $event)" />
                </div>
              </template>
              
              <template #taekwondo>
                <div class="mt-8">
                  <RulesTaekwondo @toc-updated="handleTocUpdate('taekwondo', $event)" />
                </div>
              </template>
              
              <template #faq>
                <div class="mt-8">
                  <RulesFaq />
                </div>
              </template>
            </UTabs>
          </div>
        </UPageBody>
      </UPage>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import type { ContentTocLink } from '~/components/rules/RulesToc.vue'

const tabs = [
  {
    label: 'Règlements FEMAT',
    icon: 'i-lucide-file-text',
    value: 'femat',
    slot: 'femat'
  },
  {
    label: 'Règlementations Taekwondo',
    icon: 'i-lucide-book-open',
    value: 'taekwondo',
    slot: 'taekwondo'
  },
  {
    label: 'FAQ',
    icon: 'i-lucide-help-circle',
    value: 'faq',
    slot: 'faq'
  }
]

// Gérer l'onglet actif et les liens TOC
const activeTab = ref('femat')
const tocLinksMap = ref<Record<string, ContentTocLink[]>>({
  femat: [],
  taekwondo: [],
  faq: []
})

// Liens TOC actuels selon l'onglet actif
const currentTocLinks = computed(() => {
  return tocLinksMap.value[activeTab.value] || []
})

// Gérer la mise à jour des liens TOC depuis les composants enfants
const handleTocUpdate = (tab: string, links: ContentTocLink[]) => {
  tocLinksMap.value[tab] = links
}

// SEO Meta tags
useSeoMeta({
  title: 'Règlements et Règlementations - FEMAT',
  description: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
  ogTitle: 'Règlements et Règlementations - FEMAT',
  ogDescription: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
  ogType: 'website',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Règlements et Règlementations - FEMAT',
  twitterDescription: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
})

// Accessibilité : définir le titre de la page pour les lecteurs d'écran
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  title: 'Règlements et Règlementations - FEMAT',
  meta: [
    {
      name: 'robots',
      content: 'index, follow'
    }
  ]
})
</script>

