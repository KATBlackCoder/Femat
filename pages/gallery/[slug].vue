<template>
  <UContainer class="py-12">
    <div v-if="gallery">
      <NuxtLink :to="localePath('/gallery')" class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6">
        <UIcon name="i-heroicons-arrow-left" />
        {{ $t('gallery.back_to_galleries') }}
      </NuxtLink>

      <h1 class="text-3xl md:text-4xl font-bold text-primary mb-2">
        {{ gallery.title }}
      </h1>
      <p v-if="gallery.description" class="text-lg text-neutral-500 dark:text-neutral-400 mb-8">
        {{ gallery.description }}
      </p>

      <GalleryCarousel v-if="gallery.images" :items="gallery.images" />
    </div>

    <div v-else class="text-center py-12">
      <h1 class="text-3xl font-bold mb-4">{{ $t('gallery.gallery_not_found') }}</h1>
      <NuxtLink :to="localePath('/gallery')" class="text-primary hover:underline">
        {{ $t('gallery.back_to_galleries') }}
      </NuxtLink>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import GalleryCarousel from '~/components/content/GalleryCarousel.vue'

const { params } = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const fullPath = `/galleries/${locale.value}/${params.slug}`

const { data: gallery } = await useAsyncData(
  `gallery-${params.slug}-${locale.value}`,
  () => queryCollection('galleries').path(fullPath).first()
)

if (!gallery.value) {
  setResponseStatus(404)
}

useSeoMeta({
  title: () => gallery.value?.title || t('gallery.gallery_not_found'),
  description: () => gallery.value?.description || ''
})
</script> 