<template>
  <div>
    <!-- En-tête de section -->
    <div v-if="showHeader" class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {{ title }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ subtitle }}
      </p>
    </div>

    <!-- Grille d'événements -->
    <div :class="gridClasses">
      <EventCard 
        v-for="event in events" 
        :key="event.id" 
        :event="event"
        :variant="cardVariant"
        :show-actions="showActions"
        :button-layout="buttonLayout"
      />
    </div>

    <!-- Message si aucun événement -->
    <div v-if="!events || events.length === 0" class="text-center py-12">
      <UIcon name="i-lucide-calendar-x" class="mx-auto text-4xl text-gray-400 mb-4" />
      <p class="text-gray-500 dark:text-gray-400">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from './EventCard.vue'
interface Event {
  id: string
  title: string
  description: string
  type: 'compétition' | 'stage' | 'formation' | 'autre'
  date: string
  location?: string
  image?: string
  participants?: number
  registrationOpen?: boolean
}

interface Props {
  events: Event[]
  title?: string
  subtitle?: string
  showHeader?: boolean
  showActions?: boolean
  gridColumns?: 1 | 2 | 3 | 4
  cardVariant?: 'default' | 'elevated' | 'outlined'
  buttonLayout?: 'full' | 'auto'
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Prochains Événements',
  subtitle: 'Découvrez nos prochaines compétitions et stages',
  showHeader: true,
  showActions: true,
  gridColumns: 3,
  cardVariant: 'default',
  buttonLayout: 'auto',
  emptyMessage: 'Aucun événement prévu pour le moment.'
})

// Classes CSS calculées
const gridClasses = computed(() => {
  const baseClasses = ['grid', 'gap-6']
  
  // Colonnes responsive
  const columnMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
  
  baseClasses.push(columnMap[props.gridColumns])
  
  return baseClasses.join(' ')
})

</script>

