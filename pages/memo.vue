<script setup lang="ts">
import { Memo } from '~/apis'

definePageMeta({
  layout: 'custom',
})

const dayjs = useDayjs()

const page = ref(1)
const per_page = ref(10)
const list: Ref<Memo.Item[] | []> = ref([])
const lastAction = ref()
const emptyLastPage = ref(false)
const data: Ref<Memo.FetchList | null> = ref(null)

async function getList() {
  const listData = await Memo.list(page, per_page)
  data.value = listData.value
}
getList()

const currentList = computed(() => {
  if (data.value?.data.items.length) {
    list.value = [...list.value, ...data.value?.data.items]
  }
  else {
    if (lastAction.value === 'next')
      emptyLastPage.value = true
  }
  return list.value ?? []
})

const hasMore = computed(() => {
  return !!data.value?.data.items.length && data.value?.data.items.length >= per_page.value
})

async function pageAction(action: 'next' | 'prev') {
  if (action === 'next' && hasMore.value) {
    page.value++
    lastAction.value = 'next'
    await getList()
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
  <div class="memo-container pt-4 w-full h-full flex flex-col items-center overflow-y-auto">
    <ClientOnly>
      <div v-for="item in currentList" :key="item.id" class="item max-w-[800px]">
        <div class="jxzk memo-content heti" v-html="item.contentHtml" />
        <div v-if="item.resourceList.length" class="mt-4 mb-4 flex flex-wrap justify-start items-center gap-4">
          <img
            v-for="imgItem in item.resourceList" :key="imgItem.id"
            :src="imgItem.externalLink"
            class="max-h-[200px] lt-lg:max-w-full rounded-md"
          >
        </div>
        <div class="date-container pt-2 flex justify-end">
          <div class="monospace px-[12px] rounded-t-md bg-[#a9a9a9] text-white text-[12px] font-bold">
            {{ dayjs.unix(item.createdTs).format('MM/DD') }}
          </div>
        </div>
      </div>
      <div v-if="hasMore" class="w-full max-w-[800px] mt-4 flex justify-start items-center">
        <div
          class="btn glass box-border w-full py-2 flex !flex-col justify-center items-center"
          @click="pageAction('next')"
        >
          <div class="lxgw">
            · · ·
          </div>
        </div>
      </div>
      <ScrollBottom />
    </ClientOnly>
  </div>
</template>

<style lang="postcss" scoped>
.item {
  @apply p-[24px] pt-[32px] box-border w-full flex flex-col justify-start leading-6;
}
.item:first-child {
  @apply !border-t-[1px];
}
.item:nth-child(2n) {
  @apply relative rounded-bl-md border border-solid border-[#a9a9a9] border-t-0 border-r-0;
}
.item:nth-child(2n):before {
  @apply absolute inline-block bg-[#a9a9a9] w-[61px] h-[22px] top-[-1px] left-[-1px] rounded-tl-md rounded-br-md;
  content: '';
  box-shadow: -6px -6px 0px #fff;
}
.item:nth-child(2n) .date-container {
  @apply p-0 absolute top-0 left-0;
}
.item:nth-child(2n) .date-container > div {
  --at-apply: rounded-bl-0 rounded-tl-md rounded-tr-0 rounded-br-md z-1;
}
.item:nth-child(2n+1) {
  @apply relative rounded-br-md border border-solid border-[#a9a9a9] border-t-0 border-l-0;
}
.item:nth-child(2n+1):after {
  @apply absolute inline-block bg-[#a9a9a9] w-[61px] h-[22px] top-[-1px] right-[-1px] rounded-bl-md rounded-tr-md;
  content: '';
  box-shadow: 8px -8px 0px #fff;
}
.item:nth-child(2n+1) .date-container {
  @apply p-0 absolute right-0 top-0;
}
.item:nth-child(2n+1) .date-container > div {
  --at-apply: rounded-bl-md rounded-tl-0 rounded-tr-md rounded-br-0 z-1;
}
:deep(.memo-content) a {
  @apply text-gray-700 visited:text-gray-700 underline underline-offset-4 decoration-1;
}
:deep(.memo-content img) {
  --at-apply:
    h-[200px] w-[355px] object-cover lt-lg:max-w-full rounded-md
    border border-solid border-[#F5F5F5];
}
.small .item,
.medium .item {
  --at-apply: border-[#dedede];
}
.small .memo-container,
.medium .memo-container {
  @apply box-border px-[12px];
}
</style>
