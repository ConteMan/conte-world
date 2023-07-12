<script setup lang="ts">
import { watchImmediate } from '@vueuse/core'

useHead({
  title: 'Conte World',
  script: [
    {
      'async': true,
      'src': 'https://umami.isconte.com/script.js',
      'data-website-id': '041aca14-99aa-4427-88ab-52717fd0ee8f',
    },
  ],
})

const { isLargeScreen, isMediumScreen, isSmallScreen } = useScreenSize()
const screenSizeStore = useScreenStore()

const screenSize = computed(() => {
  if (isLargeScreen.value)
    return 'large'
  if (isMediumScreen.value)
    return 'medium'
  if (isSmallScreen.value)
    return 'small'
  return 'large'
})

watchImmediate(screenSize, () => {
  screenSizeStore.setScreenSize(screenSize.value)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.5s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
