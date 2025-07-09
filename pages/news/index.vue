<template>
  <UContainer class="py-12">
    <h1 class="text-3xl font-bold mb-8 text-primary">{{ $t('nav.news') }}</h1>
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

const { locale, t } = useI18n()

useSeoMeta({
  title: t('nav.news')
})

const { data: newsList } = await useAsyncData('news', () =>
  queryCollection('news')
    .where('path', 'LIKE', `/news/${locale.value}/%`)
    .all()
)
</script>

<style>

</style>