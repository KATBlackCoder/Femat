<template>
  <section class="carousel-section py-12 bg-neutral-100 bg-white dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-neutral-900 dark:text-white text-center">
        {{ title }}
      </h2>
      <UCarousel v-slot="{ item }" :items="items" :loop="loop" :auto-scroll="autoScroll" class="w-full max-w-2xl mx-auto">
        <NuxtImg
          v-if="typeof item === 'string'"
          :src="item"
          :width="width"
          :height="height"
          class="rounded-lg object-cover mx-auto"
          loading="lazy"
        />
        <NuxtImg
          v-else
          :src="item.src"
          :width="item.width ?? width"
          :height="item.height ?? height"
          class="rounded-lg object-cover mx-auto"
          loading="lazy"
        />
      </UCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Props:
 * @prop title - Section title (default: 'Galerie d'images')
 * @prop items - Array of image URLs (string) or objects with src/width/height
 */
import type { PropType } from 'vue'

type CarouselImage = string | { src: string; width?: number; height?: number }

const props = defineProps({
  title: {
    type: String,
    default: 'Image Gallery'
  },
  items: {
    type: Array as PropType<CarouselImage[]>,
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
  },
  width: {
    type: Number,
    default: 640
  },
  height: {
    type: Number,
    default: 400
  }
})

const { title, items, loop, autoScroll, width, height } = props
</script> 