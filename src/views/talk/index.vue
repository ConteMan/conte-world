<template>
  <div class="talk-list">
    <div class="item-container">
      <div
        v-for="item in data"
        :key="item.id"
        class="list-item pointer"
        @click.stop="$router.push({ path: '/share', query: { type: 'talk', slug: item.slug } })"
      >
        <div v-if="['conteworld_talk'].includes(item.platform_type)" class="card" v-html="item.content" />
        <div class="info">
          <span class="time">
            {{ $dayjs(item.info_at).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Base from '@/api/talk.js';

export default {
  name: 'Talk',
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      loading: true,

      data: [],
      offset: 0,
      limit: 20,
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
        const { has_more: hasMore, total } = res.data.meta;
        this.total = total;
        this.hasMore = hasMore;
        if (data.length > 0) {
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
