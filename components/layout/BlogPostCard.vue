<template>
  <UCard class="flex flex-col h-full">
    <NuxtLink :to="link" class="block">
      <NuxtImg
        v-if="image"
        :src="image"
        alt=""
        class="w-full h-48 object-cover rounded-t-md"
        format="webp"
        loading="lazy"
      />
    </NuxtLink>
    <div class="flex-1 flex flex-col p-4">
      <NuxtLink :to="link" class="text-lg font-semibold text-primary hover:underline line-clamp-2">
        {{ title }}
      </NuxtLink>
      <p class="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{{ excerpt }}</p>
      <div class="mt-auto flex items-center justify-between pt-4">
        <span class="text-xs text-gray-400">{{ date }}</span>
        <NuxtLink :to="link" class="text-primary text-xs font-medium hover:underline">
          {{ $t('common.read_more') }}
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Untitled Post' },
  excerpt: { type: String, default: 'No excerpt available.' },
  image: { type: String, default: '' },
  date: { type: String, default: '—' },
  link: { type: String, default: '#' }
})
</script> 