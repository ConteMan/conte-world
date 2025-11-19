<template>
  <MainLayout>
    <div class="max-w-3xl mx-auto px-4 py-12">

      <!-- Loading State -->
      <div v-if="loading && movies.length === 0" class="flex justify-center py-20">
        <div class="w-8 h-8 border-2 border-gray-100 border-t-gray-900 rounded-full animate-spin"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="loadMovies(true)" 
          class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition-colors text-sm"
        >
          Try Again
        </button>
      </div>

      <!-- Movie List -->
      <div v-else-if="movies.length > 0" class="space-y-6">
        <div class="grid gap-6">
          <MovieCard 
            v-for="item in movies" 
            :key="item.id" 
            :item="item" 
          />
        </div>

        <!-- Loading More -->
        <div v-if="loadingMore" class="flex justify-center py-8">
          <div class="w-5 h-5 border-2 border-gray-100 border-t-gray-500 rounded-full animate-spin"></div>
        </div>

        <!-- No More Data -->
        <div v-else-if="!hasMore" class="text-center py-12">
          <span class="inline-block px-3 py-1 text-xs font-medium text-gray-400 bg-gray-50 rounded-full uppercase tracking-widest">
            End of List
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 text-gray-400">
        <p>No movies found</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import MainLayout from '@/layout/MainLayout.vue'
import MovieCard from '@/components/MovieCard.vue'
import { getMovieList, type MovieListItem } from '@/api/movie'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

// State
const movies = ref<MovieListItem[]>([])
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const totalPages = ref(0)

// Computed
const hasMore = computed(() => currentPage.value < totalPages.value)

// Actions
const loadMovies = async (reset = false) => {
  try {
    if (reset) {
      loading.value = true
      currentPage.value = 1
      movies.value = []
      error.value = ''
    }

    const response = await getMovieList('51883921', {
      page: currentPage.value,
      perPage: 20,
      status: '2'
    })

    if (reset) {
      movies.value = response.items
    } else {
      movies.value.push(...response.items)
    }

    totalPages.value = response.totalPages
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load movies'
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  if (hasMore.value && !loading.value) {
    currentPage.value++
    await loadMovies()
  }
}

// Infinite Scroll
const { isLoading: loadingMore } = useInfiniteScroll(loadMore, {
  threshold: 300,
  disabled: computed(() => loading.value || !hasMore.value || error.value !== '')
})

// Lifecycle
onMounted(() => {
  loadMovies(true)
})
</script>
