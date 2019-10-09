<template>
    <GlobalLayout>
        <template v-slot:header>
            <div class="h-container">
                <span class="logo">BoTalk</span>
            </div>
        </template>
        <template v-slot:content>
            <div class="c-container">
                <a-row type="flex" justify="center" align="middle">
                    <a-col span="12">
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
                                <div v-if="!listLoading">
                                    {{item.content}}
                                </div>
                            </a-list-item>
                        </a-list>
                    </a-col>
                </a-row>
            </div>
        </template>
        <template v-slot:footer>
            <div v-if="oneShow">
                {{ oneData.text }} via. {{ oneData.text_authors }}
            </div>
        </template>
    </GlobalLayout>
</template>

<script>
    import GlobalLayout from "../../../layouts/botalk/GlobalLayout";
    import OneCard from "../../../components/botalk/OneCard";

    export default {
        name: 'home',
        components: {
            GlobalLayout,
            OneCard
        },
        data() {
            return {
                listData: [
                    {},
                    {},
                    {},
                    {},
                ],
                listLoading: true,
                oneData: {},
                oneShow: false,
            }
        },
        beforeCreate() {
        },
        mounted() {
            this.v2ex()
            this.one()
        },
        methods:{
            v2ex(){
                var _this = this
                this.$api.v2ex.hot().then(
                    (response) => {
                        _this.listData = response.data
                        _this.listLoading = false
                        console.log(_this.listData)
                    }
                )
            },
            one(){
                var _this = this
                this.$api.one.ones().then(
                    (response) => {
                        _this.oneData = response.data
                        _this.oneShow = true
                    }
                )
            }
        }
    }
</script>

<style scoped lang="less">
    .logo{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
    }
    .c-container{
        width: 100%;
        height: 100%;
        padding: 1rem;
    }
</style>