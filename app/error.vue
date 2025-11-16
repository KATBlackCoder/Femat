<template>
  <NuxtLayout>
    <div class="min-h-[calc(100vh-var(--ui-header-height))] flex flex-col items-center justify-center">
      <UError 
        :error="formattedError"
        redirect="/"
        :clear="false"
        :ui="{
          root: 'w-full',
          statusCode: 'text-base font-semibold text-primary',
          statusMessage: 'mt-2 text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 text-balance',
          message: 'mt-4 text-lg text-neutral-600 dark:text-neutral-400 text-balance max-w-2xl',
          links: 'mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'
        }"
      >
        <!-- Slot statusCode avec badge -->
        <template #statusCode>
          <UBadge 
            :color="getErrorBadgeColor(formattedError.statusCode)"
            variant="subtle" 
            size="lg"
            class="mb-4"
          >
            Erreur {{ formattedError.statusCode }}
          </UBadge>
        </template>

        <!-- Slot statusMessage avec icône -->
        <template #statusMessage>
          <div class="flex flex-col items-center gap-4">
            <div class="relative">
              <div class="absolute inset-0 rounded-full bg-error-200/50 blur-xl dark:bg-error-900/30"></div>
              <div
                class="relative h-24 w-24 md:h-32 md:w-32 flex items-center justify-center bg-error-100 dark:bg-error-900/50 rounded-full"
              >
                <UIcon
                  :name="getErrorIcon(formattedError.statusCode)"
                  class="w-12 h-12 md:w-16 md:h-16 text-error-600 dark:text-error-400"
                  aria-hidden="true"
                />
              </div>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 text-balance">
              {{ formattedError.statusMessage }}
            </h1>
          </div>
        </template>

        <!-- Slot message -->
        <template #message>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 text-balance max-w-2xl mx-auto">
            {{ formattedError.message }}
          </p>
        </template>

        <!-- Slot links avec boutons améliorés -->
        <template #links>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <UButton
              to="/"
              color="primary"
              size="xl"
              icon="i-heroicons-home"
              trailing
            >
              Retour à l'accueil
            </UButton>
            <UButton
              to="/contact"
              color="neutral"
              variant="ghost"
              size="xl"
              icon="i-heroicons-envelope"
            >
              Nous contacter
            </UButton>
          </div>
        </template>

        <!-- Slot default pour contenu supplémentaire -->
        <template #default>
          <div class="mt-12 w-full max-w-4xl">
            <UCard class="relative overflow-hidden border-0 shadow-xl">
              <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-3xl -z-10 dark:from-primary-900/10 dark:to-secondary-900/10"></div>

              <div class="relative p-8 sm:p-12">
                <h2 class="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                  Que faire maintenant ?
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex items-start gap-4">
                    <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                      <UIcon name="i-heroicons-home" class="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                        Retour à l'accueil
                      </h3>
                      <p class="text-neutral-600 dark:text-neutral-400">
                        Retournez à la page d'accueil pour naviguer sur le site.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0">
                      <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
                        Nous contacter
                      </h3>
                      <p class="text-neutral-600 dark:text-neutral-400">
                        Contactez-nous si vous rencontrez des problèmes persistants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </UError>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

// Formater l'erreur avec des messages en français
const formattedError = computed(() => {
  const statusCode = props.error?.statusCode || 500
  let statusMessage = props.error?.statusMessage
  let message = props.error?.message

  // Messages personnalisés en français selon le code d'erreur
  switch (statusCode) {
    case 404:
      statusMessage = statusMessage || 'Page non trouvée'
      message = message || 'La page que vous recherchez n\'existe pas ou a été déplacée. Vérifiez l\'URL ou retournez à l\'accueil.'
      break
    case 403:
      statusMessage = statusMessage || 'Accès interdit'
      message = message || 'Vous n\'avez pas l\'autorisation d\'accéder à cette page.'
      break
    case 500:
      statusMessage = statusMessage || 'Erreur serveur'
      message = message || 'Une erreur interne du serveur s\'est produite. Notre équipe a été notifiée et travaille à résoudre le problème.'
      break
    default:
      statusMessage = statusMessage || 'Une erreur est survenue'
      message = message || 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.'
  }

  return {
    statusCode,
    statusMessage,
    message
  }
})

// Obtenir la couleur du badge selon le code d'erreur
function getErrorBadgeColor(statusCode: number): 'primary' | 'secondary' | 'error' | 'warning' {
  switch (statusCode) {
    case 404:
      return 'primary'
    case 403:
      return 'warning'
    case 500:
      return 'error'
    default:
      return 'error'
  }
}

// Obtenir l'icône selon le code d'erreur
function getErrorIcon(statusCode: number): string {
  switch (statusCode) {
    case 404:
      return 'i-heroicons-magnifying-glass'
    case 403:
      return 'i-heroicons-lock-closed'
    case 500:
      return 'i-heroicons-exclamation-triangle'
    default:
      return 'i-heroicons-exclamation-triangle'
  }
}

// SEO pour la page d'erreur
useSeoMeta({
  title: `${formattedError.value.statusMessage} - FEMAT`,
  description: formattedError.value.message,
  robots: 'noindex, nofollow' // Ne pas indexer les pages d'erreur
})
</script>
