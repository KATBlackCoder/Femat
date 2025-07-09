<template>
  <UCard class="flex flex-col md:flex-row gap-4">
    <template v-if="news.image">
      <NuxtImg :src="news.image" width="160" height="120" class="rounded-lg object-cover w-full md:w-40 h-32 md:h-auto mx-auto" loading="lazy" />
    </template>
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <NuxtLink :to="news.path" class="text-xl font-bold text-primary hover:underline">
          {{ news.title }}
        </NuxtLink>
        <div class="flex items-center gap-2 mt-1">
          <UBadge v-if="news.category" color="primary" variant="soft">{{ news.category }}</UBadge>
          <span class="text-xs text-muted">{{ formatDate(news.date) }}</span>
        </div>
        <p class="mt-2 text-muted">{{ news.summary }}</p>
      </div>
      <div v-if="news.author" class="mt-2 text-xs text-muted">{{ $t('news.by_author', { author: news.author }) }}</div>
    </div>
  </UCard>
</template>

<script setup lang="ts">

defineProps({
  news: {
    type: Object as PropType<{
      title: string
      date: string
      author?: string
      category?: string
      image?: string
      summary?: string
      path: string
    }>,
    required: true
  }
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
</script> 