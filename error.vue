<template>
  <AppHeader />
  <div class="flex flex-col min-h-[70vh] items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 py-16">
    <UContainer class="w-full text-center p-10 shadow-xl border-0">
      <div class="flex flex-col items-center gap-6">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-20 h-20 text-error" />
        <h1 class="text-6xl font-extrabold text-error">{{ error.statusCode || 404 }}</h1>
        <h2 class="text-2xl font-bold text-highlighted">{{ $t('error.title') }}</h2>
        <p class="text-lg text-muted text-balance">
          {{ $t('error.message') }}
        </p>
        <UButton
          size="xl"
          color="primary"
          class="mt-6 w-full sm:w-auto"
          :to="localePath('/')"
        >
          {{ $t('error.back_home') }}
        </UButton>
      </div>
    </UContainer>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useLocalePath } from '#imports'
const { error } = defineProps<{ error: NuxtError }>()
const localePath = useLocalePath()
</script> 