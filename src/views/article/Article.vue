<script setup lang="ts">
import dayjs from 'dayjs'
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
    w="[800px]"
    min-w="[800px]"
    min-h="[100vh]"
    p="y-[24px]"
  >
    <div pt-4 pb="[24px]">
      <mdi-arrow-left cursor-pointer opacity="40" hover="opacity-100" @click="$router.push('root')" />
    </div>
    <template v-if="list.length">
      <div flex="~ col" gap-4>
        <div
          v-for="item in list" :key="item.id"
          flex
          justify="start"
          gap-4
        >
          <span text-gray>{{ dayjs(item.info_at).format('YYYY-MM-DD') }}</span>
          <span cursor-pointer @click="$router.push({ path: `/article/${item.id}` })">{{ item.title }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
