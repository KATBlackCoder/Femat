<template>
  <UCard class="flex flex-col md:flex-row gap-4">
    <template v-if="event.image">
      <NuxtImg :src="event.image" width="160" height="120" class="rounded-lg object-cover w-full md:w-40 h-32 md:h-auto mx-auto" loading="lazy" />
    </template>
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <NuxtLink :to="event.path" class="text-xl font-bold text-primary hover:underline">
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
      <div v-if="event.organizer" class="mt-2 text-xs text-muted">Organized by {{ event.organizer }}</div>
    </div>
  </UCard>
</template>

<script setup lang="ts">

defineProps({
  event: {
    type: Object as PropType<{
      title: string
      startDate: string
      endDate?: string
      location?: string
      description?: string
      image?: string
      category?: string
      organizer?: string
      path: string
    }>,
    required: true
  }
})

function formatDateRange(start: string, end?: string) {
  const startDate = new Date(start)
  if (!end || end === start) return startDate.toLocaleDateString()
  const endDate = new Date(end)
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
}
</script> 