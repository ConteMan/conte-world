<template>
  <div :style="{ 'height': listHeight + 'px' }">
    <a-spin
      :spinning="loading"
      wrapperClassName="spin-loading-container"
      tip="Hello, ConteMan"
    >
      <a-icon slot="indicator" class="spin-loading" type="loading" spin />
      <div
        class="list-content"
        id="scroll-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-delay="1000"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="220"
        infinite-scroll-immediate-check="true"
        :style="{ 'height': listHeight + 'px'}"
      >
        <template v-if="items.length">
          <template v-for="item in items">
            <div :key="item.id" class="list-item">
              <div class="card" v-if="['conteworld_talk'].includes(item.platform_type)" v-html="item.content" />
              <div class="card" v-if="['yuque_note'].includes(item.platform_type)" v-html="yuqueNoteFormat(item.content)" />
              <div class="info">
                <span class="time">
                  {{ $dayjs(item.info_at).format("YYYY-MM-DD HH:mm:ss") }}
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
import infiniteScroll from 'vue-infinite-scroll';
import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';
import Talk from '@/api/talk';

export default {
  name: 'Talk',
  directives: {
    infiniteScroll,
  },
  mixins: [mixin],
  data() {
    return {
      loading: true,
      timer: false,

      items: [],
      offset: 0,
      type: '',
      limit: 20,
      busy: false,
      total: 0,

      scrollTop: 0,
    };
  },
  computed: {
    listHeight() {
      return this.contentHeight - this.headerHeight;
    }
  },
  async created() {
    await this.index();
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
  async mounted() {
    this.scrollDeal();
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
    yuqueNoteFormat(data) {
      return data.replaceAll(/\<\!doctype\s\S*\>|\<meta[\s\S]*\/\>|data-lake\S{0,10}=\"\S{0,100}\"/g, '');
    },
    scrollDeal() {
      const scrollList = document.querySelector('#scroll-list');
      this.scrollTop = scrollList.scrollTop;
      if (scrollList) {
        scrollList.addEventListener('scroll', this.throttle(this.scrollHandle, 300), false);
      }
    },
    scrollHandle(event) {
      const headerHeight = this.$config.headerHeight;
      const headerHideHeight = this.$config.headerHideHeight;
      const diff = headerHeight - headerHideHeight;
      const currentScrollTop = event.target.scrollTop;
      if (this.headerHeight > headerHideHeight && currentScrollTop > this.scrollTop + diff) {
        this.headerHeightAction(headerHideHeight);
      } else {
        if (this.headerHeight <= headerHideHeight && currentScrollTop < this.scrollTop - diff) {
          this.headerHeightAction(headerHeight);
        }
      }
      this.scrollTop = currentScrollTop;
    },
    throttle(fn, interval = 300) {
      let canRun = true;
      return function() {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
          fn.apply(this, arguments);
          canRun = true;
        }, interval);
      };
    }
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
