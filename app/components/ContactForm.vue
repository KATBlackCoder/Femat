<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    <!-- Section Informations personnelles -->
    <div class="space-y-6">
      <div class="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <UIcon name="i-heroicons-user-circle" class="w-5 h-5 text-primary" />
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Informations personnelles</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField 
          label="Nom" 
          required
          :error="form.nom && !form.nom.trim() ? 'Le nom est requis' : false"
          size="lg"
        >
          <UInput 
            v-model="form.nom" 
            placeholder="Votre nom"
            icon="i-heroicons-user"
            size="lg"
            required
            :disabled="isSubmitting"
          />
        </UFormField>
        
        <UFormField 
          label="Prénom"
          size="lg"
        >
          <UInput 
            v-model="form.prenom" 
            placeholder="Votre prénom"
            icon="i-heroicons-user"
            size="lg"
            :disabled="isSubmitting"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField 
          label="Email" 
          required
          :error="form.email && !isValidEmail(form.email) ? 'Email invalide' : false"
          size="lg"
        >
          <UInput 
            v-model="form.email" 
            type="email"
            placeholder="votre@email.com"
            icon="i-heroicons-envelope"
            size="lg"
            required
            :disabled="isSubmitting"
          />
        </UFormField>
        
        <UFormField 
          label="Téléphone"
          size="lg"
        >
          <UInput 
            v-model="form.telephone" 
            type="tel"
            placeholder="+223 XX XX XX XX"
            icon="i-heroicons-phone"
            size="lg"
            :disabled="isSubmitting"
          />
        </UFormField>
      </div>
    </div>

    <!-- Section Message -->
    <div class="space-y-6">
      <div class="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 text-primary" />
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Votre message</h3>
      </div>

      <UFormField 
        label="Sujet" 
        required
        :error="form.sujet === '' && hasAttemptedSubmit ? 'Veuillez sélectionner un sujet' : false"
        size="lg"
      >
        <USelect
          v-model="form.sujet"
          :items="sujetOptions"
          placeholder="Sélectionnez un sujet"
          icon="i-heroicons-tag"
          size="lg"
          required
          :disabled="isSubmitting"
        />
      </UFormField>

      <UFormField 
        label="Message" 
        required
        :error="getMessageError() || false"
        size="lg"
      >
        <UTextarea
          v-model="form.message"
          placeholder="Décrivez votre demande ou question en détail..."
          :rows="6"
          size="lg"
          required
          :minlength="10"
          :maxlength="1000"
          :disabled="isSubmitting"
          class="resize-none"
        />
        
        <!-- Compteur de caractères avec barre de progression -->
        <template #help>
          <div class="mt-2 space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span 
                :class="[
                  'transition-colors',
                  form.message.length > 1000 ? 'text-error' : 
                  form.message.length > 900 ? 'text-warning' : 
                  'text-neutral-500 dark:text-neutral-400'
                ]"
              >
                {{ form.message.length }}/1000 caractères
              </span>
              <span 
                v-if="form.message.length < 10 && form.message.length > 0"
                class="text-warning text-sm"
              >
                Minimum 10 caractères requis
              </span>
            </div>
            <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
              <div 
                :class="[
                  'h-full transition-all duration-300 rounded-full',
                  form.message.length > 1000 ? 'bg-error' :
                  form.message.length > 900 ? 'bg-warning' :
                  'bg-primary'
                ]"
                :style="{ width: `${Math.min((form.message.length / 1000) * 100, 100)}%` }"
              />
            </div>
          </div>
        </template>
      </UFormField>
    </div>

    <!-- Honeypot field pour protection anti-spam -->
    <input 
      v-model="form.honeypot" 
      type="text" 
      name="website" 
      style="display: none;"
      tabindex="-1"
      autocomplete="off"
    />

    <!-- Bouton de soumission -->
    <div class="pt-4">
      <UButton 
        type="submit" 
        color="primary" 
        size="xl" 
        block
        :loading="isSubmitting"
        :disabled="true"
        icon="i-heroicons-paper-airplane"
        trailing
        class="font-semibold"
      >
        Envoyer le message
      </UButton>
      
      <p class="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-3">
        Le formulaire est temporairement désactivé. Veuillez nous contacter directement par email à <a href="mailto:femat3@yahoo.fr" class="text-primary hover:underline">femat3@yahoo.fr</a> ou par téléphone au <a href="tel:+22377551985" class="text-primary hover:underline">77551985</a>.
      </p>
    </div>

    <!-- Messages d'alerte -->
    <UAlert
      v-if="submitStatus"
      :color="submitStatus === 'success' ? 'success' : 'error'"
      :title="submitStatus === 'success' ? 'Message envoyé !' : 'Erreur lors de l\'envoi'"
      :description="submitMessage"
      :icon="submitStatus === 'success' ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-triangle'"
      variant="subtle"
      class="mt-4"
            :close-button="{ icon: 'i-heroicons-x-mark', color: 'neutral', variant: 'link', size: 'xs' }"
      @close="submitStatus = null"
    />
  </form>
</template>

<script setup lang="ts">
// Les composables Vue (ref, computed) sont auto-importés par Nuxt
const form = ref({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  sujet: '',
  message: '',
  honeypot: '' // Protection anti-spam
})

const isSubmitting = ref(false)
const submitStatus = ref<'success' | 'error' | null>(null)
const submitMessage = ref('')
const hasAttemptedSubmit = ref(false)

const sujetOptions = [
  { label: 'Général', value: 'general' },
  { label: 'Inscription', value: 'inscription' },
  { label: 'Événements', value: 'events' },
  { label: 'Autre', value: 'other' }
]

const isFormValid = computed(() => {
  return form.value.nom.trim() !== '' &&
         form.value.email.trim() !== '' &&
         isValidEmail(form.value.email) &&
         form.value.sujet !== '' &&
         form.value.message.trim().length >= 10 &&
         form.value.message.trim().length <= 1000 &&
         form.value.honeypot === '' // Honeypot doit être vide
})

function isValidEmail(email: string): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function getMessageError(): string | false {
  if (!form.value.message) return false
  if (form.value.message.trim().length < 10) {
    return 'Le message doit contenir au moins 10 caractères'
  }
  if (form.value.message.length > 1000) {
    return 'Le message ne peut pas dépasser 1000 caractères'
  }
  return false
}

async function handleSubmit() {
  // Formulaire temporairement désactivé
  return
}
</script>

