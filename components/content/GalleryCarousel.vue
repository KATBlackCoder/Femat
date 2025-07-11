<template>
  <UCarousel
    v-if="items && items.length"
    v-slot="{ item }"
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'rounded-lg',
    }"
    arrows
    class="w-full max-w-4xl mx-auto"
  >
    <div class="relative">
      <NuxtImg
        :src="item.src"
        :alt="item.alt"
        width="1024"
        height="768"
        class="w-full object-contain"
      />
      <div v-if="item.caption" class="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
        <p class="text-sm">{{ item.caption }}</p>
      </div>
    </div>
  </UCarousel>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

defineProps({
  items: {
    type: Array as PropType<GalleryImage[]>,
    required: true
  }
})
</script> 