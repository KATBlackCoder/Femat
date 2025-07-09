<template>
    <UButton 
      variant="ghost" 
      size="sm"
    :label="currentLabel"
      class="font-medium"
    trailing-icon="i-heroicons-language"
    @click="switchLanguage"
    />
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { computed } from 'vue'

const { locale, setLocale } = useI18n()

const labels: Record<string, string> = {
  fr: 'Français',
  en: 'English'
}

const currentLabel = computed(() => labels[locale.value] || locale.value)

function switchLanguage() {
  // Toggle between 'fr' and 'en' using setLocale for proper i18n handling
  setLocale(locale.value === 'fr' ? 'en' : 'fr')
}
</script> 