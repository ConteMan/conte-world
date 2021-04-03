<template>
  <div class="layout-container">
    <div class="base-container">
      <template v-if="sideShow">
        <div
          class="side-container"
          ref="sideDom"
          :style="{ 'width': sideWidth + 'px' }"
        >
          <sidebar/>
        </div>
        <div
          class="touch-div"
          ref="moveDom"
        >
          <span></span>
        </div>
      </template>
      <a-drawer
        placement="left"
        wrapClassName="sidebar-drawer"
        :closable="false"
        :visible="menuStatus && isDrawer"
        width="40%"
        @close="drawerClose"
      >
        <sidebar/>
      </a-drawer>

      <div
        class="content-container"
      >
        <content-header
          class="content-header"
        />
        <router-view class="router-container" :class="{ 'header-pin': headerPin }" />
      </div>

    </div>
  </div>
</template>

<script>
import ContentHeader from '@/layout/components/ContentHeader';
import Sidebar from '@/components/header/Sidebar';

import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'BaseLayout',
  components: {
    ContentHeader,
    Sidebar,
  },
  mixins: [mixin],
  data() {
    return {
      timer: false,
      drawerVisible: false,

      sideWidth: 300,
      sideMaxWidth: 500,
      sideMinWidth: 220,
      clientStartX: 0,

      scrollTop: 0,
    };
  },
  computed: {
    isDrawer: function() {
      return this.isMobile;
    },
    sideShow: function() {
      return !this.isMobile && this.menuStatus;
    }
  },
  created() {
    window.addEventListener('resize', () => {
      if (!this.timer) {
        this.timer = true;
        setTimeout(
          () => {
            this.setContentHeight();
            this.timer = false;
          }, 400);
      }
    }, false);
    window.addEventListener('scroll', this.throttle(this.scrollDeal, 200), true);
  },
  mounted() {
    if (this.sideShow) {
      this.dragControllerDeal();
    }
    this.setContentHeight();
  },
  watch: {
    sideShow(target) {
      if (target) {
        // sure the side dom exist
        this.$nextTick(() => {
          this.dragControllerDeal();
        });
      }
    },
    '$route': 'deal'
  },
  methods: {
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
      contentHeightAction: MT.CONTENT_HEIGHT,
    }),
    drawerClose() {
      this.menuAction(false);
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
    setContentHeight() {
      const contentDom = document.querySelector('.content-container');
      const height = window.getComputedStyle(contentDom).getPropertyValue('height');
      this.contentHeightAction(parseInt(height));
    },
    scrollDeal(event) {
      const className = event.target.className;
      const classes = className.split(' ');
      if (classes.includes('infinite-list') && !this.headerPin) {
        this.scrollHandle(event);
      }
    },
    // 滚动处理
    scrollHandle(event) {
      const headerHeight = this.$config.headerHeight;
      const headerHideHeight = this.$config.headerHideHeight;
      const show = this.headerHeight === headerHeight;
      const currentScrollTop = event.target.scrollTop;
      if (!show) {
        if (currentScrollTop - headerHeight <= 0 || currentScrollTop < this.scrollTop) {
          this.headerHeightAction(headerHeight);
        }
      } else {
        if (currentScrollTop > this.scrollTop && currentScrollTop - headerHeight > 0) {
          this.headerHeightAction(headerHideHeight);
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
    },
    deal() {
      this.scrollTop = 0;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDrawer) {
      this.menuAction(false);
    }
    next();
  },
};
</script>

<style scoped lang="less">
@import './index.less';
</style>
