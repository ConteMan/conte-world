import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      layoutVersion: state => state.setting.layoutVersion,
      widthType: state => state.setting.widthType,
      menuStatus: state => state.setting.menuStatus,
      darkMode: state => {
        state.app.darkMode ? document.getElementsByTagName('body')[0].className = 'dark-theme' : document.body.removeAttribute('class')
        return state.app.darkMode
      },
    })
  },
  methods: {},
}

export { mixin }
