<template>
  <UContainer class="py-12">
    <h1 class="text-3xl md:text-4xl font-bold text-primary mb-8">
      {{ $t('nav.gallery') }}
    </h1>

    <div v-if="galleries && galleries.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <GalleryCard
        v-for="gallery in galleries"
        :key="gallery.path"
        :gallery="gallery"
      />
    </div>
    <div v-else class="text-center text-neutral-500 dark:text-neutral-400 py-12">
      <p>{{ $t('gallery.no_galleries_found') }}</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

// Fetch documents from the 'galleries' collection, filtered by the current locale.
const { data: galleries } = await useAsyncData(
  `galleries-${locale.value}`,
  () => queryCollection('galleries')
    .where('path', 'LIKE', `/galleries/${locale.value}/%`)
    .all()
)

useSeoMeta({
  title: t('nav.gallery')
})
</script> 