<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-mali-gradient py-16 md:py-24">
      <UContainer>
        <div class="text-center text-white">
          <div class="flex justify-center mb-8">
            <NuxtImg 
              src="/logo_femat.webp" 
              alt="Logo FEMAT" 
              width="120" 
              height="120"
              class="rounded-lg shadow-2xl"
            />
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            Fédération Malienne de Taekwondo
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Excellence • Respect • Discipline
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton size="lg" color="primary" variant="solid" class="text-white">
              Découvrir la FEMAT
            </UButton>
            <UButton size="lg" color="primary" variant="outline" class="text-white border-white">
              Nos Événements
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Section Actualités -->
    <section class="py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-mali-green mb-4">
            Actualités
          </h2>
          <p class="text-lg text-gray-600">
            Restez informé des dernières nouvelles de la FEMAT
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard v-for="i in 3" :key="i" class="hover:shadow-lg transition-shadow">
            <template #header>
              <h3 class="text-lg font-semibold">Actualité {{ i }}</h3>
            </template>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <template #footer>
              <UButton color="primary" variant="ghost" size="sm">
                Lire la suite
              </UButton>
            </template>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Section Événements -->
    <section class="py-16 bg-gray-50">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-mali-green mb-4">
            Prochains Événements
          </h2>
          <p class="text-lg text-gray-600">
            Compétitions, stages et formations
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard v-for="i in 2" :key="i" class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">Événement {{ i }}</h3>
                <UBadge color="warning">Prochain</UBadge>
              </div>
            </template>
            <p class="text-gray-600 mb-4">
              Description de l'événement avec tous les détails importants.
            </p>
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <UIcon name="i-heroicons-calendar" class="mr-2" />
              <span>15 Janvier 2024</span>
              <UIcon name="i-heroicons-map-pin" class="ml-4 mr-2" />
              <span>Bamako, Mali</span>
            </div>
            <template #footer>
              <UButton color="primary" variant="solid" size="sm">
                S'inscrire
              </UButton>
            </template>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Section Test des composants (pour développement) -->
    <section class="py-16" v-if="showDevSection">
      <UContainer>
        <UCard>
          <template #header>
            <h2 class="text-2xl font-bold text-center">Test Composants NuxtUI v4</h2>
          </template>
          
          <div class="space-y-6">
            <!-- Test des boutons avec thème FEMAT -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Boutons - Thème FEMAT</h3>
              <div class="flex flex-wrap gap-2">
                <UButton color="primary" variant="solid">Primary</UButton>
                <UButton color="success" variant="outline">Success</UButton>
                <UButton color="error" variant="ghost">Error</UButton>
                <UButton color="warning" variant="soft">Warning</UButton>
              </div>
            </div>

            <!-- Test des badges -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Badges</h3>
              <div class="flex flex-wrap gap-2">
                <UBadge color="primary">Primary</UBadge>
                <UBadge color="success">Success</UBadge>
                <UBadge color="error">Error</UBadge>
                <UBadge color="warning">Warning</UBadge>
              </div>
            </div>

            <!-- Test des alertes -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Alertes</h3>
              <div class="space-y-2">
                <UAlert color="info" title="Information" description="Message d'information" />
                <UAlert color="success" title="Succès" description="Opération réussie" />
                <UAlert color="error" title="Erreur" description="Une erreur s'est produite" />
                <UAlert color="warning" title="Attention" description="Message d'avertissement" />
              </div>
            </div>
          </div>
        </UCard>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
// Configuration de la page
useHead({
  title: 'Accueil',
  meta: [
    { name: 'description', content: 'Site officiel de la Fédération Malienne de Taekwondo - FEMAT' }
  ]
})

// Section de développement (masquée en production)
const showDevSection = ref(false)

// Toggle pour afficher la section de développement
const toggleDevSection = () => {
  showDevSection.value = !showDevSection.value
}
</script>
