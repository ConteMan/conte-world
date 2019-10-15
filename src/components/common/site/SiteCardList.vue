<template>
    <div class="siteContainer">
        <a-list
                :grid="{ gutter: 16, column: 4 }"
                :dataSource="tItem.sites"
                v-for="tItem in data"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :title="item.name" class="cardItem">
                    <a :href="item.url" target="_blank">{{ item.url }}</a>
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "SiteCardList",
        data(){
            return {
                data: []
            }
        },
        mounted() {
            this.getSites()
        },
        methods: {
            getSites: function(){
                var _this = this
                this.$api.site.getAll().then(
                    (response) => {
                        _this.data = response.data
                    }
                )
            }
        }
    }
</script>

<style scoped lang="less">
    .cardItem{
        /deep/ .ant-card-body{
            overflow: hidden;
        }
    }
    .siteContainer{
        padding: 5px;
        margin: auto;
    }
</style>