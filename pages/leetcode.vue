<script setup lang="ts">
definePageMeta({
  layout: 'content',
  middleware: 'redirect',
})

const query = queryContent('leetcode')
</script>

<template>
  <main class="box-border w-full h-screen flex">
    <div class="box-border h-full w-[400px] grow-0 shrink-0 py-4 px-6 flex flex-col gap-4">
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <NuxtLink to="/" class="mb-4 text-[16px]">
          Home
        </NuxtLink>
        <NuxtLink
          v-for="link of navigation[0].children"
          :key="link._path"
          :to="link._path"
        >
          {{ link.title }}
        </NuxtLink>
      </ContentNavigation>
    </div>
    <div class="grow-1 h-full overflow-y-auto">
      <NuxtPage />
    </div>
  </main>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
