<template>
  <UBlogPost
    :id="`blog-${(post._path || (post as any).path || 'no-path')?.replace(/\//g, '-')}`"
    :title="post.title"
    :description="post.description || truncateText(post._body || '', 150)"
    :image="post.image && !imageError ? post.image : undefined"
    :date="post.date"
    :badge="{
      label: BLOG_CATEGORIES[post.category],
      color: getCategoryColor(post.category),
      variant: 'subtle'
    }"
    :authors="[{ name: post.author }]"
    :to="post._path || (post as any).path"
    class="h-full"
    variant="outline"
  >
    <!-- Slot personnalisé pour les tags -->
    <template #footer>
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          color="neutral"
          variant="subtle"
          size="xs"
        >
          {{ tag }}
        </UBadge>
        <UBadge
          v-if="post.tags.length > 3"
          color="neutral"
          variant="subtle"
          size="xs"
        >
          +{{ post.tags.length - 3 }}
        </UBadge>
      </div>
    </template>

    <!-- Slot personnalisé pour l'image avec fallback -->
    <template #header>
      <div v-if="!post.image || imageError" class="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
        <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-primary-400 dark:text-primary-500" aria-hidden="true" />
      </div>
    </template>
  </UBlogPost>
</template>

<script setup lang="ts">
import type { BlogPost, BlogCategory } from '~/types/blog'
import { BLOG_CATEGORIES } from '~/types/blog'

const props = defineProps<{
  post: BlogPost
}>()

// Gérer les erreurs d'images manquantes
const imageError = ref(false)

// Réinitialiser l'erreur si l'image change
watch(() => props.post.image, () => {
  imageError.value = false
})


function getCategoryColor(category: BlogCategory): 'primary' | 'secondary' | 'error' | 'warning' | 'success' {
  const colors: Record<BlogCategory, 'primary' | 'secondary' | 'error' | 'warning' | 'success'> = {
    competition: 'error',    // Rouge pour compétitions
    actualite: 'primary',     // Vert pour actualités
    resultat: 'success',       // Vert pour résultats
    evenement: 'secondary'     // Jaune pour événements
  }
  return colors[category] || 'primary'
}

function truncateText(text: string, maxLength: number): string {
  if (!text) return ''
  // Supprimer les balises Markdown basiques
  const plainText = text.replace(/[#*`\[\]]/g, '').trim()
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}
</script>

