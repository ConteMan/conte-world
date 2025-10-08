<template>
  <div class="min-h-screen bg-background layout-main">
    <!-- 顶部固定导航栏 -->
    <header class="fixed top-0 left-0 right-0 flex justify-center items-center z-50 bg-white">
      <div class="w-[45rem] mx-auto px-4">
        <div class="flex items-center justify-end h-16">

          <!-- 导航菜单 -->
          <nav class="flex items-center gap-6">
            <RouterLink v-for="item in navigationItems" :key="item.name" :to="item.path"
              class="font-bold text-sm transition-colors duration-200" active-class="text-foreground">
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main pt-16 max-w-[45rem] flex flex-col items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

// 导航菜单项配置
const navigationItems: { name: string, path: string }[] = [
  { name: 'Home', path: '/' },
  { name: 'Movie', path: '/movies' },
]
</script>

<style scoped>
/* 平滑滚动效果 */
html {
  scroll-behavior: smooth;
}

/* 导航链接悬停效果 */
nav a {
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width 0.2s ease-in-out;
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}

.shadow-nav {
  box-shadow: inset 0 -1px 0 0 #eaeaea;
}

.main {
  min-height: calc(100vh - 16rem);
}

@media screen and (min-width: 1024px) {
  .layout-main {
    width: 45rem;
  }
}
</style>
