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
        
        <!-- Message d'erreur -->
        <h1 class="text-6xl font-bold text-mali-green mb-4">
          {{ error.statusCode || '500' }}
        </h1>
        
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          {{ error.statusMessage || 'Erreur interne du serveur' }}
        </h2>
        
        <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Une erreur s'est produite. Veuillez réessayer ou retourner à la page d'accueil.
        </p>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            color="primary" 
            size="lg" 
            @click="handleError"
          >
            Réessayer
          </UButton>
          
          <UButton 
            color="warning" 
            variant="outline" 
            size="lg"
            @click="navigateTo('/')"
          >
            Retour à l'accueil
          </UButton>
        </div>
        
        <!-- Gradient drapeau malien -->
        <div class="mt-12 h-2 bg-mali-gradient rounded-full max-w-md mx-auto"></div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
interface ErrorProps {
  statusCode?: number
  statusMessage?: string
}

const props = defineProps<ErrorProps>()

const error = computed(() => ({
  statusCode: props.statusCode || 500,
  statusMessage: props.statusMessage || 'Erreur interne du serveur'
}))

const handleError = () => {
  clearError({ redirect: '/' })
}

// Configuration de la page
useHead({
  title: `Erreur ${error.value.statusCode} - FEMAT`,
  meta: [
    { name: 'description', content: 'Page d\'erreur - Fédération Malienne de Taekwondo' }
  ]
})
</script>
