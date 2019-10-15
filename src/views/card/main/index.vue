<template>
    <global-layout>
        <template v-slot:content>
            <div class="c-container">
<!--                <a-row>-->
<!--                    <a-col span="24">-->
<!--                        <IPSearch class="c-border ipsearch"></IPSearch>-->
<!--                    </a-col>-->
<!--                </a-row>-->
<!--                <a-row class="m-top-5" :gutter="16">-->
<!--                    <a-col span="12">-->
<!--                        <v2ex-list class="c-border"></v2ex-list>-->
<!--                    </a-col>-->
<!--                </a-row>-->
<!--                <a-row class="m-top-5">-->
<!--                    <a-col span="12">-->
<!--                        <one-card class="c-border"></one-card>-->
<!--                    </a-col>-->
<!--                </a-row>-->
<!--                <a-row class="m-top-5">-->
<!--                    <a-col span="24">-->
<!--                        <top-list-tab class="c-border"></top-list-tab>-->
<!--                    </a-col>-->
<!--                </a-row>-->
<!--                <a-row class="m-top-5">-->
<!--                    <a-col span="10">-->
<!--                        <site-card-list class="c-border"></site-card-list>-->
<!--                    </a-col>-->
<!--                </a-row>-->
                <a-row class="m-top-5">
                    <a-col span="24">
                        <site-grid-card class="c-border"></site-grid-card>
                    </a-col>
                </a-row>
            </div>
        </template>
    </global-layout>
</template>

<script>
    import GlobalLayout from "../../../layouts/common/GlobalLayout"
    import IPSearch from "../../../components/nav/search/IPSearch"
    import V2exList from "../../../components/common/v2ex/V2exList"
    import OneCard from "../../../components/common/one/OneCard"
    import TopListTab from "../../../components/common/topList/TopListTab"
    import SiteCardList from "../../../components/common/site/SiteCardList"
    import SiteGridCard from "../../../components/common/site/SiteGridCard"

    export default {
        name: "index",
        components: {
            GlobalLayout,
            IPSearch,
            V2exList,
            OneCard,
            TopListTab,
            SiteCardList,
            SiteGridCard
        }
    }
</script>

<style scoped lang="less">
    .c-container{
        width: 100%;
        overflow: hidden;
    }
    .c-border{
        border: 1px solid #000000;
    }
    .ipsearch{
        min-width: 250px;
        height: 200px;
        padding: 20px;

    }
    .m-top-5{
        margin-top: 16px;
    }
    /deep/ .ant-layout-header{
        background-color: #f0f2f5;
    }
</style>