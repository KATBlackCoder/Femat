<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Rejoignez la famille FEMAT
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Que vous soyez débutant ou expert, jeune ou moins jeune, il y a une place pour vous dans notre communauté.
        </p>
        <UButton 
          to="/contact" 
          size="lg" 
          color="primary"
          class="font-semibold"
        >
          Nous contacter
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or logic needed for now
</script> 