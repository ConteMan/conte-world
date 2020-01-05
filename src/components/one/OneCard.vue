<template>
    <div class="container">
        {{ one.text }}
        <div class="from">{{ one.text_authors }}</div>
    </div>
</template>

<script>
    import oneApi from "@/api/one/index"

    export default {
        name: "OneCard",
        data() {
            return {
                one: {},
            }
        },
        methods: {
            ones() {
                oneApi.ones().then(
                    (response) => {
                        this.one = response.data
                    }
                )
            }
        },
        mounted() {
            this.ones()
        },
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    .container {
        font-size: 12px;
        line-height: 20px;
        color: @font-color-grey;
    }
</style>