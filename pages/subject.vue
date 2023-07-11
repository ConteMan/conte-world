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
        <div class="date-title w-full max-w-[800px] box-border px-4 pt-6 text-end">
          {{ dayjs(dealItem.date).format('MM/DD') }}
        </div>
        <div class="w-full max-w-[800px] flex flex-col justify-start p-4 gap-4">
          <div v-for="item in dealItem.items" :key="item.id" class="item relative overflow-hidden">
            <div class="box-border w-full p-[2px] rounded-md border border-solid border-[#F5F5F5] flex justify-start items-start flex-warp text-[14px]">
              <div tabindex="0" class="collapse bg-[#F5F5F5] rounded-md">
                <div class="collapse-title min-h-0 box-border pl-2 pr-4 py-4 flex items-center" :class="{ '!cursor-auto': !item?.data?.douban?.interest?.comment }">
                  <span>《<a :href="`https://${type}.douban.com/subject/${item.platform_douban_id}`" target="_blank">{{ item.name }}</a>》</span>
                  <div v-if="item?.data?.douban?.interest?.rating?.value" class="before-h inline-block">
                    <span v-for="rateItem in item?.data?.douban?.interest?.rating?.value" :key="rateItem">★</span>
                  </div>
                  <div v-if="item?.data?.douban?.interest?.comment" class="unfold-btn grow-1 inline-block flex justify-end cursor-pointer">
                    <Icon name="mdi:unfold-more-horizontal" class="w-[14px]" />
                  </div>
                </div>
                <div v-if="item?.data?.douban?.interest?.comment" class="collapse-content">
                  <div>
                    {{ item?.data?.douban?.interest?.comment }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="w-full max-w-[800px] mt-4 flex justify-start items-center">
        <div key="next-btn" class="box-border w-full item !justify-center btn glass" :class="{ 'btn-disabled !bg-transparent': !hasMore }" @click="pageAction('next')">
          <Icon name="bx:right-arrow" class="w-[16px]" />
        </div>
      </div>
    </ClientOnly>
    <ScrollBottom />
  </div>
</template>

<style lang="postcss" scoped>
.item {
  @apply flex flex-col justify-start leading-6;
}
:deep(a) {
  @apply text-gray-700 visited:text-gray-700 no-underline;
}
:deep(a:hover) {
  @apply underline underline-offset-4 decoration-1;
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
.before-h::before {
  display: inline-block;
  content: '/';
  padding: 0 8px;
}
.collapse:focus .unfold-btn {
  display: none;
}
</style>
