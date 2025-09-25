<template>
  <UPage>
    <!-- Hero Section -->
    <UPageHeader>
      <UContainer>
        <div class="text-center py-1">
          <!-- Logo FEMAT -->
          <div class="mb-8">
            <NuxtImg 
              src="/logo_femat.webp" 
              alt="Logo FEMAT" 
              width="120" 
              height="120"
              class="mx-auto rounded-xl shadow-lg"
            />
          </div>
          
          <!-- Titre principal -->
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Bienvenue à la 
            <span class="text-primary">FEMAT</span>
          </h1>
          
          <!-- Sous-titre -->
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Fédération Malienne de Taekwondo<br>
            <span class="text-lg text-gray-500 dark:text-gray-400">Excellence • Respect • Persévérance</span>
          </p>
          
          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton 
              color="primary" 
              size="xl"
              to="/events"
              icon="i-lucide-calendar"
              class="font-semibold"
            >
              Voir les événements
            </UButton>
            <UButton 
              color="secondary"
              variant="outline" 
              size="xl"
              to="/about"
              icon="i-lucide-info"
            >
              Découvrir la FEMAT
            </UButton>
          </div>
        </div>
      </UContainer>
    </UPageHeader>

    <UPageBody>
      <!-- Section événements -->
      <UPageSection>
        <UContainer>
          <EventsGrid 
            :events="events"
            title="Prochains Événements"
            subtitle="Découvrez nos prochaines compétitions et stages"
            :grid-columns="3"
            card-variant="elevated"
            button-layout="full"
          />
        </UContainer>
      </UPageSection>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import EventsGrid from '~/components/features/events/EventsGrid.vue'
// Données d'exemple pour les événements
const events = [
  {
    id: '1',
    title: 'Championnat National 2024',
    description: 'Le plus grand événement de taekwondo du Mali avec plus de 500 participants venus de tout le pays.',
    type: 'compétition' as const,
    date: '2024-03-15',
    location: 'Palais des Sports, Bamako',
    participants: 500,
    registrationOpen: true,
    image: '/logo_femat.webp'
  },
  {
    id: '2', 
    title: 'Stage Technique Avancé',
    description: 'Formation intensive pour les ceintures noires avec Maître Kim.',
    type: 'stage' as const,
    date: '2024-02-20',
    location: 'Dojang Central',
    participants: 25,
    registrationOpen: true
  },
  {
    id: '3',
    title: 'Formation Arbitres',
    description: 'Formation officielle pour devenir arbitre de taekwondo certifié.',
    type: 'formation' as const,
    date: '2024-02-10',
    location: 'Centre de Formation FEMAT',
    participants: 30,
    registrationOpen: false
  }
]


// Configuration de la page
useHead({
  title: 'FEMAT - Fédération Malienne de Taekwondo',
  meta: [
    { name: 'description', content: 'Site officiel de la Fédération Malienne de Taekwondo. Découvrez nos événements, actualités et rejoignez notre communauté.' }
  ]
})
</script>

