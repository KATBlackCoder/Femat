<template>
  <UCard>
    <div class="flex flex-col md:flex-row gap-4">
      <NuxtImg v-if="event.image" :src="event.image" width="120" height="80" class="rounded-lg object-cover w-full md:w-32 h-24 md:h-auto mx-auto" loading="lazy" />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <NuxtLink :to="eventLink" class="text-lg font-bold text-primary hover:underline">
            {{ event.title }}
          </NuxtLink>
          <div class="flex items-center gap-2 mt-1">
            <UBadge v-if="event.category" color="primary" variant="soft">{{ event.category }}</UBadge>
            <span class="text-xs text-muted">{{ formatDateRange(event.startDate, event.endDate) }}</span>
          </div>
          <div v-if="event.location" class="text-xs text-muted mt-1">
            <UIcon name="i-heroicons-map-pin" class="inline-block mr-1 text-primary" />{{ event.location }}
          </div>
          <p class="mt-2 text-muted">{{ event.description }}</p>
        </div>
        <div v-if="event.organizer" class="mt-2 text-xs text-muted">{{ $t('events.organized_by', { organizer: event.organizer }) }}</div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Event } from '~/types/event'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  }
})

const localePath = useLocalePath()

const eventLink = computed(() => {
  const slug = props.event.path.split('/').pop()
  return localePath(`/events/${slug}`)
})

function formatDateRange(start: string, end?: string) {
  const startDate = new Date(start)
  if (!end || end === start) return startDate.toLocaleDateString()
  const endDate = new Date(end)
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
}
</script> 