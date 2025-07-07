<template>
  <UContainer class="py-12">
    <h1 class="text-3xl font-bold mb-8 text-primary">Actualités</h1>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NewsCard
        v-for="news in newsList"
        :key="news.path"
        :news="news"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import NewsCard from '@/components/content/NewsCard.vue'

const { data: newsList } = await useAsyncData('news', () =>
  queryCollection('news').all()
)
</script>

<style>

</style>