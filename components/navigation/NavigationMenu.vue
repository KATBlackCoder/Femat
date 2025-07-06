<template>
  <UNavigationMenu :items="items" class="w-full justify-center" />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/about' },
  { label: 'Actualités', to: '/news' },
  { label: 'Événements', to: '/events' },
  { label: 'Athlètes', to: '/athletes' },
  { label: 'Clubs', to: '/clubs' },
  { label: 'Galerie', to: '/gallery' },
  { label: 'Contact', to: '/contact' }
])
</script>

<style>

</style>