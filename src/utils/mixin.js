import { mapState } from 'vuex'

const mixin = {
    computed: {
        ...mapState({
            layoutVersion: state => state.setting.layoutVersion,
            widthType: state => state.setting.widthType,
            menuStatus: state => state.setting.menuStatus,
        })
    },
    methods: {
    },
}

export { mixin }