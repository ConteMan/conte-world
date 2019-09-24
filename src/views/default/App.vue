<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import enquireScreen from "@/untils/device";
    export default {
        created() {
            var _this = this
            enquireScreen( isMobile => {
                _this.$store.commit('setting/setDevice', isMobile)
            })
        }
    }
</script>

<style lang="stylus">
body
    margin 0
    padding 0

#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
</style>
