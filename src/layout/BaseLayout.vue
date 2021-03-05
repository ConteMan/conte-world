<template>
  <div>
    <float-actions/>
    <div class="base-container">

      <div
        v-if="sideShow"
        class="side-container"
        ref="sideDom"
        :style="{ 'width': sideWidth + 'px', 'min-width': sideMinWidth + 'px' }"
      >
        <sidebar/>
      </div>
      <div
        v-if="sideShow"
        class="touch-div"
        ref="moveDom"
      >
        <span></span>
        <span></span>
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
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/header/Sidebar'
import FloatActions from '@/layout/components/FloatActions'

import { mixin } from '@/utils/mixin'
import { mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'

export default {
  name: 'BaseLayout',
  components: {
    Sidebar,
    FloatActions,
  },
  mixins: [mixin],
  data() {
    return {
      fullWidth: window.innerWidth,
      timer: false,
      drawerVisible: false,

      sideWidth: 200,
      sideMaxWidth: 500,
      sideMinWidth: 100,
      clientStartX: 0,
      leftDom: null,
    }
  },
  computed: {
    isDrawer: function() {
      return this.fullWidth <= 768
    },
    sideShow: function() {
      const show = this.fullWidth > 768 && this.menuStatus
      return show
    }
  },
  created() {
    window.addEventListener('resize', () => {
      if (!this.timer) {
        this.timer = true
        setTimeout(
          () => {
            this.fullWidth = window.innerWidth
            this.timer = false
          }, 400)
      }
    }, false)
  },
  mounted() {
    if (this.sideShow) {
      this.dragControllerDeal()
    }
  },
  watch: {
    sideShow(target) {
      if (target) {
        // sure the side dom exist
        this.$nextTick(() => {
          this.dragControllerDeal()
        })
      }
    }
  },
  methods: {
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
    }),
    drawerClose() {
      this.menuAction(false)
    },
    dragControllerDeal() {
      const moveDom = this.$refs.moveDom
      this.leftDom = this.$refs.sideDom
      moveDom.onmousedown = e => {
        this.clientStartX = e.clientX
        e.preventDefault()
        document.onmousemove = e => {
          this.moveHandle(e.clientX, this.leftDom)
        }

        document.onmouseup = e => {
          document.onmouseup = null
          document.onmousemove = null
        }
      }
    },
    moveHandle(nowClientX) {
      const computedX = nowClientX - this.clientStartX
      let changeWidth = this.sideWidth + computedX

      if (changeWidth < this.sideMinWidth) {
        changeWidth = this.sideMinWidth
      }

      if (changeWidth > this.sideMaxWidth) {
        changeWidth = this.sideMaxWidth
      }
      this.sideWidth = changeWidth
      this.clientStartX = nowClientX
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDrawer) {
      this.menuAction(false)
    }
    next()
  },
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
