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
        infinite-scroll-distance="220"
        infinite-scroll-immediate-check="true"
        :style="{ 'height': listHeight }"
      >
        <template v-if="items.length">
          <template v-for="item in items">
            <div :key="item.id" class="list-item">
              <div>
                <a :href="item.content_origin.link" target="_blank">{{ item.content }}</a>
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
import infiniteScroll from 'vue-infinite-scroll'
import Movie from '@/api/movie'

export default {
  name: 'Movie',
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      loading: true,

      items: [],
      offset: 0,
      type: '',
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
      const { offset, limit, type } = this
      const res = await Movie.index({ offset, limit, type })
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
    },
  },
}
</script>

<style lang="less" scoped>
@import "~@/style/variables";

.list-content {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .list-item {
    padding: 16px;
    &:hover {
      background-color: @grey-20;
    }
    .info {
      text-align: left;
      font-size: 12px;
      padding: 8px 0 0 0;
    }
  }
}
</style>
