<template>
  <a-spin
    :spinning="loading"
    wrapperClassName="spin-loading-container"
    tip="Hello, ConteMan"
    :class="{'z-index-0': !loading}"
  >
    <a-icon slot="indicator" class="spin-loading" type="loading" spin />
    <div id="app">
      <transition
        name="custom-classes-transition"
        :enter-active-class="`animated ${enterAnimate} page-toggle-enter-active`"
        :leave-active-class="`animated ${leaveAnimate} page-toggle-leave-active`"
      >
        <a-config-provider
          :getPopupContainer="getPopupContainer"
        >
          <router-view/>
        </a-config-provider>
      </transition>
    </div>
  </a-spin>
</template>

<script>
import { appMixin } from '@/utils/mixin';

export default {
  name: 'App',
  mixins: [appMixin],
  data() {
    return {
      enterAnimate: 'fadeIn',
      leaveAnimate: 'fadeOut',
      timer: false,
    };
  },
  created() {
    window.addEventListener('resize', () => {
      if (!this.timer) {
        this.timer = true;
        setTimeout(
          () => {
            const clientWidth = window.innerWidth;
            this.clientWithAction(clientWidth);
            const isMobileTmp = clientWidth <= 768;
            if (isMobileTmp !== this.isMobile) {
              this.isMobileAction(isMobileTmp);
            }
            this.timer = false;
          }, 400);
      }
    }, false);
  },
  mounted() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      this.darkAction(true);
    }
  },
  methods: {
    getPopupContainer(el) {
      if (el) {
        return el.parentNode;
      } else {
        return document.body;
      }
    },
  },
};
</script>

<style scoped lang="less">
#app {
  .page-toggle-enter-active {
    position: absolute !important;
    animation-duration: 0.8s !important;
    width: calc(100%) !important;
  }

  .page-toggle-leave-active {
    position: absolute !important;
    animation-duration: 0.8s !important;
    width: calc(100%) !important;
  }
}
</style>
