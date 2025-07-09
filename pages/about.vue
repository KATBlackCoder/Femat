<template>
  <UContainer class="py-12">
    <UCard>
      <template #header>
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-primary">{{ $t('about.title') }}</h1>
      </template>
      <div class="space-y-8">
        <div>
          <h2 class="text-xl font-semibold mb-2 text-highlighted">{{ $t('about.history_title') }}</h2>
          <p class="text-muted">{{ $t('about.history_text') }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2 text-highlighted">{{ $t('about.mission_title') }}</h2>
          <p class="text-muted">{{ $t('about.mission_text') }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2 text-highlighted">{{ $t('about.structure_title') }}</h2>
          <p class="text-muted">{{ $t('about.structure_text') }}</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('nav.about')
})
</script> 