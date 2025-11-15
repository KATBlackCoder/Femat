<template>
  <UCard class="h-full flex flex-col" :id="`event-${event.id}`">
    <template #header>
      <div class="flex items-center justify-between gap-2 mb-3">
        <UBadge :color="getEventColor(event.type)" variant="subtle">
          {{ getEventTypeLabel(event.type) }}
        </UBadge>
        <UBadge 
          v-if="event.status === 'past'" 
          color="neutral" 
          variant="subtle"
          aria-label="Événement passé"
        >
          Passé
        </UBadge>
        <UBadge 
          v-else 
          color="success" 
          variant="subtle"
          aria-label="Événement à venir"
        >
          À venir
        </UBadge>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <UIcon name="i-heroicons-calendar" class="w-4 h-4" aria-hidden="true" />
        <time :datetime="event.date">{{ formatDate(event.date) }}</time>
      </div>
    </template>

    <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
      {{ event.title }}
    </h3>
    
    <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
      <UIcon name="i-heroicons-map-pin" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{{ event.location }}</span>
    </div>

    <p class="text-sm text-gray-700 dark:text-gray-300 flex-grow mb-4 line-clamp-3">
      {{ event.description }}
    </p>

    <template #footer>
      <div class="flex justify-end">
        <UButton 
          v-if="event.status === 'upcoming'"
          color="primary" 
          variant="ghost" 
          size="sm"
          :to="`/events#event-${event.id}`"
        >
          Plus d'infos
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event'

defineProps<{
  event: Event
}>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  // Vérification de la validité de la date
  if (isNaN(date.getTime())) {
    return dateString // Retourne la chaîne originale si la date est invalide
  }
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

function getEventColor(type: Event['type']): 'primary' | 'secondary' | 'error' {
  const colors: Record<Event['type'], 'primary' | 'secondary' | 'error'> = {
    competition: 'error', // Rouge pour compétitions
    training: 'primary',   // Vert pour entraînements
    ceremony: 'secondary', // Jaune pour cérémonies
    social: 'primary'
  }
  return colors[type] || 'primary'
}

function getEventTypeLabel(type: Event['type']): string {
  const labels: Record<Event['type'], string> = {
    competition: 'Compétition',
    training: 'Entraînement',
    ceremony: 'Cérémonie',
    social: 'Événement social'
  }
  return labels[type] || type
}
</script>

