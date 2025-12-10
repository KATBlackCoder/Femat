<template>
  <div>
    <!-- Chargement -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[400px]">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
    </div>

    <!-- Erreur 404 -->
    <div v-else-if="error || !event" class="max-w-4xl mx-auto px-4 py-16">
      <UCard>
        <div class="text-center py-12">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-error mx-auto mb-4" />
          <h1 class="text-2xl font-bold mb-2">Événement non trouvé</h1>
          <p class="text-neutral-600 dark:text-neutral-400 mb-6">
            L'événement que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <UButton to="/events" color="primary">
            Retour aux événements
          </UButton>
        </div>
      </UCard>
    </div>

    <!-- Événement trouvé -->
    <div v-else>
      <!-- Hero Section -->
      <UPageHero
        :headline="getEventTypeLabel(event.type)"
        :title="event.title"
        :description="event.description"
        :ui="{
          root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
          container: 'py-16 sm:py-20 lg:py-24'
        }"
      >
        <template #headline>
          <div class="flex items-center gap-3">
            <UBadge :color="getEventColor(event.type)" variant="subtle" size="lg">
              {{ getEventTypeLabel(event.type) }}
            </UBadge>
            <UBadge 
              :color="computedStatus === 'upcoming' ? 'success' : computedStatus === 'ongoing' ? 'warning' : 'neutral'" 
              variant="subtle" 
              size="lg"
            >
              {{ computedStatus === 'upcoming' ? 'À venir' : computedStatus === 'ongoing' ? 'En cours' : 'Passé' }}
            </UBadge>
          </div>
        </template>
      </UPageHero>

      <!-- Contenu de l'événement -->
      <UPageSection
        :ui="{
          container: 'py-8 sm:py-12'
        }"
      >
        <div class="max-w-4xl mx-auto">
          <!-- Métadonnées -->
          <div class="mb-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div class="text-sm text-neutral-500 dark:text-neutral-400">Date de début</div>
                  <div class="font-semibold">{{ formatDate(event.date) }}</div>
                  <div v-if="event.startTime" class="text-xs text-neutral-400 dark:text-neutral-500">
                    {{ event.startTime }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div class="text-sm text-neutral-500 dark:text-neutral-400">Lieu</div>
                  <div class="font-semibold">{{ event.location }}</div>
                </div>
              </div>
              <div v-if="event.endDate" class="flex items-center gap-3">
                <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div class="text-sm text-neutral-500 dark:text-neutral-400">Date de fin</div>
                  <div class="font-semibold">{{ formatDate(event.endDate) }}</div>
                  <div v-if="event.endTime" class="text-xs text-neutral-400 dark:text-neutral-500">
                    {{ event.endTime }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Temps restant -->
            <div v-if="countdown && (computedStatus === 'upcoming' || computedStatus === 'ongoing') && !countdown.hasEnded" class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div v-if="!countdown.hasStarted" class="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <UIcon name="i-heroicons-clock" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <div>
                  <div class="text-sm font-medium text-primary-900 dark:text-primary-100">
                    Début dans {{ countdown.timeUntilStartDetailed }}
                  </div>
                  <div class="text-xs text-primary-600 dark:text-primary-400 mt-1">
                    {{ countdown.timeUntilStart.days }}j {{ countdown.timeUntilStart.hours }}h {{ countdown.timeUntilStart.minutes }}m {{ countdown.timeUntilStart.seconds }}s
                  </div>
                </div>
              </div>
              <div v-else class="flex items-center gap-3 p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                <UIcon name="i-heroicons-clock" class="w-6 h-6 text-warning-600 dark:text-warning-400" />
                <div>
                  <div class="text-sm font-medium text-warning-900 dark:text-warning-100">
                    Se termine dans {{ countdown.timeUntilEndDetailed }}
                  </div>
                  <div class="text-xs text-warning-600 dark:text-warning-400 mt-1">
                    {{ countdown.timeUntilEnd.days }}j {{ countdown.timeUntilEnd.hours }}h {{ countdown.timeUntilEnd.minutes }}m {{ countdown.timeUntilEnd.seconds }}s
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Contenu Markdown -->
          <div v-if="event.body || event._body" class="prose prose-neutral dark:prose-invert max-w-none">
            <ContentRenderer :value="event" />
          </div>

          <!-- Description si pas de contenu Markdown -->
          <div v-else class="prose prose-neutral dark:prose-invert max-w-none">
            <p class="text-lg">{{ event.description }}</p>
          </div>

          <!-- Bouton retour -->
          <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <UButton to="/events" color="primary" variant="ghost" icon="i-heroicons-arrow-left">
              Retour aux événements
            </UButton>
          </div>
        </div>
      </UPageSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event'
import { useEvents } from '~/composables/useEvents'
import { useEventCountdown } from '~/composables/useEventCountdown'

const route = useRoute()
const { getEventBySlug, isEventPast, isEventOngoing } = useEvents()

// Récupérer le slug depuis la route
const slug = computed(() => {
  const slugParam = route.params.slug
  if (Array.isArray(slugParam)) {
    return slugParam.join('/')
  }
  return slugParam as string
})

// Charger l'événement
const isLoading = ref(true)
const event = ref<Event | null>(null)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    isLoading.value = true
    const foundEvent = await getEventBySlug(slug.value)
    
    if (!foundEvent) {
      error.value = new Error('Événement non trouvé')
    } else {
      event.value = foundEvent
      // Appeler useEventCountdown après le chargement
      countdown.value = useEventCountdown(foundEvent)
    }
  } catch (e) {
    error.value = e as Error
  } finally {
    isLoading.value = false
  }
})

// Nettoyer l'intervalle quand le composant est démonté
onUnmounted(() => {
  if (countdown.value?.cleanup) {
    countdown.value.cleanup()
  }
})

// Calculer le statut dynamiquement au lieu d'utiliser le statut statique du fichier Markdown
const computedStatus = computed<Event['status']>(() => {
  if (!event.value) return 'upcoming'
  
  // Calculer le statut en fonction de la date actuelle
  if (isEventOngoing(event.value)) {
    return 'ongoing'
  }
  if (isEventPast(event.value)) {
    return 'past'
  }
  return 'upcoming'
})

// Calculer le temps restant (seulement si l'événement est chargé)
const countdown = ref<ReturnType<typeof useEventCountdown> | null>(null)

// SEO dynamique
watchEffect(() => {
  if (!event.value) {
    useSeoMeta({
      title: 'Événement non trouvé - FEMAT',
      description: 'L\'événement que vous recherchez n\'existe pas.',
      robots: 'noindex, nofollow'
    })
    return
  }

  useSeoMeta({
    title: `${event.value.title} - Événements FEMAT`,
    description: event.value.description,
    ogTitle: event.value.title,
    ogDescription: event.value.description,
    ogType: 'article',
    twitterCard: 'summary_large_image'
  })
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return dateString
  }
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getEventColor(type: Event['type']): 'primary' | 'secondary' | 'error' | 'info' {
  const colors: Record<Event['type'], 'primary' | 'secondary' | 'error' | 'info'> = {
    competition: 'error',
    training: 'primary',
    ceremony: 'secondary',
    social: 'info'
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

