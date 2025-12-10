<template>
  <div>
    <!-- Section Histoire avec UPageSection -->
    <UPageSection
      headline="Histoire"
      title="Notre Histoire"
      description="La Fédération Malienne de Taekwondo (FEMAT) a été créée avec pour objectif de promouvoir et développer la pratique du taekwondo au Mali."
      :ui="{
        root: 'bg-white dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <UCard class="relative overflow-hidden border-0 shadow-xl max-w-4xl mx-auto">
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
          
          <div class="p-8 sm:p-12">
            <div class="space-y-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                Depuis sa fondation, la fédération œuvre sans relâche pour offrir aux pratiquants maliens les meilleures opportunités de progression et de compétition.
              </p>
              <p>
                La FEMAT organise régulièrement des compétitions nationales et internationales, des stages de formation pour les instructeurs, et des événements qui rassemblent la communauté du taekwondo malien. Notre fédération est reconnue pour son engagement en faveur de l'excellence sportive et des valeurs fondamentales du taekwondo.
              </p>
              <p>
                Aujourd'hui, la FEMAT continue de grandir et de se développer, rassemblant des Dojang à travers tout le Mali et formant une nouvelle génération de pratiquants passionnés et dévoués.
              </p>
            </div>
          </div>
        </UCard>
      </template>
    </UPageSection>

    <!-- Section Mission et Valeurs avec UPageSection -->
    <UPageSection
      headline="Mission & Valeurs"
      title="Notre Mission et Nos Valeurs"
      description="La FEMAT s'engage à maintenir les plus hauts standards d'excellence sportive tout en préservant les valeurs traditionnelles du taekwondo."
      :ui="{
        root: 'bg-gray-50 dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission -->
          <UCard class="h-full">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <UIcon name="i-heroicons-flag" class="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h2 class="text-2xl font-bold">Notre Mission</h2>
              </div>
            </template>
            
            <div class="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Promouvoir et développer la pratique du taekwondo au Mali en offrant à tous les pratiquants, quel que soit leur niveau, les moyens de progresser, de s'épanouir et de participer à des compétitions de haut niveau.
              </p>
              <p>
                La FEMAT s'engage à maintenir les plus hauts standards d'excellence sportive tout en préservant les valeurs traditionnelles du taekwondo.
              </p>
            </div>
          </UCard>

          <!-- Valeurs -->
          <UCard class="h-full">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <UIcon name="i-heroicons-heart" class="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h2 class="text-2xl font-bold">Nos Valeurs</h2>
              </div>
            </template>
            
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                  <UIcon name="i-heroicons-hand-raised" class="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Respect</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Respect de soi, des autres et des traditions du taekwondo
                  </p>
                </div>
              </li>
              
              <li class="flex items-start gap-4">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                  <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Discipline</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Engagement et rigueur dans la pratique et l'entraînement
                  </p>
                </div>
              </li>
              
              <li class="flex items-start gap-4">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                  <UIcon name="i-heroicons-star" class="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Excellence</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Recherche constante de l'amélioration et du dépassement de soi
                  </p>
                </div>
              </li>
              
              <li class="flex items-start gap-4">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                  <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-lg mb-1 text-gray-900 dark:text-white">Cohésion</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Esprit d'équipe et solidarité au sein de la communauté
                  </p>
                </div>
              </li>
            </ul>
          </UCard>
        </div>
      </template>
    </UPageSection>

    <!-- Section Le Taekwondo avec UPageSection -->
    <UPageSection
      headline="Le Taekwondo"
      title="Le Taekwondo"
      description="Un art martial coréen qui combine techniques de combat, self-défense, exercices physiques et développement mental."
      :ui="{
        root: 'bg-white dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <UCard class="relative overflow-hidden border-0 shadow-xl max-w-4xl mx-auto">
          <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
          
          <div class="p-8 sm:p-12">
            <div class="space-y-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
              <p>
                Le taekwondo est un art martial coréen qui signifie littéralement "la voie du pied et du poing". C'est un sport olympique qui combine techniques de combat, self-défense, exercices physiques et développement mental.
              </p>
              <p>
                Pratiqué par des millions de personnes dans le monde, le taekwondo développe la force, la flexibilité, la coordination et la confiance en soi. Il enseigne également des valeurs importantes telles que le respect, la discipline et la persévérance.
              </p>
              <p>
                Au Mali, le taekwondo connaît un essor croissant grâce aux efforts de la FEMAT et de ses Dojang affiliés, qui offrent des programmes adaptés à tous les âges et tous les niveaux.
              </p>
            </div>
          </div>
        </UCard>
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'À propos - FEMAT',
  description: 'Découvrez l\'histoire, la mission et les valeurs de la Fédération Malienne de Taekwondo (FEMAT).',
  ogTitle: 'À propos de la FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Découvrez l\'histoire, la mission et les valeurs de la Fédération Malienne de Taekwondo (FEMAT).',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image'
})
</script>
