<template>
  <header
    class="top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95"
  >
    <UContainer>
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center space-x-2">
          <NuxtImg
            src="/femat.jpg"
            alt="FEMAT Logo"
            width="40"
            height="40"
            class="rounded-full object-cover"
            format="webp"
            loading="lazy"
          />
          <span
            class="hidden font-bold text-gray-900 dark:text-white sm:inline-block"
          >
            FEMAT
          </span>
        </NuxtLink>

        <!-- Navigation (Nuxt UI handles responsiveness) -->
        <nav class="flex-1 flex justify-center">
          <NavigationMenu />
        </nav>

        <!-- Right side: Language switcher and color mode -->
        <div class="flex items-center space-x-2">
          <LanguageSwitcher />
          <ColorModeButton /> 
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/layout/LanguageSwitcher.vue";
import NavigationMenu from "@/components/navigation/NavigationMenu.vue";
import ColorModeButton from "@/components/layout/ColorModeButton.vue";
import { useLocalePath } from '#imports'

const localePath = useLocalePath()
</script>
