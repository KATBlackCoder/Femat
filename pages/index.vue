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
        <h2 class="text-2xl md:text-3xl text-center font-bold text-primary mb-4">{{ $t('nav.gallery') }}</h2>
      </template>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1">
          <CarouselSection :title="$t('home.gallery.presidents')" :items="presidentsImages" />
        </div>
        <div class="flex-1">
          <CarouselSection :title="$t('home.gallery.partners')" :items="partnersImages" :width="200" :height="200" />
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

const { t } = useI18n()

// Presidents Images - now using direct paths from /public
const presidentsImages = [
  { src: '/images/presidents/1.jpg', width: 300, height: 400 },
  '/images/presidents/2.jpg',
  '/images/presidents/3.png'
]

// Partners Images - now using direct paths from /public
const partnersImages = [
  '/images/partners/pa1.png',
  '/images/partners/pa2.png',
  '/images/partners/pa3.png',
  { src: '/images/partners/pa4.png', width: 300, height: 200 },
  { src: '/images/partners/pa5.png', width: 500, height: 200 },
  { src: '/images/partners/pa6.jpg', width: 430, height: 260 }
]

// SEO Meta tags
useSeoMeta({
  title: t('nav.home')
})
</script>

<style>

</style>