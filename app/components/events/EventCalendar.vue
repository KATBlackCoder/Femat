<template>
  <div class="space-y-6">
    <!-- Navigation du calendrier -->
    <div class="flex items-center justify-between">
      <UButton
        icon="i-heroicons-chevron-left"
        color="neutral"
        variant="ghost"
        @click="previousMonth"
        aria-label="Mois précédent"
      />
      
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {{ currentMonthLabel }}
      </h2>
      
      <UButton
        icon="i-heroicons-chevron-right"
        color="neutral"
        variant="ghost"
        @click="nextMonth"
        aria-label="Mois suivant"
      />
    </div>

    <!-- Calendrier -->
    <UCard class="relative overflow-hidden border-0 shadow-xl">
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
      
      <div class="p-6">
        <!-- En-têtes des jours -->
        <div class="grid grid-cols-7 gap-2 mb-4">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center text-sm font-semibold text-neutral-500 dark:text-neutral-400 py-2"
          >
            {{ day }}
          </div>
        </div>

        <!-- Grille du calendrier -->
        <div class="grid grid-cols-7 gap-2">
          <!-- Jours vides du début -->
          <div
            v-for="n in firstDayOfMonth"
            :key="`empty-${n}`"
            class="aspect-square"
          ></div>

          <!-- Jours du mois -->
          <button
            v-for="day in daysInMonth"
            :key="day"
            :class="[
              'aspect-square rounded-lg border-2 transition-all duration-200 relative overflow-hidden',
              getDayBackgroundClass(day),
              hasEvents(day) ? 'cursor-pointer hover:scale-105' : '',
              selectedDay === day ? 'ring-2 ring-primary ring-offset-2' : ''
            ]"
            @click="selectDay(day)"
            :aria-label="`${day} ${currentMonthLabel}`"
          >
            <div class="flex flex-col h-full p-2">
              <span
                :class="[
                  'text-sm font-medium',
                  getDayTextClass(day),
                  selectedDay === day ? 'font-bold' : ''
                ]"
              >
                {{ day }}
              </span>
              <!-- Indicateur pour événements multi-jours -->
              <div v-if="isMultiDayEventStart(day) || isMultiDayEventMiddle(day) || isMultiDayEventEnd(day)" class="mt-auto">
                <div v-if="isMultiDayEventStart(day)" class="h-1 bg-current rounded-full"></div>
                <div v-else-if="isMultiDayEventMiddle(day)" class="h-1 bg-current/50 rounded-full"></div>
                <div v-else-if="isMultiDayEventEnd(day)" class="h-1 bg-current rounded-full"></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </UCard>

    <!-- Légende -->
    <div class="flex flex-wrap items-center gap-4 text-sm">
      <span class="font-semibold text-neutral-700 dark:text-neutral-300">Légende :</span>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-error ring-2 ring-error/20 shadow-sm"></div>
        <span class="text-neutral-600 dark:text-neutral-400">Compétition</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/20 shadow-sm"></div>
        <span class="text-neutral-600 dark:text-neutral-400">Entraînement</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-secondary ring-2 ring-secondary/20 shadow-sm"></div>
        <span class="text-neutral-600 dark:text-neutral-400">Cérémonie</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/20 shadow-sm"></div>
        <span class="text-neutral-600 dark:text-neutral-400">Événement social</span>
      </div>
    </div>

    <!-- Événements du jour sélectionné -->
    <div v-if="selectedDay && getEventsForDay(selectedDay).length > 0">
      <h3 class="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Événements du {{ selectedDay }} {{ currentMonthLabel }}
      </h3>
      <!-- Tri par heure de début si disponible -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EventCard
          v-for="event in getEventsForDaySorted(selectedDay)"
          :key="event._path || event.date"
          :event="event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event'
import EventCard from '~/components/events/EventCard.vue'

const props = defineProps<{
  events: Event[]
}>()

const currentDate = ref(new Date())
const selectedDay = ref<number | null>(null)

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const currentMonthLabel = computed(() => {
  return currentDate.value.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
})

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  // Convertir dimanche (0) en 6 pour commencer la semaine le lundi
  return firstDay === 0 ? 6 : firstDay - 1
})

function previousMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
  selectedDay.value = null
}

function nextMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
  selectedDay.value = null
}

function isToday(day: number): boolean {
  const today = new Date()
  return (
    day === today.getDate() &&
    currentDate.value.getMonth() === today.getMonth() &&
    currentDate.value.getFullYear() === today.getFullYear()
  )
}

function getEventsForDay(day: number): Event[] {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const targetDate = new Date(year, month, day)
  
  return props.events.filter(event => {
    const eventStartDate = new Date(event.date)
    eventStartDate.setHours(0, 0, 0, 0)
    
    // Si l'événement a une date de fin, vérifier si le jour cible est dans la plage
    if (event.endDate) {
      const eventEndDate = new Date(event.endDate)
      eventEndDate.setHours(23, 59, 59, 999)
      
      return targetDate >= eventStartDate && targetDate <= eventEndDate
    }
    
    // Sinon, vérifier seulement si c'est le jour de début
    return (
      eventStartDate.getDate() === day &&
      eventStartDate.getMonth() === month &&
      eventStartDate.getFullYear() === year
    )
  })
}

function hasEvents(day: number): boolean {
  return getEventsForDay(day).length > 0
}

function selectDay(day: number) {
  if (hasEvents(day)) {
    selectedDay.value = selectedDay.value === day ? null : day
  }
}

function getDayBackgroundClass(day: number): string {
  const events = getEventsForDay(day)
  
  if (events.length === 0) {
    return isToday(day) 
      ? 'border-primary bg-primary-50 dark:bg-primary-900/20' 
      : 'border-neutral-200 dark:border-neutral-800 hover:border-primary/50'
  }
  
  // Si plusieurs événements, utiliser le type du premier
  const eventType = events[0]?.type
  if (!eventType) {
    return isToday(day) 
      ? 'border-primary bg-primary-50 dark:bg-primary-900/20' 
      : 'border-neutral-200 dark:border-neutral-800 hover:border-primary/50'
  }
  
  const isTodayValue = isToday(day)
  
  // Utilisation des couleurs Nuxt UI configurées dans app.config.ts
  switch (eventType) {
    case 'competition':
      return isTodayValue
        ? 'border-error bg-error-50 dark:bg-error-900/30'
        : 'border-error/50 bg-error-50/50 dark:bg-error-900/20 hover:bg-error-100 dark:hover:bg-error-900/30'
    case 'training':
      return isTodayValue
        ? 'border-primary bg-primary-50 dark:bg-primary-900/30'
        : 'border-primary/50 bg-primary-50/50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30'
    case 'ceremony':
      return isTodayValue
        ? 'border-secondary bg-secondary-50 dark:bg-secondary-900/30'
        : 'border-secondary/50 bg-secondary-50/50 dark:bg-secondary-900/20 hover:bg-secondary-100 dark:hover:bg-secondary-900/30'
    case 'social':
      return isTodayValue
        ? 'border-primary bg-primary-50 dark:bg-primary-900/30'
        : 'border-primary/50 bg-primary-50/50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30'
    default:
      return isTodayValue
        ? 'border-primary bg-primary-50 dark:bg-primary-900/30'
        : 'border-primary/50 bg-primary-50/50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30'
  }
}

function getDayTextClass(day: number): string {
  const events = getEventsForDay(day)
  
  if (events.length === 0) {
    return isToday(day) ? 'text-primary' : 'text-neutral-900 dark:text-neutral-100'
  }
  
  const eventType = events[0]?.type
  if (!eventType) {
    return isToday(day) ? 'text-primary' : 'text-neutral-900 dark:text-neutral-100'
  }
  
  // Utilisation des couleurs Nuxt UI configurées dans app.config.ts
  switch (eventType) {
    case 'competition':
      return 'text-error-600 dark:text-error-400'
    case 'training':
      return 'text-primary-600 dark:text-primary-400'
    case 'ceremony':
      return 'text-secondary-600 dark:text-secondary-400'
    case 'social':
      return 'text-primary-600 dark:text-primary-400'
    default:
      return 'text-primary-600 dark:text-primary-400'
  }
}

function getEventColorClass(type: Event['type']): string {
  const colors: Record<Event['type'], string> = {
    competition: 'bg-error',
    training: 'bg-primary',
    ceremony: 'bg-secondary',
    social: 'bg-primary'
  }
  return colors[type] || 'bg-primary'
}

/**
 * Vérifie si un jour est le début d'un événement multi-jours
 */
function isMultiDayEventStart(day: number): boolean {
  const events = getEventsForDay(day)
  return events.some(event => {
    if (!event.endDate) return false
    const eventStartDate = new Date(event.date)
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    return (
      eventStartDate.getDate() === day &&
      eventStartDate.getMonth() === month &&
      eventStartDate.getFullYear() === year
    )
  })
}

/**
 * Vérifie si un jour est au milieu d'un événement multi-jours (ni début ni fin)
 */
function isMultiDayEventMiddle(day: number): boolean {
  const events = getEventsForDay(day)
  return events.some(event => {
    if (!event.endDate) return false
    const eventStartDate = new Date(event.date)
    const eventEndDate = new Date(event.endDate)
    const targetDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
    
    return targetDate > eventStartDate && targetDate < eventEndDate
  })
}

/**
 * Vérifie si un jour est la fin d'un événement multi-jours
 */
function isMultiDayEventEnd(day: number): boolean {
  const events = getEventsForDay(day)
  return events.some(event => {
    if (!event.endDate) return false
    const eventEndDate = new Date(event.endDate)
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    return (
      eventEndDate.getDate() === day &&
      eventEndDate.getMonth() === month &&
      eventEndDate.getFullYear() === year
    )
  })
}

/**
 * Récupère les événements d'un jour triés par heure de début
 */
function getEventsForDaySorted(day: number): Event[] {
  const events = getEventsForDay(day)
  
  return events.sort((a, b) => {
    // Si les deux ont une heure de début, trier par heure
    if (a.startTime && b.startTime) {
      const timeA = a.startTime.split(':').map(Number)
      const timeB = b.startTime.split(':').map(Number)
      const hoursA = timeA[0] ?? 0
      const minutesA = timeA[1] ?? 0
      const hoursB = timeB[0] ?? 0
      const minutesB = timeB[1] ?? 0
      const totalMinutesA = hoursA * 60 + minutesA
      const totalMinutesB = hoursB * 60 + minutesB
      return totalMinutesA - totalMinutesB
    }
    
    // Si seulement un a une heure, le mettre en premier
    if (a.startTime && !b.startTime) return -1
    if (!a.startTime && b.startTime) return 1
    
    // Sinon, trier par date de début
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}
</script>

