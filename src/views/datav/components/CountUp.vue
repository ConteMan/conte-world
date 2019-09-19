<template>
    <span id="countup">

    </span>
</template>

<script>
    import {CountUp} from 'countup.js'

    export default {
        name: "CountUp",
        props: {
            end: {
                type: Number,
                required: true,
            },
            options: {
                type: Object,
                required: false,
                default() {
                    return {}
                }
            },
            callback: {
                type: Function,
                required: false,
                default: () => {}
            }
        },
        data() {
            return {
                c: null
            }
        },
        watch: {
            end(value) {
                if (this.c && this.c.update) {
                    this.c.update(value)
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                if (!this.c) {
                    this.c = new CountUp(
                        this.$el,
                        this.end,
                        this.options
                    )
                    this.c.start(() => {
                        this.callback(this.c)
                    })
                }
            },
            destroy() {
                this.c = null
            }
        },
        beforeDestroy() {
            this.destroy()
        },
        start(callback) {
            if (this.c && this.c.start) {
                this.c.start(() => {
                    callback && callback(this.c)
                })
            }
        },
        pauseResume() {
            if (this.c && this.c.pauseResume) {
                this.c.pauseResume()
            }
        },
        reset() {
            if (this.c && this.c.reset) {
                this.c.reset()
            }
        },
        update(newEndVal) {
            if (this.c && this.c.update) {
                this.c.update(newEndVal)
            }
        }
    }
</script>

<style scoped lang="stylus">
    #countup
        font-size 30px
        color #dd6b66

</style>