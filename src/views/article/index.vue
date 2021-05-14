<template>
  <div class="content-detail-container">
    <div
      v-show="showList"
      class="title-content"
      :class="{ 'only-list': !showDetail }"
      :style="{ 'min-width': sideWidth + 'px', 'max-width': sideWidth + 'px' }"
    >
      <div
        class="title-list-container"
        :style="{
          width: sideWidth > 0 ? sideWidth + 'px' : $config.staticWidth,
        }"
      >
        <div
          class="title-item"
          v-for="item in items"
          :key="item.id"
          :id="'nav-item-' + item.id"
          @click="$router.push({ params: { id: item.id } })"
        >
          <div class="title">
            {{ item.title }}
          </div>
          <div class="info">
            <span class="time">
              {{ $dayjs(item.info_at).format("YYYY-MM-DD") }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="touch-div"
      ref="moveDom"
      :class="{
        hidden: (showDetail && !showList) || (!showDetail && showList),
      }"
      :style="{ height: detailHeight ? detailHeight + 'px' : '100%' }"
    ></div>

    <div
      v-if="showDetail"
      class="detail-content"
      :style="{ width: $config.staticWidth - 4 - sideWidth + 'px' }"
    >
      <div id="article-detail-title" class="title">
        <span class="name">
          {{ title }}
        </span>
        <span class="date">
          {{ $dayjs(fullData.updated_at).format("YYYY-MM-DD") }}
        </span>
      </div>
      <template v-if="platform === 'YUQUE'">
        <iframe
          :srcdoc="data"
          style="width: 100%; height: calc(100vh - 4px); border: none"
          frameborder="0"
          scrolling="auto"
        ></iframe>
      </template>
      <template v-else>
        <div
          id="article-detail-body"
          class="markdown-container markdown-body"
          v-html="data"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import { articleMixin } from '@/utils/mixin';
import Article from '@/api/article';

export default {
  name: 'Article',
  mixins: [articleMixin],
  data() {
    return {
      loading: true,

      items: [],
      offset: 0,
      limit: 100,
      busy: false,
      total: 0,

      data: '',
      title: '',
      platform: 'ORI',
      fullData: '',

      sideWidthDefault: 300,
      sideWidth: 0,
      sideMaxWidth: 500,
      sideMinWidth: 220,
      clientStartX: 0,

      detailHeight: 0,
    };
  },
  computed: {
    listHeight() {
      return this.contentHeight;
    },
    id() {
      const id = this.$route.params.id ? this.$route.params.id : 0;
      return id;
    },
    showDetail() {
      return this.id && this.data;
    },
  },
  watch: {
    id: function(target, old) {
      this.detail();
      this.active(target, old);
      this.showListAction(this.showListDeal());
      if (!target) {
        this.data = '';
        this.sideWidth = 0;
      } else {
        this.sideWidth = this.sideWidthDefault;
      }
      if (!old) {
        this.$nextTick(() => {
          this.dragControllerDeal();
        });
      }
    },
    clientWidth: function(target) {
      this.showListAction(this.showListDeal());
    }
  },
  async created() {
    await this.index();
    this.showListAction(this.showListDeal());
    if (this.id) {
      this.sideWidth = this.sideWidthDefault;
      await this.detail();
      await this.active(this.id, 0);
      this.dragControllerDeal();
    }
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
  methods: {
    async index() {
      const { offset, limit } = this;
      const res = await Article.index({ offset, limit });
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
    detail() {
      Article.docDetail(this.id).then(
        response => {
          if (response.data.code === 0) {
            const data = response.data.data.res;
            const platform = data.platform;
            if (platform === 'ORI') {
              this.data = data.content_html;
            }
            if (platform === 'YUQUE') {
              this.data = data.yuque_content.body_html;
            }
            this.title = data.title;
            this.fullData = data;
            this.$nextTick(() => {
              this.setDragHeight();
            });
          }
        }
      );
    },
    active(id, oldId) {
      const newDom = document.querySelector('#nav-item-' + id);
      const oldDom = document.querySelector('#nav-item-' + oldId);
      if (newDom) {
        newDom.classList.add('active');
      }
      if (oldDom) {
        oldDom.classList.remove('active');
      }
    },
    dragControllerDeal() {
      const moveDom = this.$refs.moveDom;
      moveDom.onmousedown = e => {
        this.clientStartX = e.clientX;
        e.preventDefault();
        document.onmousemove = e => {
          this.moveHandle(e.clientX);
        };

        document.onmouseup = e => {
          document.onmouseup = null;
          document.onmousemove = null;
          this.setDragHeight();
        };
      };
    },
    moveHandle(nowClientX) {
      const computedX = nowClientX - this.clientStartX;
      let changeWidth = this.sideWidth + computedX;

      if (changeWidth < this.sideMinWidth) {
        changeWidth = this.sideMinWidth;
      }

      if (changeWidth > this.sideMaxWidth) {
        changeWidth = this.sideMaxWidth;
      }
      this.sideWidth = changeWidth;
      this.clientStartX = nowClientX;
    },
    showListDeal() {
      if (!this.id) {
        return true;
      } else {
        if (this.clientWidth < this.$config.articleShowListWidth) {
          return false;
        } else {
          return true;
        }
      }
    },
    setDragHeight() {
      if (this.id) {
        const titleDom = document.querySelector('#article-detail-title');
        const titleHeight = window.getComputedStyle(titleDom).getPropertyValue('height');
        const bodyDom = document.querySelector('#article-detail-body');
        const bodyHeight = window.getComputedStyle(bodyDom).getPropertyValue('height');
        const windowHeight = window.innerHeight;
        const detailHeight = parseFloat(titleHeight.slice(0, -2)) + parseFloat(bodyHeight.slice(0, -2));
        this.detailHeight = detailHeight > windowHeight ? detailHeight : windowHeight;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
