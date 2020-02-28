<template>
    <div>
        <div class="list-header">
            {{ $config.oneTitle }}
        </div>
        <card class="card"/>
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

<style scoped lang="less">
    .card {
        padding: 20px;
    }
</style>