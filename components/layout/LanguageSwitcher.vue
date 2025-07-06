<template>
  <UDropdownMenu :items="languageItems" :popper="{ placement: 'bottom-start' }">
    <UButton 
      variant="ghost" 
      size="sm"
      :label="currentLang"
      trailing-icon="i-heroicons-chevron-down-20-solid"
      class="font-medium"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
// Temporary simple implementation - will be enhanced once i18n is fully configured
const currentLang = ref('Français')

const languageItems = computed(() => [
  [
    {
      label: 'Français',
      click: () => {
        currentLang.value = 'Français'
        // TODO: Implement actual language switching once i18n is working
      },
      disabled: currentLang.value === 'Français'
    },
    {
      label: 'English',
      click: () => {
        currentLang.value = 'English'
        // TODO: Implement actual language switching once i18n is working
      },
      disabled: currentLang.value === 'English'
    }
  ]
])
</script> 