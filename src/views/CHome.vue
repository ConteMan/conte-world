<template>
    <SideMenu></SideMenu>
</template>

<script>
    import SideMenu from "./SideMenu";
    export default {
        name: "CHome",
        components: {SideMenu},
        beforeCreate() {
            document.title = this.$route.meta.title || "title is missing"
        }
    }
</script>

<style scoped>

</style>