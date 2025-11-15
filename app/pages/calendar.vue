<template>
  <div>
    <!-- Section Calendrier avec UPageSection -->
    <UPageSection
      headline="Calendrier"
      title="Calendrier des événements"
      description="Naviguez dans le calendrier pour découvrir tous nos événements. Les dates avec des événements sont marquées par des points colorés."
      :ui="{
        root: 'bg-white dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <EventCalendar :events="allEvents" />
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Calendrier - FEMAT',
  description: 'Consultez le calendrier de tous les événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo.',
  ogTitle: 'Calendrier des événements - FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Consultez le calendrier de tous les événements, compétitions et activités organisés par la Fédération Malienne de Taekwondo.',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image'
})

const { allEvents } = useEvents()
</script>

