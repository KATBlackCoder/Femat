<template>
  <UCard 
    class="h-full flex flex-col group hover:shadow-lg transition-all duration-300"
    :id="`blog-${(post._path || (post as any).path || 'no-path')?.replace(/\//g, '-')}`"
  >
    <!-- Image de couverture -->
      <template #header>
        <NuxtLink v-if="post._path || (post as any).path" :to="post._path || (post as any).path" class="block overflow-hidden rounded-t-lg">
          <div
            v-if="!post.image || imageError"
            class="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center"
          >
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-primary-400 dark:text-primary-500" aria-hidden="true" />
          </div>
          <NuxtImg
            v-else
            :src="post.image"
            :alt="post.title"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            format="avif"
            width="400"
            height="200"
            @error="imageError = true"
          />
        </NuxtLink>
        <div v-else class="block overflow-hidden rounded-t-lg">
          <div
            v-if="!post.image || imageError"
            class="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center"
          >
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-primary-400 dark:text-primary-500" aria-hidden="true" />
          </div>
          <NuxtImg
            v-else
            :src="post.image"
            :alt="post.title"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            format="avif"
            width="400"
            height="200"
            @error="imageError = true"
          />
        </div>
      
      <!-- Badge catégorie et date -->
      <div class="flex items-center justify-between gap-2 mt-4">
        <UBadge :color="getCategoryColor(post.category)" variant="subtle" size="sm">
          {{ BLOG_CATEGORIES[post.category] }}
        </UBadge>
        <div class="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
          <UIcon name="i-heroicons-calendar" class="w-3 h-3" aria-hidden="true" />
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>
      </div>
    </template>

    <!-- Contenu -->
    <div class="flex-grow">
      <h3 class="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors">
        <NuxtLink v-if="post._path || (post as any).path" :to="post._path || (post as any).path" class="hover:underline">
          {{ post.title }}
        </NuxtLink>
        <span v-else>{{ post.title }}</span>
      </h3>
      
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
        {{ post.description || truncateText(post._body || '', 150) }}
      </p>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
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
    </div>

    <!-- Footer avec auteur et lien -->
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <UIcon name="i-heroicons-user" class="w-3 h-3" aria-hidden="true" />
          <span>{{ post.author }}</span>
        </div>
        <UButton
          v-if="post._path || (post as any).path"
          color="primary"
          variant="ghost"
          size="sm"
          :to="post._path || (post as any).path"
          trailing
          icon="i-heroicons-arrow-right"
        >
          Lire la suite
        </UButton>
      </div>
    </template>
  </UCard>
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

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return dateString
  }
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

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

