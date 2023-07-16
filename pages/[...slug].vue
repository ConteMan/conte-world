<script setup lang="ts">
const query = queryContent('/')
</script>

<template>
  <main class="flex w-full h-full min-h-screen box-border">
    <div class="h-full w-[400px] py-4 px-6 flex flex-col gap-4">
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <NuxtLink
          v-for="link of navigation"
          :key="link._path"
          :to="link._path"
        >
          {{ link.title }}
        </NuxtLink>
      </ContentNavigation>
    </div>
    <div>
      <ContentDoc />
    </div>
  </main>
</template>
