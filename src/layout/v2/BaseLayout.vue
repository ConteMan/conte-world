<template>
  <div class="layout-container">

    <div class="sidebar-container">
      <sidebar/>
    </div>

    <router-view class="router-container" />

    <content-header-bottom class="content-header" />

    <a-drawer
      placement="left"
      wrapClassName="sidebar-drawer"
      width="40%"
      :closable="false"
      :visible="isDrawer && menuStatus"
      @close="drawerClose"
    >
      <sidebar/>
    </a-drawer>

  </div>
</template>

<script>
import ContentHeaderBottom from '@/layout/components/ContentHeaderBottom.vue';
import Sidebar from '@/components/header/Sidebar';

import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'BaseLayoutV2',
  components: {
    ContentHeaderBottom,
    Sidebar
  },
  mixins: [mixin],
  data() {
    return {
      drawerVisible: false,
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

  methods: {
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
    }),
    drawerClose() {
      this.menuAction(false);
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
