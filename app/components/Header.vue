<template>
  <header class="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <NuxtImg 
            src="/logo_femat.avif" 
            alt="Logo FEMAT - Fédération Malienne de Taekwondo" 
            class="h-12 w-12 object-contain dark:bg-white dark:rounded-full dark:p-1"
            loading="eager"
            width="48"
            height="48"
            format="avif"
            :fallback="'/logo_femat.webp'"
          />
          <span class="font-bold text-xl text-neutral-900 dark:text-neutral-100">FEMAT</span>
        </NuxtLink>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          <NuxtLink 
            to="/" 
            class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Accueil
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            À propos
          </NuxtLink>
          <NuxtLink 
            to="/events" 
            class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Événements
          </NuxtLink>
          <NuxtLink 
            to="/calendar" 
            class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Calendrier
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium"
            active-class="text-primary"
          >
            Contact
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <UColorModeButton />
          
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
          class="md:hidden border-t border-neutral-200 dark:border-neutral-800 py-4"
        >
          <nav class="flex flex-col gap-4" aria-label="Navigation principale">
            <NuxtLink 
              to="/" 
              class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Accueil
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              À propos
            </NuxtLink>
            <NuxtLink 
              to="/events" 
              class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Événements
            </NuxtLink>
            <NuxtLink 
              to="/calendar" 
              class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Calendrier
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Blog
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors font-medium py-1"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
            >
              Contact
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>

