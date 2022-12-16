<script setup lang="ts">
import dayjs from 'dayjs'
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
      <mdi-home cursor-pointer opacity="40" hover="opacity-100" @click="$router.push('/root')" />
      <mdi-arrow-left cursor-pointer opacity="40" hover="opacity-100" @click="$router.push('/article')" />
    </div>
    <div class="global-markdown p-2" v-html="content?.content_html" />
  </div>
</template>

<style scoped>

</style>
