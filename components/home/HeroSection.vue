<template>
  <section class="bg-gradient-to-br from-teal-500 via-emerald-600 to-green-700 text-white">
    <div class="container mx-auto px-4 py-24">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Fédération Malienne de Taekwondo
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-teal-100">
          Promouvoir et développer le Taekwondo au Mali avec excellence et intégrité
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            to="/about" 
            size="lg" 
            variant="solid"
            class="font-semibold bg-white text-teal-600 hover:bg-gray-100"
          >
            Découvrir FEMAT
          </UButton>
          <UButton 
            to="/clubs" 
            size="lg" 
            variant="outline"
            class="font-semibold border-white text-white hover:bg-white hover:text-teal-600"
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