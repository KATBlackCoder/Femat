<template>
  <UContainer class="py-12">
    <UCard>
      <template #header>
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-primary">{{ t('terms_of_service.title') }}</h1>
      </template>
      <div class="prose dark:prose-invert max-w-none">
        <p>{{ t('terms_of_service.last_updated') }}</p>

        <h2>{{ t('terms_of_service.agreement.title') }}</h2>
        <p>{{ t('terms_of_service.agreement.text') }}</p>

        <h2>{{ t('terms_of_service.use_of_site.title') }}</h2>
        <p>{{ t('terms_of_service.use_of_site.text') }}</p>

        <h2>{{ t('terms_of_service.governing_law.title') }}</h2>
        <p>{{ t('terms_of_service.governing_law.text') }}</p>

        <h2>{{ t('terms_of_service.contact_us.title') }}</h2>
        <p>{{ t('terms_of_service.contact_us.text') }}</p>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('nav.terms')
})
</script> 