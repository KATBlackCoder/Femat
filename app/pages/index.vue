<template>
  <div>
    <!-- Hero Section avec UPageHero -->
    <UPageHero
      headline="Fédération Malienne de Taekwondo"
      title="Bienvenue à la FEMAT"
      description="Découvrez la passion du taekwondo au Mali. Rejoignez notre communauté de pratiquants dédiés à l'excellence, au respect et à la discipline."
      :links="[
        { label: 'En savoir plus', to: '/about', color: 'primary', size: 'xl' },
        { label: 'Nos événements', to: '/events', color: 'primary', variant: 'outline', size: 'xl' },
        { label: 'Nous contacter', to: '/contact', color: 'primary', variant: 'ghost', size: 'xl' }
      ]"
      :ui="{
        root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
        container: 'py-16 sm:py-20 lg:py-24'
      }"
    >
      <template #top>
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-primary-200/50 blur-xl dark:bg-primary-900/30"></div>
            <NuxtImg 
              src="/logo_femat.avif" 
              alt="Logo FEMAT - Fédération Malienne de Taekwondo" 
              class="relative h-32 w-32 md:h-40 md:w-40 object-contain drop-shadow-lg dark:bg-white dark:rounded-full dark:p-2"
              loading="eager"
              width="160"
              height="160"
              format="avif"
              :fallback="'/logo_femat.webp'"
            />
          </div>
        </div>
      </template>
      
      <template #headline>
        <UBadge 
          color="primary" 
          variant="subtle" 
          size="lg"
        >
          Fédération Malienne de Taekwondo
        </UBadge>
      </template>
    </UPageHero>

    <!-- Section À propos avec UPageSection -->
    <UPageSection
      headline="À propos"
      title="À propos de la FEMAT"
      description="La Fédération Malienne de Taekwondo (FEMAT) est l'organisme officiel qui régit et promeut la pratique du taekwondo au Mali. Fondée avec pour mission de développer ce sport martial et ses valeurs, la FEMAT organise des compétitions, des formations et des événements pour tous les niveaux."
      :links="[
        { label: 'Découvrir notre histoire', to: '/about', color: 'primary', trailingIcon: 'i-heroicons-arrow-right' }
      ]"
      :ui="{
        root: 'bg-gray-50 dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <UCard class="relative overflow-hidden border-0 shadow-xl max-w-4xl mx-auto">
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
          
          <div class="p-8 sm:p-12">
            <p class="text-lg leading-8 text-gray-700 dark:text-gray-300">
              Notre fédération rassemble des dojos à travers tout le Mali et œuvre pour l'excellence sportive, le respect mutuel et la discipline qui caractérisent le taekwondo.
            </p>
          </div>
        </UCard>
      </template>
    </UPageSection>

    <!-- Section Événements avec UPageSection -->
    <UPageSection
      headline="Événements"
      title="Événements à venir"
      description="Découvrez nos prochains événements et compétitions"
      :ui="{
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
      
      <template #footer>
        <div class="text-center">
          <UButton 
            to="/events" 
            color="primary" 
            size="xl"
            trailing-icon="i-heroicons-arrow-right"
          >
            Voir tous les événements
          </UButton>
        </div>
      </template>
    </UPageSection>

    <!-- Section Contact avec UPageCTA -->
    <UPageCTA
      headline="Contact"
      title="Contactez-nous"
      description="Une question ? N'hésitez pas à nous contacter"
      variant="soft"
      :links="[
        { label: 'Envoyer un message', to: '/contact', color: 'primary', size: 'xl', trailingIcon: 'i-heroicons-arrow-right' }
      ]"
      :ui="{
        root: 'bg-primary-50 dark:bg-primary-900/20',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #headline>
        <UBadge 
          color="primary" 
          variant="subtle" 
          size="lg"
        >
          Contact
        </UBadge>
      </template>
      
      <template #body>
        <UCard class="relative overflow-hidden border-0 shadow-2xl max-w-4xl mx-auto">
          <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-100/30 to-secondary-100/30 rounded-full blur-3xl -z-10 dark:from-primary-900/20 dark:to-secondary-900/20"></div>
          
          <div class="p-8 sm:p-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div class="group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Adresse</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 ml-11">Bamako, Mali</p>
              </div>

              <div class="group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Email</h3>
                </div>
                <a 
                  href="mailto:contact@femat.ml" 
                  class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors underline-offset-2 hover:underline ml-11 block"
                >
                  contact@femat.ml
                </a>
              </div>

              <div class="group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <UIcon name="i-heroicons-phone" class="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Téléphone</h3>
                </div>
                <a 
                  href="tel:+223XXXXXXXX" 
                  class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors underline-offset-2 hover:underline ml-11 block"
                >
                  +223 XX XX XX XX
                </a>
              </div>

              <div class="group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <UIcon name="i-simple-icons-facebook" class="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Réseaux sociaux</h3>
                </div>
                <div class="ml-11">
                  <UButton
                    to="https://www.facebook.com/taekwondomali"
                    target="_blank"
                    external
                    color="primary"
                    variant="ghost"
                    icon="i-simple-icons-facebook"
                    aria-label="Page Facebook FEMAT"
                    size="sm"
                  >
                    Facebook
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UPageCTA>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Accueil - FEMAT',
  description: 'Bienvenue sur le site officiel de la Fédération Malienne de Taekwondo (FEMAT). Découvrez nos activités, événements et rejoignez la communauté du taekwondo au Mali.',
  ogTitle: 'FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Découvrez la passion du taekwondo au Mali. Rejoignez notre communauté de pratiquants dédiés à l\'excellence, au respect et à la discipline.',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image'
})

// Utiliser le composable pour récupérer les événements
const { upcomingEvents } = useEvents()
</script>
