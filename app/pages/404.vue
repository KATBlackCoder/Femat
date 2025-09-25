<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UContainer>
      <div class="text-center">
        <!-- Logo FEMAT -->
        <div class="flex justify-center mb-8">
          <NuxtImg 
            src="/logo_femat.webp" 
            alt="Logo FEMAT" 
            width="120" 
            height="120"
            class="rounded-lg shadow-lg"
          />
        </div>
        
        <!-- Message 404 -->
        <h1 class="text-6xl font-bold text-mali-green mb-4">
          404
        </h1>
        
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Page non trouvée
        </h2>
        
        <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            color="primary" 
            size="lg"
            @click="navigateTo('/')"
          >
            Retour à l'accueil
          </UButton>
          
          <UButton 
            color="warning" 
            variant="outline" 
            size="lg"
            @click="$router.back()"
          >
            Page précédente
          </UButton>
        </div>
        
        <!-- Navigation rapide -->
        <div class="mt-12">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Pages populaires
          </h3>
          <div class="flex flex-wrap justify-center gap-2">
            <UButton 
              v-for="link in popularLinks" 
              :key="link.to"
              :to="link.to"
              color="neutral" 
              variant="ghost" 
              size="sm"
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>
        
        <!-- Gradient drapeau malien -->
        <div class="mt-12 h-2 bg-mali-gradient rounded-full max-w-md mx-auto"></div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// Configuration de la page
useHead({
  title: '404 - Page non trouvée - FEMAT',
  meta: [
    { name: 'description', content: 'Page non trouvée - Fédération Malienne de Taekwondo' }
  ]
})

// Liens populaires
const popularLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/news', label: 'Actualités' },
  { to: '/events', label: 'Événements' },
  { to: '/gallery', label: 'Galerie' },
  { to: '/contact', label: 'Contact' }
]
</script>
