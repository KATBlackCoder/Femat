<template>
  <UFooter>
    <template #left>
      <!-- Logo et informations FEMAT -->
      <div class="flex items-center space-x-3">
        <NuxtImg 
          src="/logo_femat.webp" 
          alt="Logo FEMAT" 
          width="32" 
          height="32"
          class="rounded-lg"
        />
        <div>
          <h3 class="font-bold text-mali-500">FEMAT</h3>
          <p class="text-sm text-gray-600">Fédération Malienne de Taekwondo</p>
        </div>
      </div>
    </template>

    <template #center>
      <!-- Liens rapides -->
      <div class="flex flex-wrap justify-center gap-6 text-sm">
        <NuxtLink to="/about" class="text-gray-600 hover:text-mali-500 transition-colors">
          À propos
        </NuxtLink>
        <NuxtLink to="/contact" class="text-gray-600 hover:text-mali-500 transition-colors">
          Contact
        </NuxtLink>
      </div>
    </template>

    <template #right>
      <!-- Informations de contact -->
      <div class="text-sm text-gray-600 space-y-1">
        <p>📧 contact@femat.ml</p>
        <p>📍 Bamako, Mali</p>
      </div>
    </template>

    <template #bottom>
      <!-- Barre de copyright -->
      <div class="border-t pt-4 mt-6">
        <div class="text-center">
          <p class="text-sm text-gray-600">
            © {{ currentYear }} FEMAT - Fédération Malienne de Taekwondo. Tous droits réservés.
          </p>
          <p class="text-sm text-gray-500 mt-2">
            Fait avec ❤️ au Mali 🇲🇱
          </p>
        </div>
      </div>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
