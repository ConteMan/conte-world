<template>
    <div>
        <a-skeleton class="skeleton" :loading="loading" :avatar="false" :title="false" active :paragraph="{rows: 6, width:['100%', '60%', '60%', '100%', '100%', '100%']}" >
        </a-skeleton>
        <div class="card-container" v-show="!imageLoading">
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
                        <img :src="one.img_url" @load="showLoad"/>
                        <div>{{ one.picture_author }}</div>
                    </div>
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
                loading: false,
                imageLoading: true,
            }
        },
        methods: {
            ones() {
                this.loading = true
                this.imageLoading = true
                oneApi.ones().then(
                    (response) => {
                        this.one = response.data.data
                    }
                )
            },
            showLoad() {
                setTimeout(() => {
                    this.imageLoading = false
                    this.loading = false
                }, 800)
            }
        },
        created() {
            this.ones()
        },
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    /deep/ .ant-skeleton-paragraph {
        padding-inline-start: 0 !important;
    }
    .card-container,.skeleton {
        margin: auto;
        max-width: 800px;
    }
    .one {
        width: 100%;
        height: 100%;
        font-size: 12px;
        line-height: 20px;
        color: @font-color-grey;
        text-align: center;
        margin: 10% 0;
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
            line-height: 22px;
        }
    }
</style>
