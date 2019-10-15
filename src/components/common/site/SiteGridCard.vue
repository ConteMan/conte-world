<template>
    <div>
        <a-row v-for="(item, index) in data">
            <a-card :title="item.name">
                <a-card-grid v-for="sItem in item.sites">
                    {{ sItem.name }}
                </a-card-grid>
            </a-card>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "SiteGridCard",
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
    .margin-t-5{
        margin-top: 5px;
    }
</style>