<template>
  <div :style="{ 'height': listHeight + 'px'}">
    <div
      class="infinite-list list-content"
      v-infinite-scroll="loadMore"
      infinite-scroll-delay="1000"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="220"
      infinite-scroll-immediate-check="true"
      :style="{ 'height': listContentHeight + 'px' }"
      ref="infinite-list"
    >
      <a-affix class="affix" :offset-top="0" :target="() => this.$refs['infinite-list']">
        <div class="nav-bar">
          <a-space>
            <span
              v-for="item in types"
              :key="item.type"
              class="nav-item"
              :class="{ 'active': type === item.type }"
              @click="changeType(item.type)"
            >
              {{ item.value }} {{ item.total }}
            </span>
          </a-space>
        </div>
      </a-affix>
      <template v-if="items.length">
        <template v-for="item in items">
          <div :key="item.id" class="list-item">
            <div class="pic">
              <img referrerpolicy='no-referrer' :src="item.content_origin.pic" />
            </div>
            <div class="title">
              <a :href="item.content_origin.link" target="_blank">{{ item.content }}</a>
            </div>
            <div class="rate">
              <a-rate v-if="item.content_origin.rate" v-model="item.content_origin.rate" disabled />
            </div>
            <div v-if="item.content_origin.comment" class="comment">
              {{ item.content_origin.comment }}
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
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin';
import infiniteScroll from 'vue-infinite-scroll';
import Movie from '@/api/movie';

export default {
  name: 'Movie',
  directives: {
    infiniteScroll,
  },
  mixins: [mixin],
  data() {
    return {
      loading: true,

      items: [],
      offset: 0,
      type: '',
      limit: 20,
      busy: false,
      total: 0,

      types: []
    };
  },
  computed: {
    listHeight() {
      return this.contentHeight;
    },
    listContentHeight() {
      return this.contentHeight;
    },
  },
  async created() {
    await this.getTypes();
    await this.index();
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
  methods: {
    init() {
      this.loading = true;

      this.items = [];
      this.offset = 0;
      this.busy = false;
      this.total = 0;
    },
    async index() {
      const { offset, limit, type } = this;
      const res = await Movie.index({ offset, limit, type });
      if (res.data.code === 0) {
        const { hasMore, items, totalCount } = res.data.data;
        this.total = totalCount;
        this.busy = !hasMore;
        if (items.length > 0) {
          this.items = this._.concat(this.items, items);
        }
      }
    },
    loadMore() {
      this.offset += this.limit;
      this.index();
    },
    async getTypes() {
      const res = await Movie.types();
      if (res.data.code === 0) {
        const { items } = res.data.data;
        this.types = items;
        this.type = items[0].type;
      }
    },
    async changeType(type) {
      if (this.type === type) {
        return false;
      }
      this.type = type;
      this.init();
      await this.index();
      this.loading = false;
    }
  },
};
</script>

<style lang="less" scoped>
@import "./index";
</style>
