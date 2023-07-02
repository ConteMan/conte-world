<script setup lang="ts">
import { Memo } from '~/apis'

definePageMeta({
  layout: 'custom',
})

const dayjs = useDayjs()

const page = ref(1)
const per_page = ref(20)
const list: Ref<Memo.Item[] | []> = ref([])
const lastAction = ref()
const emptyLastPage = ref(false)

const { data } = await Memo.list(page, per_page)

const currentList = computed(() => {
  if (data.value?.data.items.length) {
    list.value = data.value?.data.items
  }
  else {
    if (lastAction.value === 'next')
      emptyLastPage.value = true
  }
  return list.value.length ? list.value : []
})

const hasMore = computed(() => {
  return !!data.value?.data.items.length && data.value?.data.items.length >= per_page.value
})

function pageAction(action: 'next' | 'prev') {
  if (action === 'next' && hasMore.value) {
    page.value++
    lastAction.value = 'next'
  }

  if (action === 'prev' && page.value > 1) {
    if (emptyLastPage.value) {
      if (page.value > 2)
        page.value -= 2
      else
        page.value--
      emptyLastPage.value = false
    }
    else {
      page.value--
    }
    lastAction.value = 'prev'
  }
}
</script>

<template>
  <div class="flex flex-col w-full h-full overflow-y-auto">
    <div v-for="item in currentList" :key="item.id" class="item">
      <div class="memo-content" v-html="item.contentHtml" />
      <div v-if="item.resourceList.length" class="mt-4 flex flex-wrap justify-start items-center gap-4">
        <img
          v-for="imgItem in item.resourceList" :key="imgItem.id"
          :src="imgItem.externalLink"
          class="max-h-[200px] lt-lg:max-w-full rounded-md"
        >
      </div>
      <div class="text-gray-400 pt-2 italic">
        {{ dayjs.unix(item.createdTs).format('YYYY-MM-DD HH:mm') }}
      </div>
    </div>
    <div class="h-[100px] flex justify-center items-center gap-4">
      <div class="btn glass" :class="{ 'btn-disabled !bg-transparent': (page <= 1 || page === 2 && emptyLastPage) }" @click="pageAction('prev')">
        <Icon name="bx:left-arrow" class="w-[16px]" />
      </div>
      <div class="btn glass" :class="{ 'btn-disabled !bg-transparent': !hasMore }" @click="pageAction('next')">
        <Icon name="bx:right-arrow" class="w-[16px]" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.item {
  @apply
    p-[36px] pb-[12px] box-border w-full flex flex-col justify-start
    leading-6
    border-b border-solid border-b-[#F5F5F5] border-l-0 border-t-0 border-r-0;
}
:deep(a) {
  @apply text-gray-700 visited:text-gray-700;
}
:deep(.memo-content img) {
  --at-apply: h-[200px] lt-lg:max-w-full rounded-md;
}
</style>
