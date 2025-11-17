<template>
  <div class="relative">
    <UInput
      v-model="searchQuery"
      placeholder="Rechercher un article..."
      size="lg"
      :icon="searchQuery ? 'i-heroicons-x-mark' : 'i-heroicons-magnifying-glass'"
      :loading="isSearching"
      class="w-full"
      @update:model-value="handleSearch"
      @click:icon="clearSearch"
    />
    
    <!-- Résultats en temps réel (optionnel) -->
    <div
      v-if="showResults && searchResults.length > 0"
      class="absolute z-50 w-full mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg max-h-96 overflow-y-auto"
    >
      <div class="p-2">
        <div
          v-for="result in searchResults"
          :key="result._path"
          class="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
          @click="selectResult(result)"
        >
          <h4 class="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
            {{ result.title }}
          </h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {{ result.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Message aucun résultat -->
    <div
      v-if="showResults && searchQuery && searchResults.length === 0 && !isSearching"
      class="absolute z-50 w-full mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg p-4"
    >
      <p class="text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Aucun article trouvé pour "{{ searchQuery }}"
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'

const props = defineProps<{
  showResults?: boolean
  debounceMs?: number
}>()

const emit = defineEmits<{
  'search': [query: string]
  'result-select': [post: BlogPost]
  'clear': []
}>()

const searchQuery = ref('')
const isSearching = ref(false)
const searchResults = ref<BlogPost[]>([])
const showResults = computed(() => props.showResults ?? false)
const debounceMs = computed(() => props.debounceMs ?? 300)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const { searchPosts } = useBlog()

async function handleSearch(query: string) {
  // Déclencher l'événement immédiatement pour le parent
  emit('search', query)

  if (!query || query.trim().length === 0) {
    searchResults.value = []
    return
  }

  // Debounce pour la recherche avec résultats
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  isSearching.value = true
  debounceTimer = setTimeout(async () => {
    try {
      const results = await searchPosts(query.trim())
      searchResults.value = results.slice(0, 5) // Limiter à 5 résultats
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }, debounceMs.value)
}

function clearSearch() {
  searchQuery.value = ''
  searchResults.value = []
  emit('clear')
  emit('search', '')
}

function selectResult(post: BlogPost) {
  emit('result-select', post)
  searchQuery.value = ''
  searchResults.value = []
}

// Nettoyer le timer à la destruction du composant
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>

