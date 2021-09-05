<template>
  <div class="talk-list">
    <div class="item-container">
      <div v-for="item in data" :key="item.id" class="list-item">
        <div class="card">
          <p>
            {{ item.name }}
          </p>
          <p>
            {{ item.description || '' }}
          </p>
          <p>
            <a :href="item.site_url">{{ item.site_url }}</a>
          </p>
          <p v-if="item.version && Object.keys(item.version).length">
            <span v-for="(vItem, name, index) in item.version" :key="vItem.name">
              <template v-if="index !== 0"> | </template>
              <span v-if="name !== 'default'">{{ vItem.name }}: </span>
              <span>{{ vItem.version }}</span>
            </span>
          </p>
        </div>
        <div class="info">
          <span class="time">
            {{ $dayjs(item.updated_at).format('YYYY-MM-DD HH:mm') }}
          </span>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Base from '@/api/software.js';

export default {
  name: 'Software',
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      data: [],
      offset: 0,
      limit: 100,
      total: 0,

      hasMore: true,
    };
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
