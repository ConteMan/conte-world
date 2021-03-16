import { mapState, mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'

const mixin = {
  computed: {
    ...mapState({
      darkMode: state => state.app.darkMode,
      menuStatus: state => state.app.menuStatus,
      isMobile: state => state.app.isMobile,
      contentHeight: state => state.app.contentHeight,
      routes: state => state.permission.routes,
      info: state => state.app.info,
    })
  },
  methods: {},
}

const appMixin = {
  computed: {
    ...mapState({
      loading: state => state.app.loading,
    })
  },
  methods: {
    ...mapMutations('app', {
      darkAction: MT.DARK_MODE,
      isMobileAction: MT.IS_MOBILE,
      contentHeightAction: MT.CONTENT_HEIGHT,
    }),
  }
}

export { mixin, appMixin }
