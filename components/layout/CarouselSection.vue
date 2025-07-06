<template>
  <section class="carousel-section py-12 bg-neutral-100 dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-neutral-900 dark:text-white text-center">
        {{ title }}
      </h2>
      <UCarousel v-slot="{ item }" :items="items" :loop="loop" :auto-scroll="autoScroll" class="w-full max-w-2xl mx-auto">
        <NuxtImg :src="item" width="640" height="400" class="rounded-lg object-cover w-full h-64" loading="lazy" />
      </UCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Props:
 * @prop title - Section title (default: 'Galerie d\'images')
 * @prop items - Array of image URLs (default: demo images)
 */
const props = defineProps({
  title: {
    type: String,
    default: "Galerie d'images"
  },
  items: {
    type: Array as () => string[],
    default: () => [
      'https://picsum.photos/640/400?random=1',
      'https://picsum.photos/640/400?random=2',
      'https://picsum.photos/640/400?random=3',
      'https://picsum.photos/640/400?random=4',
      'https://picsum.photos/640/400?random=5',
      'https://picsum.photos/640/400?random=6'
    ]
  },
  loop: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  }
})

const { title, items, loop, autoScroll } = props
</script> 