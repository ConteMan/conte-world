<script setup lang="ts">
import { Subject as SubjectApi } from '~/apis'
import { SubjectStatuses, SubjectTypes } from '~/constants'

definePageMeta({
  layout: 'custom',
})

const dayjs = useDayjs()

const TYPES = [
  {
    name: '影视',
    value: SubjectTypes.MOVIE,
  },
  {
    name: '读书',
    value: SubjectTypes.BOOK,
  },
  {
    name: '音乐',
    value: SubjectTypes.MUSIC,
  },
]
const STATUSES = [
  {
    name: '清单中',
    value: SubjectStatuses.WISH,
  },
  {
    name: '进行中',
    value: SubjectStatuses.DO,
  },
  {
    name: '已完成',
    value: SubjectStatuses.COLLECT,
  },
]

const page = ref(1)
const per_page = ref(20)
const type = ref(SubjectTypes.MOVIE)
const status = ref(SubjectStatuses.COLLECT)

const list: Ref<Subject.Item[] | []> = ref([])
const lastAction = ref()
const data: Ref<Subject.FetchList | null> = ref(null)

async function getList() {
  const listData = await SubjectApi.list(page, per_page, type, status)
  data.value = listData.value
}
getList()

const currentList = computed(() => {
  if (data.value?.data.items)
    list.value = [...list.value, ...data.value?.data.items]

  return list.value ?? []
})

const hasMore = computed(() => {
  return data.value?.data.meta.has_more
})

async function pageAction(action: 'next' | 'prev') {
  if (action === 'next' && hasMore.value) {
    page.value++
    lastAction.value = 'next'
    await getList()
  }
}

function dealImg(imgUrl: string) {
  return imgUrl.replace('jpg', 'webp')
}

function init() {
  if (document.querySelector('.content-container')) {
    document.querySelector('.content-container')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  list.value = []
  data.value = null
  page.value = 1
}

async function toggleType(current: SubjectTypes) {
  if (current !== type.value) {
    type.value = current
    init()
    await getList()
  }
}

async function toggleStatus(current: SubjectStatuses) {
  if (current !== status.value) {
    status.value = current
    init()
    await getList()
  }
}
</script>

<template>
  <div class="subject-container box-border w-full p-[24px]">
    <ClientOnly>
      <div class="sticky top-0 w-full rounded-lg bg-white">
        <div class="p-2 px-4 flex gap-4">
          <span
            v-for="itemType in TYPES" :key="itemType.value"
            class="span-btn py-2"
            :class="{ 'type-active': itemType.value === type }"
            @click="toggleType(itemType.value)"
          >
            {{ itemType.name }}
          </span>
        </div>
        <div class="p-2 px-4 flex gap-4">
          <span
            v-for="itemStatus in STATUSES" :key="itemStatus.value"
            class="span-btn py-2"
            :class="{ 'status-active': itemStatus.value === status }"
            @click="toggleStatus(itemStatus.value)"
          >
            {{ itemStatus.name }}
          </span>
        </div>
      </div>
      <TransitionGroup name="list" tag="div" class="grid-list grid justify-between p-4 gap-4">
        <div v-for="item in currentList" :key="item.id" class="item">
          <img
            v-if="item.images"
            :src="dealImg(item.images)"
            class="w-[150px] h-[200px] object-cover rounded-md border border-solid border-[#F5F5F5]"
            referrerpolicy="no-referrer"
          >
          <div v-else class="h-[200px] rounded-md border border-gray-300">
            {{ item.platform_douban_id }}
          </div>
          <div class="pt-2 truncate text-ellipsis overflow-hidden ...">
            {{ item.name }}
          </div>
          <div class="text-gray-400">
            {{ dayjs(item.status_at).format('YYYY-MM-DD') }}
          </div>
        </div>
        <div key="next-btn" class="box-border h-[200px] item !justify-center btn glass" :class="{ 'btn-disabled !bg-transparent': !hasMore }" @click="pageAction('next')">
          <Icon name="bx:right-arrow" class="w-[24px]" />
        </div>
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<style lang="postcss" scoped>
.item {
  @apply
    pb-[12px] w-[150px] flex flex-col justify-start
    leading-6;
}
:deep(a) {
  @apply text-gray-700 visited:text-gray-700;
}
:deep(.memo-content img) {
  --at-apply: h-[200px] lt-lg:max-w-full rounded-md;
}
.type-active,
.status-active {
  @apply font-bold border-b border-solid border-b-black border-l-0 border-t-0 border-r-0;
}
.span-btn {
  @apply cursor-pointer;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.grid-list {
  grid-template-columns: repeat(auto-fill, 150px);
}
</style>
