<template>
  <div>
    <!-- État de chargement -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary animate-spin" />
      <span class="ml-3 text-neutral-600 dark:text-neutral-400">Chargement de l'article...</span>
    </div>

    <!-- Article non trouvé -->
    <div v-else-if="!post" class="min-h-[60vh] flex items-center justify-center">
      <UCard class="max-w-md text-center">
        <template #header>
          <div class="flex justify-center mb-4">
            <div class="p-4 rounded-full bg-error-100 dark:bg-error-900/30">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-error-600 dark:text-error-400" />
            </div>
          </div>
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Article non trouvé
          </h1>
        </template>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6">
          L'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <UButton
          color="primary"
          size="xl"
          to="/blog"
          icon="i-heroicons-arrow-left"
          trailing
        >
          Retour au blog
        </UButton>
      </UCard>
    </div>

    <!-- Article trouvé -->
    <div v-else>
      <!-- Hero Section -->
      <UPageHero
        :headline="BLOG_CATEGORIES[post.category]"
        :title="post.title"
        :description="post.description"
        :ui="{
          root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
          container: 'py-16 sm:py-20 lg:py-24'
        }"
      >
        <template #headline>
          <UBadge :color="getCategoryColor(post.category)" variant="subtle" size="lg">
            {{ BLOG_CATEGORIES[post.category] }}
          </UBadge>
        </template>
      </UPageHero>

      <!-- Contenu de l'article -->
      <UPageSection
        :ui="{
          container: 'py-8 sm:py-12'
        }"
      >
        <div class="max-w-4xl mx-auto">
          <BlogPostComponent
            :post="post"
            :related-posts="relatedPosts"
          />
        </div>
      </UPageSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost, BlogCategory } from '~/types/blog'
import { BLOG_CATEGORIES } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'
import BlogPostComponent from '~/components/blogs/BlogPost.vue'

const route = useRoute()
const { getPostBySlug, getRelatedPosts } = useBlog()

// Récupérer le slug depuis la route
const slug = computed(() => {
  const slugParam = route.params.slug
  if (Array.isArray(slugParam)) {
    return slugParam.join('/')
  }
  return slugParam as string
})

// Charger l'article avec useAsyncData
const { data: post, pending: isLoading, error } = await useAsyncData(
  `blog-post-${slug.value}`,
  async () => {
    console.log('Chargement de l\'article avec slug:', slug.value)
    const article = await getPostBySlug(slug.value)
    
    if (article) {
      const articleAny = article as any
      console.log('Article récupéré:', {
        title: article.title,
        _path: article._path,
        path: articleAny.path,
        normalizedPath: articleAny.path || article._path,
        hasBody: !!articleAny.body,
        hasBody_: !!articleAny._body,
        bodyType: typeof articleAny.body,
        keys: Object.keys(article)
      })
    } else {
      console.log('Article récupéré: null')
    }
    
    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Article non trouvé',
        message: `L'article "${slug.value}" n'existe pas.`
      })
    }

    return article
  }
)

// Charger les articles similaires
const { data: relatedPosts } = await useAsyncData(
  `blog-related-${slug.value}`,
  async () => {
    if (post.value) {
      return await getRelatedPosts(post.value, 3)
    }
    return []
  },
  {
    watch: [post]
  }
)

// Gérer l'erreur 404
if (error.value) {
  throw error.value
}

// Fonction pour obtenir la couleur de catégorie
function getCategoryColor(category: BlogCategory): 'primary' | 'secondary' | 'error' | 'warning' | 'success' {
  const colors: Record<BlogCategory, 'primary' | 'secondary' | 'error' | 'warning' | 'success'> = {
    competition: 'error',
    actualite: 'primary',
    resultat: 'success',
    evenement: 'secondary'
  }
  return colors[category] || 'primary'
}

// SEO dynamique
watchEffect(() => {
  if (!post.value) {
    useSeoMeta({
      title: 'Article non trouvé - FEMAT',
      description: 'L\'article que vous recherchez n\'existe pas.',
      robots: 'noindex, nofollow'
    })
    return
  }

  useSeoMeta({
    title: `${post.value.title} - Blog FEMAT`,
    description: post.value.description,
    ogTitle: post.value.title,
    ogDescription: post.value.description,
    ogType: 'article',
    ogImage: post.value.image ? `https://femat.ml${post.value.image}` : undefined,
    twitterCard: 'summary_large_image',
    articlePublishedTime: post.value.date,
    articleAuthor: [post.value.author],
    articleTag: post.value.tags && post.value.tags.length > 0 ? post.value.tags : [post.value.category]
  })
})
</script>

