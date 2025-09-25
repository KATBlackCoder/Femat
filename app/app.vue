<template>
  <UApp>
    <UHeader />
    
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    
    <UFooter />
  </UApp>
</template>

<script setup lang="ts">
// Configuration globale de l'application
useHead({
  titleTemplate: '%s - FEMAT',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Fédération Malienne de Taekwondo - Site officiel de la FEMAT' },
    { name: 'keywords', content: 'taekwondo, mali, fédération, sport, martial arts, FEMAT' },
    { name: 'author', content: 'FEMAT' },
    { name: 'robots', content: 'index, follow' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ]
})
</script>
