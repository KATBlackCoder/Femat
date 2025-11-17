<template>
  <div class="space-y-6">
    <!-- Filtres par catégorie -->
    <div>
      <h3 class="text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
        Catégories
      </h3>
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="(label, category) in BLOG_CATEGORIES"
          :key="category"
          :color="activeCategory === category ? getCategoryColor(category) : 'neutral'"
          :variant="activeCategory === category ? 'solid' : 'outline'"
          size="sm"
          @click="handleCategoryClick(category)"
        >
          {{ label }}
          <UBadge
            v-if="categoryCounts && categoryCounts[category]"
            color="neutral"
            variant="subtle"
            size="xs"
            class="ml-2"
          >
            {{ categoryCounts[category] }}
          </UBadge>
        </UButton>
      </div>
    </div>

    <!-- Filtres par tags -->
    <div v-if="tags && tags.length > 0">
      <h3 class="text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
        Tags
      </h3>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in tags"
          :key="tag"
          :color="activeTags.includes(tag) ? 'primary' : 'neutral'"
          variant="subtle"
          size="sm"
          class="cursor-pointer hover:opacity-80 transition-opacity"
          @click="handleTagClick(tag)"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <!-- Bouton réinitialiser -->
    <div v-if="activeCategory || activeTags.length > 0" class="pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        @click="resetFilters"
        icon="i-heroicons-x-mark"
      >
        Réinitialiser les filtres
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogCategory } from '~/types/blog'
import { BLOG_CATEGORIES } from '~/types/blog'

const props = defineProps<{
  tags?: string[]
  categoryCounts?: Record<BlogCategory, number>
}>()

const emit = defineEmits<{
  'category-change': [category: BlogCategory | null]
  'tag-change': [tags: string[]]
  'reset': []
}>()

const activeCategory = ref<BlogCategory | null>(null)
const activeTags = ref<string[]>([])

function handleCategoryClick(category: BlogCategory) {
  if (activeCategory.value === category) {
    activeCategory.value = null
    emit('category-change', null)
  } else {
    activeCategory.value = category
    emit('category-change', category)
  }
}

function handleTagClick(tag: string) {
  const index = activeTags.value.indexOf(tag)
  if (index > -1) {
    activeTags.value.splice(index, 1)
  } else {
    activeTags.value.push(tag)
  }
  emit('tag-change', [...activeTags.value])
}

function resetFilters() {
  activeCategory.value = null
  activeTags.value = []
  emit('reset')
  emit('category-change', null)
  emit('tag-change', [])
}

function getCategoryColor(category: BlogCategory): 'primary' | 'secondary' | 'error' | 'warning' | 'success' {
  const colors: Record<BlogCategory, 'primary' | 'secondary' | 'error' | 'warning' | 'success'> = {
    competition: 'error',
    actualite: 'primary',
    resultat: 'success',
    evenement: 'secondary'
  }
  return colors[category] || 'primary'
}

// Exposer les méthodes pour utilisation externe si nécessaire
defineExpose({
  resetFilters,
  activeCategory,
  activeTags
})
</script>

