<template>
  <UContainer class="py-12">
    <h1 class="text-3xl text-center font-bold mb-8 text-primary">{{ $t('nav.events') }}</h1>
    <EventCalendar />
  </UContainer>
</template>

<script setup lang="ts">
import EventCalendar from '@/components/content/EventCalendar.vue'

const { t } = useI18n()

useSeoMeta({
  title: t('nav.events')
})
</script>

<style>

</style>