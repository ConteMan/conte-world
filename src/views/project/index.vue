<template>
  <div class="project-list">
    <div v-if="filterItems.length" class="item-container">
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
      <infinite-loading spinner="waveDots" @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Base from '@/api/project.js';

export default {
  name: 'Project',
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      data: [],
      offset: 0,
      limit: 20,
      total: 0,

      hasMore: true,
    };
  },
  computed: {
    filterItems() {
      const items = [];
      this.data.forEach(element => {
        if (!element.content_origin.fork) {
          items.push(element);
        }
      });
      return items;
    }
  },
  async created() {
    await this.index();
  },
  methods: {
    async index() {
      const { offset, limit } = this;
      const res = await Base.index({ offset, limit });
      if (res.status === 200) {
        const { data } = res.data;
        const { total, has_more: hasMore } = res.data.meta;
        this.total = total;
        this.hasMore = hasMore;
        if (data.length) {
          this.data = this._.concat(this.data, data);
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
