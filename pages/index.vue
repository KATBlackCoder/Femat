<template>
  <UContainer class="py-8">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <div class="mb-8">
      <FeaturesSection />
    </div>

    <!-- Carousel Sections Side by Side -->
    <UCard class="mb-8">
      <template #header>
        <h2 class="text-2xl md:text-3xl font-bold text-primary mb-4">Galeries</h2>
      </template>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1">
          <CarouselSection title="Nos Présidents" :items="presidentsImages" />
        </div>
        <div class="flex-1">
          <CarouselSection title="Nos Partenaires" />
        </div>
      </div>
    </UCard>

    <!-- CTA Section -->
    <CtaSection />
  </UContainer>
</template>

<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import FeaturesSection from '~/components/home/FeaturesSection.vue'
import CtaSection from '~/components/home/CtaSection.vue'
import CarouselSection from '~/components/layout/CarouselSection.vue'

// Presidents Images
const presidentsImageModules = import.meta.glob('~/assets/images/presidents/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
// Map to relative paths for Nuxt Image (strip '/_nuxt/assets/images/')
const presidentsImages = (Object.values(presidentsImageModules) as string[]).map((url) => {
  const match = url.match(/\/assets\/images\/(.*)$/)
  return match ? match[1] : url
})

// Partners Images
//const partnersImageModules = import.meta.glob('~/assets/images/partners/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
//const partnersImages = Object.values(partnersImageModules).map((url: string) => {
//  const match = url.match(/\/assets\/images\/(.*)$/)
//  return match ? match[1] : url
//})

// SEO Meta tags
useSeoMeta({
  title: 'FEMAT - Fédération Malienne de Taekwondo',
  description: 'Site officiel de la Fédération Malienne de Taekwondo. Découvrez les actualités, événements, athlètes et clubs de Taekwondo au Mali.',
  ogTitle: 'FEMAT - Fédération Malienne de Taekwondo',
  ogDescription: 'Site officiel de la Fédération Malienne de Taekwondo. Découvrez les actualités, événements, athlètes et clubs de Taekwondo au Mali.',
  ogType: 'website'
})
</script>

<style>

</style>