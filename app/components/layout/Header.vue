<template>
  <UHeader>
    <template #left>
      <!-- Logo FEMAT -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <NuxtImg 
          src="/logo_femat.webp" 
          alt="Logo FEMAT" 
          width="40" 
          height="40"
          class="rounded-lg"
        />
        <div class="hidden sm:block">
          <h1 class="text-xl font-bold text-mali-500">FEMAT</h1>
          <p class="text-xs text-gray-600">Fédération Malienne de Taekwondo</p>
        </div>
      </NuxtLink>
    </template>

    <template #right>
      <!-- Navigation principale -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLink to="/" class="text-gray-700 hover:text-mali-500 transition-colors">
          Accueil
        </NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-mali-500 transition-colors">
          À propos
        </NuxtLink>
        <NuxtLink to="/contact" class="text-gray-700 hover:text-mali-500 transition-colors">
          Contact
        </NuxtLink>
      </nav>
    </template>
  </UHeader>
</template>
