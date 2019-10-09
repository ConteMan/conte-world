<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import enquireScreen from "@/untils/device";
    export default {
        beforeMount() {
            console.log(this.$router)
            console.log(this.$route)
            console.log(555)
        },
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
