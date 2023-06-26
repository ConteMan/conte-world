<script setup lang="ts">
import { Article } from '~/apis/index'

definePageMeta({
  layout: 'custom',
})

const route = useRoute()
const data = ref({
  content_html: '',
})
async function getList() {
  data.value = await Article.view(Number(route.params.id))
}
getList()
</script>

<template>
  <div class="flex flex-col h-full px-[36px] overflow-y-auto box-border">
    <div class="tool-bar flex justify-start items-center pt-4 pb-2">
      <NuxtLink to="/article" class="nav-link">
        <Icon name="bx:left-arrow-alt" size="24" />
      </NuxtLink>
    </div>
    <ClientOnly>
      <div class="article-content" v-html="data.content_html" />
    </ClientOnly>
  </div>
</template>

<style lang="postcss" scoped>
.tool-bar {
  @apply border-b border-solid border-[#F5F5F5] border-l-0 border-t-0 border-r-0;
}
.nav-link {
  @apply flex gap-[12px] justify-start items-center text-black visited:text-black no-underline;
}
:deep(.article-content a) {
  @apply text-gray-700 visited:text-gray-700;
}
:deep(.small .article-list) {
  display: none;
}
</style>
