<template>
  <div>
    <div class="list-header">
      {{ $config.oneTitle }}
    </div>
    <card/>
  </div>
</template>

<script>
    import Card from "@/components/one/Card"

    export default {
        name: "index",
        components: {
            Card
        },
    }
</script>

<style scoped>

</style>