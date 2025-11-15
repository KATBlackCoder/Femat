<template>
  <div>
    <!-- Hero Section avec UPageHero -->
    <UPageHero
      title="Contactez-nous"
      description="Une question ? Une demande ? N'hésitez pas à nous contacter. Nous sommes là pour vous aider."
      :ui="{
        root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
        container: 'py-16 sm:py-20 lg:py-24'
      }"
    />

    <!-- Section Contact avec UPageSection -->
    <UPageSection
      headline="Contact"
      title="Informations de contact"
      description="Retrouvez toutes nos coordonnées et envoyez-nous un message via le formulaire de contact."
      :ui="{
        root: 'bg-white dark:bg-gray-900',
        container: 'py-12 sm:py-16 lg:py-20'
      }"
    >
      <template #body>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Informations de contact -->
          <UCard class="relative overflow-hidden border-0 shadow-xl">
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
            
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <UIcon name="i-heroicons-information-circle" class="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h2 class="text-2xl font-bold">Informations de contact</h2>
              </div>
            </template>
            
            <div class="space-y-6">
              <div class="group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Adresse</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 ml-11">Bamako, Mali</p>
              </div>

              <div class="group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-primary" aria-hidden="true" />
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
                    <UIcon name="i-heroicons-phone" class="w-5 h-5 text-primary" aria-hidden="true" />
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
                    <UIcon name="i-simple-icons-facebook" class="w-5 h-5 text-primary" aria-hidden="true" />
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
                    Suivez-nous sur Facebook
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Formulaire de contact -->
          <UCard class="relative overflow-hidden border-0 shadow-xl">
            <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>
            
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <UIcon name="i-heroicons-paper-airplane" class="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h2 class="text-2xl font-bold">Envoyez-nous un message</h2>
              </div>
            </template>
            
            <ContactForm />
          </UCard>
        </div>
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contact - FEMAT',
  description: 'Contactez la Fédération Malienne de Taekwondo. Adresse, téléphone, email et formulaire de contact.',
  ogTitle: 'Contact - FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Contactez la Fédération Malienne de Taekwondo. Adresse, téléphone, email et formulaire de contact.',
  ogImage: '/logo_femat.webp',
  twitterCard: 'summary_large_image'
})
</script>
