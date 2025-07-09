<template>
  <UContainer class="py-12">
    <h1 class="text-3xl text-center md:text-4xl font-bold mb-4 text-primary">{{ $t('contact.title') }}</h1>
    <UCard class="mb-8">
      <template #header>
        <h2 class="text-xl font-bold text-primary">
          {{ $t('contact.thank_you') }}
        </h2>
      </template>
      <p class="text-muted mb-2">
        {{ $t('contact.intro') }}
      </p>
    </UCard>
    <div class="grid md:grid-cols-2 gap-8 mb-10">
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold text-primary">{{ $t('contact.get_in_touch') }}</h3>
        </template>
        <div class="space-y-2">
          <p class="text-neutral-700 dark:text-neutral-300">
            <span class="font-semibold">{{ $t('contact.address_label') }}</span> {{ $t('contact.address') }}
          </p>
          <p class="text-neutral-700 dark:text-neutral-300">
            <span class="font-semibold">{{ $t('contact.email_label') }}</span> {{ $t('contact.email_value') }}
          </p>
          <p class="text-neutral-700 dark:text-neutral-300">
            <span class="font-semibold">{{ $t('contact.phone_label') }}</span> {{ $t('contact.phone_value') }}
          </p>
        </div>
        <p class="mt-4 text-muted">
          {{ $t('contact.stay_connected') }}
        </p>
        <div class="flex gap-4 mt-2">
          <UButton 
            :to="'https://www.facebook.com/taekwondomali'" 
            color="primary" 
            variant="subtle" 
            class="px-4"
            icon="i-simple-icons-facebook"
            target="_blank"
            rel="noopener"
          >{{ $t('contact.facebook') }}</UButton>
        </div>
      </UCard>
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold text-primary">{{ $t('contact.staff_directory') }}</h3>
        </template>
        <ul class="space-y-2">
          <li>
            <p class="text-neutral-700 dark:text-neutral-300">
              <span class="font-semibold">{{ $t('contact.president') }}</span> Alioune Badara Traoré
            </p>
          </li>
          <li>
            <p class="text-neutral-700 dark:text-neutral-300">
              <span class="font-semibold">{{ $t('contact.secretary') }}</span> Fatoumata
              Koné —
              <a
                href="mailto:secretary@femat.ml"
                class="text-primary hover:underline"
                >secretary@femat.ml</a
              >
            </p>
          </li>
          <li>
            <p class="text-neutral-700 dark:text-neutral-300">
              <span class="font-semibold">{{ $t('contact.technical_director') }}</span> Amadou
              Diarra —
              <a
                href="mailto:tech@femat.ml"
                class="text-primary hover:underline"
                >tech@femat.ml</a
              >
            </p>
          </li>
          <li>
            <p class="text-neutral-700 dark:text-neutral-300">
              <span class="font-semibold">{{ $t('contact.media') }}</span> Mariam
              Coulibaly —
              <a
                href="mailto:media@femat.ml"
                class="text-primary hover:underline"
                >media@femat.ml</a
              >
            </p>
          </li>
        </ul>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('nav.contact')
})
</script>
