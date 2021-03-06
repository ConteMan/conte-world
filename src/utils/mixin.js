import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      globalLoading: state => state.app.loading,
      darkMode: state => state.app.darkMode,
      menuStatus: state => state.app.menuStatus,
      isMobile: state => state.app.isMobile,
      contentHeight: state => state.app.contentHeight,
    })
  },
  methods: {},
}

export { mixin }
