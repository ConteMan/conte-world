<template>
    <div class="header">
        <div class="title">
            Movie 数据平台
        </div>
        <div class="date">
            {{ time }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                time: '',
                timeHandle: ''
            }
        },
        mounted(){
            this.showTime()
        },
        destroyed(){
          clearInterval(this.timeHandle)
        },
        methods: {
            showTime() {
                var that = this
                this.timeHandle = setInterval(function(){
                    that.time = new Date().Format("yyyy-MM-dd hh:mm:ss")
                }, 1000)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .header
        width 100%
        height 4rem
        min-height 80px
        background: url(../../assets/img/datav/title.png) no-repeat
        background-size 100% 100%
    .title
        padding-top 1rem
        text-align center
        font-size 2rem
        color #ffffff
    .date
        float right
        color #fff
        margin 0 2rem 0 0
</style>