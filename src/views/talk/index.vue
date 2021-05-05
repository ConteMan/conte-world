<template>
    <div class="talk-list">
      <div class="item-container">
        <div v-for="item in items" :key="item.id" class="list-item">
          <div class="card" v-if="['conteworld_talk'].includes(item.platform_type)" v-html="item.content" />
          <div class="card" v-if="['yuque_note'].includes(item.platform_type)" v-html="yuqueNoteFormat(item.content)" />
          <div class="info">
            <span class="time">
              {{ $dayjs(item.info_at).format("YYYY-MM-DD HH:mm:ss") }}
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
import Talk from '@/api/talk';

export default {
  name: 'Talk',
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
      limit: 20,
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
      const res = await Talk.index({ offset, limit, type });
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
@import "./index.less";
</style>
