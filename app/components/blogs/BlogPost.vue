<template>
  <article class="w-full">
    <!-- Image de couverture -->
    <div v-if="post.image && !imageError" class="mb-8 rounded-lg overflow-hidden">
      <NuxtImg
        :src="post.image"
        :alt="post.title"
        class="w-full h-64 md:h-96 object-cover"
        loading="eager"
        format="avif"
        width="1200"
        height="600"
        @error="imageError = true"
      />
    </div>

    <!-- Métadonnées -->
    <div class="mb-8">
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <UBadge :color="getCategoryColor(post.category)" variant="subtle" size="lg">
          {{ BLOG_CATEGORIES[post.category] }}
        </UBadge>
        <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <UIcon name="i-heroicons-calendar" class="w-4 h-4" aria-hidden="true" />
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>
        <div class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <UIcon name="i-heroicons-user" class="w-4 h-4" aria-hidden="true" />
          <span>{{ post.author }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in post.tags"
          :key="tag"
          color="neutral"
          variant="subtle"
          size="sm"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <!-- Titre -->
    <h1 class="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
      {{ post.title }}
    </h1>

    <!-- Description -->
    <p v-if="post.description" class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
      {{ post.description }}
    </p>

    <!-- Contenu avec ContentRenderer -->
    <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
      <ContentRenderer v-if="(post as any).body || (post as any)._body" :value="post" />
      <div v-else class="text-neutral-500 dark:text-neutral-400 italic">
        <p>Contenu non disponible.</p>
        <p class="text-xs mt-2">Debug: body={{ !!(post as any).body }}, _body={{ !!(post as any)._body }}</p>
      </div>
    </div>

    <!-- Boutons de partage social -->
    <UCard class="mb-8">
      <template #header>
        <h2 class="text-lg font-semibold">Partager cet article</h2>
      </template>
      <div class="flex flex-wrap gap-3">
        <UButton
          color="primary"
          variant="outline"
          size="lg"
          :to="getFacebookShareUrl()"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon name="i-heroicons-share" class="w-5 h-5 mr-2" />
          Facebook
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          size="lg"
          :to="getTwitterShareUrl()"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 mr-2" />
          Twitter
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          size="lg"
          :to="getLinkedInShareUrl()"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UIcon name="i-heroicons-briefcase" class="w-5 h-5 mr-2" />
          LinkedIn
        </UButton>
        <UButton
          color="neutral"
          variant="ghost"
          size="lg"
          @click="copyLink"
          icon="i-heroicons-clipboard"
        >
          Copier le lien
        </UButton>
      </div>
    </UCard>

    <!-- Articles similaires -->
    <div v-if="relatedPosts && relatedPosts.length > 0" class="mb-8">
      <h2 class="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        Articles similaires
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard
          v-for="relatedPost in relatedPosts"
          :key="relatedPost._path"
          :post="relatedPost"
        />
      </div>
    </div>

    <!-- Navigation retour -->
    <div class="flex justify-center">
      <UButton
        color="primary"
        variant="outline"
        size="xl"
        to="/blog"
        icon="i-heroicons-arrow-left"
        trailing
      >
        Retour au blog
      </UButton>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost, BlogCategory } from '~/types/blog'
import { BLOG_CATEGORIES } from '~/types/blog'
import BlogCard from '~/components/blogs/BlogCard.vue'

const props = defineProps<{
  post: BlogPost
  relatedPosts?: BlogPost[]
}>()

// Gérer les erreurs d'images manquantes
const imageError = ref(false)

// Réinitialiser l'erreur si l'image change
watch(() => props.post.image, () => {
  imageError.value = false
})

const toast = useToast()

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
    competition: 'error',
    actualite: 'primary',
    resultat: 'success',
    evenement: 'secondary'
  }
  return colors[category] || 'primary'
}

function getCurrentUrl(): string {
  if (import.meta.client) {
    return window.location.href
  }
  return ''
}

function getFacebookShareUrl(): string {
  const url = encodeURIComponent(getCurrentUrl())
  const title = encodeURIComponent(props.post.title)
  return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`
}

function getTwitterShareUrl(): string {
  const url = encodeURIComponent(getCurrentUrl())
  const text = encodeURIComponent(props.post.title)
  return `https://twitter.com/intent/tweet?url=${url}&text=${text}`
}

function getLinkedInShareUrl(): string {
  const url = encodeURIComponent(getCurrentUrl())
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
}

async function copyLink() {
  const url = getCurrentUrl()
  if (import.meta.client && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url)
      toast.add({
        title: 'Lien copié !',
        description: 'Le lien a été copié dans le presse-papiers.',
        color: 'success'
      })
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
      toast.add({
        title: 'Erreur',
        description: 'Impossible de copier le lien.',
        color: 'error'
      })
    }
  }
}
</script>

<style scoped>
/* Styles pour le contenu Markdown */
:deep(.prose) {
  color: rgb(55 65 81); /* gray-700 */
}

:deep(.dark .prose) {
  color: rgb(209 213 219); /* gray-300 */
}

:deep(.prose h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: rgb(23 23 23); /* neutral-900 */
}

:deep(.dark .prose h2) {
  color: rgb(245 245 245); /* neutral-100 */
}

:deep(.prose h3) {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: rgb(23 23 23); /* neutral-900 */
}

:deep(.dark .prose h3) {
  color: rgb(245 245 245); /* neutral-100 */
}

:deep(.prose p) {
  margin-bottom: 1rem;
  line-height: 1.625;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
}

:deep(.prose li) {
  margin-bottom: 0.5rem;
}

:deep(.prose a) {
  color: rgb(var(--color-primary-DEFAULT));
  text-decoration: underline;
}

:deep(.prose a:hover) {
  color: rgb(var(--color-primary-600));
}

:deep(.dark .prose a:hover) {
  color: rgb(var(--color-primary-400));
}

:deep(.prose img) {
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

:deep(.prose code) {
  background-color: rgb(245 245 245); /* neutral-100 */
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

:deep(.dark .prose code) {
  background-color: rgb(38 38 38); /* neutral-800 */
}

:deep(.prose pre) {
  background-color: rgb(245 245 245); /* neutral-100 */
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(.dark .prose pre) {
  background-color: rgb(38 38 38); /* neutral-800 */
}
</style>

