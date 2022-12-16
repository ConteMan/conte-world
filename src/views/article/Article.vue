<script setup lang="ts">
import { fetchArticleList } from '~/services'

interface Data {
  list: Article.ListItem[]
  total: number
  has_more: boolean
}

const data = reactive<Data>({
  list: [],
  total: 0,
  has_more: true,
})
const { list } = toRefs(data)

const getArticleList = async () => {
  const res = await fetchArticleList()
  if (res) {
    data.list = res.items
    data.has_more = res.has_more
    data.total = res.total
  }
}
getArticleList()
</script>

<template>
  <div
    flex="~ col"
    p="[2em]"
    md:max-w="full"
    lg:max-w="[800px]"
    lg:w="[800px]"
    min-h="[100vh]"
  >
    <div p="t-4 b-[24px] x-2" flex gap-2 text="[18px]">
      <mdi-home cursor-pointer opacity="40" hover="opacity-100" @click="$router.push('/root')" />
      <mdi-arrow-left cursor-pointer opacity="40" hover="opacity-100" @click="$router.push('/root')" />
    </div>
    <template v-if="list.length">
      <div flex="~ col" gap-4>
        <div
          v-for="item in list" :key="item.id"
          flex
          justify="start"
          gap-4
          rounded-md
          p="2"
          hover="bg-light-800"
          dark:hover="text-black bg-light-800"
          cursor-pointer
          @click="$router.push({ path: `/article/${item.id}` })"
        >
          {{ item.title }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
