<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <UMain class="flex-1">
      <slot />
    </UMain>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Layout principal avec Header et Footer
</script>