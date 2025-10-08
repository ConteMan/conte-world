<template>
  <div class="site-info w-full">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      <p>No Info</p>
      <button @click="fetchData" class="retry-btn">Retry</button>
    </div>

    <!-- 站点信息内容 -->
    <div v-else-if="siteInfo" class="site-content">
      <!-- 头部信息 -->
      <header class="site-header">
        <h1 class="site-title">{{ siteInfo.site_name }}</h1>
        <p class="site-slogan">{{ siteInfo.slogan }} - {{ siteInfo.nickname }}</p>
      </header>

      <!-- 简介 -->
      <section class="site-intro">
        <p>{{ siteInfo.intro }}</p>
      </section>

      <!-- 链接 -->
      <section class="site-links">
        <div class="links-list">
          <template v-for="link, index in siteInfo.links" :key="link.name">
            <template v-if="index > 0">
              <span class="separator">·</span>
            </template>
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="link-item">
              {{ link.name }}
            </a>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSiteInfo, type SiteInfo } from '@/api/site'

// 响应式数据
const siteInfo = ref<SiteInfo | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

/**
 * 获取站点信息
 */
const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    siteInfo.value = await getSiteInfo()
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('获取站点信息失败:', err)
  } finally {
    loading.value = false
  }
}



// 组件挂载时获取数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.site-info {
  padding: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: #666;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 错误状态 */
.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background: #2980b9;
}

/* 站点内容 */
.site-content {
  line-height: 1.6;
}

.site-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.site-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.site-nickname {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.site-slogan {
  font-style: italic;
  color: #95a5a6;
  margin: 0;
}

.site-intro {
  text-align: center;
}

.site-intro,
.site-links {
  margin-bottom: 2rem;
}

.site-intro h2,
.site-links h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-left: 1rem;
}

.site-intro p {
  color: #34495e;
  font-size: 1.1rem;
}

/* 链接列表 */
.links-list {
  color: #34495e;
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  align-items: center;
  justify-content: center;
}

.link-item {
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s ease;
  position: relative;
}

a.link-item {
  color: #34495e;
}

.link-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  transition: width 0.3s ease;
}

.link-item:hover::after {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .site-info {
    padding: 1rem;
  }

  .site-title {
    font-size: 1.5rem;
  }
}
</style>
