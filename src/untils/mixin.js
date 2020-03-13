import { mapState } from 'vuex'

const mixin = {
    computed: {
        ...mapState({
            widthType: state => state.setting.widthType,
        })
    },
    methods: {
    },
}

export { mixin }