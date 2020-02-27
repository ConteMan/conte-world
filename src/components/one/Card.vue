<template>
    <div>
        <div class="tool-bar">
            <div class="title">{{ one.title }}</div>
            <div class="date">{{ $dayjs(one.date).format('YYYY / MM / DD') }}</div>
            <a-icon class="tool-icon" type="reload" @click="ones" :spin="loading"/>
        </div>
        <div class="one">
            {{ one.content }}
            <br>
            {{ one.text_authors }}

            <div class="img-container">
                <img :src="one.img_url"/>
                <div>{{ one.picture_author }}</div>
            </div>
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
                loading: false
            }
        },
        methods: {
            ones() {
                this.loading = true
                oneApi.ones().then(
                    (response) => {
                        this.loading = false
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
        margin: 10% 0;
        padding: 0 20px;
        .img-container {
            padding: 40px 0;
            width: 100%;
            img {
                width: 100%;
            }
            div {
                padding: 10px 0;
            }
        }
    }
    .tool-bar {
        text-align: center;
        height: 20px;
        padding: 10px 20px;
        .title {
            float: left;
            display: inline-block;
            width: 60px;
            text-align: left;
        }
        .date {
            display: inline-block;
            margin-left: -60px;
        }
        .tool-icon {
            float: right;
        }
    }
</style>