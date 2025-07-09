<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import EventDetail from '@/components/content/EventDetail.vue'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const { data: page } = await useAsyncData(`event-${route.params.slug}`, () => {
  const path = `/events/${locale.value}/${route.params.slug}`
  return queryCollection('events').path(path).first()
})

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description
})
</script>

<template>
  <EventDetail :event="page" @back="router.back()" />
</template>