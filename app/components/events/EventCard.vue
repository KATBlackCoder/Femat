<template>
  <UCard class="h-full flex flex-col" :id="`event-${event._path?.replace(/\//g, '-')}`">
    <template #header>
      <div class="flex items-center justify-between gap-2 mb-3">
        <UBadge :color="getEventColor(event.type)" variant="subtle">
          {{ getEventTypeLabel(event.type) }}
        </UBadge>
        <UBadge 
          v-if="countdown.hasEnded" 
          color="neutral" 
          variant="subtle"
          aria-label="Événement passé"
        >
          Passé
        </UBadge>
        <UBadge 
          v-else-if="countdown.hasStarted" 
          color="warning" 
          variant="subtle"
          aria-label="Événement en cours"
        >
          En cours
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
      <div class="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        <UIcon name="i-heroicons-calendar" class="w-4 h-4" aria-hidden="true" />
        <time :datetime="event.date">{{ formatDate(event.date) }}</time>
      </div>
      <!-- Temps restant -->
      <div v-if="!countdown.hasEnded" class="text-sm">
        <div v-if="!countdown.hasStarted" class="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
          <UIcon name="i-heroicons-clock" class="w-4 h-4" aria-hidden="true" />
          <span>Début dans {{ countdown.timeUntilStartFormatted }}</span>
        </div>
        <div v-else class="flex items-center gap-2 text-warning-600 dark:text-warning-400 font-medium">
          <UIcon name="i-heroicons-clock" class="w-4 h-4" aria-hidden="true" />
          <span>Se termine dans {{ countdown.timeUntilEndFormatted }}</span>
        </div>
      </div>
    </template>

    <h3 class="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
      {{ event.title }}
    </h3>
    
    <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-4">
      <UIcon name="i-heroicons-map-pin" class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{{ event.location }}</span>
    </div>

    <p class="text-sm text-neutral-700 dark:text-neutral-300 flex-grow mb-4 line-clamp-3">
      {{ event.description }}
    </p>

    <template #footer>
      <div class="flex justify-end">
        <UButton 
          v-if="!countdown.hasEnded && event._path"
          color="primary" 
          variant="ghost" 
          size="sm"
          :to="event._path"
        >
          Plus d'infos
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event'
import { useEventCountdown } from '~/composables/useEventCountdown'

const props = defineProps<{
  event: Event
}>()

// Calculer le temps restant
const countdown = useEventCountdown(props.event)

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

