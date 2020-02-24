<template>
    <div>
        <div class="tool-bar">
            <a-icon class="tool-icon" type="reload" @click="ones"/>
        </div>
        <div class="one">
            {{ one.content }}
            <br>
            {{ one.text_authors }}
        </div>
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
        created() {
            this.ones()
        },
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    .one {
        width: 100%;
        height: 100%;
        max-height: 500px;
        font-size: 12px;
        line-height: 20px;
        color: @font-color-grey;
        text-align: center;
        margin: 20% 0;
        padding: 0 10px;
    }
    .tool-bar {
        height: 20px;
        padding: 10px;
        .tool-icon {
            float: right;
        }
    }
</style>