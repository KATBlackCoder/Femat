<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
// Layout is automatically available, no additional setup needed
</script>

<style>
/* Global styles can be added here if needed */
</style>