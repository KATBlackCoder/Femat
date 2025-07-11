<template>
  <UCard as="article">
    <template #header>
      <NuxtLink :to="galleryLink" class="block">
        <NuxtImg
          :src="gallery.coverImage"
          :alt="gallery.title"
          width="400"
          height="250"
          class="w-full h-48 object-cover rounded-md"
          loading="lazy"
        />
      </NuxtLink>
    </template>

    <h3 class="text-xl font-bold text-primary">
      <NuxtLink :to="galleryLink" class="hover:underline">
        {{ gallery.title }}
      </NuxtLink>
    </h3>
    <p v-if="gallery.description" class="text-neutral-500 dark:text-neutral-400 mt-1">
      {{ gallery.description }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  gallery: {
    type: Object as PropType<{
      title: string
      description?: string
      coverImage: string
      path: string // Nuxt Content provides the path
    }>,
    required: true
  }
})

const localePath = useLocalePath()

const galleryLink = computed(() => {
  // The path from Nuxt Content is the full path to the file, e.g., /gallery/en/my-gallery
  // We want to extract the slug 'my-gallery' to build the correct link.
  const slug = props.gallery.path.split('/').pop()
  return localePath({ name: 'gallery-slug', params: { slug } })
})
</script> 