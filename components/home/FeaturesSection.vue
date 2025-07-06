<template>
  <section class="py-16 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Notre Mission
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Développer le Taekwondo au Mali en offrant des opportunités de formation, de compétition et de développement personnel à tous les niveaux.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-academic-cap" class="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Formation</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Programmes de formation pour athlètes, entraîneurs et arbitres de tous niveaux.
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Compétitions</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Organisation de tournois nationaux et participation aux compétitions internationales.
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-users" class="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Communauté</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Rassembler la communauté du Taekwondo malien et promouvoir les valeurs du sport.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or logic needed for now
</script> 