<template>
  <UNavigationMenu collapsed :items="items" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useLocalePath } from '#imports'
import { useNavLinks } from '@/composables/useNavLinks'

const { t } = useI18n()
const localePath = useLocalePath()
const items = computed(() =>
  useNavLinks()
    .filter(link => !['nav.privacy', 'nav.terms'].includes(link.label))
    .map(link => ({
      label: t(link.label),
      to: localePath(link.href),
      icon: link.icon
    }))
)
</script>

<style>

</style>