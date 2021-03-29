<template>
  <div>
    <float-actions/>
    <div class="base-container">
      <div v-if="menuStatus && !isDrawer" class="side-container">
        <sidebar/>
      </div>
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
        :class="{'no-menu': !menuStatus || isDrawer, 'exist-menu': menuStatus && !isDrawer}"
      >
        <transition name="fade">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/header/Sidebar';
import FloatActions from '@/layout/components/FloatActions';

import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'BaseLayout',
  components: {
    Sidebar,
    FloatActions,
  },
  data() {
    return {
      fullWidth: document.body.clientWidth,
      timer: false,
      drawerVisible: false,
    };
  },
  mixins: [mixin],
  computed: {
    isDrawer: function() {
      return this.fullWidth <= 768;
    },
  },
  mounted() {
    window.onresize = () => {
      if (!this.timer) {
        this.timer = true;
        setTimeout(
          () => {
            this.fullWidth = document.body.clientWidth;
            this.timer = false;
          }, 400);
      }
    };
  },
  methods: {
    drawerClose() {
      this.menuAction(false);
    },
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
    })
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
@import "~@/style/variables";

.base-container {
  height: 100%;

  .side-container {
    position: fixed;
    height: 100%;
    width: 100px;
    margin: 0;
    border-right: 1px solid @border-color;
    text-align: center;
  }

  .content-container {
    position: relative;
    margin: 0 0 0 100px;

    div:first-child {
      min-height: 100vh;
      // padding: 0 0 16px 0;
    }
  }

  .content-container.no-menu {
    margin: 0;
  }
}

.dark-theme {
  .base-container {
    .side-container {
      border-right: 1px solid @dark-theme-border;
    }
  }
}
</style>
