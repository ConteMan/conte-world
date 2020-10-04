<template>
    <div>
        <div class="list-header">
            {{ $config.articleListTitle }}
        </div>
        <div class="list-container">
            <a-list
                    itemLayout="vertical"
                    size="small"
                    :bordered="false"
                    :loading="loading"
                    :dataSource="data"
            >
                <a-list-item slot="renderItem" slot-scope="item, index" :key="item.slug" @click="turnTo({name: 'ArticleDetail', params: {id: item.id}})">
                    <div class="article-l-item">
                        <div class="article-l-title">{{ item.title }}</div>
                        <div class="article-l-time">
                            {{ $dayjs(item.published_at).format("YYYY-MM-DD") }}
                        </div>
                    </div>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script>
    import articleApi from "@/api/article"

    export default {
        name: "index",
        data() {
            return {
                loading: false,
                data: []
            }
        },
        created() {
            this.list()
        },
        methods: {
            turnTo(params) {
              this.$router.push(params)
            },
            list() {
                this.loading = true
              articleApi.docs().then(
                    responese => {
                        this.loading = false
                        this.data = responese.data.data.items
                    }
                )
            },
        }
    }
</script>

<style scoped lang="less">
    @import "~@/style/variables";

    /deep/ .ant-list-vertical .ant-list-item-content {
        margin: 0;
        padding: 10px 8px;
    }
    .list-container {
        padding: 0 10px;
    }
    .article-l-item {
        cursor: pointer;
        .article-l-title {
            display: inline-block;
        }
        .article-l-time {
            display: inline-block;
            text-align: right;
            float: right;
        }
    }
    .article-l-item:hover {
        .article-l-title{
            color: @red;
        }
    }
</style>
