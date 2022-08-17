<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    default: 'Empty',
    required: false,
  },
})
</script>

<template>
  <div text="red 4xl" flex items-center>
    <mdi-account-box />
    <span ml-2>{{ msg }}</span>
  </div>
  <div />
</template>

<style scoped>
</style>
