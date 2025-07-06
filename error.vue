<template>
  <div class="flex flex-col min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
    <UCard class="max-w-md w-full text-center p-8">
      <div class="flex flex-col items-center gap-4">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 text-error" />
        <h1 class="text-4xl font-bold text-error">{{ error.statusCode || 500 }}</h1>
        <p class="text-lg text-neutral-700 dark:text-neutral-200 mb-4">
          {{ error.message || 'Une erreur est survenue. Veuillez réessayer plus tard.' }}
        </p>
        <UButton to="/" color="primary" size="lg" icon="i-heroicons-home">
          Retour à l'accueil
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
const { error } = defineProps<{ error: NuxtError }>()
</script> 