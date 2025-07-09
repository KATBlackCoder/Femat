<template>
  <NuxtRouteAnnouncer />
  <UApp :locale="currentLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as locales from '@nuxt/ui/locale'

const { locale, t } = useI18n()

const currentLocale = computed(() => locales[locale.value] ?? locales.en)
const lang = computed(() => currentLocale.value.code)
const dir = computed(() => currentLocale.value.dir)

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})

useSeoMeta({
  titleTemplate: (titleChunk?: string) => {
    return titleChunk ? `${titleChunk} - ${t('meta.site_name')}` : t('meta.site_name')
  },
  description: computed(() => t('meta.site_description')),
  ogTitle: (titleChunk?: string) => {
    return titleChunk ? `${titleChunk} - ${t('meta.site_name')}` : t('meta.site_name')
  },
  ogDescription: computed(() => t('meta.site_description'))
})
</script>