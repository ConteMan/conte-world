<script setup lang="ts">
import type { MovieListItem } from '@/api/movie'

defineProps<{
  item: MovieListItem
}>()
</script>

<template>
  <div class="group flex flex-col gap-4 p-6 border border-gray-200 bg-white transition-all duration-300 hover:border-gray-900 hover:shadow-sm">
    <div class="flex-1 min-w-0">
      <div class="flex items-baseline justify-between gap-4 mb-1">
        <h3 class="text-lg font-medium text-gray-900 group-hover:text-black truncate">
          {{ item.movie.title }}
        </h3>
        <span class="shrink-0 text-sm font-mono text-gray-400">{{ item.movie.year }}</span>
      </div>
      
      <p v-if="item.movie.subtitle" class="text-sm text-gray-500 mb-3 truncate">
        {{ item.movie.subtitle }}
      </p>

      <div class="flex items-center gap-2 mb-4">
        <span class="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-sm uppercase tracking-wider">
          {{ item.movie.type }}
        </span>
      </div>

      <p v-if="item.comment" class="text-sm text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-3 italic">
        "{{ item.comment }}"
      </p>
    </div>
  </div>
</template>
