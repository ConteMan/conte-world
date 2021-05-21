<template>
  <div class="talk-list">
    <div class="item-container">
      <div v-for="item in items" :key="item.id" class="list-item">
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
            <span v-for="(vItem, name, index) in item.version" :key="vItem">
              <template v-if="index !== 0"> | </template>
              <span v-if="name !== 'default'">{{ vItem.name }}: </span>
              <span>{{ vItem.version }}</span>
            </span>
          </p>
        </div>
        <div class="info">
          <span class="time">
            {{ $dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';
import Base from '@/api/software';

export default {
  name: 'Software',
  components: {
    InfiniteLoading,
  },
  mixins: [mixin],
  data() {
    return {
      loading: true,

      items: [],
      offset: 0,
      type: '',
      limit: 100,
      total: 0,

      hasMore: true,
    };
  },
  async created() {
    await this.index();
  },
  methods: {
    ...mapMutations('app', {
      headerHeightAction: MT.HEADER_HEIGHT,
    }),
    async index() {
      const { offset, limit, type } = this;
      const res = await Base.index({ offset, limit, type });
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
    yuqueNoteFormat(data) {
      return data.replaceAll(/\<\!doctype\s\S*\>|\<meta[\s\S]*\/\>|data-lake\S{0,10}=\"\S{0,100}\"/g, '');
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
