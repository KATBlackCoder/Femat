<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/home/HeroSection.vue'
import FeaturesSection from '~/components/home/FeaturesSection.vue'
import CtaSection from '~/components/home/CtaSection.vue'
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