<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { fetchArticle } from '~/services'

interface Data {
  content: Article.ListItem | null
}

const router = useRouter()
const route = useRoute()
const id = route.params.id ? Number(route.params.id) : 0
if (!id)
  router.push({ path: '/article' })

const data = reactive<Data>({
  content: null,
})
const { content } = toRefs(data)

const getArticle = async (id: number) => {
  const res = await fetchArticle(id)
  if (res)
    data.content = res
  else
    router.push({ path: '/article' })
}
getArticle(id)
</script>

<template>
  <div
    flex="~ col"
    md:max-w="full"
    lg:max-w="[800px]"
    lg:w="[800px]"
    min-h="[100vh]"
    p="[2em]"
  >
    <div p="t-4 b-[24px] x-2" flex gap-2 text="[18px]">
      <a cursor-pointer hover:text="red-600" @click="$router.push('/root')">
        <SvgIcon icon="mdi:home" height="1.2em" />
      </a>
      <a cursor-pointer hover:text="red-600" @click="$router.push('/article')">
        <SvgIcon icon="mdi:arrow-left" height="1.2em" />
      </a>
    </div>
    <div class="global-markdown p-2" v-html="content?.content_html" />
  </div>
</template>

<style scoped>

</style>
