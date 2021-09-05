<template>
  <div class="book-list">
    <div class="nav-bar">
      <a-space>
        <span
          v-for="item in types"
          :key="item.type"
          class="nav-item"
          :class="{ active: type === item.type }"
          @click="changeType(item.type)"
        >
          {{ item.value }} {{ item.total }}
        </span>
      </a-space>
    </div>

    <div class="item-container">
      <div v-for="item in data" :key="item.id" class="book-item">
        <div class="pic">
          <img referrerpolicy="no-referrer" :src="item.content_origin.pic" />
        </div>
        <div class="title">
          <a :href="item.content_origin.link" target="_blank">{{ item.content }}</a>
        </div>
        <div class="intro">
          {{ `${item.content_origin.author} / ${item.content_origin.publisher} / ${item.content_origin.publishDate}` }}
        </div>
        <div class="rate">
          <a-rate v-if="item.content_origin.rate" v-model="item.content_origin.rate" disabled />
        </div>
        <div v-if="item.content_origin.comment" class="comment">
          {{ item.content_origin.comment }}
        </div>
        <div class="info">
          <span class="time">
            {{ $dayjs(item.info_at).format('YYYY-MM-DD') }}
          </span>
        </div>
      </div>

      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
        <template v-slot:no-more>No more.</template>
        <template v-slot:no-results>No more.</template>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Base from '@/api/book.js';

export default {
  name: 'Book',
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      data: [],
      offset: 0,
      limit: 20,
      total: 0,
      type: '',

      hasMore: true,

      types: [],
      infiniteId: Number(new Date()),
    };
  },

  async created() {
    await this.getTypes();
  },

  methods: {
    init() {
      this.data = [];
      this.offset = 0;
      this.busy = false;
      this.total = 0;
      this.hasMore = true;
    },
    async index() {
      const { offset, limit, type } = this;
      const res = await Base.index({ offset, limit, type });
      if (res.status === 200) {
        const { data } = res.data;
        const { total, has_more: hasMore } = res.data.meta;
        this.total = total;
        this.hasMore = hasMore;
        if (data.length) {
          this.data = this._.concat(this.data, data);
        }
        if (hasMore) {
          this.offset += this.limit;
          return 1;
        } else {
          return 0;
        }
      } else {
        return -1;
      }
    },
    async infiniteHandler($state) {
      if (!this.types.length) {
        $state.loaded();
        return false;
      }
      if (!this.hasMore) {
        $state.complete();
        return true;
      }
      const res = await this.index();
      if (res > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async getTypes() {
      const res = await Base.types();
      if (res.status === 200) {
        const { data } = res.data;
        this.types = data;
        this.type = data[0].type;
        this.$nextTick(() => {
          this.index();
        });
      }
    },
    changeType(type) {
      if (this.type === type) {
        return false;
      }
      this.type = type;

      this.init();
      this.infiniteId += 1;
      this.index();
    }
  },
};
</script>

<style lang="less" scoped>
@import './index';
</style>
