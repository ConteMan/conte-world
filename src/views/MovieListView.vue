<template>
  <MainLayout>
    <div class="movie-list-container flex flex-col items-center justify-center">
      <!-- 加载状态 -->
      <div v-if="loading && movies.length === 0" class="loading-state">
        <div class="loading-spinner"></div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
      </div>

      <!-- 影视列表 -->
      <div v-else-if="movies.length > 0" class="movie-list flex flex-col items-center justify-center">
        <div v-for="item in movies" :key="item.id" class="movie-item">
          <div class="movie-info">
            <h3 class="movie-title">{{ item.movie.title }}</h3>
            <p v-if="item.movie.subtitle" class="movie-subtitle">{{ item.movie.subtitle }}</p>
            <div class="movie-meta">
              <span class="movie-year">{{ item.movie.year }}</span>
              <span class="movie-type uppercase">{{ item.movie.type }}</span>
            </div>
            <p v-if="item.comment" class="movie-comment">{{ item.comment }}</p>
          </div>
        </div>

        <!-- 滚动加载指示器 -->
        <div v-if="loadingMore" class="loading-more flex items-center justify-center">
          <div class="loading-spinner small"></div>
        </div>

        <!-- 没有更多数据 -->
        <div v-else-if="!hasMore && movies.length > 0" class="no-more-data">
          <p>No More</p>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <p>No Data</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import MainLayout from '@/layout/MainLayout.vue'
import { getMovieList, type MovieListItem } from '@/api/movie'

// 响应式数据
const movies = ref<MovieListItem[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')
const currentPage = ref(1)
const totalPages = ref(0)

// 计算属性
const hasMore = computed(() => currentPage.value < totalPages.value)

// 加载影视列表
const loadMovies = async (reset = false) => {
  try {
    if (reset) {
      loading.value = true
      currentPage.value = 1
      movies.value = []
      error.value = ''
    } else {
      loadingMore.value = true
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
    error.value = err instanceof Error ? err.message : '加载失败'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

// 滚动加载更多
const loadMoreOnScroll = async () => {
  if (hasMore.value && !loadingMore.value) {
    currentPage.value++
    await loadMovies()
  }
}

// 滚动事件处理
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // 当滚动到距离底部 200px 时开始加载
  if (scrollTop + windowHeight >= documentHeight - 200) {
    loadMoreOnScroll()
  }
}

// 组件挂载时加载数据并添加滚动监听
onMounted(() => {
  loadMovies(true)
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.movie-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1rem;
}

.filter-section {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.status-filter {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.status-filter:hover {
  border-color: #9ca3af;
}

.status-filter:focus {
  outline: none;
  border-color: #374151;
  box-shadow: 0 0 0 1px #374151;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #374151;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-spinner.small {
  width: 1rem;
  height: 1rem;
  border-width: 1px;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: #dc2626;
  margin-bottom: 1rem;
}

.retry-button {
  padding: 0.5rem 1rem;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #111827;
}

.movie-list {
  space-y: 1rem;
}

.movie-item {
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  transition: border-color 0.2s;
  margin-bottom: 1rem;
}

.movie-item:hover {
  border-color: #d1d5db;
}

.movie-cover {
  flex-shrink: 0;
  width: 80px;
  height: 120px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
  background-color: #f3f4f6;
}

.movie-info {
  flex: 1;
  min-width: 0;
}

.movie-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.movie-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.movie-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.movie-year,
.movie-type,
.watch-status {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #f3f4f6;
  color: #374151;
}

.watch-status {
  background-color: #111827;
  color: white;
}

.movie-comment {
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-top: 0.5rem;
}

.load-more-section {
  text-align: center;
  margin-top: 2rem;
}

.load-more-button {
  padding: 0.75rem 1.5rem;
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.load-more-button:hover {
  background-color: #111827;
}

.loading-more {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.no-more-data {
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  margin-top: 2rem;
  padding: 1rem;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .movie-list-container {
    padding: 1rem 0.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .movie-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .movie-cover {
    width: 120px;
    height: 160px;
  }

  .movie-meta {
    justify-content: center;
  }
}
</style>
