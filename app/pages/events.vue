<template>
  <div>


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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(event, index) in upcomingEvents"
            :key="event.id"
            class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <EventCard :event="event" />
          </div>
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(event, index) in pastEvents"
            :key="event.id"
            class="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <EventCard :event="event" />
          </div>
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
</script>
