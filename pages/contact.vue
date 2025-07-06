<template>
  <UContainer class="py-12">
    <h1 class="text-3xl md:text-4xl font-bold mb-4 text-primary">Contact Us</h1>
    <UCard class="mb-8">
      <template #header>
        <h2 class="text-xl font-bold text-primary">Thank you for contacting FEMAT</h2>
      </template>
      <p class="text-muted mb-2">At FEMAT, we're here to support all of our members. Whether you have questions about membership, events, training programs, or anything else, we'd love to hear from you.</p>
    </UCard>
    <div class="grid md:grid-cols-2 gap-8 mb-10">
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold text-primary">Get in Touch</h3>
        </template>
        <div class="space-y-2">
          <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Mailing Address:</span> 123, Bamako, Mali</p>
          <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Physical Address:</span> 456, Bamako, Mali</p>
          <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Email:</span> info@femat.ml</p>
          <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Phone:</span> +223 1234 5678</p>
        </div>
        <p class="mt-4 text-muted">Stay connected and follow us on social media for updates, events, and highlights.</p>
        <div class="flex gap-4 mt-2">
          <UButton to="#" color="primary" variant="subtle" class="px-4">Facebook</UButton>
          <UButton to="#" color="primary" variant="subtle" class="px-4">Instagram</UButton>
        </div>
      </UCard>
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold text-primary">FEMAT Staff Directory</h3>
        </template>
        <ul class="space-y-2">
          <li>
            <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">President:</span> Moussa Traoré — <a href="mailto:president@femat.ml" class="text-primary hover:underline">president@femat.ml</a></p>
          </li>
          <li>
            <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Secretary General:</span> Fatoumata Koné — <a href="mailto:secretary@femat.ml" class="text-primary hover:underline">secretary@femat.ml</a></p>
          </li>
          <li>
            <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Technical Director:</span> Amadou Diarra — <a href="mailto:tech@femat.ml" class="text-primary hover:underline">tech@femat.ml</a></p>
          </li>
          <li>
            <p class="text-neutral-700 dark:text-neutral-300"><span class="font-semibold">Media & Communications:</span> Mariam Coulibaly — <a href="mailto:media@femat.ml" class="text-primary hover:underline">media@femat.ml</a></p>
          </li>
        </ul>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// No form import needed
</script> 