<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<Props>()

/**
 * 图标组件
 * - 支持iconify
 */
interface Props {
  /** 图标名称 */
  icon?: string
}

const attrs = useAttrs()

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))
</script>

<template>
  <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
</template>

<style scoped></style>
