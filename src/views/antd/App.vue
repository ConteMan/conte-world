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
                console.log(isMobile)
            })
        }
    }
</script>

<style lang="stylus">
</style>
