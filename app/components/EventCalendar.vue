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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EventCard
          v-for="event in getEventsForDay(selectedDay)"
          :key="event.id"
          :event="event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event'

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
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  
  return props.events.filter(event => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
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
</script>

