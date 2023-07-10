<script setup lang="ts">
import { Article } from '~/apis/index'

definePageMeta({
  layout: 'custom',
})

const route = useRoute()
const list = await Article.list()

const screenStore = useScreenStore()
const showArticleList = computed(() => {
  return screenStore.screenSize === 'large' || route.fullPath === '/article'
})
const showArticleContent = computed(() => {
  return screenStore.screenSize === 'large' || route.fullPath.match(/\/article\/.*/g)
})
const showArticleListOnly = computed(() => {
  return ['small', 'medium'].includes(screenStore.screenSize) && route.fullPath === '/article'
})

onMounted(() => {
  if (showArticleListOnly.value)
    document.querySelector('.article-list')?.classList.add('article-list-only')
})
</script>

<template>
  <div class=" w-full h-full flex flex-row">
    <div v-show="showArticleList" class="article-list" :class="{ 'article-list-only': showArticleListOnly }">
      <div
        v-for="item in list.items" :key="item.id"
        class="article-item"
        :class="{ active: item.id === Number(route.params.id) }"
      >
        <NuxtLink
          :to="`/article/${item.id}`"
          class="no-underline text-black visited:text-black"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
      <ScrollBottom />
    </div>
    <div v-show="showArticleContent" class="article-content grow-1 overflow-y-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.article-list {
  @apply
    w-[300px] h-full box-border overflow-y-auto flex flex-col items-start shrink-0
    border-r border-solid border-[#F5F5F5] border-l-0 border-t-0 border-b-0;
}
.article-item {
  @apply
    h-[64px] p-[36px] box-border w-full flex items-center
    leading-6
    border-b border-solid border-b-[#F5F5F5] border-l-0 border-t-0 border-r-0;
}
.article-item.active a{
  @apply underline underline-offset-4 decoration-1;
}
.article-list-only {
  @apply w-full border-none;
  .article-item {
    @apply w-full;
  }
}
</style>
