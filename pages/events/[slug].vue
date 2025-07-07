<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import EventDetail from '@/components/content/EventDetail.vue'

const route = useRoute()
const router = useRouter()
const { data: page } = await useAsyncData(`event-${route.params.slug}`, () => {
  return queryCollection('events').path(`/events/${route.params.slug}`).first()
})
</script>

<template>
  <EventDetail :event="page" @back="router.back()" />
</template>