<template>
    <vxe-grid
            resizable
            border="none"
            show-header-overflow
            highlight-hover-row
            height="auto"
            width="100%"
            size="small"
            :loading="loading"
            :columns="tableColumn"
            :data="tableData"
            :toolbar="tableToolbar"
            :pager-config="tablePage"
            :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
            @page-change="handlePageChange"
    ></vxe-grid>
</template>

<script>
    import doubanApi from "@/api/douban"

    export default {
        name: "index",
        data() {
            return {
                loading: false,
                tableColumn: [
                    { type: 'seq', width: 50 },
                    {
                        field: 'date',
                        title: '日期',
                        showOverflow: 'tooltip',
                    },
                    {
                        field: 'title',
                        title: '名称',
                        showOverflow: 'tooltip',
                    },
                    {
                        field: 'intro',
                        title: '简介',
                        showOverflow: 'tooltip',
                    },
                    {
                        field: 'link',
                        title: '链接',
                        showOverflow: 'tooltip',
                        slots: {
                            // 使用 JSX 渲染函数
                            default: ({ row }, h) => {
                                return [
                                    <a href={ row.link }>{ row.link }</a>
                                ]
                            }
                        }
                    },
                    {
                        field: 'pic',
                        title: '图片',
                        showOverflow: 'tooltip',
                    }
                ],
                tableData: [],
                tableToolbar: {
                    refresh: true,
                    zoom: true,
                    custom: true
                },
                tablePage: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 15,
                    align: 'left',
                    pageSizes: [15],
                    'pager-count': 5,
                    layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total', 'PageCount'],
                    perfect: true
                },
            }
        },
        created() {
            this.list()
        },
        methods: {
            list() {
                let params = {
                    start: (this.tablePage.currentPage - 1) * this.tablePage.pageSize,
                }
                this.loading = true
                doubanApi.movieCollect(params).then(
                    responese => {
                        this.loading = false
                        this.tableData = responese.data.data
                        this.tablePage.total = responese.data.total
                    }
                )
            },
            handlePageChange ({ currentPage, pageSize }) {
                this.tablePage.currentPage = currentPage
                this.tablePage.pageSize = pageSize
                this.list()
            }
        }
    }
</script>

<style scoped>

</style>