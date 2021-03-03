import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      globalLoading: state => state.app.loading,
      darkMode: state => state.app.darkMode,
      menuStatus: state => state.app.menuStatus,
    })
  },
  methods: {},
}

export { mixin }
