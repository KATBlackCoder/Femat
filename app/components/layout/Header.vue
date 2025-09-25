<template>
  <UHeader>
    <template #title>
      <!-- Logo FEMAT -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <NuxtImg 
          src="/logo_femat.webp" 
          alt="Logo FEMAT" 
          width="40" 
          height="40"
          class="rounded-lg"
        />
        <div class="hidden sm:block">
          <h1 class="text-xl font-bold text-primary">FEMAT</h1>
          <p class="text-xs text-gray-600 dark:text-gray-400">Fédération Malienne de Taekwondo</p>
        </div>
      </NuxtLink>
    </template>

    <!-- Navigation au centre (slot default) -->
    <UNavigationMenu :items="navigationItems" />

    <template #right>
      <!-- Boutons d'action -->
      <UButton
        color="primary"
        variant="ghost"
        to="/contact"
        icon="i-lucide-mail"
        aria-label="Contact"
      />
      <UButton
        color="primary"
        variant="ghost"
        to="/events"
        icon="i-lucide-calendar"
        aria-label="Événements"
      />
      <UColorModeButton />
    </template>

    <!-- Menu mobile (slot body) -->
    <template #body>
      <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// Éléments de navigation pour le header
const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Accueil',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'À propos',
    to: '/about',
    active: route.path.startsWith('/about')
  },
  {
    label: 'Événements',
    to: '/events',
    active: route.path.startsWith('/events')
  },
  {
    label: 'Actualités',
    to: '/news',
    active: route.path.startsWith('/news')
  },
  {
    label: 'Contact',
    to: '/contact',
    active: route.path.startsWith('/contact')
  }
])
</script>
