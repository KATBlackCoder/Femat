<template>
  <header
    class="top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95"
  >
    <UContainer>
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <UAvatar
            size="md"
            class="bg-gradient-to-br from-teal-500 to-emerald-600"
            :alt="'FEMAT Logo'"
          >
            <span class="text-white font-bold text-sm">F</span>
          </UAvatar>
          <span
            class="hidden font-bold text-gray-900 dark:text-white sm:inline-block"
          >
            FEMAT
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-2">
          <NavigationMenu />
        </nav>

        <!-- Right side: Language switcher and mobile menu -->
        <div class="flex items-center space-x-2">
          <LanguageSwitcher />
          <ColorModeButton /> 
          <!-- Mobile menu button -->
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-bars-3-20-solid"
            class="md:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <USlideover v-model="isMobileMenuOpen" side="left" class="md:hidden">
        <div class="p-4 space-y-2">
          <UButton
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            variant="link"
            color="neutral"
            block
            class="justify-start"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </UButton>
        </div>
      </USlideover>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/layout/LanguageSwitcher.vue";
import NavigationMenu from "@/components/navigation/NavigationMenu.vue";
import ColorModeButton from "@/components/layout/ColorModeButton.vue";

const isMobileMenuOpen = ref(false);

const navigationItems = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
  { name: "Actualités", href: "/news" },
  { name: "Événements", href: "/events" },
  { name: "Athlètes", href: "/athletes" },
  { name: "Clubs", href: "/clubs" },
  { name: "Galerie", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];
</script>
