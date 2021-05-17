<template>
  <div class="layout-container">
    <div class="sidebar-container" :style="{ width: sideShow ? '200px' : '2px' }">
      <transition
        name="custom-classes-transition"
        :enter-active-class="`animated ${enterAnimate} page-toggle-enter-active`"
        :leave-active-class="`animated ${leaveAnimate} page-toggle-leave-active`"
      >
        <sidebar v-if="sideShow" />
        <div v-else class="space-container"></div>
      </transition>
    </div>

    <div class="content-container" :style="{ width: contentWidth }">
      <router-view class="router-container" />

      <content-header-bottom class="content-header" />
    </div>

    <a-drawer
      placement="left"
      wrapClassName="sidebar-drawer"
      width="40%"
      :closable="false"
      :visible="isDrawer && menuStatus"
      @close="drawerClose"
    >
      <sidebar />
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
  beforeRouteLeave(to, from, next) {
    if (this.isDrawer) {
      this.menuAction(false);
    }
    next();
  },
  data() {
    return {
      enterAnimate: 'fadeIn',
      leaveAnimate: 'fadeOut',
    };
  },

  computed: {
    isDrawer: function() {
      return this.isMobile;
    },
    sideShow: function() {
      return !this.isMobile && this.menuStatus;
    },
    contentWidth: function() {
      return (this.layoutMode === 'fit' || this.clientWidth < 1224) ? '100%' : this.$config.staticWidth + 'px';
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
};
</script>

<style scoped lang="less">
@import './index.less';
</style>
