<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('home.cta.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {{ $t('home.cta.subtitle') }}
        </p>
        <UButton 
          :to="contactLink"
          size="lg" 
          color="primary"
          class="font-semibold"
        >
          {{ $t('home.cta.button') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useNavLinks } from '@/composables/useNavLinks'

const navLinks = useNavLinks()
const contactLink = navLinks.find(link => link.label === 'nav.contact')?.href
</script> 