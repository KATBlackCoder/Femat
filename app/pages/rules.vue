<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
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

    <!-- Section principale avec tabs -->
    <UPageSection
      :ui="{
        container: 'py-8 sm:py-12'
      }"
    >
      <div class="overflow-x-auto">
        <UTabs 
          :items="tabs" 
          :default-value="'femat'"
          :ui="{
            list: 'flex-nowrap sm:flex-wrap'
          }"
        >
          <template #femat>
            <div class="mt-6">
              <RulesFemat />
            </div>
          </template>
          
          <template #taekwondo>
            <div class="mt-6">
              <RulesTaekwondo />
            </div>
          </template>
          
          <template #faq>
            <div class="mt-6">
              <RulesFaq />
            </div>
          </template>
        </UTabs>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
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

// SEO Meta tags
useSeoMeta({
  title: 'Règlements et Règlementations - FEMAT',
  description: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
  ogTitle: 'Règlements et Règlementations - FEMAT',
  ogDescription: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
  ogType: 'website',
})
</script>

