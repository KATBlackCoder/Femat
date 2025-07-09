<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import NewsDetail from '@/components/content/NewsDetail.vue'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const { data: page } = await useAsyncData(`news-${route.params.slug}`, () => {
  const path = `/news/${locale.value}/${route.params.slug}`
  return queryCollection('news').path(path).first()
})

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.summary
})
</script>

<template>
  <NewsDetail :news="page" @back="router.back()" />
</template>