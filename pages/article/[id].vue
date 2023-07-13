<script setup lang="ts">
import Prism from 'prismjs'
import { Article } from '~/apis/index'

definePageMeta({
  layout: 'custom',
})

const route = useRoute()
const articleContent = ref(null)
const data = ref({
  content_html: '',
})
async function getList() {
  data.value = await Article.view(Number(route.params.id))
}
getList()

function delayToHighlight() {
  setTimeout(() => {
    Prism.highlightAll()
  }, 1000)
}

watch(data, () => {
  nextTick(() => {
    delayToHighlight()
  })
})
</script>

<template>
  <div ref="articleContent" class="article-detail flex flex-col px-[36px] box-border">
    <div class="sticky top-0 z-1 bg-white tool-bar flex justify-start items-center pt-4 pb-2">
      <NuxtLink to="/article" class="nav-link">
        <Icon name="bx:left-arrow-alt" size="24" />
      </NuxtLink>
    </div>
    <ClientOnly>
      <div class="global-markdown article-content heti jxzk" v-html="data.content_html" />
    </ClientOnly>
    <ScrollBottom />
  </div>
</template>

<style lang="postcss" scoped>
.tool-bar {
  @apply border-b border-solid border-[#F5F5F5] border-l-0 border-t-0 border-r-0;
}
.nav-link {
  @apply flex gap-[12px] justify-start items-center text-black visited:text-black no-underline;
}
.article-content {
  @apply py-4;
}
:deep(.article-content) a {
  @apply leading-6 text-gray-700 visited:text-gray-700 underline underline-offset-4 decoration-1;
}
:deep(.small .article-list) {
  display: none;
}
:deep(div.code-toolbar > .toolbar > .toolbar-item) {
  @apply cursor-pointer pr-[8px];
}
:deep(div.code-toolbar > .toolbar .copy-to-clipboard-button) {
  @apply cursor-pointer;
}
:deep(.language-css .token.string, .style .token.string, .token.entity, .token.operator, .token.url) {
  background: none;
}
</style>
