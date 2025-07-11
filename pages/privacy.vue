<template>
  <UContainer class="py-12">
    <UCard>
      <template #header>
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-primary">{{ t('privacy_policy.title') }}</h1>
      </template>
      <div class="prose dark:prose-invert max-w-none">
        <p>{{ t('privacy_policy.last_updated') }}</p>

        <h2>{{ t('privacy_policy.introduction.title') }}</h2>
        <p>{{ t('privacy_policy.introduction.text') }}</p>

        <h2>{{ t('privacy_policy.information_we_collect.title') }}</h2>
        <p>{{ t('privacy_policy.information_we_collect.text') }}</p>

        <h2>{{ t('privacy_policy.how_we_use_information.title') }}</h2>
        <p>{{ t('privacy_policy.how_we_use_information.text') }}</p>

        <h2>{{ t('privacy_policy.contact_us.title') }}</h2>
        <p>{{ t('privacy_policy.contact_us.text') }}</p>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('nav.privacy')
})
</script> 