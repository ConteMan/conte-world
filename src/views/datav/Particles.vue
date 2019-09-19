<template>
    <div id="dparticles">

    </div>
</template>

<script>
    import particlesConfig from "./config/particlesjs"
    export default {
        name: "Particles",
        mounted() {
            particlesJS("dparticles", particlesConfig);
        }
    }
</script>

<style scoped lang="stylus">
    #dparticles
        width 98%
        height 98%
        position absolute
</style>