<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      headline="Blog & Actualités"
      title="Actualités de la FEMAT"
      description="Découvrez les dernières nouvelles, événements, compétitions et résultats de la Fédération Malienne de Taekwondo."
      :ui="{
        root: 'bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900',
        container: 'py-16 sm:py-20 lg:py-24'
      }"
    >
      <template #headline>
        <UBadge color="primary" variant="subtle" size="lg">
          Blog & Actualités
        </UBadge>
      </template>
    </UPageHero>

    <!-- Section principale avec recherche et filtres -->
    <UPageSection
      :ui="{
        container: 'py-8 sm:py-12'
      }"
    >
      <div class="space-y-8">
        <!-- Barre de recherche -->
        <div class="max-w-2xl mx-auto">
          <BlogSearch
            :show-results="true"
            :debounce-ms="300"
            @search="handleSearch"
            @result-select="handleResultSelect"
            @clear="handleSearchClear"
          />
        </div>

        <!-- Filtres et résultats -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar avec filtres -->
          <aside class="lg:col-span-1">
            <div class="sticky top-24">
              <BlogFilters
                :tags="allTags"
                :category-counts="categoryCounts"
                @category-change="handleCategoryChange"
                @tag-change="handleTagChange"
                @reset="handleFiltersReset"
              />
            </div>
          </aside>

          <!-- Contenu principal -->
          <div class="lg:col-span-3">
            <!-- État de chargement -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
              <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary animate-spin" />
              <span class="ml-3 text-neutral-600 dark:text-neutral-400">Chargement des articles...</span>
            </div>

            <!-- Message aucun résultat -->
            <div v-else-if="filteredPosts.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Aucun article trouvé
              </h3>
              <p class="text-neutral-600 dark:text-neutral-400">
                <span v-if="searchQuery">Aucun article ne correspond à votre recherche.</span>
                <span v-else>Aucun article disponible pour le moment.</span>
              </p>
            </div>

            <!-- Grille d'articles -->
            <div v-else class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlogCard
                  v-for="(post, index) in paginatedPosts"
                  :key="post._path || (post as any).path || `post-${index}`"
                  :post="post"
                />
              </div>

              <!-- Pagination -->
              <div v-if="totalPages > 1" class="flex justify-center mt-8">
                <UPagination
                  v-model="currentPage"
                  :page-count="totalPages"
                  :total="filteredPosts.length"
                  :per-page="postsPerPage"
                  show-first
                  show-last
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost, BlogCategory } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'
import BlogSearch from '~/components/blogs/BlogSearch.vue'
import BlogFilters from '~/components/blogs/BlogFilters.vue'
import BlogCard from '~/components/blogs/BlogCard.vue'

const { getAllPosts, getPostsByCategory, getPostsByTag, searchPosts, getAllTags, getPostsCountByCategory } = useBlog()

// État des données
const allPosts = ref<BlogPost[]>([])
const filteredPosts = ref<BlogPost[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const activeCategory = ref<BlogCategory | null>(null)
const activeTags = ref<string[]>([])
const allTags = ref<string[]>([])
const categoryCounts = ref<Record<BlogCategory, number>>({
  competition: 0,
  actualite: 0,
  resultat: 0,
  evenement: 0
})

// Pagination
const currentPage = ref(1)
const postsPerPage = 12

// Charger les articles au montage
onMounted(async () => {
  try {
    isLoading.value = true
    console.log('Chargement des articles...')
    
    const posts = await getAllPosts()
    console.log('Articles reçus:', posts.length)
    if (posts.length > 0 && posts[0]) {
      const firstPost = posts[0] as any
      console.log('Premier article:', {
        title: firstPost.title,
        _path: firstPost._path,
        path: firstPost.path,
        keys: Object.keys(firstPost)
      })
    }
    
    allPosts.value = posts
    filteredPosts.value = posts
    
    // Charger les tags et compteurs
    allTags.value = await getAllTags()
    categoryCounts.value = await getPostsCountByCategory()
    
    console.log('Tags:', allTags.value)
    console.log('Compteurs:', categoryCounts.value)
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error)
  } finally {
    isLoading.value = false
  }
})

// Gérer la recherche
async function handleSearch(query: string) {
  searchQuery.value = query
  await applyFilters()
}

function handleResultSelect(post: BlogPost) {
  navigateTo(post._path)
}

function handleSearchClear() {
  searchQuery.value = ''
  applyFilters()
}

// Gérer les filtres
async function handleCategoryChange(category: BlogCategory | null) {
  activeCategory.value = category
  currentPage.value = 1
  await applyFilters()
}

async function handleTagChange(tags: string[]) {
  activeTags.value = tags
  currentPage.value = 1
  await applyFilters()
}

async function handleFiltersReset() {
  activeCategory.value = null
  activeTags.value = []
  searchQuery.value = ''
  currentPage.value = 1
  await applyFilters()
}

// Appliquer tous les filtres
async function applyFilters() {
  try {
    isLoading.value = true
    let posts: BlogPost[] = []

    // Recherche textuelle
    if (searchQuery.value && searchQuery.value.trim().length > 0) {
      posts = await searchPosts(searchQuery.value.trim())
    } else {
      posts = [...allPosts.value]
    }

    // Filtre par catégorie
    if (activeCategory.value) {
      const categoryPosts = await getPostsByCategory(activeCategory.value)
      posts = posts.filter(post => categoryPosts.some(cp => cp._path === post._path))
    }

    // Filtre par tags
    if (activeTags.value.length > 0) {
      posts = posts.filter(post => {
        return post.tags && activeTags.value.some(tag => post.tags?.includes(tag))
      })
    }

    filteredPosts.value = posts
  } catch (error) {
    console.error('Erreur lors de l\'application des filtres:', error)
    filteredPosts.value = []
  } finally {
    isLoading.value = false
  }
}

// Pagination
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

// Réinitialiser la page quand les filtres changent
watch([activeCategory, activeTags, searchQuery], () => {
  currentPage.value = 1
})

// SEO
useSeoMeta({
  title: 'Blog & Actualités - FEMAT',
  description: 'Découvrez les dernières nouvelles, événements, compétitions et résultats de la Fédération Malienne de Taekwondo.',
  ogTitle: 'Blog & Actualités - FEMAT',
  ogDescription: 'Découvrez les dernières nouvelles, événements, compétitions et résultats de la Fédération Malienne de Taekwondo.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>

