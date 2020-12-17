<template>
  <div>
    <div class="list-header">
      {{ $config.filmTitle }}
    </div>
    <div class="fixed-header-container" style="height: calc(100% - 55px);position: relative">
      <vxe-grid
        border="none"
        show-header-overflow
        highlight-hover-row
        width="100%"
        size="small"
        :loading="loading"
        :data="tableData"
        :pager-config="tablePage"
        :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
        @page-change="handlePageChange"
      >
        <vxe-table-column type="expand" width="60">
          <template v-slot:content="{ row }">
            <template>
              <a-divider orientation="left">信息</a-divider>
              <div class="word-inline">{{ row.intro }}</div>

              <a-divider orientation="left">链接</a-divider>
              <div class="word-inline">
                <a :href="row.link" target="_blank">{{ row.link }}</a>
              </div>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="date" title="日期" width="100"></vxe-table-column>
        <vxe-table-column field="title" title="名称" showOverflow="tooltip"></vxe-table-column>
      </vxe-grid>
    </div>
  </div>
</template>

<script>
import doubanApi from '@/api/douban'

export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      tableData: [],
      tableToolbar: {
        refresh: true,
        zoom: true,
        custom: true
      },
      tablePage: {
        size: 'mini',
        total: 0,
        currentPage: 1,
        pageSize: 15,
        align: 'left',
        pageSizes: [15],
        'pager-count': 5,
        layouts: ['PrevPage', 'Number', 'NextPage', 'FullJump', 'PageCount', 'Total'],
      },
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      const params = {
        start: (this.tablePage.currentPage - 1) * this.tablePage.pageSize,
      }
      this.loading = true
      doubanApi.movieCollect(params).then(
        response => {
          this.loading = false
          this.tableData = response.data.data.items
          this.tablePage.total = response.data.data.total_count
        }
      )
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.list()
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

/deep/ .vxe-pager--wrapper {
  margin: 10px 15px 0 0;
}

/deep/ .vxe-body--expanded-column {
  background: #fafafa;

  .vxe-body--expanded-cell {
    padding: 0 20px 20px;
    font-size: 12px;

    .ant-divider-inner-text {
      font-size: 12px;
    }
  }
}

.word-inline {
  word-break: break-all;
}
</style>
