<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      headline="Événements"
      title="Événements de la FEMAT"
      description="Découvrez tous nos événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo."
      :ui="{
        root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
        container: 'py-16 sm:py-20 lg:py-24'
      }"
    >
      <template #headline>
        <UBadge color="primary" variant="subtle" size="lg">
          Événements
        </UBadge>
      </template>
    </UPageHero>

    <!-- Section Événements en cours avec UPageSection -->
    <UPageSection
      headline="Événements en cours"
      title="Événements en cours"
      description="Découvrez les événements actuellement en cours"
      :ui="{
        root: 'bg-primary-50/30 dark:bg-primary-900/10',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <!-- État de chargement -->
        <div v-if="isLoading" class="flex items-center justify-center min-h-[400px]">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400" />
        </div>

        <!-- Liste des événements -->
        <div v-else-if="paginatedOngoingEvents.length > 0" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(event, index) in paginatedOngoingEvents"
              :key="event._path || index"
              class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <EventCard :eventData="event" />
            </div>
          </div>

          <!-- Pagination (affichée seulement si 3+ événements) -->
          <div v-if="ongoingEvents.length >= 3 && totalOngoingPages > 1" class="flex justify-center mt-8">
            <UPagination
              v-model:page="currentOngoingPage"
              :total="ongoingEvents.length"
              :items-per-page="eventsPerPage"
              show-first
              show-last
            />
          </div>
        </div>

        <!-- Message si aucun événement -->
        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-calendar" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p class="text-neutral-600 dark:text-neutral-400">
            Aucun événement en cours pour le moment.
          </p>
        </div>
      </template>
    </UPageSection>

    <!-- Section Événements à venir avec UPageSection -->
    <UPageSection
      headline="Événements à venir"
      title="Événements à venir"
      description="Découvrez nos prochains événements et compétitions. Inscrivez-vous dès maintenant !"
      :ui="{
        root: 'bg-white dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <!-- Liste des événements -->
        <div v-if="paginatedUpcomingEvents.length > 0" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              v-for="(event, index) in paginatedUpcomingEvents"
            :key="event._path || index"
            class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <EventCard :eventData="event" />
            </div>
          </div>

          <!-- Pagination (affichée seulement si 3+ événements) -->
          <div v-if="upcomingEvents.length >= 3 && totalUpcomingPages > 1" class="flex justify-center mt-8">
            <UPagination
              v-model:page="currentUpcomingPage"
              :total="upcomingEvents.length"
              :items-per-page="eventsPerPage"
              show-first
              show-last
            />
          </div>
        </div>

        <!-- Message si aucun événement -->
        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-calendar" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p class="text-neutral-600 dark:text-neutral-400">
            Aucun événement à venir pour le moment.
          </p>
        </div>
      </template>
    </UPageSection>

    <!-- Section Événements passés avec UPageSection -->
    <UPageSection
      headline="Événements passés"
      title="Événements passés"
      description="Retour sur nos événements précédents et leurs résultats"
      :ui="{
        root: 'bg-gray-50 dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <!-- Liste des événements -->
        <div v-if="paginatedPastEvents.length > 0" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              v-for="(event, index) in paginatedPastEvents"
            :key="event._path || index"
            class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <EventCard :eventData="event" />
            </div>
          </div>

          <!-- Pagination (affichée seulement si 3+ événements) -->
          <div v-if="pastEvents.length >= 3 && totalPastPages > 1" class="flex justify-center mt-8">
            <UPagination
              v-model:page="currentPastPage"
              :total="pastEvents.length"
              :items-per-page="eventsPerPage"
              show-first
              show-last
            />
          </div>
        </div>

        <!-- Message si aucun événement -->
        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-calendar" class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p class="text-neutral-600 dark:text-neutral-400">
            Aucun événement passé pour le moment.
          </p>
        </div>
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import EventCard from '~/components/events/EventCard.vue'

useSeoMeta({
  title: 'Événements - FEMAT',
  description: 'Découvrez tous les événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo.',
  ogTitle: 'Événements - FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Découvrez tous les événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo.',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image'
})

const { upcomingEvents, ongoingEvents, pastEvents } = useEvents()
const isLoading = ref(true)

// Pagination pour chaque section
const eventsPerPage = 3

// Pagination événements en cours
const currentOngoingPage = ref(1)
const totalOngoingPages = computed(() => Math.ceil(ongoingEvents.value.length / eventsPerPage))
const paginatedOngoingEvents = computed(() => {
  const start = (currentOngoingPage.value - 1) * eventsPerPage
  const end = start + eventsPerPage
  return ongoingEvents.value.slice(start, end)
})

// Pagination événements à venir
const currentUpcomingPage = ref(1)
const totalUpcomingPages = computed(() => Math.ceil(upcomingEvents.value.length / eventsPerPage))
const paginatedUpcomingEvents = computed(() => {
  const start = (currentUpcomingPage.value - 1) * eventsPerPage
  const end = start + eventsPerPage
  return upcomingEvents.value.slice(start, end)
})

// Pagination événements passés
const currentPastPage = ref(1)
const totalPastPages = computed(() => Math.ceil(pastEvents.value.length / eventsPerPage))
const paginatedPastEvents = computed(() => {
  const start = (currentPastPage.value - 1) * eventsPerPage
  const end = start + eventsPerPage
  return pastEvents.value.slice(start, end)
})

onMounted(async () => {
  // Attendre que les événements soient chargés
  await nextTick()
  isLoading.value = false
})
</script>

