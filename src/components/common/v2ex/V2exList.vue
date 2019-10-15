<template>
    <div>
        <a-list
            bordered
            itemLayout="vertical"
            size="small"
            :dataSource="listData"
            style="text-align: left;"
        >
            <div slot="header">
                <h3>V2EX</h3>
            </div>
            <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                <a-skeleton :loading="listLoading" active avatar>
                    <a-list-item-meta :description="item.node.title" v-if="!listLoading">
                        <a slot="title" :href="item.url">{{item.title}}</a>
                        <a-avatar slot="avatar" :src="item.member.avatar_mini" />
                    </a-list-item-meta>
                </a-skeleton>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "V2exList",
        data(){
            return {
                listLoading: true,
                listData: [
                    {},
                    {},
                    {},
                    {},
                ],
            }
        },
        methods:{
            v2ex(){
                var _this = this
                this.$api.v2ex.hot().then(
                    (response) => {
                        _this.listData = response.data
                        _this.listLoading = false
                    }
                )
            },
        },
        mounted() {
            this.v2ex()
        }
    }
</script>

<style scoped>

</style>