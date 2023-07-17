<template>
  <div class="content-layout w-full min-h-screen flex flex-row justify-center items-center">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
:deep(a) {
  @apply text-gray-700 visited:text-gray-700 underline underline-offset-4 decoration-1;
}
:deep(blockquote) {
  @apply relative my-6;
  :before {
    content: '';
    @apply absolute h-full top-0 left-[-40px] border border-solid border-x-4;
  }
}
</style>
