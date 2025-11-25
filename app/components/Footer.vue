<template>
  <footer class="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-auto">
    <UContainer>
      <div class="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo et description -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 mb-2">
            <NuxtImg 
              src="/logo_femat.avif" 
              alt="Logo FEMAT - Fédération Malienne de Taekwondo" 
              class="h-10 w-10 object-contain dark:bg-white dark:rounded-full dark:p-1"
              width="40"
              height="40"
              format="avif"
              :fallback="'/logo_femat.webp'"
            />
            <span class="font-bold text-lg">FEMAT</span>
          </div>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            Fédération Malienne de Taekwondo
          </p>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-2" aria-label="Navigation du footer">
          <h3 class="font-semibold text-sm mb-2">Navigation</h3>
          <div class="flex flex-col gap-1">
            <NuxtLink 
              to="/" 
              class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              Accueil
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              À propos
            </NuxtLink>
            <NuxtLink 
              to="/events" 
              class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              Événements
            </NuxtLink>
            <NuxtLink 
              to="/calendar" 
              class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              Calendrier
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              Blog
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
            >
              Contact
            </NuxtLink>
          </div>
        </nav>

        <!-- Contact -->
        <div class="flex flex-col gap-2">
          <h3 class="font-semibold text-sm mb-2">Contact</h3>
          <address class="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400 not-italic">
            <p>Bamako, Mali</p>
            <p>
              Email: 
              <a 
                href="mailto:femat3@yahoo.fr" 
                class="hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                femat3@yahoo.fr
              </a>
            </p>
            <p>
              Téléphone: 
              <a 
                href="tel:+22377551985" 
                class="hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                77551985 (Secrétaire Général)
              </a>
            </p>
          </address>
          <div class="flex gap-2 mt-2">
            <UButton
              to="https://www.facebook.com/taekwondomali"
              target="_blank"
              external
              color="primary"
              variant="ghost"
              icon="i-heroicons-share"
              aria-label="Page Facebook FEMAT"
            />
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
        © {{ currentYear }} FEMAT - Fédération Malienne de Taekwondo. Tous droits réservés.
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

