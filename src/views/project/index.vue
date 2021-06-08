<template>
  <div class="talk-list">
    <div class="item-container">
      <div v-for="item in filterItems" :key="item.id" class="list-item">
        <div class="card">
          <p>
            {{ item.content_origin.name }}
          </p>
          <p>
            {{ item.content_origin.description || '' }}
          </p>
          <p>
            <a :href="item.content_origin.html_url">{{ item.content_origin.html_url }}</a>
          </p>
        </div>
        <div class="info">
          <span class="time">
            {{ $dayjs(item.content_origin.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Base from '@/api/project';

export default {
  name: 'Project',
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      loading: true,

      items: [],
      offset: 0,
      limit: 100,
      total: 0,

      hasMore: true,
    };
  },
  computed: {
    filterItems() {
      const newItems = [];
      this.items.forEach(element => {
        if (!element.content_origin.fork) {
          newItems.push(element);
        }
      });
      return newItems;
    }
  },
  async created() {
    await this.index();
  },
  methods: {
    async index() {
      const { offset, limit } = this;
      const res = await Base.index({ offset, limit });
      if (res.data.code === 0) {
        const { hasMore, items, totalCount } = res.data.data;
        this.total = totalCount;
        this.hasMore = hasMore;
        if (items.length > 0) {
          this.items = this._.concat(this.items, items);
        }
        if (hasMore) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return -1;
      }
    },
    async infiniteHandler($state) {
      this.offset += this.limit;
      const res = await this.index();
      if (res > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
