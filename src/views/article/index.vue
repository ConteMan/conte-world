<template>
  <div :style="{ 'height': listHeight }">
    <a-spin
      :spinning="loading"
      wrapperClassName="spin-loading-container"
      tip="Hello, ConteMan"
    >
      <a-icon slot="indicator" class="spin-loading" type="loading" spin />
      <div
        class="list-content"
        v-infinite-scroll="loadMore"
        infinite-scroll-delay="1000"
        :infinite-scroll-disabled="busy"
        infinite-scroll-distance="200"
        infinite-scroll-immediate-check="true"
        :style="{ 'height': listHeight }"
      >
        <template v-if="items.length">
          <template v-for="item in items">
            <div :key="item.id" class="list-item" @click="$router.push({name: 'ArticleDetail', params: {id: item.id}})">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="info">
                <span class="time">
                  {{ $dayjs(item.info_at).format("YYYY-MM-DD") }}
                </span>
              </div>
            </div>
          </template>
        </template>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Article from '@/api/article'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'Article',
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      loading: true,

      items: [],
      offset: 0,
      limit: 20,
      busy: false,
      total: 0,

      pageHeight: document.body.clientHeight,
    }
  },
  computed: {
    listHeight() {
      return this.pageHeight + 'px'
    }
  },
  async created() {
    await this.index()
    setTimeout(() => {
      this.loading = false
    }, 300)
    const that = this
    window.onresize = () => {
      return (() => {
        that.pageHeight = document.body.clientHeight
      })()
    }
  },
  methods: {
    async index() {
      const { offset, limit } = this
      const res = await Article.index({ offset, limit })
      if (res.data.code === 0) {
        const { hasMore, items, totalCount } = res.data.data
        this.total = totalCount
        this.busy = hasMore
        if (items.length > 0) {
          this.items = this._.concat(this.items, items)
        }
      }
    },
    loadMore() {
      this.offset += this.limit
      this.index()
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

.list-content {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .list-item {
    padding: 16px;
    &:hover {
      cursor: pointer;
      background-color: @grey-20;
      .title {
        color: @red;
      }
    }
    .info {
      text-align: left;
      font-size: 12px;
      padding: 8px 0 0 0;
    }
  }
}
</style>
