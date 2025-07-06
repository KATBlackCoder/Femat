<template>
  <UNavigationMenu collapsed :items="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  { label: 'Accueil', to: '/', icon: 'i-lucide-home' },
  { label: 'À propos', to: '/about', icon: 'i-lucide-info' },
  { label: 'Actualités', to: '/news', icon: 'i-lucide-newspaper' },
  { label: 'Événements', to: '/events', icon: 'i-lucide-calendar' },
  { label: 'Athlètes', to: '/athletes', icon: 'i-lucide-user' },
  { label: 'Clubs', to: '/clubs', icon: 'i-lucide-users' },
  { label: 'Galerie', to: '/gallery', icon: 'i-lucide-image' },
  { label: 'Contact', to: '/contact', icon: 'i-lucide-mail' }
])
</script>

<style>

</style>