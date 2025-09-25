<template>
  <UCard :class="cardClasses">
    <template #header>
      <div class="flex items-center justify-between">
        <UBadge 
          :color="eventTypeColor" 
          variant="soft"
        >
          {{ event.type }}
        </UBadge>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatDate(event.date) }}
        </span>
      </div>
    </template>

    <div class="space-y-4">
      <!-- Image de l'événement -->
      <div v-if="event.image" class="aspect-video overflow-hidden rounded-lg">
        <NuxtImg
          :src="event.image"
          :alt="event.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Contenu -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ event.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {{ event.description }}
        </p>
        
        <!-- Informations supplémentaires -->
        <div class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <div v-if="event.location" class="flex items-center">
            <UIcon name="i-lucide-map-pin" class="mr-2" />
            {{ event.location }}
          </div>
          <div v-if="event.participants" class="flex items-center">
            <UIcon name="i-lucide-users" class="mr-2" />
            {{ event.participants }} participants
          </div>
        </div>
      </div>
    </div>

    <template #footer v-if="showActions">
      <div class="flex gap-2">
        <UButton
          variant="outline"
          size="sm"
          :to="`/events/${event.id}`"
          :class="buttonClasses"
        >
          Voir détails
        </UButton>
        <UButton
          v-if="event.registrationOpen"
          color="primary"
          size="sm"
          :to="`/events/${event.id}/register`"
          :class="buttonClasses"
        >
          S'inscrire
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
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
  event: Event
  variant?: 'default' | 'elevated' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  showActions?: boolean
  buttonLayout?: 'full' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  showActions: true,
  buttonLayout: 'auto'
})

// Classes CSS calculées
const cardClasses = computed(() => {
  const classes = ['transition-all', 'duration-300']
  
  // Variant de carte
  if (props.variant === 'elevated') {
    classes.push('hover:shadow-lg')
  } else if (props.variant === 'outlined') {
    classes.push('ring-2 ring-gray-200 dark:ring-gray-700')
  }
  
  return classes.join(' ')
})

const buttonClasses = computed(() => {
  return props.buttonLayout === 'full' ? 'flex-1' : ''
})

// Couleur du badge selon le type d'événement
const eventTypeColor = computed(() => {
  const colorMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
    'compétition': 'error',
    'stage': 'info', 
    'formation': 'success',
    'autre': 'neutral'
  }
  return colorMap[props.event.type] || 'neutral'
})

// Formatage de la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
