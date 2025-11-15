<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <NuxtImg 
            src="/logo_femat.webp" 
            alt="Logo FEMAT" 
            class="h-12 w-12 object-contain"
            loading="eager"
            width="48"
            height="48"
            format="webp"
          />
          <span class="font-bold text-xl text-gray-900 dark:text-white">FEMAT</span>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          <NuxtLink 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Accueil
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            À propos
          </NuxtLink>
          <NuxtLink 
            to="/events" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Événements
          </NuxtLink>
          <NuxtLink 
            to="/calendar" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Calendrier
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Contact
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <UColorModeButton />
          
          <UButton
            to="https://www.facebook.com/taekwondomali"
            target="_blank"
            external
            color="primary"
            variant="ghost"
            icon="i-simple-icons-facebook"
            aria-label="Page Facebook FEMAT"
            class="hidden sm:flex"
          />
          
          <!-- Menu Mobile -->
          <UButton
            :icon="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            color="neutral"
            variant="ghost"
            class="md:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
          />
        </div>
      </div>

      <!-- Menu Mobile -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div 
          v-if="mobileMenuOpen" 
          id="mobile-menu"
          class="md:hidden border-t border-gray-200 dark:border-gray-800 py-4"
        >
          <nav class="flex flex-col gap-4" aria-label="Navigation principale">
            <NuxtLink 
              to="/" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Accueil
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              À propos
            </NuxtLink>
            <NuxtLink 
              to="/events" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Événements
            </NuxtLink>
            <NuxtLink 
              to="/calendar" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Calendrier
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Contact
            </NuxtLink>
            <UButton
              to="https://www.facebook.com/taekwondomali"
              target="_blank"
              external
              color="primary"
              variant="ghost"
              icon="i-simple-icons-facebook"
              class="justify-start"
              @click="mobileMenuOpen = false"
            >
              Facebook
            </UButton>
          </nav>
        </div>
      </Transition>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>

