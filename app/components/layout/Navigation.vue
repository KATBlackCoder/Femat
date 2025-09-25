<template>
  <nav :class="mobile ? 'flex flex-col space-y-2' : 'hidden lg:flex lg:items-center lg:space-x-6'">
    <!-- Liens de navigation -->
    <NuxtLink 
      to="/" 
      class="nav-link"
      :class="mobile ? 'block py-2 px-4 rounded-lg hover:bg-gray-100' : 'nav-link-desktop'"
    >
      Accueil
    </NuxtLink>
    
    <NuxtLink 
      to="/about" 
      class="nav-link"
      :class="mobile ? 'block py-2 px-4 rounded-lg hover:bg-gray-100' : 'nav-link-desktop'"
    >
      À propos
    </NuxtLink>
    
    <NuxtLink 
      to="/news" 
      class="nav-link"
      :class="mobile ? 'block py-2 px-4 rounded-lg hover:bg-gray-100' : 'nav-link-desktop'"
    >
      Actualités
    </NuxtLink>
    
    <NuxtLink 
      to="/events" 
      class="nav-link"
      :class="mobile ? 'block py-2 px-4 rounded-lg hover:bg-gray-100' : 'nav-link-desktop'"
    >
      Événements
    </NuxtLink>
    
    <NuxtLink 
      to="/gallery" 
      class="nav-link"
      :class="mobile ? 'block py-2 px-4 rounded-lg hover:bg-gray-100' : 'nav-link-desktop'"
    >
      Galerie
    </NuxtLink>
    
    <NuxtLink 
      to="/contact" 
      class="nav-link"
      :class="mobile ? 'block py-2 px-4 rounded-lg hover:bg-gray-100' : 'nav-link-desktop'"
    >
      Contact
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  mobile?: boolean
}

defineProps<Props>()

const route = useRoute()

// Classe pour les liens actifs
const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-mali-green transition-colors duration-200 font-medium;
}

.nav-link-desktop {
  @apply px-3 py-2 rounded-md text-sm;
}

.nav-link.router-link-active {
  @apply text-mali-green font-semibold;
}

.nav-link:hover {
  @apply text-mali-green;
}
</style>
