<template>
  <div class="layout-container">

    <div class="content-container" ref="content-container">
      <router-view class="router-container" />
    </div>

    <content-header class="content-header" />

    <a-drawer
      placement="left"
      wrapClassName="sidebar-drawer"
      width="40%"
      :closable="false"
      :visible="menuStatus && isDrawer"
      @close="drawerClose"
    >
      <sidebar/>
    </a-drawer>
  </div>
</template>

<script>
import ContentHeader from '@/layout/components/ContentHeader';
import Sidebar from '@/components/header/Sidebar';

import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'BaseLayoutV2',
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
    },
    layoutWidth: function() {
      return this.layoutMode === 'static' ? this.$config.staticWidth + 'px' : '100%';
    },
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
  },

  mounted() {
    this.setContentHeight();
  },

  watch: {
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
    setContentHeight() {
      const contentDom = document.querySelector('.content-container');
      const height = window.getComputedStyle(contentDom).getPropertyValue('height');
      this.contentHeightAction(parseInt(height));
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
