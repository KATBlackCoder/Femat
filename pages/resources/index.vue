<template>
  <UContainer class="py-12">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{{ t('resources.title') }}</h1>
      <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">{{ t('resources.description') }}</p>
    </div>

    <div v-if="pending" class="flex justify-center">
      <p>{{ t('common.loading') }}</p>
    </div>
    <div v-else-if="error" class="flex justify-center">
      <p>{{ t('common.error') }}</p>
    </div>
    <div v-else-if="resources && resources.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard v-for="resource in resources" :key="resource.path">
        <template #header>
          <h3 class="text-lg font-semibold">{{ resource.title }}</h3>
        </template>

        <p class="text-gray-500 dark:text-gray-400 mb-4">{{ resource.description }}</p>

        <template #footer>
          <UButton
            :to="resource.file"
            target="_blank"
            icon="i-heroicons-arrow-down-tray"
            :label="t('resources.download_button')"
            external
          />
        </template>
      </UCard>
    </div>
    <div v-else class="text-center">
      <p>{{ t('resources.no_resources_found') }}</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

useSeoMeta({
  title: t('nav.resources')
})

const { data: resources, pending, error } = await useAsyncData(
  `resources-${locale.value}`,
  () => queryCollection('resources')
    .where('path', 'LIKE', `/resources/${locale.value}/%`)
    .all(),
  { watch: [locale] }
)
</script> 