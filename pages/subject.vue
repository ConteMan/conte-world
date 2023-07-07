<script setup lang="ts">
import { Subject as SubjectApi } from '~/apis'
import { SubjectStatuses, SubjectTypes } from '~/constants'

definePageMeta({
  layout: 'custom',
})

const dayjs = useDayjs()

const page = ref(1)
const per_page = ref(20)
const type = ref(SubjectTypes.MOVIE)
const status = ref(SubjectStatuses.COLLECT)

const list: Ref<Subject.Item[] | []> = ref([])
const lastAction = ref()

const data = await SubjectApi.list(page, per_page, type, status)
// eslint-disable-next-line no-console
console.log('[ data ] >', data.value)

const currentList = computed(() => {
  if (data.value?.data.items)
    list.value = [...list.value, ...data.value?.data.items]

  return list.value ?? []
})

const hasMore = computed(() => {
  return data.value?.data.meta.has_more
})

function pageAction(action: 'next' | 'prev') {
  if (action === 'next' && hasMore.value) {
    page.value++
    lastAction.value = 'next'
  }
}

function dealImg(imgUrl: string) {
  return imgUrl.replace('jpg', 'webp')
}
</script>

<template>
  <div class="box-border w-full h-full overflow-y-auto p-[24px] flex flex-wrap justify-start items-start gap-3">
    <div v-for="item in currentList" :key="item.id" class="item">
      <img
        v-if="item.images"
        :src="dealImg(item.images)"
        class="max-h-[200px] rounded-md"
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
    <div class="box-border h-[200px] item !justify-center btn glass" :class="{ 'btn-disabled !bg-transparent': !hasMore }" @click="pageAction('next')">
      <Icon name="bx:right-arrow" class="w-[24px]" />
    </div>
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
</style>
