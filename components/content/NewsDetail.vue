<template>
  <UContainer class="py-12 mx-auto max-w-3xl">
    <template v-if="news != null">
      <h1 class="text-3xl font-bold mb-4 text-primary">{{ news.title }}</h1>
      <div class="mb-6 text-muted text-sm flex gap-4 items-center">
        <span>{{ formatDate(news.date) }}</span>
        <UBadge v-if="news.category" color="primary" variant="soft">{{ news.category }}</UBadge>
        <span v-if="news.author">{{ $t('news.by_author', { author: news.author }) }}</span>
      </div>
      <NuxtImg v-if="news.image" :src="news.image" class="rounded-lg mb-6 w-full max-w-2xl" width="800" height="400" />
      <ContentRenderer :value="news" class="prose max-w-2xl" />
      <UButton class="mt-8" color="primary" variant="soft" @click="$emit('back')">
        <template #leading>
          <UIcon name="i-heroicons-arrow-left" />
        </template>
        {{ $t('common.back') }}
      </UButton>
    </template>
    <template v-else>
      <div class="text-center py-24">
        <h2 class="text-2xl font-bold mb-2 text-error">{{ $t('news.not_found.title') }}</h2>
        <p class="text-muted mb-4">{{ $t('news.not_found.description') }}</p>
        <NuxtLink to="/news" class="text-primary hover:underline">{{ $t('news.not_found.back_link') }}</NuxtLink>
      </div>
    </template>
  </UContainer>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ news: Record<string, any> | null }>()

defineEmits(['back'])

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
</script> 