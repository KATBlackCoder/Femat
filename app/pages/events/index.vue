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
        <!-- État de chargement -->
        <div v-if="isLoading" class="flex items-center justify-center min-h-[400px]">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
        </div>

        <!-- Liste des événements -->
        <div v-else-if="upcomingEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(event, index) in upcomingEvents"
            :key="event._path || index"
            class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <EventCard :event="event" />
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
        <div v-if="pastEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(event, index) in pastEvents"
            :key="event._path || index"
            class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <EventCard :event="event" />
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
useSeoMeta({
  title: 'Événements - FEMAT',
  description: 'Découvrez tous les événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo.',
  ogTitle: 'Événements - FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Découvrez tous les événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo.',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image'
})

const { upcomingEvents, pastEvents } = useEvents()
const isLoading = ref(true)

onMounted(async () => {
  // Attendre que les événements soient chargés
  await nextTick()
  isLoading.value = false
})
</script>

