<template>
  <div class="worldline-container">
    <div class="worldline-action-bar">
      <div class="platform-type">
        <a-space>
          <template v-for="item in platformTypes">
            <template v-if="platformTypes.length > 0">
              <a-button
                :key="item.key"
                class="platform-type-btn"
                :type="item.key === platformType ? 'primary' : ''"
                size="small"
                @click="changePlatformType(item.key)"
                >{{ item.value }} <template v-if="item.key === platformType">/ {{ total }}</template></a-button
              >
            </template>
          </template>
        </a-space>
      </div>
    </div>
    <div class="list-container">
      <div
        v-infinite-scroll="loadMore"
        class="list-content"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="200"
        infinite-scroll-immediate-check="true"
      >
        <template v-if="items.length">
          <div v-for="item in items" :key="item.slug" class="list-item">
            <div v-if="item.platform_type === 'yuque_note'" v-html="item.content" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
import WorldlineApi from '@/api/worldline';

export default {
  name: 'Worldline',
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      items: [],
      offset: 0,
      platformType: '',
      limit: 20,
      busy: false,
      total: 0,

      platformTypes: [
        {
          key: '',
          value: '全部',
        }
      ],
    };
  },
  created() {
    this.index();
    this.getPlatformTypes();
  },
  methods: {
    init() {
      this.items = [];
      this.offset = 0;
      this.busy = false;
    },
    async index() {
      const { offset, limit, platformType } = this;
      const res = await WorldlineApi.index({ offset, limit, platformType });
      const { items, totalCount } = res.data.data;
      this.total = totalCount;
      if (items.length > 0) {
        this.items = [...this.items, ...items];
        this.busy = false;
      } else {
        this.busy = true;
      }
    },
    loadMore() {
      this.offset += this.limit;
      this.index();
    },
    async getPlatformTypes() {
      const res = await WorldlineApi.platformTypes();
      this.platformTypes = [...this.platformTypes, ...res.data.data.items];
    },
    changePlatformType(platformType) {
      this.platformType = platformType;
      this.init();
      this.index();
    }
  }
};
</script>

<style lang="less" scoped>
@border-grey: rgba(206, 206, 206, 0.4);
@font-grey: rgba(206, 206, 206, 0.6);

.worldline-container {
  padding: 0 !important;
  height: 100vh;
  background-color: white;
  .worldline-action-bar {
    border: 1px solid @border-grey;
    border-top: none;
    padding: 24px;
    display: flex;
  }
  .list-container {
    height: calc(100vh - 74px);
    overflow-y: auto;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    .list-content {
      background: white;
      .list-item {
        border-bottom: 1px solid @border-grey;
        border-left: 1px solid @border-grey;
        border-right: 1px solid @border-grey;
        padding: 12px;
        &:hover {
          background-color: @border-grey;
        }
        .info {
          text-align: right;
          color: @font-grey;
          font-size: 12px;
          padding: 4px 0 0 0;
          .time {
            margin-right: 8px;
          }
        }
        .item-pic {
          width: 100%;
        }
      }
    }
  }
}
</style>
