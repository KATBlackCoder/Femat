<template>
  <section class="bg-gradient-to-br from-teal-500 via-emerald-600 to-green-700 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
    <div class="container mx-auto px-4 py-24">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 text-highlighted dark:text-white">
          Fédération Malienne de Taekwondo
        </h1>
        <p class="text-xl text-white md:text-2xl mb-8 text-muted dark:text-teal-200">
          Promouvoir et développer le Taekwondo au Mali avec excellence et intégrité
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            to="/about" 
            size="lg" 
            variant="solid"
            color="primary"
            class="font-semibold"
          >
            Découvrir FEMAT
          </UButton>
          <UButton 
            to="/clubs" 
            size="lg" 
            variant="outline"
            color="neutral"
            class="font-semibold"
          >
            Trouver un club
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or logic needed for now
</script> 