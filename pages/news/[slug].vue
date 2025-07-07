<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import NewsDetail from '@/components/content/NewsDetail.vue'

const route = useRoute()
const router = useRouter()
const { data: page } = await useAsyncData(`news-${route.params.slug}`, () => {
  return queryCollection('news').path(`/news/${route.params.slug}`).first()
})
</script>

<template>
  <NewsDetail :news="page" @back="router.back()" />
</template>