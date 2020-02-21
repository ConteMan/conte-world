<template>
    <div class="container">
        <div class="content">
            {{ one.content }}
        </div>
        <div class="from">{{ one.text_authors }}</div>
    </div>
</template>

<script>
    import oneApi from "@/api/one"

    export default {
        name: "Card",
        data() {
            return {
                one: {},
            }
        },
        methods: {
            ones() {
                oneApi.ones().then(
                    (response) => {
                        this.one = response.data.data
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
        width: 100%;
        height: 100%;
        max-height: 500px;
        font-size: 12px;
        line-height: 20px;
        color: @font-color-grey;
        text-align: center;
        display: flex;
        flex-flow: wrap;
        margin: 0 20%;
    }
</style>