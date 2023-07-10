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
const per_page = ref(10)
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

const dealList = computed(() => {
  let date = ''
  const res: any[] = []
  let temp: any[] = []
  currentList.value.forEach((item, index) => {
    const itemDate = dayjs(item.status_at).format('YYYY-MM-DD')
    if (!date) {
      date = itemDate
      temp.push(item)
    }
    else {
      if (itemDate === date) {
        temp.push(item)
      }
      else {
        res.push({
          date,
          items: temp,
        })
        temp = []
        temp.push(item)
        date = itemDate
      }
    }
    if (index === currentList.value.length - 1) {
      res.push({
        date,
        items: temp,
      })
    }
  })
  return res
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
  <div class="subject-container box-border flex flex-col items-center w-full h-full px-[24px] overflow-x-hidden overflow-y-auto">
    <ClientOnly>
      <div class="action-bar sticky top-0 z-1 w-full max-w-[800px] bg-white">
        <div class="pt-4 px-4 flex gap-4">
          <span
            v-for="itemType in TYPES" :key="itemType.value"
            class="span-btn py-2"
            :class="{ 'type-active': itemType.value === type }"
            @click="toggleType(itemType.value)"
          >
            {{ itemType.name }}
          </span>
        </div>
        <div class="pb-2 px-4 flex gap-4">
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
      <template v-for="dealItem in dealList" :key="dealItem.date">
        <div class="date-title w-full max-w-[800px] box-border px-4 py-2 font-medium bg-[#F5F5F5]">
          {{ dealItem.date }}
        </div>
        <div class="grid-list w-full max-w-[800px] grid justify-between p-4 gap-4">
          <div v-for="item in dealItem.items" :key="item.id" class="item relative overflow-hidden">
            <img
              v-if="item.images"
              :alt="item.name"
              :src="dealImg(item.images)"
              class="w-[150px] h-[200px] object-cover rounded-md border border-solid border-[#F5F5F5]"
              referrerpolicy="no-referrer"
            >
            <div v-else class="h-[200px] rounded-md border border-gray-300">
              {{ item.platform_douban_id }}
            </div>
            <div class="absolute bottom-[1px] left-[1px] right-[1px] text-white text-center rounded-lb-sm rounded-rb-sm px-2 bg-[#000000c5] truncate text-ellipsis overflow-hidden ...">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
      <div key="next-btn" class="box-border h-[200px] item !justify-center btn glass" :class="{ 'btn-disabled !bg-transparent': !hasMore }" @click="pageAction('next')">
        <Icon name="bx:right-arrow" class="w-[24px]" />
        <span> More </span>
      </div>
    </ClientOnly>
    <ScrollBottom />
  </div>
</template>

<style lang="postcss" scoped>
.item {
  @apply w-[150px] flex flex-col justify-start leading-6;
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
.grid-list {
  grid-template-columns: repeat(auto-fill, 150px);
}
img.error {
  display: inline-block;
  transform: scale(1);
}
img::before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: #f5f5f5 url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M304.128 456.192c48.64 0 88.064-39.424 88.064-88.064s-39.424-88.064-88.064-88.064-88.064 39.424-88.064 88.064 39.424 88.064 88.064 88.064zm0-116.224c15.36 0 28.16 12.288 28.16 28.16s-12.288 28.16-28.16 28.16-28.16-12.288-28.16-28.16 12.288-28.16 28.16-28.16z' fill='%23e6e6e6'/%3E%3Cpath d='M887.296 159.744H136.704C96.768 159.744 64 192 64 232.448v559.104c0 39.936 32.256 72.704 72.704 72.704h198.144L500.224 688.64l-36.352-222.72 162.304-130.56-61.44 143.872 92.672 214.016-105.472 171.008h335.36C927.232 864.256 960 832 960 791.552V232.448c0-39.936-32.256-72.704-72.704-72.704zm-138.752 71.68v.512H857.6c16.384 0 30.208 13.312 30.208 30.208v399.872L673.28 408.064l75.264-176.64zM304.64 792.064H165.888c-16.384 0-30.208-13.312-30.208-30.208v-9.728l138.752-164.352 104.96 124.416-74.752 79.872zm81.92-355.84l37.376 228.864-.512.512-142.848-169.984c-3.072-3.584-9.216-3.584-12.288 0L135.68 652.8V262.144c0-16.384 13.312-30.208 30.208-30.208h474.624L386.56 436.224zm501.248 325.632c0 16.896-13.312 30.208-29.696 30.208H680.96l57.344-93.184-87.552-202.24 7.168-7.68 229.888 272.896z' fill='%23e6e6e6'/%3E%3C/svg%3E") no-repeat center / 50% 50%;
  color: transparent;
}
.action-bar + div {
  @apply mt-6;
}
</style>
