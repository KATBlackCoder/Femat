<template>
  <UContainer class="py-12 mx-auto max-w-3xl">
    <template v-if="event != null">
      <h1 class="text-3xl font-bold mb-4 text-primary">{{ event.title }}</h1>
      <div class="mb-6 text-muted text-sm flex gap-4 items-center flex-wrap">
        <span>{{ formatDateRange(event.startDate, event.endDate) }}</span>
        <UBadge v-if="event.category" color="primary" variant="soft">{{ event.category }}</UBadge>
        <span v-if="event.organizer">Organized by {{ event.organizer }}</span>
        <span v-if="event.location">
          <UIcon name="i-heroicons-map-pin" class="inline-block mr-1 text-primary" />{{ event.location }}
        </span>
      </div>
      <NuxtImg v-if="event.image" :src="event.image" class="rounded-lg mb-6 w-full max-w-2xl" width="800" height="400" />
      <p v-if="event.description" class="mb-6 text-muted max-w-2xl">{{ event.description }}</p>
      <ContentRenderer :value="event" class="prose max-w-2xl" />
      <UButton class="mt-8" color="primary" variant="soft" @click="$emit('back')">
        <template #leading>
          <UIcon name="i-heroicons-arrow-left" />
        </template>
        Retour
      </UButton>
    </template>
    <template v-else>
      <div class="text-center py-24">
        <h2 class="text-2xl font-bold mb-2 text-error">Event not found</h2>
        <p class="text-muted mb-4">The event you are looking for does not exist.</p>
        <NuxtLink to="/events" class="text-primary hover:underline">Back to events</NuxtLink>
      </div>
    </template>
  </UContainer>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ event: Record<string, any> | null }>()

defineEmits(['back'])

function formatDateRange(start: string, end?: string) {
  const startDate = new Date(start)
  if (!end || end === start) return startDate.toLocaleDateString()
  const endDate = new Date(end)
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
}
</script> 